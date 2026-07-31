const RecentActivity = () => {
    const activities = [
        {
            id: 1,
            type: "Payment Received",
            description: "Unit 401 - John Doe",
            amount: "$1,200",
            date: "2024-06-01",
        },
        {
            id: 2,
            type: "Payment Received",
            description: "Unit 402 - Sarah Jenkins",
            amount: "$1,200",
            date: "2024-06-02",
        },
        {
            id: 3,
            type: "Payment Received",
            description: "Unit 403 - Mark Thompson",
            amount: "$1,200",
            date: "2024-06-03",
        },
    ];

    return (
        <div className="w-full min-w-0 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex h-full min-w-0 flex-col">
                <h2 className="mb-4 text-xl font-semibold text-black">
                    Recent Activity
                </h2>

                <ul className="flex-1 space-y-4 overflow-y-auto pr-1">
                    {activities.map((activity) => (
                        <li key={activity.id} className="border-b pb-2">
                            <p className="text-sm text-gray-500">{activity.date}</p>
                            <p className="text-sm text-black">{activity.type}</p>
                            {activity.amount && (
                                <p className="text-sm text-green-500">{activity.amount}</p>
                            )}
                            {activity.description && (
                                <p className="text-sm text-gray-700">{activity.description}</p>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="mt-4 flex justify-center">
                    <button className="text-sm text-blue-500 hover:underline">
                        View All Activity
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecentActivity;