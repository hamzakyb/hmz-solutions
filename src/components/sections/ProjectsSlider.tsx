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
    title: 'Akıllı Yapay Zeka SaaS Platformu',
    category: 'Yapay Zeka (Yakında)',
    description: 'Veri analitiği ve yapay zeka entegrasyonlu yeni nesil SaaS platformumuz çok yakında burada sergilenecektir.',
    tags: ['Next.js', 'OpenAI API', 'Python', 'Tailwind', 'SaaS'],
    image: '/projects/ai.png',
    link: '/projects',
    icon: Cpu,
  },
]

const row2Projects: Project[] = [
  {
    title: 'Akıllı Yapay Zeka SaaS Platformu',
    category: 'Yapay Zeka (Yakında)',
    description: 'Veri analitiği ve yapay zeka entegrasyonlu yeni nesil SaaS platformumuz çok yakında burada sergilenecektir.',
    tags: ['Next.js', 'OpenAI API', 'Python', 'Tailwind', 'SaaS'],
    image: '/projects/ai.png',
    link: '/projects',
    icon: Cpu,
  },
  {
    title: 'Step Filtre B2B E-Ticaret Platformu',
    category: 'B2B & E-Ticaret',
    description: 'Filtre imalatçıları için B2B cari takipli, kademeli iskonto motorlu, OEM çapraz referans aramalı, dekont bildirimli ve canlı stoklu e-ticaret portalı.',
    tags: ['Vite SPA', 'Node.js', 'Cari Takip', 'OEM Arama', 'Dekont Bildirimi', 'jsPDF'],
    image: '/projects/step_filtre.png',
    link: '/projects',
    icon: ShoppingBag,
  },
]

const ProjectCard = ({ project }: { project: Project }) => {
  const Icon = project.icon

  return (
    <a
      href={project.link}
      className="w-[380px] md:w-[420px] flex-shrink-0 group relative rounded-3xl bg-neutral-900/40 backdrop-blur-xl border border-white/5 p-6 hover:border-gold-500/30 transition-all duration-500 shadow-glow-gold hover:shadow-glow-gold-hover flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Glow Effect */}
      <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gold-500/5 blur-[80px] group-hover:bg-gold-500/15 transition-all duration-700 pointer-events-none" />
      
      <div>
        {/* Project Image */}
        <div className="relative w-full h-[200px] rounded-2xl overflow-hidden mb-6 border border-white/5">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Tag Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10">
            <Icon className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors duration-300 flex items-center justify-between">
          {project.title}
          <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-gold-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </h3>
        
        <p className="text-neutral-400 text-sm font-light mt-3 leading-relaxed min-h-[60px]">
          {project.description}
        </p>
      </div>

      {/* Tech Tags */}
      <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-2">
        {project.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-[10px] font-semibold text-neutral-500 group-hover:text-gold-300/80 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-full transition-colors duration-300"
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
  const doubleRow2 = [...row2Projects, ...row2Projects, ...row2Projects]

  return (
    <section id="projects" className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Premium Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold-500/[0.02] blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gold-400/[0.01] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
            <span className="text-gold-400 text-xs font-bold tracking-[0.3em] uppercase">
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-400">
              İmzamız
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-neutral-400 text-base md:text-lg font-light leading-relaxed"
          >
            Global markalar ve vizyoner girişimler için geliştirdiğimiz, iş hedeflerini geleceğe taşıyan yüksek kaliteli projelerimiz.
          </motion.p>
        </div>
      </div>

      {/* Slider Tracks */}
      <div className="space-y-8 md:space-y-12 relative z-10 w-full">
        {/* Row 1: Left moving */}
        <div className="w-full overflow-hidden flex select-none py-4 border-y border-white/[0.02]">
          <div className="flex gap-6 md:gap-8 pr-6 md:pr-8 animate-marquee hover:[animation-play-state:paused] min-w-full">
            {doubleRow1.map((project, idx) => (
              <ProjectCard key={`row1-${idx}`} project={project} />
            ))}
          </div>
        </div>

        {/* Row 2: Right moving */}
        <div className="w-full overflow-hidden flex select-none py-4">
          <div className="flex gap-6 md:gap-8 pr-6 md:pr-8 animate-marquee-reverse hover:[animation-play-state:paused] min-w-full">
            {doubleRow2.map((project, idx) => (
              <ProjectCard key={`row2-${idx}`} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSlider
