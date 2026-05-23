'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Cpu, Globe, Layers, LineChart, ShoppingBag, Smartphone, Sparkles } from 'lucide-react'
import Image from 'next/image'

interface Project {
  title: string
  category: string
  description: string
  tags: string[]
  image: string
  link: string
  icon: any
}

const row1Projects: Project[] = [
  {
    title: 'Step Filtre B2B E-Ticaret Platformu',
    category: 'B2B & E-Ticaret',
    description: 'Filtre imalatçıları için B2B cari takipli, kademeli iskonto motorlu, OEM çapraz referans aramalı, dekont bildirimli ve canlı stoklu e-ticaret portalı.',
    tags: ['Vite SPA', 'Node.js', 'Cari Takip', 'OEM Arama', 'Dekont Bildirimi', 'jsPDF'],
    image: '/projects/step_filtre.png',
    link: '/projects',
    icon: ShoppingBag,
  },
  {
    title: 'barkOne Mobilya E-Ticaret & CMS',
    category: 'E-Ticaret & CMS',
    description: 'Lüks ahşap ve raf sistemleri için dynamic CMS, iyzico 3D secure kart ödemeli ve Vercel Blob entegrasyonlu e-ticaret platformu.',
    tags: ['Next.js 14', 'Tailwind v4', 'iyzico API', 'Vercel Blob', 'CMS Panel'],
    image: '/projects/bark_one.png',
    link: '/projects',
    icon: Globe,
  },
  {
    title: 'Uren Global B2B İhracat Platformu',
    category: 'B2B & E-Ticaret',
    description: 'Küresel tarım gıdaları ihracatı için Next.js 16 Server Actions, Mongoose Category şeması ve jose JWT entegrasyonlu B2B portalı.',
    tags: ['Next.js 16', 'React 19', 'Server Actions', 'Mongoose', 'B2B Trade'],
    image: '/projects/uren_global.png',
    link: '/projects',
    icon: Globe,
  },
  {
    title: 'Deqoin İç Mimarlık',
    category: 'B2B & E-Ticaret',
    description: 'İç mimari tasarım, lüks yüzey kaplama malzemeleri ve ince yapı inşaatı yapan Deqoin için Next.js 15, Lenis smooth scroll ve Cloudinary CDN entegrasyonlu mimari platform.',
    tags: ['Next.js 15', 'React 19', 'Lenis Scroll', 'Cloudinary CDN', 'Mimari Hub'],
    image: '/projects/deqoin.png',
    link: '/projects',
    icon: Globe,
  },
]


const ProjectCard = ({ project }: { project: Project }) => {
  const Icon = project.icon

  return (
    <a
      href={project.link}
      className="w-[380px] md:w-[420px] flex-shrink-0 group relative rounded-xl bg-zinc-900/20 backdrop-blur-xl border border-zinc-800/80 p-6 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      <div>
        {/* Project Image */}
        <div className="relative w-full h-[200px] rounded-lg overflow-hidden mb-6 border border-zinc-800/50">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
          />
          {/* Tag Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-zinc-950/90 backdrop-blur-md border border-zinc-800">
            <Icon className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-300">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-zinc-200 transition-colors duration-200 flex items-center justify-between">
          {project.title}
          <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
        </h3>
        
        <p className="text-zinc-400 text-sm font-normal mt-3 leading-relaxed min-h-[60px]">
          {project.description}
        </p>
      </div>

      {/* Tech Tags */}
      <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-wrap gap-2">
        {project.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-[10px] font-medium text-zinc-400 bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-md transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  )
}

const ProjectsSlider = () => {
  // Double arrays for seamless marquee loop
  const doubleRow1 = [...row1Projects, ...row1Projects, ...row1Projects]

  return (
    <section id="projects" className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Premium Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-zinc-800/[0.02] blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-zinc-900/[0.01] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-400 text-xs font-semibold tracking-[0.2em] uppercase">
              PORTFOLYO & REFERANSLAR
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white"
          >
            Dijital Dünyada{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500">
              İmzamız
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-zinc-400 text-base md:text-lg font-light leading-relaxed"
          >
            Global markalar ve vizyoner girişimler için geliştirdiğimiz, iş hedeflerini geleceğe taşıyan yüksek kaliteli projelerimiz.
          </motion.p>
        </div>
      </div>

      {/* Slider Tracks */}
      <div className="space-y-8 md:space-y-12 relative z-10 w-full">
        {/* Row 1: Left moving */}
        <div className="w-full overflow-hidden flex select-none py-4 border-y border-zinc-800/20">
          <div className="flex gap-6 md:gap-8 pr-6 md:pr-8 animate-marquee hover:[animation-play-state:paused] min-w-full">
            {doubleRow1.map((project, idx) => (
              <ProjectCard key={`row1-${idx}`} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSlider
