
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, AlertTriangle, CheckCircle } from 'lucide-react';

const InventoryPanel = () => {
  const inventoryData = [
    {
      item: 'Shampoo',
      stockWithAgent: 50,
      delivered: 30,
      remaining: 20,
      lastAudit: 'Friday 11:58AM',
      status: 'good'
    },
    {
      item: 'Pomade',
      stockWithAgent: 30,
      delivered: 27,
      remaining: 3,
      lastAudit: 'Friday 11:58AM',
      status: 'low'
    },
    {
      item: 'Conditioner',
      stockWithAgent: 25,
      delivered: 18,
      remaining: 7,
      lastAudit: 'Friday 11:58AM',
      status: 'good'
    },
    {
      item: 'Hair Oil',
      stockWithAgent: 40,
      delivered: 15,
      remaining: 25,
      lastAudit: 'Friday 11:58AM',
      status: 'good'
    }
  ];

  const getStatusBadge = (status: string, remaining: number) => {
    if (remaining <= 5) {
      return <Badge variant="destructive">Low Stock</Badge>;
    }
    if (remaining <= 10) {
      return <Badge className="bg-yellow-500">Medium</Badge>;
    }
    return <Badge className="bg-green-500">Good</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Photo Audit Alert */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Camera className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-900">Weekly Stock Photo Due</h3>
                <p className="text-sm text-blue-700">Submit inventory photo by Friday 1:00 PM to avoid alerts to guarantors</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Current Inventory (Read-Only)</span>
            <Badge variant="outline" className="text-green-600 border-green-200">
              Last Sync: Today 9:15 AM
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Item</th>
                  <th className="text-left p-3">Stock with Agent</th>
                  <th className="text-left p-3">Delivered</th>
                  <th className="text-left p-3">Remaining</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Last Audit</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{item.item}</td>
                    <td className="p-3">{item.stockWithAgent}</td>
                    <td className="p-3">{item.delivered}</td>
                    <td className="p-3 font-bold">{item.remaining}</td>
                    <td className="p-3">{getStatusBadge(item.status, item.remaining)}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{item.lastAudit}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Audit Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span>Audit Requirements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 rounded-full p-1">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <p className="text-sm">Take a clear photo of all inventory items arranged by type</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 rounded-full p-1">
                <span className="text-blue-600 font-bold text-sm">2</span>
              </div>
              <p className="text-sm">Include a piece of paper with your name and current date</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 rounded-full p-1">
                <span className="text-blue-600 font-bold text-sm">3</span>
              </div>
              <p className="text-sm">Submit before Friday 1:00 PM to avoid guarantor notifications</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryPanel;
