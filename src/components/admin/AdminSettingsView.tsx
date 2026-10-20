import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminLayout } from './AdminLayout';

export const AdminSettingsView: React.FC = () => {
  const { settings, showToast } = useStore();
  const [storeName, setStoreName] = useState(settings.storeName);
  const [announcement, setAnnouncement] = useState(settings.announcementMessage);
  const [threshold, setThreshold] = useState(settings.shippingThreshold);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Boutique store parameters saved successfully');
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8 pb-12 max-w-3xl">
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#26201c]">Store Settings & Configuration</h2>
          <p className="text-sm text-[#61564d] mt-1">
            Manage global boutique branding, global header announcement message, and checkout thresholds.
          </p>
        </div>

        <form onSubmit={handleSave} className="bg-white border border-[#ede4d8] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase font-bold tracking-wider text-[#26201c]">Store Brand Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="h-12 px-4 bg-[#faf6f0] border border-[#ede4d8] rounded-xl text-base font-semibold text-[#26201c] focus:outline-none focus:border-[#b86b43]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase font-bold tracking-wider text-[#26201c]">Announcement Bar Banner Message</label>
            <input
              type="text"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className="h-12 px-4 bg-[#faf6f0] border border-[#ede4d8] rounded-xl text-sm text-[#26201c] focus:outline-none focus:border-[#b86b43]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase font-bold tracking-wider text-[#26201c]">Complimentary Shipping Threshold ($ USD)</label>
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="h-12 px-4 bg-[#faf6f0] border border-[#ede4d8] rounded-xl text-base font-mono font-bold text-[#26201c] focus:outline-none focus:border-[#b86b43]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase font-bold tracking-wider text-[#26201c]">Operational Currency</label>
              <input
                type="text"
                defaultValue={settings.currency}
                disabled
                className="h-12 px-4 bg-[#faf6f0] border border-[#ede4d8] rounded-xl text-base font-mono font-bold text-[#61564d] opacity-75"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#ede4d8] flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#26201c] hover:bg-[#b86b43] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer active:scale-98"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
