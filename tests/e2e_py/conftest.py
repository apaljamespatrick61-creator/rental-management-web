import os
from typing import Generator

import pytest
from playwright.sync_api import Page


@pytest.fixture(scope="session")
def base_url() -> str:
    """
    Base URL for the web app under test.

    You can override this at runtime:
    APP_BASE_URL=http://localhost:3001
    """
    return os.getenv("APP_BASE_URL", "http://localhost:3001")


@pytest.fixture(autouse=True)
def pause_after_test_for_learning(page: Page) -> Generator[None, None, None]:
    """
    Optional teaching mode:
    - when E2E_PAUSE_AFTER_TEST=1, Playwright pauses after each test
    - resume in the Playwright inspector to continue
    """
    yield
    if os.getenv("E2E_PAUSE_AFTER_TEST") == "1":
        page.pause()
