import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const MonthlyChart = () =>{
const data = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 1500 },
  { month: "Apr", revenue: 2200 },
  { month: "May", revenue: 2600 },
];
return (
    <div className="w-full min-w-0 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="h-[22rem] w-full sm:h-[26rem]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#0078D4"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>    
)

}

export default MonthlyChart;