'use client'

import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Type, AlignLeft } from 'lucide-react';

const ContactEditor: React.FC = () => {
    const [data, setData] = useState({
        title: 'Bizimle Geleceği Kurun',
        subtitle: 'Projenizi dinlemek ve size özel çözümler üretmek için sabırsızlanıyoruz. Teknoloji ortağınız olarak yanınızdayız.'
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await fetch('/api/content?section=contact');
            const result = await response.json();
            if (result.content?.data) {
                setData(result.content.data);
            }
        } catch (error) {
            console.error('Failed to fetch contact content:', error);
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
                body: JSON.stringify({ section: 'contact', data })
            });
            if (response.ok) {
                alert('İletişim sayfası içeriği güncellendi!');
            }
        } catch (error) {
            console.error('Failed to save content:', error);
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
        <div className="p-6 space-y-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">İletişim Sayfası Düzenle</h2>
                    <p className="text-white/40 text-sm">İletişim sayfasındaki başlık ve açıklama metinlerini buradan yönetebilirsiniz.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-bold py-2.5 px-8 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center space-x-2 active:scale-95"
                >
                    {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>{saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</span>
                </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center space-x-2">
                            <Type className="w-3 h-3" />
                            <span>Sayfa Başlığı</span>
                        </label>
                        <input
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold text-lg"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center space-x-2">
                            <AlignLeft className="w-3 h-3" />
                            <span>Alt Açıklama</span>
                        </label>
                        <textarea
                            rows={4}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none transition-all"
                            value={data.subtitle}
                            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <p className="text-blue-400 text-sm">
                    <strong>Not:</strong> İletişim bilgileri (Telefon, E-posta, Adres) ve Harita ayarları "Genel Ayarlar" bölümünden yönetilmektedir.
                </p>
            </div>
        </div>
    );
};

export default ContactEditor;
