
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MonthlyStats = () => {
  // Monthly stats data
  const monthlyStats = [
    {
      title: "Delivery Rate %",
      value: "—",
      description: ""
    },
    {
      title: "Bonus Earned",
      value: "—",
      description: ""
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl text-gray-700 font-bold">Monthly</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {monthlyStats.map((stat, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold text-indigo-700 mb-3">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyStats;
