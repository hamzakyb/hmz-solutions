'use client'

import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Sparkles, Type, Type as SubtitleIcon, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroData {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    cta1Text: string;
    cta2Text: string;
}

const HeroEditor: React.FC = () => {
    const [data, setData] = useState<HeroData>({
        badge: 'Premium Dijital Çözümler',
        title1: 'Düşüncenin',
        title2: 'Ötesinde',
        subtitle: 'Nevşehir ve Kapadokya bölgesinden tüm Türkiye\'ye...',
        cta1Text: 'Projeye Başla',
        cta2Text: 'Portföyü Keşfet'
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await fetch('/api/content?section=hero');
            const result = await response.json();
            if (result.content?.data) {
                setData(result.content.data);
            }
        } catch (error) {
            console.error('Failed to fetch hero content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch('/api/content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ section: 'hero', data })
            });
            if (response.ok) {
                alert('Hero bölümü başarıyla güncellendi!');
            }
        } catch (error) {
            console.error('Failed to save hero content:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
    );

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Hero Bölümü Düzenleyici</h2>
                    <p className="text-white/40 text-sm">Ana sayfanın en üst kısmındaki karşılama alanını özelleştirin.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-bold py-2.5 px-8 rounded-xl flex items-center space-x-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                >
                    {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>{saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Badge & Typography */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center space-x-2 text-white/40 mb-2">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Başlık Ayarları</span>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/60">Üst Rozet Metni</label>
                            <input
                                type="text"
                                value={data.badge}
                                onChange={(e) => setData({ ...data, badge: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/60">Başlık Satır 1</label>
                                <input
                                    type="text"
                                    value={data.title1}
                                    onChange={(e) => setData({ ...data, title1: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/60">Başlık Satır 2 (Gold)</label>
                                <input
                                    type="text"
                                    value={data.title2}
                                    onChange={(e) => setData({ ...data, title2: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subtitle & CTAs */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center space-x-2 text-white/40 mb-2">
                        <SubtitleIcon className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Alt Başlık & Butonlar</span>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/60">Alt Başlık Açıklaması</label>
                            <textarea
                                rows={3}
                                value={data.subtitle}
                                onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm leading-relaxed"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/60">Ana Buton Metni</label>
                                <input
                                    type="text"
                                    value={data.cta1Text}
                                    onChange={(e) => setData({ ...data, cta1Text: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/60">İkincil Buton Metni</label>
                                <input
                                    type="text"
                                    value={data.cta2Text}
                                    onChange={(e) => setData({ ...data, cta2Text: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Visualization */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-4 right-4 flex items-center space-x-2 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
                    <PlayCircle className="w-3 h-3 text-blue-400" />
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Canlı Önizleme</span>
                </div>

                <div className="text-center space-y-6 pointer-events-none">
                    <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                        <Sparkles className="w-3 h-3 text-yellow-500" />
                        <span className="text-[10px] text-white/60 font-medium">{data.badge}</span>
                    </div>
                    <h3 className="text-4xl font-black text-white leading-none">
                        {data.title1}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500">
                            {data.title2}
                        </span>
                    </h3>
                    <p className="text-white/40 text-xs max-w-sm mx-auto line-clamp-2">
                        {data.subtitle}
                    </p>
                    <div className="flex justify-center space-x-3">
                        <div className="px-6 py-2 bg-yellow-500 rounded-full text-[10px] font-bold text-black">{data.cta1Text}</div>
                        <div className="px-6 py-2 bg-white/10 border border-white/10 rounded-full text-[10px] font-bold text-white">{data.cta2Text}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroEditor;
