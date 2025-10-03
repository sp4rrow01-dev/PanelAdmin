import { DashboardLayout } from '../components/DashboardLayout';
import { Upload as UploadIcon } from 'lucide-react';

export const Upload = () => {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <UploadIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Upload Content</h3>
        </div>
        <p className="text-sm sm:text-base text-gray-600">Upload new movies or series to your platform.</p>
      </div>
    </DashboardLayout>
  );
};
