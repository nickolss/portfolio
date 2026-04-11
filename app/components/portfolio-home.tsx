'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    ArrowUpRight,
    BarChart3,
    Bot,
    Container,
    Code2,
    Cpu,
    Database,
    Eye,
    Globe,
    GraduationCap,
    Moon,
    Orbit,
    Server,
    Sun,
    Terminal,
    Wrench,
} from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
};

const skills = {
    backend: ['Java', 'Spring Boot', 'Kotlin', 'APIs', 'Architecture'],
    frontend: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'UI/UX'],
    devopsTools: ['Docker', 'Kubernetes', 'Grafana', 'Ansible', 'Linux', 'Shell Script'],
};

const projects = [
    {
        name: 'Mirai',
        subtitle: 'TRL Evaluation Platform',
        description:
            'Application focused on Technology Readiness Level assessment, improving project governance and decision quality for innovation teams.',
        icon: Cpu,
        span: 'md:col-span-2',
        href: 'https://github.com/nickolss/Mirai',
    },
    {
        name: 'Second Vision',
        subtitle: 'Assistive Vision Device (TCC)',
        description:
            'Final-year project featuring a microcomputer and integrated camera to detect obstacles in real time and trigger audio alerts through a mobile app for visually impaired users.',
        icon: Eye,
        span: 'md:col-span-2',
        href: 'https://github.com/nickolss/Second-Vision',
    },
    {
        name: 'Personal RAG',
        subtitle: 'Generative AI Productivity Assistant',
        description:
            'Assistant built with Python and Markdown to organize context and improve day-to-day productivity with retrieval-based workflows.',
        icon: Bot,
        span: 'md:col-span-1',
        href: 'https://github.com/nickolss/personal_rag',
    },
    {
        name: 'Front Sistema HAE',
        subtitle: 'Fullstack Academic Management',
        description:
            'End-to-end system (back-hae/front-hae) for FATEC operations, combining Java backend and TypeScript frontend for complete academic workflows.',
        icon: GraduationCap,
        span: 'md:col-span-2',
        href: 'https://github.com/nickolss/front-hae',
    },
    {
        name: 'Back Sistema HAE',
        subtitle: 'Fullstack Academic Management',
        description:
            'End-to-end system (back-hae/front-hae) for FATEC operations, combining Java backend and TypeScript frontend for complete academic workflows.',
        icon: GraduationCap,
        span: 'md:col-span-2',
        href: 'https://github.com/nickolss/back-hae',
    },
    {
        name: 'ArchWizard',
        subtitle: 'Linux Automation Toolkit',
        description:
            'Shell scripts and CLI automation for Linux environments, showcasing infrastructure thinking, reproducibility, and operational efficiency.',
        icon: Terminal,
        span: 'md:col-span-1',
        href: 'https://github.com/nickolss/ArchWizard',
    },
];

function SectionTitle({
    eyebrow,
    title,
    isDark,
}: {
    eyebrow: string;
    title: string;
    isDark: boolean;
}) {
    return (
        <div className="mb-6 sm:mb-8">
            <p className={`text-xs uppercase tracking-[0.2em] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {eyebrow}
            </p>
            <h2 className={`mt-2 text-2xl font-semibold tracking-tight sm:text-3xl ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                {title}
            </h2>
        </div>
    );
}

export default function PortfolioHome() {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window === 'undefined') {
            return 'dark';
        }

        const savedTheme = window.localStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });
    const isDark = theme === 'dark';

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        window.localStorage.setItem('theme', theme);
    }, [theme]);

    const cardClass = isDark
        ? 'border-zinc-800 bg-zinc-950/60'
        : 'border-zinc-200 bg-white/80 shadow-[0_8px_30px_rgba(15,23,42,0.08)]';

    const chipClass = isDark
        ? 'border-zinc-800 bg-zinc-900/70 text-zinc-300'
        : 'border-zinc-200 bg-white text-zinc-700';

    const mutedTextClass = isDark ? 'text-zinc-400' : 'text-zinc-600';
    const bodyTextClass = isDark ? 'text-zinc-300' : 'text-zinc-700';
    const titleTextClass = isDark ? 'text-zinc-100' : 'text-zinc-900';

    return (
        <main className={`relative min-h-screen overflow-x-clip ${isDark ? 'bg-[#07090d] text-zinc-100' : 'bg-[#f3f6fb] text-zinc-900'}`}>
            <div
                className={`pointer-events-none absolute inset-0 ${
                    isDark
                        ? 'bg-[radial-gradient(circle_at_18%_16%,rgba(35,82,138,0.35),transparent_40%),radial-gradient(circle_at_78%_0%,rgba(15,78,53,0.25),transparent_35%),linear-gradient(180deg,#07090d_0%,#07090d_50%,#05070a_100%)]'
                        : 'bg-[radial-gradient(circle_at_15%_10%,rgba(59,130,246,0.18),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.16),transparent_36%),linear-gradient(180deg,#f3f6fb_0%,#eef3f9_45%,#f8fbff_100%)]'
                }`}
            />

            <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-16 pt-10 sm:px-10 sm:pt-14 lg:gap-24 lg:px-12">
                <motion.header
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: {},
                        show: {
                            transition: {
                                staggerChildren: 0.12,
                            },
                        },
                    }}
                    className={`rounded-3xl border p-6 backdrop-blur sm:p-10 ${
                        isDark
                            ? 'border-zinc-800/80 bg-zinc-950/60 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_80px_rgba(0,0,0,0.45)]'
                            : 'border-zinc-200 bg-white/75 shadow-[0_12px_45px_rgba(15,23,42,0.10)]'
                    }`}
                >
                    <motion.div variants={fadeUp} className="flex items-center justify-between">
                        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${chipClass}`}>
                            <Globe className="h-3.5 w-3.5" />
                            Sao Paulo, Brazil
                        </span>
                        <div className="flex items-center gap-2">
                            <a
                                href="https://github.com/nickolss"
                                target="_blank"
                                rel="noreferrer"
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition ${
                                    isDark
                                        ? 'border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-zinc-100'
                                        : 'border-zinc-200 text-zinc-700 hover:border-zinc-400 hover:text-zinc-900'
                                }`}
                            >
                                <Code2 className="h-3.5 w-3.5" />
                                github.com/nickolss
                            </a>
                            <button
                                type="button"
                                aria-label="Toggle theme"
                                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                                className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition ${
                                    isDark
                                        ? 'border-zinc-800 bg-zinc-900/80 text-zinc-200 hover:border-zinc-600'
                                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
                                }`}
                            >
                                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            </button>
                        </div>
                    </motion.div>

                    <motion.p
                        variants={fadeUp}
                        className={`mt-8 max-w-2xl text-sm uppercase tracking-[0.22em] ${mutedTextClass}`}
                    >
                        Nickolas Maia de Araujo
                    </motion.p>

                    <motion.h1
                        variants={fadeUp}
                        className={`mt-3 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl ${
                            isDark ? 'text-zinc-50' : 'text-zinc-950'
                        }`}
                    >
                        Fullstack Developer
                        <br />
                        <span
                            className={`bg-clip-text text-transparent ${
                                isDark
                                    ? 'bg-gradient-to-r from-zinc-100 via-sky-200 to-emerald-200'
                                    : 'bg-gradient-to-r from-zinc-900 via-sky-700 to-emerald-700'
                            }`}
                        >
                            with a DevOps Mindset
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className={`mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${bodyTextClass}`}
                    >
                        I build robust products across backend and frontend while evolving my DevOps practice with observability, containerization, and automation.
                    </motion.p>

                    <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
                        {[
                            'TypeScript',
                            'Java + Spring Boot',
                            'Docker + Kubernetes',
                            'Grafana + Ansible',
                            'Kotlin',
                            'Shell Script',
                        ].map((item) => (
                            <span
                                key={item}
                                className={`rounded-full border px-3 py-1.5 text-xs ${chipClass}`}
                            >
                                {item}
                            </span>
                        ))}
                    </motion.div>
                </motion.header>

                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={{
                        hidden: {},
                        show: {
                            transition: {
                                staggerChildren: 0.08,
                            },
                        },
                    }}
                >
                      <SectionTitle eyebrow="Capabilities" title="Skills" isDark={isDark} />
                    <div className="grid gap-4 md:grid-cols-3">
                        <motion.article variants={fadeUp} className={`rounded-2xl border p-5 ${cardClass}`}>
                            <div className={`mb-4 inline-flex rounded-lg border p-2 ${chipClass}`}>
                                <Server className={`h-4 w-4 ${isDark ? 'text-zinc-200' : 'text-zinc-700'}`} />
                            </div>
                            <h3 className={`text-lg font-medium ${titleTextClass}`}>Backend</h3>
                            <p className={`mt-2 text-sm ${mutedTextClass}`}>Java and scalable service-oriented systems.</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {skills.backend.map((skill) => (
                                    <span
                                        key={skill}
                                        className={`rounded-md px-2.5 py-1 text-xs ${
                                            isDark ? 'bg-zinc-900 text-zinc-300' : 'bg-zinc-100 text-zinc-700'
                                        }`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.article>

                        <motion.article variants={fadeUp} className={`rounded-2xl border p-5 ${cardClass}`}>
                            <div className={`mb-4 inline-flex rounded-lg border p-2 ${chipClass}`}>
                                <Database className={`h-4 w-4 ${isDark ? 'text-zinc-200' : 'text-zinc-700'}`} />
                            </div>
                            <h3 className={`text-lg font-medium ${titleTextClass}`}>Frontend</h3>
                            <p className={`mt-2 text-sm ${mutedTextClass}`}>Interfaces with strong DX and maintainable design systems.</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {skills.frontend.map((skill) => (
                                    <span
                                        key={skill}
                                        className={`rounded-md px-2.5 py-1 text-xs ${
                                            isDark ? 'bg-zinc-900 text-zinc-300' : 'bg-zinc-100 text-zinc-700'
                                        }`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.article>

                        <motion.article variants={fadeUp} className={`rounded-2xl border p-5 ${cardClass}`}>
                            <div className={`mb-4 inline-flex rounded-lg border p-2 ${chipClass}`}>
                                <Wrench className={`h-4 w-4 ${isDark ? 'text-zinc-200' : 'text-zinc-700'}`} />
                            </div>
                            <h3 className={`text-lg font-medium ${titleTextClass}`}>DevOps & Tools</h3>
                            <p className={`mt-2 text-sm ${mutedTextClass}`}>Containerization, observability, and automation in practice.</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {skills.devopsTools.map((skill) => (
                                    <span
                                        key={skill}
                                        className={`rounded-md px-2.5 py-1 text-xs ${
                                            isDark ? 'bg-zinc-900 text-zinc-300' : 'bg-zinc-100 text-zinc-700'
                                        }`}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.article>
                    </div>
                </motion.section>

                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={{
                        hidden: {},
                        show: {
                            transition: {
                                staggerChildren: 0.08,
                            },
                        },
                    }}
                >
                      <SectionTitle eyebrow="Learning Track" title="DevOps Focus" isDark={isDark} />
                    <div className="grid gap-4 md:grid-cols-3">
                        <motion.article variants={fadeUp} className={`rounded-2xl border p-5 ${cardClass}`}>
                            <div className={`mb-4 inline-flex rounded-lg border p-2 ${chipClass}`}>
                                <Container className={`h-4 w-4 ${isDark ? 'text-zinc-200' : 'text-zinc-700'}`} />
                            </div>
                            <h3 className={`text-lg font-medium ${titleTextClass}`}>Containers</h3>
                            <p className={`mt-2 text-sm ${mutedTextClass}`}>Hands-on with Docker images, layers, and reproducible local stacks.</p>
                        </motion.article>

                        <motion.article variants={fadeUp} className={`rounded-2xl border p-5 ${cardClass}`}>
                            <div className={`mb-4 inline-flex rounded-lg border p-2 ${chipClass}`}>
                                <Orbit className={`h-4 w-4 ${isDark ? 'text-zinc-200' : 'text-zinc-700'}`} />
                            </div>
                            <h3 className={`text-lg font-medium ${titleTextClass}`}>Orchestration</h3>
                            <p className={`mt-2 text-sm ${mutedTextClass}`}>Studying Kubernetes fundamentals, deployment strategies, and scaling basics.</p>
                        </motion.article>

                        <motion.article variants={fadeUp} className={`rounded-2xl border p-5 ${cardClass}`}>
                            <div className={`mb-4 inline-flex rounded-lg border p-2 ${chipClass}`}>
                                <BarChart3 className={`h-4 w-4 ${isDark ? 'text-zinc-200' : 'text-zinc-700'}`} />
                            </div>
                            <h3 className={`text-lg font-medium ${titleTextClass}`}>Observability & Automation</h3>
                            <p className={`mt-2 text-sm ${mutedTextClass}`}>Evolving with Grafana dashboards and Ansible playbooks for operational workflows.</p>
                        </motion.article>
                    </div>
                </motion.section>

                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        show: {
                            transition: {
                                staggerChildren: 0.08,
                            },
                        },
                    }}
                >
                      <SectionTitle eyebrow="Selected Work" title="Project Bento Grid" isDark={isDark} />

                    <div className="grid gap-4 md:grid-cols-3">
                        {projects.map((project) => {
                            const Icon = project.icon;
                            return (
                                <motion.a
                                    key={project.name}
                                    variants={fadeUp}
                                    href={project.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`group relative overflow-hidden rounded-2xl border p-5 transition ${project.span} ${
                                        isDark
                                            ? 'border-zinc-800 bg-zinc-950/70 hover:border-zinc-700 hover:bg-zinc-900/70'
                                            : 'border-zinc-200 bg-white/85 hover:border-zinc-300 hover:bg-white'
                                    }`}
                                >
                                    <div
                                        className={`mb-4 inline-flex rounded-lg border p-2 transition ${
                                            isDark
                                                ? 'border-zinc-800 bg-zinc-900/80 group-hover:border-zinc-700'
                                                : 'border-zinc-200 bg-zinc-50 group-hover:border-zinc-300'
                                        }`}
                                    >
                                        <Icon className={`h-4 w-4 ${isDark ? 'text-zinc-200' : 'text-zinc-700'}`} />
                                    </div>
                                    <h3 className={`text-xl font-semibold tracking-tight ${titleTextClass}`}>{project.name}</h3>
                                    <p className={`mt-1 text-xs uppercase tracking-[0.18em] ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                                        {project.subtitle}
                                    </p>
                                    <p className={`mt-4 text-sm leading-relaxed ${bodyTextClass}`}>{project.description}</p>

                                    <span className={`mt-6 inline-flex items-center gap-2 text-sm ${isDark ? 'text-zinc-200' : 'text-zinc-700'}`}>
                                        View project
                                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </span>
                                </motion.a>
                            );
                        })}
                    </div>
                </motion.section>

            </div>
        </main>
    );
}
