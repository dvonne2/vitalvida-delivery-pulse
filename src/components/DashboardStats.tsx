
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
    <div className="space-y-8">
      {/* Daily Stats Section - 4 in a row with colors */}
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

      {/* Weekly Section */}
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

      {/* Monthly Section */}
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

      {/* PRESSURE DEY Table */}
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
                  <th className="text-left p-3">Assigned Qty</th>
                  <th className="text-left p-3">Acknowledge</th>
                  <th className="text-left p-3">Out for Delivery</th>
                  <th className="text-left p-3">Payment</th>
                  <th className="text-left p-3">OTP Delivered</th>
                  <th className="text-left p-3">Bonus Status</th>
                </tr>
              </thead>
              <tbody>
                {pressureOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-auto"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <span>#{order.id}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-gray-500">{order.phone}</p>
                      </div>
                    </td>
                    <td className="p-3 text-sm">
                      {order.id === 'FHG345' && (
                        <div>
                          <div>Shampoo x3</div>
                          <div>Pomade x3</div>
                        </div>
                      )}
                      {order.id === 'ABC123' && (
                        <div>
                          <div>Conditioner x2</div>
                          <div>Shampoo x1</div>
                        </div>
                      )}
                      {order.id === 'XYZ789' && (
                        <div>
                          <div>Pomade x4</div>
                          <div>Conditioner x1</div>
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      {order.status !== 'assigned' ? (
                        <span className="text-green-600">✅ @ 09:36</span>
                      ) : (
                        <span className="text-red-600">❌ Not Yet</span>
                      )}
                    </td>
                    <td className="p-3">
                      {order.status !== 'assigned' ? (
                        <span className="text-blue-600">🚚 @ 10:11</span>
                      ) : (
                        <span className="text-red-600">❌ Not Yet</span>
                      )}
                    </td>
                    <td className="p-3">
                      {order.paymentTime ? (
                        <span className="text-green-600">💳 Paid @ {order.paymentTime}</span>
                      ) : (
                        <span className="text-red-600">❌ Not Paid</span>
                      )}
                    </td>
                    <td className="p-3">
                      {order.deliveredTime ? (
                        <span className="text-yellow-600">🔐 OTP @ {order.deliveredTime}</span>
                      ) : order.status === 'out_for_delivery' ? (
                        <span className="text-red-600">❌ Not Delivered</span>
                      ) : (
                        <span className="text-red-600">❌ Not Delivered</span>
                      )}
                    </td>
                    <td className="p-3">
                      {order.status === 'completed' ? (
                        <span className="text-green-600">✅ ₦200 bonus (10H met)</span>
                      ) : order.status === 'out_for_delivery' ? (
                        <span className="text-green-600">✅ ₦200 bonus (10H met)</span>
                      ) : (
                        <span className="text-red-600">🚨 No Bonus — Hurry Up!</span>
                      )}
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
