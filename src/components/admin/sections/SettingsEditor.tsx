'use client'

import React, { useState, useEffect } from 'react';
import { Settings, Save, Globe, Shield, RefreshCw, Share2, Info } from 'lucide-react';

interface SiteSettings {
    siteTitle: string;
    metaDescription: string;
    footerDescription: string;
    socialLinks: {
        github: string;
        linkedin: string;
        instagram: string;
    };
    contactInfo: {
        email: string;
        phone: string;
        address: string;
        hours: string;
    };
}

const SettingsEditor: React.FC = () => {
    const [data, setData] = useState<SiteSettings>({
        siteTitle: 'HMZ Solutions | Nevşehir Yazılım Şirketi',
        metaDescription: 'Nevşehir\'in lider yazılım şirketi HMZ Solutions...',
        footerDescription: 'Vizyonları dijital gerçekliklere dönüştürmek için en çağdaş teknolojiyi...',
        socialLinks: {
            github: '#',
            linkedin: '#',
            instagram: '#'
        },
        contactInfo: {
            email: 'info@hmzsolutions.com',
            phone: '+90 (505) 095 99 50',
            address: 'Nevşehir Merkez, Türkiye',
            hours: 'Pzt-Cum 09:00-18:00'
        }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('/api/content?section=settings');
            const result = await response.json();
            if (result.content?.data) {
                setData(result.content.data);
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
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
                body: JSON.stringify({ section: 'settings', data })
            });
            if (response.ok) {
                alert('Site ayarları başarıyla güncellendi!');
            }
        } catch (error) {
            console.error('Failed to save settings:', error);
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
        <div className="p-6 space-y-8 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Site Ayarları</h2>
                    <p className="text-white/40 text-sm">Sitenizin genel yapılandırmasını ve global içeriklerini buradan düzenleyin.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-bold py-2.5 px-8 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center space-x-2 active:scale-95"
                >
                    {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>{saving ? 'Kaydediliyor...' : 'Ayarları Güncelle'}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* SEO & Metadata */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <Globe className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-semibold text-white">Genel SEO & Metadata</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Site Başlığı (Title)</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={data.siteTitle}
                                onChange={(e) => setData({ ...data, siteTitle: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Meta Açıklama</label>
                            <textarea
                                rows={3}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none transition-all"
                                value={data.metaDescription}
                                onChange={(e) => setData({ ...data, metaDescription: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <Info className="w-5 h-5 text-orange-400" />
                        <h3 className="text-lg font-semibold text-white">Footer İçeriği</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Footer Açıklama Metni</label>
                            <textarea
                                rows={4}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none transition-all"
                                value={data.footerDescription}
                                onChange={(e) => setData({ ...data, footerDescription: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <Info className="w-5 h-5 text-green-400" />
                        <h3 className="text-lg font-semibold text-white">İletişim Bilgileri</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">E-posta</label>
                                <input
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                    value={data.contactInfo.email}
                                    onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, email: e.target.value } })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Telefon</label>
                                <input
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                    value={data.contactInfo.phone}
                                    onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, phone: e.target.value } })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Adres</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={data.contactInfo.address}
                                onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, address: e.target.value } })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Çalışma Saatleri</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={data.contactInfo.hours}
                                onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, hours: e.target.value } })}
                            />
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <Share2 className="w-5 h-5 text-pink-400" />
                        <h3 className="text-lg font-semibold text-white">Sosyal Medya Linkleri</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">LinkedIn URL</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={data.socialLinks.linkedin}
                                onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, linkedin: e.target.value } })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">GitHub URL</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={data.socialLinks.github}
                                onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, github: e.target.value } })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Instagram URL</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={data.socialLinks.instagram}
                                onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, instagram: e.target.value } })}
                            />
                        </div>
                    </div>
                </div>

                {/* Security Placeholder */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <Shield className="w-5 h-5 text-purple-400" />
                        <h3 className="text-lg font-semibold text-white">Yönetici Bilgileri</h3>
                    </div>

                    <div className="flex flex-col items-center justify-center h-48 border border-dashed border-white/10 rounded-xl p-6 text-center">
                        <Shield className="w-10 h-10 text-white/10 mb-4" />
                        <p className="text-xs text-white/20 italic">
                            Güvenlik nedeniyle admin bilgilerini değiştirmek için lütfen teknik ekiple iletişime geçin veya .env dosyasını güncelleyin.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsEditor;
