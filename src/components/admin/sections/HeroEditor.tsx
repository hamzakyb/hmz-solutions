'use client'

import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Sparkles, Type, Plus, Trash2, Image as ImageIcon, Link as LinkIcon, ChevronUp, ChevronDown, LayoutList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSlide {
    id: string;
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    image: string;
    ctaText: string;
    ctaLink: string;
}

interface HeroData {
    slides: HeroSlide[];
}

const HeroEditor: React.FC = () => {
    const [data, setData] = useState<HeroData>({
        slides: []
    });
    const [selectedSlideId, setSelectedSlideId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await fetch('/api/content?section=hero');
            const result = await response.json();

            if (result.content?.data && result.content.data.slides && result.content.data.slides.length > 0) {
                setData(result.content.data);
                setSelectedSlideId(result.content.data.slides[0].id);
            } else {
                // Initialize with Premium Default Slides if no slides data exists
                const defaultSlides = [
                    {
                        id: crypto.randomUUID(),
                        badge: 'HMZ SOLUTIONS • GLOBAL',
                        title1: 'Sınırları Aşan',
                        title2: 'Teknoloji',
                        subtitle: 'İşletmenizi global standartlara taşıyan, ölçeklenebilir ve güvenli dijital altyapılar kuruyoruz.',
                        image: '/hero-slides/hero-globe.png',
                        ctaText: 'Keşfedin',
                        ctaLink: '#services'
                    },
                    {
                        id: crypto.randomUUID(),
                        badge: 'YAPAY ZEKA • İNOVASYON',
                        title1: 'Geleceği',
                        title2: 'Tasarlıyoruz',
                        subtitle: 'İş süreçlerinizi yapay zeka ve veri odaklı çözümlerle optimize ederek verimliliğinizi maksimize edin.',
                        image: '/hero-slides/hero-ai.png',
                        ctaText: 'AI Çözümleri',
                        ctaLink: '#services'
                    },
                    {
                        id: crypto.randomUUID(),
                        badge: 'DİJİTAL DÖNÜŞÜM',
                        title1: 'Kodun',
                        title2: 'Sanatı',
                        subtitle: 'Modern, hızlı ve kullanıcı odaklı yazılım çözümleriyle markanızın dijital varlığını güçlendiriyoruz.',
                        image: '/hero-slides/hero-growth.png',
                        ctaText: 'Proje Başlatın',
                        ctaLink: '#contact'
                    }
                ];
                setData({ slides: defaultSlides });
                // Automatically select the first slide so the editor is not empty
                setSelectedSlideId(defaultSlides[0].id);
            }
        } catch (error) {
            console.error('Failed to fetch hero content:', error);
        } finally {
            setLoading(false);
        }
    };

    const createNewSlide = (): HeroSlide => ({
        id: crypto.randomUUID(),
        badge: 'Yeni Başlık',
        title1: 'Büyük',
        title2: 'Fikirler',
        subtitle: 'Etkileyici bir alt başlık yazın.',
        image: '',
        ctaText: 'Daha Fazla',
        ctaLink: '#'
    });

    const handleAddSlide = () => {
        const newSlide = createNewSlide();
        setData(prev => ({ slides: [...prev.slides, newSlide] }));
        setSelectedSlideId(newSlide.id);
    };

    const handleRemoveSlide = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Bu slaytı silmek istediğinize emin misiniz?')) {
            const newSlides = data.slides.filter(s => s.id !== id);
            setData({ slides: newSlides });
            if (selectedSlideId === id) {
                setSelectedSlideId(newSlides.length > 0 ? newSlides[0].id : null);
            }
        }
    };

    // Helper to move slide up/down using array index swapping
    const moveSlide = (index: number, direction: 'up' | 'down', e: React.MouseEvent) => {
        e.stopPropagation();
        const newSlides = [...data.slides];
        if (direction === 'up' && index > 0) {
            [newSlides[index], newSlides[index - 1]] = [newSlides[index - 1], newSlides[index]];
        } else if (direction === 'down' && index < newSlides.length - 1) {
            [newSlides[index], newSlides[index + 1]] = [newSlides[index + 1], newSlides[index]];
        }
        setData({ slides: newSlides });
    }

    const updateSlide = (field: keyof HeroSlide, value: string) => {
        if (!selectedSlideId) return;
        setData(prev => ({
            slides: prev.slides.map(slide =>
                slide.id === selectedSlideId ? { ...slide, [field]: value } : slide
            )
        }));
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
                alert('Slider başarıyla güncellendi!');
            }
        } catch (error) {
            console.error('Failed to save hero content:', error);
        } finally {
            setSaving(false);
        }
    };

    const selectedSlide = data.slides.find(s => s.id === selectedSlideId);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Hero Slider Yönetimi</h2>
                    <p className="text-white/40 text-sm">Ana sayfa slider alanını yönetin.</p>
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar - Slide List */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center justify-between text-white/60 px-2">
                        <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            <LayoutList className="w-4 h-4" /> Slayt Listesi
                        </span>
                        <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{data.slides.length}</span>
                    </div>

                    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        <AnimatePresence>
                            {data.slides.map((slide, index) => (
                                <motion.div
                                    key={slide.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    onClick={() => setSelectedSlideId(slide.id)}
                                    className={`group relative p-4 rounded-xl border cursor-pointer transition-all duration-200 ${selectedSlideId === slide.id
                                        ? 'bg-blue-500/10 border-blue-500/50 ring-1 ring-blue-500/50'
                                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-white/60 font-mono">
                                            #{index + 1}
                                        </div>
                                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => moveSlide(index, 'up', e)}
                                                disabled={index === 0}
                                                className="p-1 hover:bg-white/20 rounded text-white/60 disabled:opacity-30"
                                            >
                                                <ChevronUp className="w-3 h-3" />
                                            </button>
                                            <button
                                                onClick={(e) => moveSlide(index, 'down', e)}
                                                disabled={index === data.slides.length - 1}
                                                className="p-1 hover:bg-white/20 rounded text-white/60 disabled:opacity-30"
                                            >
                                                <ChevronDown className="w-3 h-3" />
                                            </button>
                                            <button
                                                onClick={(e) => handleRemoveSlide(slide.id, e)}
                                                className="p-1 hover:bg-red-500/20 hover:text-red-400 rounded text-white/60 transition-colors"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                    <h4 className="text-white font-medium truncate pr-8">{slide.title1} {slide.title2}</h4>
                                    <p className="text-white/40 text-xs truncate mt-1">{slide.subtitle}</p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={handleAddSlide}
                        className="w-full py-3 border-2 border-dashed border-white/10 rounded-xl text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all flex items-center justify-center space-x-2 group"
                    >
                        <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Yeni Slayt Ekle</span>
                    </button>
                </div>

                {/* Editor Area */}
                <div className="lg:col-span-8">
                    {selectedSlide ? (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 space-y-8 animate-in fade-in zoom-in-95 duration-300">
                            {/* Slide Header */}
                            <div className="flex items-center space-x-3 text-white/40 border-b border-white/5 pb-6">
                                <Sparkles className="w-5 h-5 text-yellow-500" />
                                <span className="text-sm font-bold uppercase tracking-widest">Slayt İçeriği Düzenle</span>
                            </div>

                            <div className="space-y-6">
                                {/* Badge & Titles */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-white/60 flex items-center gap-2">
                                            <Sparkles className="w-3 h-3" /> Rozet Metni
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedSlide.badge}
                                            onChange={(e) => updateSlide('badge', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                                            placeholder="Örn: HMZ Solutions"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-white/60 flex items-center gap-2">
                                            <ImageIcon className="w-3 h-3" /> Arkaplan Görsel URL (Opsiyonel)
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedSlide.image}
                                            onChange={(e) => updateSlide('image', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm font-mono"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-white/60 flex items-center gap-2">
                                            <Type className="w-3 h-3" /> Başlık (Normal)
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedSlide.title1}
                                            onChange={(e) => updateSlide('title1', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-lg font-bold"
                                            placeholder="Global"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-yellow-500/80 flex items-center gap-2">
                                            <Type className="w-3 h-3" /> Başlık (Vurgulu/Gold)
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedSlide.title2}
                                            onChange={(e) => updateSlide('title2', e.target.value)}
                                            className="w-full bg-black/40 border border-yellow-500/30 rounded-xl px-4 py-3 text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all text-lg font-bold"
                                            placeholder="Dijital Çözümler"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-white/60">Alt Başlık Açıklaması</label>
                                    <textarea
                                        rows={3}
                                        value={selectedSlide.subtitle}
                                        onChange={(e) => updateSlide('subtitle', e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm leading-relaxed"
                                        placeholder="Slayt açıklamanızı buraya yazın..."
                                    />
                                </div>

                                {/* CTA Buttons */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-white/60 flex items-center gap-2">
                                            <Type className="w-3 h-3" /> Buton Metni
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedSlide.ctaText}
                                            onChange={(e) => updateSlide('ctaText', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                            placeholder="Teklif Alın"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-blue-400/80 flex items-center gap-2">
                                            <LinkIcon className="w-3 h-3" /> Buton Linki
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedSlide.ctaLink}
                                            onChange={(e) => updateSlide('ctaLink', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono text-sm"
                                            placeholder="#contact"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-white/20 bg-white/5 border border-white/10 rounded-2xl border-dashed">
                            <LayoutList className="w-12 h-12 mb-4 opacity-50" />
                            <p className="font-medium">Düzenlemek için soldan bir slayt seçin</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeroEditor;
