
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Package, CheckCircle, AlertTriangle, Camera, Star } from 'lucide-react';

interface AgentData {
  name: string;
  state: string;
  lga: string;
  deliveryRate: number;
  strikes: number;
  totalOrders: number;
  completedToday: number;
  weeklyEarnings: number;
  customerSatisfaction: number;
  nextPayoutDays: number;
}

interface DashboardStatsProps {
  agentData: AgentData;
}

const DashboardStats = ({ agentData }: DashboardStatsProps) => {
  const statsCards = [
    {
      title: "Orders Assigned Today",
      value: "15",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Deliveries Completed",
      value: agentData.completedToday.toString(),
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Failed Deliveries",
      value: "2",
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Outstanding Payments",
      value: "₦8,500",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const timeUntilPhotoDeadline = () => {
    const now = new Date();
    const friday1PM = new Date();
    friday1PM.setDate(now.getDate() + (5 - now.getDay())); // Next Friday
    friday1PM.setHours(13, 0, 0, 0); // 1:00 PM
    
    const timeDiff = friday1PM.getTime() - now.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statsCards.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Additional Stats Row */}
      <Card className="md:col-span-2 lg:col-span-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Stock Photo Due In</h3>
            </div>
            <Badge variant="outline" className="text-blue-600 border-blue-200">
              {timeUntilPhotoDeadline()}
            </Badge>
          </div>
          <p className="text-sm text-gray-600">Weekly inventory audit required by Friday 1:00 PM</p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-600" />
              <h3 className="font-semibold text-gray-900">Performance Score</h3>
            </div>
            <Badge variant={agentData.strikes === 0 ? "default" : "destructive"}>
              Strikes: {agentData.strikes}/3
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Customer Satisfaction</span>
            <span className="text-lg font-bold text-yellow-600">{agentData.customerSatisfaction}/5.0</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
