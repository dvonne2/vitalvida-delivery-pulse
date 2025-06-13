
import DailyStats from './DailyStats';
import WeeklyStats from './WeeklyStats';
import MonthlyStats from './MonthlyStats';
import PressureOrdersTable from './PressureOrdersTable';
import PerformanceCards from './PerformanceCards';

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
  return (
    <div className="space-y-8">
      {/* Daily Stats Section */}
      <DailyStats />

      {/* Weekly Section */}
      <WeeklyStats />

      {/* Monthly Section */}
      <MonthlyStats />

      {/* PRESSURE DEY Table */}
      <PressureOrdersTable />

      {/* Additional Stats Row - Stock Photo and Performance sections */}
      <PerformanceCards agentData={agentData} />
    </div>
  );
};

export default DashboardStats;
