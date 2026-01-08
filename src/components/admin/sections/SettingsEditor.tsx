'use client'

import React, { useState, useEffect } from 'react';
import { Settings, Save, Globe, Shield, RefreshCw, Share2, Info, Sparkles, Upload, Loader2, Trash2, Image as ImageIcon } from 'lucide-react';
import { upload } from '@vercel/blob/client';

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
        googleMapsUrl?: string;
    };
    navigation: {
        logoText: string;
        logoImage: string;
    };
    whatsapp: {
        phoneNumber: string;
        welcomeMessage: string;
    };
    chatbot: {
        greeting: string;
    };
}

const SettingsEditor: React.FC = () => {
    const [data, setData] = useState<SiteSettings>({
        siteTitle: 'HMZ Solutions | Nevşehir Yazılım Şirketi',
        metaDescription: 'Nevşehir\'in lider yazılım şirketi HMZ Solutions...',
        footerDescription: 'Yenilikçi vizyon, profesyonel uygulama. Dijital dünyada ölçülebilir başarı hedefleyen markalar için güvenilir teknoloji ortağı.',
        socialLinks: {
            github: '#',
            linkedin: '#',
            instagram: '#'
        },
        contactInfo: {
            email: 'info@hmzsolutions.com',
            phone: '+90 (505) 095 99 50',
            address: 'Bekdik, Millet Cd. No:38, 50040 Nevşehir Merkez/Nevşehir',
            hours: 'Pzt-Cum 09:00-18:00',
            googleMapsUrl: ''
        },
        navigation: {
            logoText: 'HMZ Solutions',
            logoImage: '/logo.png'
        },
        whatsapp: {
            phoneNumber: '+905050959950',
            welcomeMessage: 'Merhaba! HMZ Solutions hizmetleri hakkında bilgi almak istiyorum.'
        },
        chatbot: {
            greeting: 'HMZ Solutions Digital Concierge servisine hoş geldiniz. İşletmenizin dijital altyapısını global ölçekte nasıl güçlendirebileceğimizi konuşmak için buradayım.'
        }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('/api/content?section=settings');
            const result = await response.json();
            if (result.content?.data) {
                // Deep merge to ensure new fields (like googleMapsUrl) are present even if DB data is old
                setData(prev => ({
                    ...prev,
                    ...result.content.data,
                    contactInfo: {
                        ...prev.contactInfo,
                        ...(result.content.data.contactInfo || {})
                    },
                    socialLinks: {
                        ...prev.socialLinks,
                        ...(result.content.data.socialLinks || {})
                    },
                    navigation: {
                        ...prev.navigation,
                        ...(result.content.data.navigation || {})
                    },
                    whatsapp: {
                        ...prev.whatsapp,
                        ...(result.content.data.whatsapp || {})
                    },
                    chatbot: {
                        ...prev.chatbot,
                        ...(result.content.data.chatbot || {})
                    }
                }));
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
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

            setData({
                ...data,
                navigation: { ...data.navigation, logoImage: newBlob.url }
            });
        } catch (error) {
            console.error('Upload error:', error);
            alert(`Logo yüklenirken bir hata oluştu: ${(error as Error).message}`);
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
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Google Maps Embed URL</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-xs font-mono text-gray-400"
                                value={data.contactInfo.googleMapsUrl || ''}
                                onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, googleMapsUrl: e.target.value } })}
                                placeholder="<iframe src='...'> veya sadece https://..."
                            />
                            <p className="text-[10px] text-white/20">Google Maps - Paylaş - Harita Yerleştir - src içindeki linki yapıştırın.</p>
                        </div>
                    </div>
                </div>

                {/* Navigation & WhatsApp */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <Settings className="w-5 h-5 text-indigo-400" />
                        <h3 className="text-lg font-semibold text-white">Navigasyon & WhatsApp</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center space-x-2">
                                <ImageIcon className="w-3 h-3" />
                                <span>Logo Görseli</span>
                            </label>

                            <div className="space-y-4">
                                {data.navigation.logoImage && (
                                    <div className="relative h-20 w-40 rounded-xl overflow-hidden border border-white/10 group bg-white/5 p-2">
                                        <img
                                            src={data.navigation.logoImage}
                                            alt="Logo Preview"
                                            className="h-full w-full object-contain"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => setData({ ...data, navigation: { ...data.navigation, logoImage: '' } })}
                                                className="bg-red-500 p-1.5 rounded-lg text-white"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center space-x-3">
                                    <input
                                        type="text"
                                        value={data.navigation.logoImage}
                                        onChange={(e) => setData({ ...data, navigation: { ...data.navigation, logoImage: e.target.value } })}
                                        placeholder="Logo URL..."
                                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/40 text-sm"
                                    />
                                    <label className={`cursor-pointer flex items-center justify-center p-2 rounded-xl border transition-all ${uploading ? 'bg-white/5 border-white/10 opacity-50' : 'bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30 text-blue-400'}`}>
                                        {uploading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Upload className="w-4 h-4" />
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
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Logo Metni</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                                value={data.navigation.logoText}
                                onChange={(e) => setData({ ...data, navigation: { ...data.navigation, logoText: e.target.value } })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">WhatsApp Karşılama Mesajı</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                                value={data.whatsapp.welcomeMessage}
                                onChange={(e) => setData({ ...data, whatsapp: { ...data.whatsapp, welcomeMessage: e.target.value } })}
                            />
                        </div>
                    </div>
                </div>

                {/* Chatbot Settings */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        <h3 className="text-lg font-semibold text-white">Chatbot Ayarları</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Yapay Zeka Karşılama Mesajı</label>
                            <textarea
                                rows={4}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none transition-all text-sm leading-relaxed"
                                value={data.chatbot.greeting}
                                onChange={(e) => setData({ ...data, chatbot: { ...data.chatbot, greeting: e.target.value } })}
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
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                                value={data.socialLinks.linkedin}
                                onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, linkedin: e.target.value } })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">GitHub URL</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                                value={data.socialLinks.github}
                                onChange={(e) => setData({ ...data, socialLinks: { ...data.socialLinks, github: e.target.value } })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Instagram URL</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
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

                    <div className="flex flex-col items-center justify-center h-52 border border-dashed border-white/10 rounded-xl p-6 text-center">
                        <Shield className="w-10 h-10 text-white/10 mb-4" />
                        <p className="text-xs text-white/20 italic leading-relaxed">
                            Güvenlik nedeniyle admin bilgilerini değiştirmek için lütfen teknik ekiple iletişime geçin veya .env dosyasını güncelleyin.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsEditor;
