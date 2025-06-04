
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Shield, Clock, FileX } from 'lucide-react';

interface StrikeTrackerProps {
  strikes: number;
}

const StrikeTracker = ({ strikes }: StrikeTrackerProps) => {
  const violationHistory = [
    {
      violation: 'Late stock photo',
      date: 'May 24, 2024',
      status: 'warning',
      notes: 'Submitted 2 hrs late'
    },
    {
      violation: 'Undeclared mismatch',
      date: 'May 26, 2024',
      status: 'strike',
      notes: 'Delivered wrong qty without reason'
    }
  ];

  const getStrikeColor = (strikeCount: number) => {
    if (strikeCount === 0) return 'text-green-600';
    if (strikeCount === 1) return 'text-yellow-600';
    if (strikeCount === 2) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStrikeBadge = (status: string) => {
    switch (status) {
      case 'warning':
        return <Badge className="bg-yellow-500">⚠️ Warning</Badge>;
      case 'strike':
        return <Badge variant="destructive">🚨 Strike</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Strike Status Card */}
      <Card className={`border-2 ${strikes >= 2 ? 'border-red-200 bg-red-50' : strikes >= 1 ? 'border-yellow-200 bg-yellow-50' : 'border-green-200 bg-green-50'}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${strikes >= 2 ? 'bg-red-100' : strikes >= 1 ? 'bg-yellow-100' : 'bg-green-100'}`}>
                <Shield className={`h-8 w-8 ${getStrikeColor(strikes)}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Strike Status</h2>
                <p className={`text-3xl font-bold ${getStrikeColor(strikes)}`}>
                  {strikes}/3
                </p>
              </div>
            </div>
            <div className="text-right">
              {strikes === 0 && (
                <div className="text-green-600">
                  <p className="text-lg font-semibold">✅ Good Standing</p>
                  <p className="text-sm">No violations</p>
                </div>
              )}
              {strikes === 1 && (
                <div className="text-yellow-600">
                  <p className="text-lg font-semibold">⚠️ Warning Level</p>
                  <p className="text-sm">2 more strikes = blacklist</p>
                </div>
              )}
              {strikes === 2 && (
                <div className="text-red-600">
                  <p className="text-lg font-semibold">🚨 Critical</p>
                  <p className="text-sm">1 more strike = blacklist</p>
                </div>
              )}
              {strikes >= 3 && (
                <div className="text-red-600">
                  <p className="text-lg font-semibold">❌ Blacklisted</p>
                  <p className="text-sm">Contact management</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert for high strike count */}
      {strikes >= 2 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Critical Warning:</strong> You are one strike away from blacklist. Guarantors have been notified.
          </AlertDescription>
        </Alert>
      )}

      {/* Violation History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileX className="h-5 w-5" />
            <span>Violation History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {violationHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Violation</th>
                    <th className="text-left p-3">Date</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {violationHistory.map((violation, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{violation.violation}</td>
                      <td className="p-3">{violation.date}</td>
                      <td className="p-3">{getStrikeBadge(violation.status)}</td>
                      <td className="p-3 text-sm text-gray-600">{violation.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <p className="text-lg font-semibold text-green-600">Clean Record!</p>
              <p className="text-gray-600">No violations on file</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SLA Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span>SLA Guidelines</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Assignment Verification</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Must confirm within 10 minutes</li>
                <li>• Flag any mismatches immediately</li>
                <li>• Auto-strike if no response</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Weekly Requirements</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Stock photo by Friday 1:00 PM</li>
                <li>• Maintain 80% delivery rate for bonuses</li>
                <li>• Report failed deliveries promptly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrikeTracker;
