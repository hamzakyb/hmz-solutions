import React from 'react';
import { LayoutDashboard, MessageSquare, FileText, TrendingUp, Users, Eye } from 'lucide-react';

const Dashboard: React.FC = () => {
    const stats = [
        { label: 'Toplam Mesaj', value: '24', icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Blog Yazıları', value: '12', icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { label: 'Sayfa Görüntülenme', value: '1.2k', icon: Eye, color: 'text-green-400', bg: 'bg-green-500/10' },
        { label: 'Aktif Kullanıcılar', value: '156', icon: Users, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    ];

    return (
        <div className="space-y-8 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Hoş Geldiniz</h2>
                    <p className="text-white/40">Sitenizin genel durumuna göz atın.</p>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white/60 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span>Bu ay %15 artış</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className="text-white/20 text-xs font-bold uppercase tracking-widest">Live</span>
                        </div>
                        <h3 className="text-white font-medium text-white/40 text-sm">{stat.label}</h3>
                        <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl h-80 flex flex-col items-center justify-center">
                    <p className="text-white/20 italic">Ziyaretçi Grafiği (Çok Yakında)</p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl h-80 flex flex-col items-center justify-center">
                    <p className="text-white/20 italic">Son Aktiviteler (Çok Yakında)</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
