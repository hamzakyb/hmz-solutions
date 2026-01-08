'use client'

import React from 'react';
import { HelpCircle } from 'lucide-react';
import HeroEditor from './HeroEditor';
import ServicesEditor from './ServicesEditor';
import ContactEditor from './ContactEditor'; // Import

// ... inside switch
        case 'content-about':
return <AboutEditor />;
        case 'content-contact':
return <ContactEditor />;
        default:
return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
        <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mb-6">
            <HelpCircle className="w-10 h-10 text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 capitalized">
            {section.replace('content-', '').replace('-', ' ')} Editor
        </h2>
        <p className="text-white/40 max-w-md">
            Bu bölüm şu anda geliştirme aşamasındadır. Çok yakında burada dinamik içerik yönetimi yapabileceksiniz.
        </p>
    </div>
);
    }
};

export default ContentManager;
