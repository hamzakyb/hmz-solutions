'use client'

import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Type, AlignLeft } from 'lucide-react';

const ContactEditor: React.FC = () => {
    const [data, setData] = useState({
        title: 'Bizimle Geleceği Kurun',
        subtitle: 'Projenizi dinlemek ve size özel çözümler üretmek için sabırsızlanıyoruz. Teknoloji ortağınız olarak yanınızdayız.',
        infoHeaders: {
            address: 'Genel Merkez',
            email: 'E-posta',
            phone: 'Telefon'
        },
        form: {
            labels: {
                name: 'Ad Soyad',
                email: 'E-posta',
                company: 'Şirket (Opsiyonel)',
                message: 'Mesajınız'
            },
            placeholders: {
                name: 'Adınız Soyadınız',
                email: 'ornek@sirket.com',
                company: 'Şirket Adı',
                message: 'Projenizden bahsedin...'
            },
            button: {
                submit: 'Mesajı Gönder',
                submitting: 'Gönderiliyor...'
            }
        }
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
                // Deep merge to ensure all fields exist
                setData(prev => ({
                    ...prev,
                    ...result.content.data,
                    infoHeaders: { ...prev.infoHeaders, ...(result.content.data.infoHeaders || {}) },
                    form: {
                        ...prev.form,
                        ...result.content.data.form,
                        labels: { ...prev.form.labels, ...(result.content.data.form?.labels || {}) },
                        placeholders: { ...prev.form.placeholders, ...(result.content.data.form?.placeholders || {}) },
                        button: { ...prev.form.button, ...(result.content.data.form?.button || {}) }
                    }
                }));
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
                    <p className="text-white/40 text-sm">İletişim sayfasındaki tüm metin içeriklerini buradan yönetebilirsiniz.</p>
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

            {/* Hero Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                <h3 className="text-lg font-semibold text-white mb-4">Hero Bölümü</h3>
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
                            rows={3}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none transition-all"
                            value={data.subtitle}
                            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* Info Headers Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                <h3 className="text-lg font-semibold text-white mb-4">İletişim Bilgileri Başlıkları</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Adres Başlığı</label>
                        <input
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            value={data.infoHeaders.address}
                            onChange={(e) => setData({ ...data, infoHeaders: { ...data.infoHeaders, address: e.target.value } })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">E-posta Başlığı</label>
                        <input
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            value={data.infoHeaders.email}
                            onChange={(e) => setData({ ...data, infoHeaders: { ...data.infoHeaders, email: e.target.value } })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Telefon Başlığı</label>
                        <input
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            value={data.infoHeaders.phone}
                            onChange={(e) => setData({ ...data, infoHeaders: { ...data.infoHeaders, phone: e.target.value } })}
                        />
                    </div>
                </div>
            </div>

            {/* Form Content Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                <h3 className="text-lg font-semibold text-white mb-4">Form İçeriği</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Labels */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-blue-400 uppercase tracking-wider">Etiketler (Labels)</h4>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">İsim Alanı</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={data.form.labels.name}
                                onChange={(e) => setData({ ...data, form: { ...data.form, labels: { ...data.form.labels, name: e.target.value } } })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">E-posta Alanı</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={data.form.labels.email}
                                onChange={(e) => setData({ ...data, form: { ...data.form, labels: { ...data.form.labels, email: e.target.value } } })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Şirket Alanı</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={data.form.labels.company}
                                onChange={(e) => setData({ ...data, form: { ...data.form, labels: { ...data.form.labels, company: e.target.value } } })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Mesaj Alanı</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={data.form.labels.message}
                                onChange={(e) => setData({ ...data, form: { ...data.form, labels: { ...data.form.labels, message: e.target.value } } })}
                            />
                        </div>
                    </div>

                    {/* Placeholders */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-pink-400 uppercase tracking-wider">Yer Tutucular (Placeholders)</h4>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">İsim Placeholder</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={data.form.placeholders.name}
                                onChange={(e) => setData({ ...data, form: { ...data.form, placeholders: { ...data.form.placeholders, name: e.target.value } } })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">E-posta Placeholder</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={data.form.placeholders.email}
                                onChange={(e) => setData({ ...data, form: { ...data.form, placeholders: { ...data.form.placeholders, email: e.target.value } } })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Şirket Placeholder</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={data.form.placeholders.company}
                                onChange={(e) => setData({ ...data, form: { ...data.form, placeholders: { ...data.form.placeholders, company: e.target.value } } })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Mesaj Placeholder</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={data.form.placeholders.message}
                                onChange={(e) => setData({ ...data, form: { ...data.form, placeholders: { ...data.form.placeholders, message: e.target.value } } })}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                    <h4 className="text-sm font-medium text-green-400 uppercase tracking-wider mb-4">Buton Metinleri</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Buton Yazısı</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={data.form.button.submit}
                                onChange={(e) => setData({ ...data, form: { ...data.form, button: { ...data.form.button, submit: e.target.value } } })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Gönderiliyor Yazısı</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={data.form.button.submitting}
                                onChange={(e) => setData({ ...data, form: { ...data.form, button: { ...data.form.button, submitting: e.target.value } } })}
                            />
                        </div>
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
