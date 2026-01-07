'use client'

import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, FileText, Plus, Trash2, Award, Zap, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { upload } from '@vercel/blob/client';
import Image from 'next/image';

interface StatItem {
    number: string;
    label: string;
}

interface ValueItem {
    title: string;
    description: string;
}

interface AboutData {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    philosophy: string;
    mainImage: string;
    stats: StatItem[];
    values: ValueItem[];
}

const AboutEditor: React.FC = () => {
    const [data, setData] = useState<AboutData>({
        badge: 'Hakkımızda',
        title1: 'Yenilikçi',
        title2: 'Dijital Çözümler',
        description: 'Yaratıcı yaklaşımımız ve teknolojiye olan tutkumuzla...',
        philosophy: 'Mükemmel dijital deneyimler, sadece teknolojiyle değil...',
        mainImage: '',
        stats: [
            { number: 'Yenilikçi', label: 'Yaklaşımlar' },
            { number: 'Özgün', label: 'Çözümler' }
        ],
        values: [
            { title: 'Stratejik Yaklaşım', description: 'Her projeye özel stratejiler...' }
        ]
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await fetch('/api/content?section=about');
            const result = await response.json();
            if (result.content?.data) {
                setData(result.content.data);
            }
        } catch (error) {
            console.error('Failed to fetch about content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 10MB limit check
        if (file.size > 10 * 1024 * 1024) {
            alert('Görsel boyutu çok büyük (Maksimum 10MB). Lütfen daha küçük bir dosya seçin veya görseli sıkıştırın.');
            e.target.value = '';
            return;
        }

        try {
            setUploading(true);
            const token = localStorage.getItem('admin_token');

            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/upload',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setData({ ...data, mainImage: newBlob.url });
        } catch (error) {
            console.error('Upload error:', error);
            alert(`Görsel yüklenirken bir hata oluştu: ${(error as Error).message}`);
        } finally {
            setUploading(false);
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
                body: JSON.stringify({ section: 'about', data })
            });
            if (response.ok) {
                alert('Hakkımızda bölümü başarıyla güncellendi!');
            }
        } catch (error) {
            console.error('Failed to save about content:', error);
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
        <div className="max-w-6xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Hakkımızda Bölümü Düzenleyici</h2>
                    <p className="text-white/40 text-sm">Şirket vizyonunu, değerlerini ve istatistiklerini yönetin.</p>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main Content */}
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                        <div className="flex items-center space-x-2 text-white/40 mb-2">
                            <FileText className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Genel İçerik</span>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/60 flex items-center space-x-2">
                                    <ImageIcon className="w-4 h-4" />
                                    <span>Bölüm Görseli</span>
                                </label>

                                <div className="space-y-4">
                                    {data.mainImage && (
                                        <div className="relative h-40 w-full rounded-xl overflow-hidden border border-white/10 group">
                                            <Image
                                                src={data.mainImage}
                                                alt="About Preview"
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setData({ ...data, mainImage: '' })}
                                                    className="bg-red-500 p-2 rounded-lg text-white"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="text"
                                            value={data.mainImage}
                                            onChange={(e) => setData({ ...data, mainImage: e.target.value })}
                                            placeholder="Görsel URL veya yükleyin..."
                                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/40 text-sm"
                                        />
                                        <label className={`cursor-pointer flex items-center justify-center p-2 rounded-xl border transition-all ${uploading ? 'bg-white/5 border-white/10 opacity-50' : 'bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30 text-blue-400'}`}>
                                            {uploading ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <Upload className="w-5 h-5" />
                                            )}
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                disabled={uploading}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/60">Üst Rozet</label>
                                <input
                                    type="text"
                                    value={data.badge}
                                    onChange={(e) => setData({ ...data, badge: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/40"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-white/60">Başlık (Normal)</label>
                                    <input
                                        type="text"
                                        value={data.title1}
                                        onChange={(e) => setData({ ...data, title1: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/40"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-white/60">Başlık (Dinamik)</label>
                                    <input
                                        type="text"
                                        value={data.title2}
                                        onChange={(e) => setData({ ...data, title2: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/40"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/60">Ana Açıklama</label>
                                <textarea
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData({ ...data, description: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/40 text-sm leading-relaxed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/60">Felsefe / Alıntı</label>
                                <textarea
                                    rows={3}
                                    value={data.philosophy}
                                    onChange={(e) => setData({ ...data, philosophy: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/40 text-sm italic"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stats Manager */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2 text-white/40">
                                <Award className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">İstatistikler</span>
                            </div>
                            <button
                                onClick={() => setData({ ...data, stats: [...data.stats, { number: '100+', label: 'Yeni Stat' }] })}
                                className="text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors"
                            >
                                + Ekle
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {data.stats.map((stat, i) => (
                                <div key={i} className="bg-black/20 border border-white/5 p-4 rounded-xl relative group">
                                    <button
                                        onClick={() => setData({ ...data, stats: data.stats.filter((_, idx) => idx !== i) })}
                                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-3 h-3 text-white" />
                                    </button>
                                    <input
                                        value={stat.number}
                                        onChange={(e) => {
                                            const newStats = [...data.stats];
                                            newStats[i].number = e.target.value;
                                            setData({ ...data, stats: newStats });
                                        }}
                                        className="w-full bg-transparent text-white font-bold text-lg mb-1 focus:outline-none"
                                        placeholder="Sayı/Metin"
                                    />
                                    <input
                                        value={stat.label}
                                        onChange={(e) => {
                                            const newStats = [...data.stats];
                                            newStats[i].label = e.target.value;
                                            setData({ ...data, stats: newStats });
                                        }}
                                        className="w-full bg-transparent text-white/40 text-xs focus:outline-none"
                                        placeholder="Etiket"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Values Manager */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2 text-white/40">
                            <Zap className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Değerlerimiz / İlkelerimiz</span>
                        </div>
                        <button
                            onClick={() => setData({ ...data, values: [...data.values, { title: 'Yeni Değer', description: 'Açıklama' }] })}
                            className="text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors"
                        >
                            + Ekle
                        </button>
                    </div>

                    <div className="space-y-4">
                        {data.values.map((v, i) => (
                            <div key={i} className="p-4 bg-black/20 border border-white/5 rounded-2xl space-y-2 relative group">
                                <button
                                    onClick={() => setData({ ...data, values: data.values.filter((_, idx) => idx !== i) })}
                                    className="absolute top-4 right-4 text-white/10 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <input
                                    value={v.title}
                                    onChange={(e) => {
                                        const newValues = [...data.values];
                                        newValues[i].title = e.target.value;
                                        setData({ ...data, values: newValues });
                                    }}
                                    className="w-4/5 bg-transparent text-white font-bold text-lg focus:outline-none cursor-text"
                                    placeholder="Değer Başlığı"
                                />
                                <textarea
                                    value={v.description}
                                    onChange={(e) => {
                                        const newValues = [...data.values];
                                        newValues[i].description = e.target.value;
                                        setData({ ...data, values: newValues });
                                    }}
                                    className="w-full bg-transparent text-white/40 text-sm focus:outline-none resize-none cursor-text"
                                    placeholder="Değer Açıklaması"
                                    rows={2}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutEditor;
