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
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Overview</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h4>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">Content activity {i}</p>
                  <p className="text-gray-500 text-sm">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
