'use client'

import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Briefcase, Plus, Trash2, Edit2, PlayCircle } from 'lucide-react';

interface ServiceItem {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    delay: number;
}

const ServicesEditor: React.FC = () => {
    const [title, setTitle] = useState('Dijital Hizmetlerimiz');
    const [subtitle, setSubtitle] = useState('İşletmenizin dijital ihtiyaçları için profesyonel çözümler sunuyoruz.');
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await fetch('/api/content?section=services');
            const result = await response.json();
            if (result.content?.data) {
                setTitle(result.content.data.title);
                setSubtitle(result.content.data.subtitle);
                setServices(result.content.data.services || []);
            }
        } catch (error) {
            console.error('Failed to fetch services content:', error);
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
                body: JSON.stringify({
                    section: 'services',
                    data: { title, subtitle, services }
                })
            });
            if (response.ok) {
                alert('Hizmetler bölümü başarıyla güncellendi!');
            }
        } catch (error) {
            console.error('Failed to save services content:', error);
        } finally {
            setSaving(false);
        }
    };

    const addService = () => {
        const newService: ServiceItem = {
            title: 'Yeni Hizmet',
            subtitle: 'Hizmet Alt Başlığı',
            description: 'Hizmet açıklaması buraya gelecek.',
            features: ['Özellik 1', 'Özellik 2'],
            delay: (services.length + 1) * 0.1
        };
        setServices([...services, newService]);
        setEditingIndex(services.length);
    };

    const deleteService = (index: number) => {
        if (!confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) return;
        setServices(services.filter((_, i) => i !== index));
        if (editingIndex === index) setEditingIndex(null);
    };

    const updateService = (index: number, field: keyof ServiceItem, value: any) => {
        const updated = [...services];
        updated[index] = { ...updated[index], [field]: value };
        setServices(updated);
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
                    <h2 className="text-2xl font-bold text-white">Hizmetler Bölümü Düzenleyici</h2>
                    <p className="text-white/40 text-sm">Sunduğunuz hizmetleri ve özelliklerini yönetin.</p>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* General Settings */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                        <div className="flex items-center space-x-2 text-white/40 mb-2">
                            <Briefcase className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Bölüm Başlıkları</span>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/60">Ana Başlık</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/60">Alt Başlık (Açıklama)</label>
                                <textarea
                                    rows={4}
                                    value={subtitle}
                                    onChange={(e) => setSubtitle(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={addService}
                        className="w-full bg-white/5 hover:bg-white/10 border border-dashed border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center space-y-2 group transition-all"
                    >
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
                            <Plus className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-bold text-white/60">Yeni Hizmet Ekle</span>
                    </button>
                </div>

                {/* Services List & Editor */}
                <div className="lg:col-span-2 space-y-4">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`bg-white/5 border transition-all duration-300 rounded-2xl overflow-hidden ${editingIndex === index ? 'border-blue-500/50 ring-1 ring-blue-500/20' : 'border-white/10 hover:border-white/20'
                                }`}
                        >
                            <div
                                className="p-4 flex items-center justify-between cursor-pointer"
                                onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-xl flex items-center justify-center text-blue-400 font-bold border border-white/5">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{service.title}</h4>
                                        <p className="text-[10px] text-white/30 uppercase tracking-widest">{service.subtitle}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteService(index); }}
                                        className="p-2 text-red-400/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className={`p-2 transition-transform duration-300 ${editingIndex === index ? 'rotate-180 text-blue-400' : 'text-white/20'}`}>
                                        <Edit2 className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${editingIndex === index ? 'max-h-[1000px] border-t border-white/5' : 'max-h-0'}`}>
                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Hizmet Başlığı</label>
                                            <input
                                                type="text"
                                                value={service.title}
                                                onChange={(e) => updateService(index, 'title', e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/40"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Alt Yazı</label>
                                            <input
                                                type="text"
                                                value={service.subtitle}
                                                onChange={(e) => updateService(index, 'subtitle', e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/40"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Açıklama Metni</label>
                                        <textarea
                                            rows={3}
                                            value={service.description}
                                            onChange={(e) => updateService(index, 'description', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/40 text-sm"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest block">Özellik Listesi</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {service.features.map((feature, fi) => (
                                                <div key={fi} className="flex items-center space-x-2">
                                                    <input
                                                        type="text"
                                                        value={feature}
                                                        onChange={(e) => {
                                                            const newFeatures = [...service.features];
                                                            newFeatures[fi] = e.target.value;
                                                            updateService(index, 'features', newFeatures);
                                                        }}
                                                        className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/80 focus:outline-none focus:ring-1 focus:ring-blue-500/40"
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            updateService(index, 'features', service.features.filter((_, i) => i !== fi));
                                                        }}
                                                        className="p-1.5 text-white/10 hover:text-red-400 transition-colors"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => updateService(index, 'features', [...service.features, 'eni Özellik'])}
                                                className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors text-left px-1 mt-1"
                                            >
                                                + Özellik Ekle
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesEditor;
