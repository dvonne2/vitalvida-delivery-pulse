
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Star } from 'lucide-react';

interface AgentData {
  strikes: number;
  customerSatisfaction: number;
}

interface PerformanceCardsProps {
  agentData: AgentData;
}

const PerformanceCards = ({ agentData }: PerformanceCardsProps) => {
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
  );
};

export default PerformanceCards;
