'use client';

import { motion } from 'framer-motion';
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
    Orbit,
    Server,
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

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
    return (
        <div className="mb-6 sm:mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">{eyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">{title}</h2>
        </div>
    );
}

export default function PortfolioHome() {
    return (
        <main className="relative min-h-screen overflow-x-clip bg-[#07090d] text-zinc-100">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(35,82,138,0.35),transparent_40%),radial-gradient(circle_at_78%_0%,rgba(15,78,53,0.25),transparent_35%),linear-gradient(180deg,#07090d_0%,#07090d_50%,#05070a_100%)]" />

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
                    className="rounded-3xl border border-zinc-800/80 bg-zinc-950/60 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur sm:p-10"
                >
                    <motion.div variants={fadeUp} className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-300">
                            <Globe className="h-3.5 w-3.5" />
                            Sao Paulo, Brazil
                        </span>
                        <a
                            href="https://github.com/nickolss"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-300 transition hover:border-zinc-600 hover:text-zinc-100"
                        >
                            <Code2 className="h-3.5 w-3.5" />
                            github.com/nickolss
                        </a>
                    </motion.div>

                    <motion.p
                        variants={fadeUp}
                        className="mt-8 max-w-2xl text-sm uppercase tracking-[0.22em] text-zinc-400"
                    >
                        Nickolas Maia de Araujo
                    </motion.p>

                    <motion.h1
                        variants={fadeUp}
                        className="mt-3 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl"
                    >
                        Fullstack Developer
                        <br />
                        <span className="bg-gradient-to-r from-zinc-100 via-sky-200 to-emerald-200 bg-clip-text text-transparent">
                            with a DevOps Mindset
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg"
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
                                className="rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-300"
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
                    <SectionTitle eyebrow="Capabilities" title="Skills" />
                    <div className="grid gap-4 md:grid-cols-3">
                        <motion.article variants={fadeUp} className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
                            <div className="mb-4 inline-flex rounded-lg border border-zinc-800 bg-zinc-900/80 p-2">
                                <Server className="h-4 w-4 text-zinc-200" />
                            </div>
                            <h3 className="text-lg font-medium text-zinc-100">Backend</h3>
                            <p className="mt-2 text-sm text-zinc-400">Java and scalable service-oriented systems.</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {skills.backend.map((skill) => (
                                    <span key={skill} className="rounded-md bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.article>

                        <motion.article variants={fadeUp} className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
                            <div className="mb-4 inline-flex rounded-lg border border-zinc-800 bg-zinc-900/80 p-2">
                                <Database className="h-4 w-4 text-zinc-200" />
                            </div>
                            <h3 className="text-lg font-medium text-zinc-100">Frontend</h3>
                            <p className="mt-2 text-sm text-zinc-400">Interfaces with strong DX and maintainable design systems.</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {skills.frontend.map((skill) => (
                                    <span key={skill} className="rounded-md bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.article>

                        <motion.article variants={fadeUp} className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
                            <div className="mb-4 inline-flex rounded-lg border border-zinc-800 bg-zinc-900/80 p-2">
                                <Wrench className="h-4 w-4 text-zinc-200" />
                            </div>
                            <h3 className="text-lg font-medium text-zinc-100">DevOps & Tools</h3>
                            <p className="mt-2 text-sm text-zinc-400">Containerization, observability, and automation in practice.</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {skills.devopsTools.map((skill) => (
                                    <span key={skill} className="rounded-md bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300">
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
                    <SectionTitle eyebrow="Learning Track" title="DevOps Focus" />
                    <div className="grid gap-4 md:grid-cols-3">
                        <motion.article variants={fadeUp} className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
                            <div className="mb-4 inline-flex rounded-lg border border-zinc-800 bg-zinc-900/80 p-2">
                                <Container className="h-4 w-4 text-zinc-200" />
                            </div>
                            <h3 className="text-lg font-medium text-zinc-100">Containers</h3>
                            <p className="mt-2 text-sm text-zinc-400">Hands-on with Docker images, layers, and reproducible local stacks.</p>
                        </motion.article>

                        <motion.article variants={fadeUp} className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
                            <div className="mb-4 inline-flex rounded-lg border border-zinc-800 bg-zinc-900/80 p-2">
                                <Orbit className="h-4 w-4 text-zinc-200" />
                            </div>
                            <h3 className="text-lg font-medium text-zinc-100">Orchestration</h3>
                            <p className="mt-2 text-sm text-zinc-400">Studying Kubernetes fundamentals, deployment strategies, and scaling basics.</p>
                        </motion.article>

                        <motion.article variants={fadeUp} className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
                            <div className="mb-4 inline-flex rounded-lg border border-zinc-800 bg-zinc-900/80 p-2">
                                <BarChart3 className="h-4 w-4 text-zinc-200" />
                            </div>
                            <h3 className="text-lg font-medium text-zinc-100">Observability & Automation</h3>
                            <p className="mt-2 text-sm text-zinc-400">Evolving with Grafana dashboards and Ansible playbooks for operational workflows.</p>
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
                    <SectionTitle eyebrow="Selected Work" title="Project Bento Grid" />

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
                                    className={`group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 transition hover:border-zinc-700 hover:bg-zinc-900/70 ${project.span}`}
                                >
                                    <div className="mb-4 inline-flex rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 transition group-hover:border-zinc-700">
                                        <Icon className="h-4 w-4 text-zinc-200" />
                                    </div>
                                    <h3 className="text-xl font-semibold tracking-tight text-zinc-100">{project.name}</h3>
                                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">{project.subtitle}</p>
                                    <p className="mt-4 text-sm leading-relaxed text-zinc-300">{project.description}</p>

                                    <span className="mt-6 inline-flex items-center gap-2 text-sm text-zinc-200">
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
