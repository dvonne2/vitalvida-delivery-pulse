
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WeeklyStats = () => {
  // Weekly stats data
  const weeklyStats = [
    {
      title: "Delivery Rate %",
      value: "—",
      description: "(Deliveries Completed ÷ Orders Assigned) × 100"
    },
    {
      title: "Bonus Earned",
      value: "—",
      description: "Based on rules like ₦200/₦300 thresholds"
    },
    {
      title: "Strike Count",
      value: "—",
      description: "If failure exceeds limits"
    },
    {
      title: "SLA Compliance",
      value: "—",
      description: "% of deliveries done within 10-hour window"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl text-gray-700 font-bold">Weekly</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {weeklyStats.map((stat, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-700 mb-3">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyStats;
