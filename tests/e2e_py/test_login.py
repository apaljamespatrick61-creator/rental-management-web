from playwright.sync_api import Page, expect


# Login E2E tests only, as requested.
# These are heavily commented so you can learn each step.


def test_login_page_renders(page: Page, base_url: str) -> None:
    # Open the login route.
    page.goto(f"{base_url}/login")

    # Check top-level page elements to confirm the route rendered.
    expect(page.get_by_role("heading", name="Boarding House Rental System")).to_be_visible()
    expect(page.get_by_role("button", name="Sign In")).to_be_visible()

    # Check both input fields by their accessible labels.
    expect(page.get_by_label("Email Address:")).to_be_visible()
    expect(page.get_by_label("Password:")).to_be_visible()


def test_login_empty_submit_shows_validation_error(page: Page, base_url: str) -> None:
    page.goto(f"{base_url}/login")

    # Submit without filling anything.
    page.get_by_role("button", name="Sign In").click()

    # The form should show at least one red validation message.
    # We intentionally keep this broad so tiny text changes do not break the test.
    expect(page.locator("p.text-red-500").first).to_be_visible()


def test_login_rejected_credentials_shows_backend_error(page: Page, base_url: str) -> None:
    page.goto(f"{base_url}/login")

    # Intercept the login API request and force a 401 response.
    # This lets us test UI error handling without calling a real backend.
    def handle_login(route):
        route.fulfill(
            status=401,
            content_type="application/json",
            body='{"message":"Invalid credentials"}',
        )

    page.route("**/auth/admin/login", handle_login)

    # Fill valid-looking credentials so the submit reaches API level.
    page.get_by_label("Email Address:").fill("admin@example.com")
    page.get_by_label("Password:").fill("wrong-password")
    page.get_by_role("button", name="Sign In").click()

    # This message is rendered by the login mutation error handler.
    expect(page.get_by_text("Invalid credentials")).to_be_visible()
