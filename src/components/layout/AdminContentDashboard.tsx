'use client';

interface AdminContentDashboardProps {
  articlesCount: number;
}

export default function AdminContentDashboard({ articlesCount }: AdminContentDashboardProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-sm font-black text-black uppercase tracking-wider border-b border-gray-100 pb-2">
        📊 Tableau de bord général
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-left">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Auditeurs en direct</p>
          <p className="text-xl font-black text-black mt-1">1,240 <span className="text-xs text-emerald-500 animate-pulse">● LIVE</span></p>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-left">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nombre de podcasts</p>
          <p className="text-xl font-black text-black mt-1">48 Modules</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-left">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nombre d'actualités</p>
          <p className="text-xl font-black text-black mt-1">{articlesCount} Fiches</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-left">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Émissions programmées</p>
          <p className="text-xl font-black text-black mt-1">6 Directs</p>
        </div>
      </div>
    </div>
  );
}
