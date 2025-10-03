import { DashboardLayout } from '../components/DashboardLayout';
import { Upload as UploadIcon } from 'lucide-react';

export const Upload = () => {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <UploadIcon className="w-8 h-8 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-900">Upload Content</h3>
        </div>
        <p className="text-gray-600">Upload new movies or series to your platform.</p>
      </div>
    </DashboardLayout>
  );
};
