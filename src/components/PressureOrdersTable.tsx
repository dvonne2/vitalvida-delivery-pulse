
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Eye } from 'lucide-react';

const PressureOrdersTable = () => {
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
  );
};

export default PressureOrdersTable;
