
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Package, CheckCircle, AlertTriangle } from 'lucide-react';

const DailyStats = () => {
  // Daily stats data with colors and icons
  const dailyStats = [
    {
      title: "Orders Assigned Today",
      value: "15",
      description: "Total number of orders assigned today",
      icon: Package,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      valueColor: "text-blue-700"
    },
    {
      title: "Deliveries Completed",
      value: "12",
      description: "Successfully completed deliveries today",
      icon: CheckCircle,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      valueColor: "text-green-700"
    },
    {
      title: "Failed Deliveries",
      value: "2",
      description: "Orders that failed or weren't delivered",
      icon: AlertTriangle,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      valueColor: "text-yellow-700"
    },
    {
      title: "Outstanding Payments",
      value: "₦8,500",
      description: "Delivery fees not yet paid to the DA",
      icon: Clock,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      valueColor: "text-purple-700"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl text-gray-700 font-bold">Daily</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dailyStats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full bg-white shadow-sm`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.title}</h3>
              <p className={`text-3xl font-bold ${stat.valueColor} mb-3`}>{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyStats;
