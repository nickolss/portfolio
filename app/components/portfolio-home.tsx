'use client';

import { motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useState } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/* ─── i18n ───────────────────────────────────────────────────────────── */

type Lang = 'pt' | 'en';

const copy = {
    pt: {
        location: 'são paulo, brasil',
        h1: ['NICKOLAS', 'MAIA'],
        tagline: 'backend developer · devops',
        bio: 'Cursando ADS na FATEC Zona Leste, ex-aluno do IBM P-Tech. Aprofundando Java/Spring Boot e Golang/Gin. Experiência com RESTful APIs, PostgreSQL, MySQL, SAP Hana, Docker e Linux.',
        sExperience: 'experiência',
        sSkills: 'habilidades',
        sDevops: 'foco devops',
        sEducation: 'formação',
        sCerts: 'certificações',
        certNow: 'agora',
        certStudying: 'estudando',
        sProjects: 'projetos',
        skillLabels: { backend: 'backend', frontend: 'frontend', devops: 'devops', databases: 'bancos de dados' },
        expTotal: '9 meses',
        expLocation: 'são paulo, brasil',
        roles: [
            { title: 'Assistente de Dev. Sênior', period: 'jun 2026 → hoje' },
            { title: 'Assistente de Dev. Júnior', period: 'nov 2025 → jun 2026' },
            { title: 'Estagiário', period: 'out 2025 → nov 2025' },
        ],
        education: [
            { institution: 'FATEC Zona Leste', degree: 'Tecnólogo — Análise e Desenvolvimento de Sistemas', period: '2025 → 2026' },
            { institution: 'ETEC Zona Leste', degree: 'Técnico — Desenvolvimento de Sistemas', period: '2022 → 2024' },
        ],
        devopsFocus: [
            { area: 'containers', note: 'Docker images, builds multi-stage e stacks locais reproduzíveis.', status: 'ativo' },
            { area: 'orquestração', note: 'Fundamentos de Kubernetes — deployments, services, configmaps.', status: 'aprendendo' },
            { area: 'observabilidade', note: 'Dashboards Grafana e playbooks Ansible para automação operacional.', status: 'ativo' },
        ],
        projects: [
            { name: 'mirai', subtitle: 'Plataforma de Avaliação TRL', description: 'Avaliação de Nível de Maturidade Tecnológica para melhorar a governança e a qualidade das decisões em times de inovação.', href: 'https://github.com/nickolss/Mirai', lang: 'TypeScript' },
            { name: 'second-vision', subtitle: 'Dispositivo de Visão Assistida', description: 'Microcomputador com câmera que detecta obstáculos em tempo real e dispara alertas via app mobile para deficientes visuais.', href: 'https://github.com/nickolss/Second-Vision', lang: 'Python' },
            { name: 'personal_rag', subtitle: 'Assistente de IA e Produtividade', description: 'Assistente Python + Markdown para organizar contexto e melhorar produtividade com fluxos de recuperação de informação.', href: 'https://github.com/nickolss/personal_rag', lang: 'Python' },
            { name: 'front-hae', subtitle: 'Frontend de Gestão Acadêmica', description: 'Frontend TypeScript para operações da FATEC, parte do sistema end-to-end back-hae/front-hae.', href: 'https://github.com/nickolss/front-hae', lang: 'TypeScript' },
            { name: 'back-hae', subtitle: 'Backend de Gestão Acadêmica', description: 'Backend Java/Spring Boot para a FATEC com gestão completa de fluxos acadêmicos e API RESTful.', href: 'https://github.com/nickolss/back-hae', lang: 'Java' },
            { name: 'arch-wizard', subtitle: 'Toolkit de Automação Linux', description: 'Shell scripts e automação CLI para ambientes Linux demonstrando raciocínio de infraestrutura.', href: 'https://github.com/nickolss/ArchWizard', lang: 'Shell' },
        ],
        statusBlock: ['$UPTIME = ∞', '$MODE   = building', '$STATUS = working'],
        footer: '$ sair 0',
    },
    en: {
        location: 'são paulo, brazil',
        h1: ['NICKOLAS', 'MAIA'],
        tagline: 'backend developer · devops',
        bio: 'Studying ADS at FATEC Zona Leste, IBM P-Tech alumni. Currently deepening Java/Spring Boot and Golang/Gin. Experienced with RESTful APIs, PostgreSQL, MySQL, SAP Hana, Docker, and Linux.',
        sExperience: 'experience',
        sSkills: 'skills',
        sDevops: 'devops focus',
        sEducation: 'education',
        sCerts: 'certifications',
        certNow: 'now',
        certStudying: 'studying',
        sProjects: 'projects',
        skillLabels: { backend: 'backend', frontend: 'frontend', devops: 'devops', databases: 'databases' },
        expTotal: '9 months',
        expLocation: 'são paulo, brazil',
        roles: [
            { title: 'Senior Developer Assistant', period: 'jun 2026 → present' },
            { title: 'Junior Developer Assistant', period: 'nov 2025 → jun 2026' },
            { title: 'Intern', period: 'oct 2025 → nov 2025' },
        ],
        education: [
            { institution: 'FATEC Zona Leste', degree: 'Technologist — Systems Analysis and Development', period: '2025 → 2026' },
            { institution: 'ETEC Zona Leste', degree: 'Technician — Systems Development', period: '2022 → 2024' },
        ],
        devopsFocus: [
            { area: 'containers', note: 'Docker images, multi-stage builds, and reproducible local stacks.', status: 'active' },
            { area: 'orchestration', note: 'Kubernetes fundamentals — deployments, services, configmaps, scaling.', status: 'learning' },
            { area: 'observability', note: 'Grafana dashboards for metrics and Ansible playbooks for automation.', status: 'active' },
        ],
        projects: [
            { name: 'mirai', subtitle: 'TRL Evaluation Platform', description: 'Technology Readiness Level assessment improving project governance and decision quality for innovation teams.', href: 'https://github.com/nickolss/Mirai', lang: 'TypeScript' },
            { name: 'second-vision', subtitle: 'Assistive Vision Device (TCC)', description: 'Microcomputer + camera system that detects obstacles in real time and triggers audio alerts via mobile app.', href: 'https://github.com/nickolss/Second-Vision', lang: 'Python' },
            { name: 'personal_rag', subtitle: 'Generative AI Productivity Assistant', description: 'Python + Markdown assistant to organize context and improve productivity with retrieval-based workflows.', href: 'https://github.com/nickolss/personal_rag', lang: 'Python' },
            { name: 'front-hae', subtitle: 'Academic Management Frontend', description: 'TypeScript frontend for FATEC operations, part of the end-to-end back-hae/front-hae system.', href: 'https://github.com/nickolss/front-hae', lang: 'TypeScript' },
            { name: 'back-hae', subtitle: 'Academic Management Backend', description: 'Java/Spring Boot backend for FATEC combining complete academic workflow management with a clean RESTful API.', href: 'https://github.com/nickolss/back-hae', lang: 'Java' },
            { name: 'arch-wizard', subtitle: 'Linux Automation Toolkit', description: 'Shell scripts and CLI automation for Linux environments showcasing infrastructure thinking.', href: 'https://github.com/nickolss/ArchWizard', lang: 'Shell' },
        ],
        statusBlock: ['$UPTIME = ∞', '$MODE   = building', '$STATUS = open to work'],
        footer: '$ exit 0',
    },
} satisfies Record<Lang, unknown>;

/* ─── static data ────────────────────────────────────────────────────── */

const skills = {
    backend: ['Java', 'Spring Boot', 'Golang', 'Gin', 'APIs RESTful', 'Architecture'],
    frontend: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'UI/UX'],
    devops: ['Docker', 'Kubernetes', 'Grafana', 'Ansible', 'Terraform', 'Datadog', 'Linux', 'Shell'],
    databases: ['PostgreSQL', 'MySQL', 'SAP Hana'],
};

const certifications = [
    { name: 'Privacidade e Proteção de Dados (LGPD)', institution: 'Senai São Paulo', date: 'ago 2022', status: 'done' as const },
    { name: 'Job Application Essentials', institution: 'IBM', date: 'mar 2024', status: 'done' as const },
    { name: 'Introdução ao Hacking e Pentest 2.0', institution: 'Solyd Offensive Security', date: 'ago 2024', status: 'done' as const },
    { name: 'Certificado de Publicação de Artigo', institution: 'FATEC Zona Leste', date: 'dez 2024', status: 'done' as const },
    { name: 'Cybersecurity', institution: 'FIAP', date: 'abr 2025', status: 'done' as const },
    { name: 'Golang do Zero ao Avançado', institution: 'Udemy', href: 'https://www.udemy.com/course/golang-do-zero-ao-avancado/', date: null, status: 'progress' as const },
    { name: 'Kubernetes do Básico ao Avançado', institution: 'Udemy', href: 'https://www.udemy.com/course/kubernetes-do-basico-ao-avancado/', date: null, status: 'progress' as const },
];

const langColors: Record<string, string> = {
    TypeScript: '#3178c6',
    Python: '#3572a5',
    Java: '#b07219',
    Shell: '#89e051',
    Golang: '#00add8',
};

/* ─── ASCII computer (sidebar compact version) ───────────────────────── */

const IW = 26;
const IH = 7;

const SCRIPT = [
    { cmd: 'whoami', outputs: ['  nickolas'] },
    { cmd: 'cat role.txt', outputs: ['  backend dev', '  devops mindset'] },
    { cmd: 'ls skills/', outputs: ['  java · go · ts · k8s'] },
    { cmd: 'git log --oneline', outputs: ['  a3f1b2 feat: new api', '  9c4e21 fix: prod'] },
    { cmd: 'docker ps', outputs: ['  portfolio  running'] },
];

function buildFrame(rows: string[], cursor: string, blink: boolean): string {
    const pad = (s: string) => s.slice(0, IW).padEnd(IW);
    const hr = '─'.repeat(IW + 2);
    const top = '┌' + hr + '┐';
    const bot = '└' + hr + '┘';
    const blank = '│ ' + ' '.repeat(IW) + ' │';

    const display = [...rows];
    if (cursor !== '' && display.length < IH) {
        display.push(cursor + (blink ? '█' : ' '));
    }
    while (display.length < IH) display.push('');

    const inner = display.map(l => '│ ' + pad(l) + ' │');
    const leg = ' '.repeat(8) + '│' + ' '.repeat(IW - 10) + '│';
    const base = '═'.repeat(IW + 4);

    return [top, blank, ...inner, blank, bot, leg, base].join('\n');
}

function AsciiComputer() {
    const [rows, setRows] = useState<string[]>([]);
    const [cursor, setCursor] = useState('');
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const t = setInterval(() => setBlink(b => !b), 530);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        let dead = false;
        const sleep = (ms: number) =>
            new Promise<void>((res, rej) => setTimeout(() => (dead ? rej() : res()), ms));

        async function run() {
            try {
                while (!dead) {
                    let current: string[] = [];
                    for (const { cmd, outputs } of SCRIPT) {
                        let typed = '';
                        setCursor('$ ');
                        for (const ch of cmd) {
                            typed += ch;
                            setCursor('$ ' + typed);
                            await sleep(60);
                        }
                        await sleep(200);
                        current = [...current, ' $ ' + cmd];
                        setRows([...current]);
                        setCursor('');
                        for (const out of outputs) {
                            current = [...current, out];
                            setRows([...current]);
                            await sleep(65);
                        }
                        await sleep(450);
                        if (current.length < IH - 1) current = [...current, ''];
                        setCursor('$ ');
                    }
                    await sleep(1200);
                    setRows([]);
                    setCursor('');
                    await sleep(320);
                }
            } catch { /* unmounted */ }
        }

        run();
        return () => { dead = true; };
    }, []);

    return (
        <pre aria-hidden className="font-mono text-[10.5px] leading-normal select-none text-[#3f3f46]">
            {buildFrame(rows, cursor, blink)}
        </pre>
    );
}

/* ─── side decoration ────────────────────────────────────────────────── */

const SIDE_CHARS = Array.from({ length: 40 }, (_, i) =>
    i % 9 === 0 ? '┤' : i % 9 === 4 ? '├' : '│'
).join('\n');

function SideRule({ side }: { side: 'left' | 'right' }) {
    return (
        <pre
            aria-hidden
            className={`fixed top-0 h-screen pointer-events-none hidden xl:block text-[10px] font-mono leading-[2.6] select-none text-[#18181b] ${side === 'left' ? 'left-5' : 'right-5'}`}
        >
            {SIDE_CHARS}
        </pre>
    );
}

/* ─── section label ──────────────────────────────────────────────────── */

function Label({ children }: { children: string }) {
    return (
        <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.18em] mb-5">
            <span className="text-[#22d3ee]">{'// '}</span>
            <span className="text-[#71717a]">{children}</span>
        </motion.p>
    );
}

function Rule() {
    return (
        <div className="flex items-center gap-2 text-[#1c1c1f] text-[10px] font-mono">
            <div className="flex-1 border-t border-[#1c1c1f]" />
            <span>◆</span>
            <div className="flex-1 border-t border-[#1c1c1f]" />
        </div>
    );
}

/* ─── animation ──────────────────────────────────────────────────────── */

const fadeUp = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

function Section({ children }: { children: React.ReactNode }) {
    return (
        <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            variants={stagger}
        >
            {children}
        </motion.section>
    );
}

/* ─── main ───────────────────────────────────────────────────────────── */

export default function PortfolioHome() {
    const [lang, setLang] = useState<Lang>('pt');

    useIsomorphicLayoutEffect(() => {
        const stored = localStorage.getItem('lang') as Lang | null;
        if (stored) setLang(stored);
    }, []);

    useEffect(() => { window.localStorage.setItem('lang', lang); }, [lang]);

    const T = copy[lang];

    return (
        <div className="min-h-screen bg-[#0c0c0e] text-[#a1a1aa] font-mono">

            {/* subtle vertical rails on very wide screens */}
            <SideRule side="left" />
            <SideRule side="right" />

            <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-14 py-12">

                {/* ── top bar ─────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#52525b] mb-14 pb-5 border-b border-[#18181b]"
                >
                    <span className="text-[#71717a]">
                        <span className="text-[#22d3ee]">~</span>/{T.location}
                    </span>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <a href="mailto:nickolasmaiaraujo@gmail.com" className="hover:text-[#22d3ee] transition-colors">
                            nickolasmaiaraujo@gmail.com
                        </a>
                        <a href="https://linkedin.com/in/nickolas-maia" target="_blank" rel="noreferrer" className="hover:text-[#22d3ee] transition-colors">
                            linkedin ↗
                        </a>
                        <a href="https://github.com/nickolss" target="_blank" rel="noreferrer" className="hover:text-[#22d3ee] transition-colors">
                            github ↗
                        </a>
                        <div className="flex items-center gap-1 border border-[#1c1c1f] px-2 py-0.5">
                            {(['pt', 'en'] as Lang[]).map((l, i) => (
                                <span key={l} className="flex items-center gap-1">
                                    <button
                                        onClick={() => setLang(l)}
                                        className={`transition-colors ${lang === l ? 'text-[#22d3ee]' : 'text-[#3f3f46] hover:text-[#71717a]'}`}
                                    >
                                        {l.toUpperCase()}
                                    </button>
                                    {i === 0 && <span className="text-[#1c1c1f]">·</span>}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ── two-column layout ────────────────────────────────── */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 lg:items-start">

                    {/* ══ LEFT SIDEBAR ═══════════════════════════════════ */}
                    <motion.aside
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:w-60 lg:shrink-0 lg:sticky lg:top-12 flex flex-col gap-7"
                    >
                        {/* name */}
                        <div>
                            <div className="text-[10px] text-[#22d3ee] mb-2 tracking-widest uppercase">
                                {'// dev'}
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-bold leading-none tracking-tight text-white">
                                {T.h1[0]}
                                <br />
                                <span className="text-[#22d3ee]">{T.h1[1]}</span>
                            </h1>
                            <p className="text-[#71717a] text-xs mt-2">{T.tagline}</p>
                        </div>

                        {/* ASCII computer */}
                        <AsciiComputer />

                        {/* bio */}
                        <p className="text-[#a1a1aa] text-xs leading-relaxed">
                            {T.bio}
                        </p>

                        {/* status block */}
                        <div className="border border-[#18181b] p-3">
                            <div className="text-[10px] text-[#22d3ee] mb-2 tracking-widest uppercase">{'// status'}</div>
                            {T.statusBlock.map((line) => (
                                <div key={line} className="text-[11px] text-[#71717a] font-mono leading-relaxed">
                                    <span className="text-[#52525b]">{line.split('=')[0]}=</span>
                                    <span className="text-[#a1a1aa]">{line.split('=')[1]}</span>
                                </div>
                            ))}
                        </div>

                        {/* decorative bottom ASCII */}
                        <pre aria-hidden className="text-[10px] font-mono text-[#3f3f46] select-none leading-snug hidden lg:block">
                            {`┌───────────────────┐
                              │ ■ □ □  terminal   │
                              ├───────────────────┤
                              │                   │
                              │   > init(career)  │
                              │   > commit --all  │
                              │   > push origin   │
                              │                   │
                              └───────────────────┘`}
                        </pre>
                    </motion.aside>

                    {/* ══ RIGHT MAIN CONTENT ═════════════════════════════ */}
                    <main className="flex-1 flex flex-col gap-12 min-w-0">

                        {/* experience */}
                        <Section>
                            <Label>{T.sExperience}</Label>
                            <motion.div variants={fadeUp} className="flex flex-col gap-4">
                                <div className="flex items-baseline justify-between gap-4">
                                    <span className="text-white text-sm font-medium">Inpower Br</span>
                                    <span className="text-[#3f3f46] text-xs shrink-0">{T.expTotal}</span>
                                </div>
                                <p className="text-[#52525b] text-xs -mt-2">{T.expLocation}</p>
                                <div className="flex flex-col gap-2.5 pl-3 border-l border-[#1c1c1f]">
                                    {T.roles.map(({ title, period }) => (
                                        <div key={title} className="flex items-baseline justify-between gap-4">
                                            <span className="text-[#a1a1aa] text-xs">{title}</span>
                                            <span className="text-[#52525b] text-[11px] shrink-0">{period}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </Section>

                        <Rule />

                        {/* skills */}
                        <Section>
                            <Label>{T.sSkills}</Label>
                            <div className="flex flex-col gap-3">
                                {(
                                    [
                                        { key: 'backend', items: skills.backend },
                                        { key: 'frontend', items: skills.frontend },
                                        { key: 'devops', items: skills.devops },
                                        { key: 'databases', items: skills.databases },
                                    ] as const
                                ).map(({ key, items }) => (
                                    <motion.div key={key} variants={fadeUp} className="flex flex-wrap items-baseline gap-x-1 gap-y-1">
                                        <span className="text-[#22d3ee] text-[10px] uppercase tracking-wider w-28 shrink-0 opacity-80">
                                            {T.skillLabels[key]}
                                        </span>
                                        {items.map((s, i) => (
                                            <span key={s}>
                                                <span className="text-[#a1a1aa] hover:text-[#d4d4d8] transition-colors cursor-default text-xs">{s}</span>
                                                {i < items.length - 1 && <span className="text-[#52525b] mx-1.5">·</span>}
                                            </span>
                                        ))}
                                    </motion.div>
                                ))}
                            </div>
                        </Section>

                        <Rule />

                        {/* devops focus */}
                        <Section>
                            <Label>{T.sDevops}</Label>
                            <div className="flex flex-col gap-4">
                                {T.devopsFocus.map(({ area, note, status }) => (
                                    <motion.div key={area} variants={fadeUp} className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1">
                                        <span className="text-[#a1a1aa] text-xs font-medium">{area}</span>
                                        <span className={`text-[10px] uppercase tracking-widest text-right ${status === 'ativo' || status === 'active'
                                            ? 'text-[#22d3ee] opacity-80'
                                            : 'text-[#78716c]'
                                            }`}>
                                            {status}
                                        </span>
                                        <p className="text-[#71717a] text-xs leading-relaxed col-span-2">{note}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </Section>

                        <Rule />

                        {/* education */}
                        <Section>
                            <Label>{T.sEducation}</Label>
                            <div className="flex flex-col gap-5">
                                {T.education.map(({ institution, degree, period }) => (
                                    <motion.div key={institution} variants={fadeUp} className="flex flex-col gap-0.5">
                                        <div className="flex items-baseline justify-between gap-4">
                                            <span className="text-white text-sm">{institution}</span>
                                            <span className="text-[#52525b] text-xs shrink-0">{period}</span>
                                        </div>
                                        <p className="text-[#71717a] text-xs">{degree}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </Section>

                        <Rule />

                        {/* certifications */}
                        <Section>
                            <Label>{T.sCerts}</Label>
                            <div className="flex flex-col">
                                {certifications.map((cert, i) => (
                                    <motion.div key={cert.name} variants={fadeUp} className="flex gap-3">
                                        {/* date */}
                                        <div className="shrink-0 w-18 text-right pt-0.5">
                                            <span className="text-[#52525b] text-[10px] font-mono">
                                                {cert.date ?? T.certNow}
                                            </span>
                                        </div>
                                        {/* dot + vertical line */}
                                        <div className="flex flex-col items-center shrink-0">
                                            <div className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${cert.status === 'progress' ? 'bg-[#22d3ee]' : 'bg-[#3f3f46]'
                                                }`} />
                                            {i < certifications.length - 1 && (
                                                <div className="w-px flex-1 bg-[#1c1c1f] mt-1 min-h-5" />
                                            )}
                                        </div>
                                        {/* content */}
                                        <div className={`flex flex-col gap-0.5 ${i < certifications.length - 1 ? 'pb-4' : ''}`}>
                                            {'href' in cert ? (
                                                <a
                                                    href={cert.href}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-[#a1a1aa] text-xs font-medium leading-snug hover:text-[#22d3ee] transition-colors"
                                                >
                                                    {cert.name}
                                                </a>
                                            ) : (
                                                <span className="text-[#a1a1aa] text-xs font-medium leading-snug">{cert.name}</span>
                                            )}
                                            <span className="text-[#52525b] text-[10px]">{cert.institution}</span>
                                            {cert.status === 'progress' && (
                                                <span className="text-[#22d3ee] text-[10px] uppercase tracking-widest opacity-80 mt-0.5">
                                                    {T.certStudying}
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </Section>

                        <Rule />

                        {/* projects */}
                        <Section>
                            <Label>{T.sProjects}</Label>
                            <div className="flex flex-col gap-8">
                                {T.projects.map((p) => (
                                    <motion.a
                                        key={p.name}
                                        variants={fadeUp}
                                        href={p.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex flex-col gap-1.5 pl-3 border-l border-[#18181b] hover:border-[#22d3ee] transition-colors"
                                    >
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="text-white text-sm group-hover:text-[#22d3ee] transition-colors font-medium">
                                                {p.name}
                                            </span>
                                            <span className="text-[#52525b] text-xs">/</span>
                                            <span className="text-[#71717a] text-xs">{p.subtitle}</span>
                                            <div className="ml-auto flex items-center gap-1.5 text-[#52525b] text-xs shrink-0">
                                                <span
                                                    className="inline-block w-2 h-2 rounded-full"
                                                    style={{ backgroundColor: langColors[p.lang] ?? '#555' }}
                                                />
                                                {p.lang}
                                            </div>
                                        </div>
                                        <p className="text-xs text-[#a1a1aa] leading-relaxed">{p.description}</p>
                                        <span className="text-[#52525b] text-xs group-hover:text-[#22d3ee] transition-colors">
                                            github.com/nickolss/{p.name} ↗
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </Section>

                        {/* footer */}
                        <div className="text-[#3f3f46] text-xs pt-4 border-t border-[#18181b]">
                            {T.footer}
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
}
