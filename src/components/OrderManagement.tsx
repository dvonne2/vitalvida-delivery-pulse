
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertTriangle, Clock, MapPin, Upload } from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  phone: string;
  assignedItems: Record<string, number>;
  deliveredItems: Record<string, number> | null;
  status: string;
  slaRemaining: number;
  location: string;
}

const OrderManagement = () => {
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [deliveryQuantities, setDeliveryQuantities] = useState<{[key: string]: number}>({});
  const [otp, setOtp] = useState('');
  const [verificationStep, setVerificationStep] = useState<'assignment' | 'delivery' | 'completed'>('assignment');

  // Mock orders data
  const orders: Order[] = [
    {
      id: 'FHG345',
      customer: 'Janet Ibrahim',
      phone: '08012345678',
      assignedItems: { 'Shampoo': 3, 'Pomade': 3 },
      deliveredItems: { 'Shampoo': 3, 'Pomade': 2 },
      status: 'mismatch',
      slaRemaining: 720, // seconds
      location: 'Victoria Island, Lagos'
    },
    {
      id: 'ABC123',
      customer: 'Uche Okoro',
      phone: '08098765432',
      assignedItems: { 'Conditioner': 2, 'Shampoo': 1 },
      deliveredItems: null,
      status: 'pending_verification',
      slaRemaining: 480,
      location: 'Ikeja, Lagos'
    },
    {
      id: 'XYZ789',
      customer: 'Amina Hassan',
      phone: '08055667788',
      assignedItems: { 'Pomade': 4, 'Conditioner': 1 },
      deliveredItems: null,
      status: 'new',
      slaRemaining: 600,
      location: 'Surulere, Lagos'
    }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-500">New</Badge>;
      case 'pending_verification':
        return <Badge className="bg-yellow-500">Pending Verification</Badge>;
      case 'mismatch':
        return <Badge variant="destructive">❗ Mismatch</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">✅ Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleAssignmentVerification = (order: Order, confirmed: boolean) => {
    if (confirmed) {
      toast({
        title: "Assignment Verified",
        description: `Order ${order.id} assignment confirmed`,
      });
      setVerificationStep('delivery');
    } else {
      toast({
        title: "Assignment Flagged",
        description: "Please select a reason for flagging this assignment",
        variant: "destructive"
      });
    }
  };

  const handleDeliverySubmission = () => {
    if (!otp || otp.length !== 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 4-digit OTP",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Delivery Confirmed",
      description: "Order completed successfully!",
    });
    setVerificationStep('completed');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Active Orders - Dual Verification System</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Order ID</th>
                  <th className="text-left p-3">Customer</th>
                  <th className="text-left p-3">Assignment Verified</th>
                  <th className="text-left p-3">Delivery Verified</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">SLA Timer</th>
                  <th className="text-left p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">#{order.id}</td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-gray-500">{order.phone}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        {Object.entries(order.assignedItems).map(([item, qty]) => (
                          <div key={item}>
                            {item} {qty} {order.status !== 'new' ? '✅' : '⏳'}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        {order.deliveredItems ? (
                          Object.entries(order.deliveredItems).map(([item, qty]) => (
                            <div key={item} className={
                              order.assignedItems[item] !== qty ? 'text-red-600' : 'text-green-600'
                            }>
                              {item} {qty} {order.assignedItems[item] !== qty ? '❌' : '✅'}
                            </div>
                          ))
                        ) : (
                          <span className="text-gray-400">Pending</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">{getStatusBadge(order.status)}</td>
                    <td className="p-3">
                      <div className={`font-mono text-sm ${
                        order.slaRemaining < 300 ? 'text-red-600' : 
                        order.slaRemaining < 600 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        ⏳ {formatTime(order.slaRemaining)}
                      </div>
                    </td>
                    <td className="p-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            onClick={() => setSelectedOrder(order)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            🔍 Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Order #{order.id} - Dual Verification</DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-6">
                              {/* Customer Info */}
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Customer Details</h3>
                                <p><strong>Name:</strong> {selectedOrder.customer}</p>
                                <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                                <p className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{selectedOrder.location}</p>
                              </div>

                              {/* Step 1: Assignment Verification */}
                              {verificationStep === 'assignment' && (
                                <div className="space-y-4">
                                  <h3 className="font-semibold text-lg">Step 1: Verify Assignment</h3>
                                  <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Assigned Items:</h4>
                                    {Object.entries(selectedOrder.assignedItems).map(([item, qty]) => (
                                      <p key={item}>{item}: {qty} units</p>
                                    ))}
                                  </div>
                                  <div className="flex space-x-4">
                                    <Button 
                                      onClick={() => handleAssignmentVerification(selectedOrder, true)}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      ✅ Confirm Assignment
                                    </Button>
                                    <Button 
                                      variant="outline"
                                      onClick={() => handleAssignmentVerification(selectedOrder, false)}
                                    >
                                      ❌ Flag Assignment
                                    </Button>
                                  </div>
                                </div>
                              )}

                              {/* Step 2: Delivery Confirmation */}
                              {verificationStep === 'delivery' && (
                                <div className="space-y-4">
                                  <h3 className="font-semibold text-lg">Step 2: Confirm Delivery</h3>
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Enter Delivered Quantities:</Label>
                                      {Object.entries(selectedOrder.assignedItems).map(([item, assignedQty]) => (
                                        <div key={item} className="flex items-center space-x-2 mt-2">
                                          <span className="w-24">{item}:</span>
                                          <Input
                                            type="number"
                                            max={assignedQty}
                                            min="0"
                                            placeholder="0"
                                            className="w-20"
                                            onChange={(e) => setDeliveryQuantities({
                                              ...deliveryQuantities,
                                              [item]: parseInt(e.target.value) || 0
                                            })}
                                          />
                                          <span className="text-sm text-gray-500">/ {assignedQty}</span>
                                        </div>
                                      ))}
                                    </div>
                                    
                                    <div>
                                      <Label htmlFor="otp">4-Digit OTP from Customer:</Label>
                                      <Input
                                        id="otp"
                                        maxLength={4}
                                        placeholder="0000"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-32"
                                      />
                                    </div>

                                    <div>
                                      <Label>Upload Payment Proof:</Label>
                                      <Button variant="outline" className="mt-2">
                                        <Upload className="h-4 w-4 mr-2" />
                                        Choose File
                                      </Button>
                                    </div>

                                    <Button 
                                      onClick={handleDeliverySubmission}
                                      className="bg-green-600 hover:bg-green-700 w-full"
                                    >
                                      Complete Delivery
                                    </Button>
                                  </div>
                                </div>
                              )}

                              {/* Step 3: Completed */}
                              {verificationStep === 'completed' && (
                                <div className="text-center space-y-4">
                                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                                  <h3 className="text-xl font-semibold text-green-600">Delivery Completed!</h3>
                                  <p>Order #{selectedOrder.id} has been successfully processed.</p>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagement;
