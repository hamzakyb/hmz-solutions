import React from 'react';
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    Settings,
    Home,
    Info,
    Briefcase,
    LogOut,
    ChevronRight,
    Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    onLogout: () => void;
    stats?: {
        messagesCount: number;
        blogCount: number;
    };
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, stats }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'blog', label: 'Blog Yazıları', icon: FileText, count: stats?.blogCount },
        { id: 'messages', label: 'Mesajlar', icon: MessageSquare, count: stats?.messagesCount },
        { type: 'divider', label: 'İçerik Yönetimi' },
        { id: 'content-hero', label: 'Hero Bölümü', icon: Home },
        { id: 'content-services', label: 'Hizmetler', icon: Briefcase },
        { id: 'content-about', label: 'Hakkımızda', icon: Info },
        { type: 'divider', label: 'Ayarlar' },
        { id: 'settings', label: 'Genel Ayarlar', icon: Settings },
    ];

    return (
        <div className="w-64 min-h-screen bg-white/5 backdrop-blur-2xl border-r border-white/10 flex flex-col sticky top-0">
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Globe className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-lg leading-none">HMZ</h1>
                        <p className="text-white/40 text-xs mt-1">Admin Panel</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
                {menuItems.map((item, index) => {
                    if (item.type === 'divider') {
                        return (
                            <div key={`divider-${index}`} className="pt-4 pb-2 px-3 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                                {item.label}
                            </div>
                        );
                    }

                    const isActive = activeTab === item.id;
                    const Icon = item.icon!;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 group ${isActive
                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                <span className="font-medium text-sm">{item.label}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                {item.count !== undefined && item.count > 0 && (
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-white/40'
                                        }`}>
                                        {item.count}
                                    </span>
                                )}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="w-1 h-1 bg-white rounded-full"
                                    />
                                )}
                            </div>
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-300 group"
                >
                    <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-sm">Çıkış Yap</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
