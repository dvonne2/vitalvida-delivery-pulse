
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Package, CheckCircle, AlertTriangle, Camera, Star, Eye } from 'lucide-react';

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

  // Mock orders data for the Pressure Dey table
  const pressureOrders = [
    {
      id: 'FHG345',
      customer: 'Janet Ibrahim',
      phone: '08012345678',
      product: 'PB4D FulaniHairGro',
      assignedTime: '06:01',
      paymentTime: '10:21',
      deliveredTime: '12:18',
      status: 'completed',
      bonus: '₦200'
    },
    {
      id: 'ABC123',
      customer: 'Uche Okoro',
      phone: '08098765432',
      product: 'Hair Care Bundle',
      assignedTime: '07:15',
      paymentTime: '11:30',
      deliveredTime: null,
      status: 'out_for_delivery',
      bonus: 'Pending'
    },
    {
      id: 'XYZ789',
      customer: 'Amina Hassan',
      phone: '08055667788',
      product: 'Premium Hair Set',
      assignedTime: '08:45',
      paymentTime: null,
      deliveredTime: null,
      status: 'assigned',
      bonus: 'Not Earned'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>

      {/* PRESSURE DEY Table - Now positioned above Stock Photo section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>🚨 PRESSURE DEY - My Orders Today (DA View Only)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Order ID</th>
                  <th className="text-left p-3">Customer</th>
                  <th className="text-left p-3">Product</th>
                  <th className="text-left p-3">Assigned</th>
                  <th className="text-left p-3">Payment</th>
                  <th className="text-left p-3">Delivered</th>
                  <th className="text-left p-3">Bonus Status</th>
                  <th className="text-left p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {pressureOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">#{order.id}</td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-gray-500">{order.phone}</p>
                      </div>
                    </td>
                    <td className="p-3 text-sm">{order.product}</td>
                    <td className="p-3">
                      <span className="text-blue-600">✅ @ {order.assignedTime}</span>
                    </td>
                    <td className="p-3">
                      {order.paymentTime ? (
                        <span className="text-green-600">💳 @ {order.paymentTime}</span>
                      ) : (
                        <span className="text-red-600">❌ Not Paid</span>
                      )}
                    </td>
                    <td className="p-3">
                      {order.deliveredTime ? (
                        <span className="text-green-600">🔐 @ {order.deliveredTime}</span>
                      ) : (
                        <span className="text-red-600">❌ Not Delivered</span>
                      )}
                    </td>
                    <td className="p-3">
                      {order.status === 'completed' ? (
                        <span className="text-green-600">✅ {order.bonus} bonus (10H met)</span>
                      ) : (
                        <span className="text-red-600">🚨 No Bonus — Hurry Up!</span>
                      )}
                    </td>
                    <td className="p-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-auto"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-center text-blue-800 font-medium">
              "Complete delivery under 10H to earn ₦200/order"
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Additional Stats Row - Stock Photo and Performance sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
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

        <Card>
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
    </div>
  );
};

export default DashboardStats;
