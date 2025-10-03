import { DashboardLayout } from '../components/DashboardLayout';
import { Activity, Users, Film, Tv } from 'lucide-react';

const stats = [
  { label: 'Total Views', value: '24,563', icon: Activity, color: 'bg-blue-500' },
  { label: 'Active Users', value: '1,892', icon: Users, color: 'bg-green-500' },
  { label: 'Movies', value: '342', icon: Film, color: 'bg-orange-500' },
  { label: 'Series', value: '156', icon: Tv, color: 'bg-cyan-500' },
];

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Overview</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className={`${stat.color} p-2 sm:p-3 rounded-lg`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Recent Activity</h4>
          <div className="space-y-3 sm:space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-gray-900 font-medium truncate">Content activity {i}</p>
                  <p className="text-xs sm:text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
