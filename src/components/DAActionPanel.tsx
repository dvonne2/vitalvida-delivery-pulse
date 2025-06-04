
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, X, Upload, Clock, MapPin } from 'lucide-react';

interface DAActionPanelProps {
  order: {
    id: string;
    customer: string;
    phone: string;
    address: string;
    email: string;
    product: string;
    quantity: number;
    discount: string;
    source: string;
    assignedItems: Record<string, number>;
  };
  isOpen: boolean;
  onClose: () => void;
}

const DAActionPanel = ({ order, isOpen, onClose }: DAActionPanelProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [stepLogs, setStepLogs] = useState<{[key: number]: string}>({});
  const [otp, setOtp] = useState('');
  const [slaStartTime, setSlaStartTime] = useState<Date | null>(null);
  const [showBonusPopup, setShowBonusPopup] = useState(false);

  // Play sound function
  const playSound = (type: 'success' | 'warning' | 'bonus') => {
    // In a real implementation, you would use Web Audio API or audio files
    console.log(`Playing ${type} sound`);
  };

  const logAction = (step: number, action: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `${action} @ ${timestamp}`;
    setStepLogs(prev => ({ ...prev, [step]: logMessage }));
    return logMessage;
  };

  const handleStepCompletion = (step: number, action: string, unlockNext: boolean = true) => {
    const log = logAction(step, action);
    
    if (unlockNext && step < 5) {
      setCurrentStep(step + 1);
    }

    toast({
      title: "Step Completed",
      description: log,
    });

    if (step === 3) {
      setSlaStartTime(new Date());
    }

    if (step === 5) {
      // Check if delivery was within 10 hours
      if (slaStartTime) {
        const deliveryTime = new Date();
        const hoursDiff = (deliveryTime.getTime() - slaStartTime.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff <= 10) {
          setShowBonusPopup(true);
          playSound('bonus');
          setTimeout(() => setShowBonusPopup(false), 6000);
        }
      }
    }
  };

  const handleAcknowledgeAssignment = (agreed: boolean) => {
    if (agreed) {
      handleStepCompletion(1, "Assignment Accepted");
    } else {
      logAction(1, "Not Enough Stock - Flow Blocked");
      toast({
        title: "Inventory Issue",
        description: "Stock shortage flagged. Inventory Officer will be notified.",
        variant: "destructive"
      });
    }
  };

  const handleCallCustomer = () => {
    // Simulate call functionality
    window.open(`tel:${order.phone}`, '_self');
    handleStepCompletion(2, "Call Initiated");
  };

  const handleMarkOutForDelivery = () => {
    handleStepCompletion(3, "In Transit");
  };

  const handleUploadProof = (type: 'assignment' | 'payment') => {
    // Simulate file upload
    const action = type === 'assignment' ? 'Assignment Proof Uploaded' : 'Payment Uploaded';
    handleStepCompletion(4, action, false);
    
    if (type === 'payment') {
      // Enable OTP step
      setCurrentStep(5);
    }
  };

  const handleOTPSubmission = () => {
    if (otp.length !== 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 4-digit OTP",
        variant: "destructive"
      });
      return;
    }

    handleStepCompletion(5, "OTP Verified - Order Delivered", false);
    playSound('success');
    
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const formatAssignedItems = () => {
    return Object.entries(order.assignedItems)
      .map(([item, qty]) => `${qty} ${item}${qty > 1 ? 's' : ''}`)
      .join(', ');
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>🔐 DA ACTION PANEL — Order #{order.id}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>📦 Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>Customer:</strong> {order.customer}</p>
                    <p className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <strong>Address:</strong> {order.address}
                    </p>
                    <p><strong>Contact:</strong> <a href={`tel:${order.phone}`} className="text-blue-600">{order.phone}</a></p>
                    <p><strong>Email:</strong> <a href={`mailto:${order.email}`} className="text-blue-600">{order.email}</a></p>
                  </div>
                  <div>
                    <p><strong>Product:</strong> {order.product}</p>
                    <p><strong>Quantity:</strong> {order.quantity} unit{order.quantity > 1 ? 's' : ''}</p>
                    <p><strong>Discount:</strong> {order.discount}</p>
                    <p><strong>Source:</strong> {order.source}</p>
                    <p><strong>Can Deliver Today:</strong> ✅ YES</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 5-Step Action Flow */}
            <Card>
              <CardHeader>
                <CardTitle>✅ 5-Step Delivery Action Flow</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Step 1: Acknowledge Assignment */}
                <div className={`p-4 rounded-lg border ${currentStep >= 1 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                  <h3 className="font-semibold text-lg mb-3">
                    {currentStep > 1 ? '✅' : '1.'} Step 1: Acknowledge Assignment
                  </h3>
                  <div className="bg-yellow-50 p-3 rounded mb-4">
                    <p className="font-medium">🧾 You're expected to deliver: {formatAssignedItems()}</p>
                  </div>
                  {currentStep === 1 ? (
                    <div className="flex space-x-4">
                      <Button 
                        onClick={() => handleAcknowledgeAssignment(true)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        ✅ Yes, I Agree
                      </Button>
                      <Button 
                        variant="destructive"
                        onClick={() => handleAcknowledgeAssignment(false)}
                      >
                        🛑 Not Enough Stock
                      </Button>
                    </div>
                  ) : (
                    <p className="text-green-600 font-medium">{stepLogs[1]}</p>
                  )}
                </div>

                {/* Step 2: Call Customer */}
                <div className={`p-4 rounded-lg border ${currentStep >= 2 ? 'bg-blue-50 border-blue-200' : 'bg-gray-100 border-gray-300'}`}>
                  <h3 className="font-semibold text-lg mb-3">
                    {currentStep > 2 ? '✅' : '📞'} Step 2: Call Customer
                  </h3>
                  {currentStep === 2 ? (
                    <div className="space-y-3">
                      <Button 
                        onClick={handleCallCustomer}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        📞 Call {order.customer} – {order.phone}
                      </Button>
                      <p className="text-sm text-gray-600">💬 Tell customer you're on your way</p>
                      <p className="text-sm text-orange-600">🌬️ Na now be the time o! Bonus dey ride this call.</p>
                    </div>
                  ) : currentStep > 2 ? (
                    <p className="text-green-600 font-medium">{stepLogs[2]}</p>
                  ) : (
                    <p className="text-gray-500">🔒 Locked - Complete Step 1 first</p>
                  )}
                </div>

                {/* Step 3: Out for Delivery */}
                <div className={`p-4 rounded-lg border ${currentStep >= 3 ? 'bg-blue-50 border-blue-200' : 'bg-gray-100 border-gray-300'}`}>
                  <h3 className="font-semibold text-lg mb-3">
                    {currentStep > 3 ? '✅' : '🚚'} Step 3: Mark as Out for Delivery
                  </h3>
                  {currentStep === 3 ? (
                    <div className="space-y-3">
                      <Button 
                        onClick={handleMarkOutForDelivery}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        🚚 Mark as "Out for Delivery"
                      </Button>
                      <div className="text-sm space-y-1">
                        <p>🧠 Triggers:</p>
                        <p>• SLA 10-hour countdown begins</p>
                        <p>• ₦200 bonus clock starts ticking</p>
                        <p>• Unlocks Step 4</p>
                      </div>
                    </div>
                  ) : currentStep > 3 ? (
                    <div className="space-y-2">
                      <p className="text-green-600 font-medium">{stepLogs[3]}</p>
                      {slaStartTime && (
                        <div className="flex items-center text-orange-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>⏳ SLA countdown: 10H started</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">🔒 Locked - Complete Step 2 first</p>
                  )}
                </div>

                {/* Step 4: Upload Proofs */}
                <div className={`p-4 rounded-lg border ${currentStep >= 4 ? 'bg-blue-50 border-blue-200' : 'bg-gray-100 border-gray-300'}`}>
                  <h3 className="font-semibold text-lg mb-3">
                    {currentStep > 4 ? '✅' : '💳'} Step 4: Upload Proofs
                  </h3>
                  {currentStep === 4 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button 
                          variant="outline"
                          onClick={() => handleUploadProof('assignment')}
                          className="flex items-center"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          📸 Upload DA Assignment Proof
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => handleUploadProof('payment')}
                          className="flex items-center"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          💳 Upload Payment Proof
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Upload WhatsApp screenshot, POS receipt, or Moniepoint alert
                      </p>
                      <p className="text-sm text-red-600">
                        ⚠️ OTP field stays LOCKED until payment is uploaded
                      </p>
                    </div>
                  ) : currentStep > 4 ? (
                    <p className="text-green-600 font-medium">{stepLogs[4]}</p>
                  ) : (
                    <p className="text-gray-500">🔒 Locked - Complete Step 3 first</p>
                  )}
                </div>

                {/* Step 5: OTP & Delivery */}
                <div className={`p-4 rounded-lg border ${currentStep >= 5 ? 'bg-blue-50 border-blue-200' : 'bg-gray-100 border-gray-300'}`}>
                  <h3 className="font-semibold text-lg mb-3">
                    {stepLogs[5] ? '✅' : '🔐'} Step 5: Enter OTP & Mark Delivered
                  </h3>
                  {currentStep === 5 ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="otp">🔐 4-digit OTP from customer:</Label>
                        <Input
                          id="otp"
                          type="text"
                          maxLength={4}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="0000"
                          className="w-32 mt-1"
                        />
                      </div>
                      <Button 
                        onClick={handleOTPSubmission}
                        disabled={otp.length !== 4}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        🟩 DELIVERED (OTP VERIFIED)
                      </Button>
                      <div className="text-sm space-y-1">
                        <p>🧾 This will log: Delivered @ [timestamp]</p>
                        <p>🎉 Bonus logic evaluated here:</p>
                        <p>• ₦200 if within 10H</p>
                        <p>• ₦300 if weekly rate ≥ 80%</p>
                      </div>
                    </div>
                  ) : stepLogs[5] ? (
                    <div className="space-y-2">
                      <p className="text-green-600 font-medium">{stepLogs[5]}</p>
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span>Order Successfully Delivered!</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">🔒 Locked - Upload payment proof first</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bonus Popup */}
      {showBonusPopup && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-6 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-2">
          <div className="text-center">
            <div className="text-2xl mb-2">✅ ₦200 bonus (10H met)</div>
            <div className="text-sm">Your fast delivery just earned you ₦200 extra. Keep going champ! 🚀</div>
          </div>
        </div>
      )}
    </>
  );
};

export default DAActionPanel;
