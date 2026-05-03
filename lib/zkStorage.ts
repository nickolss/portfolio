export type Note = {
    id: string
    title: string
    slug: string
    content: string
    createdAt: number
    updatedAt: number
}

export function uid() {
    return Math.random().toString(36).slice(2, 9)
}

export function slugify(title: string) {
    return (title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || uid()
}

export function normalizeImportedNotes(parsed: unknown): Note[] {
    if (!Array.isArray(parsed)) throw new Error('Invalid')
    type Raw = Record<string, unknown>
    const arr = parsed as Raw[]
    return arr.map((p) => {
        const title = typeof p.title === 'string' ? p.title : ''
        return {
            id: typeof p.id === 'string' ? p.id : uid(),
            title,
            slug: typeof p.slug === 'string' ? p.slug : slugify(title),
            content: typeof p.content === 'string' ? p.content : '',
            createdAt: typeof p.createdAt === 'number' ? p.createdAt : Date.now(),
            updatedAt: typeof p.updatedAt === 'number' ? p.updatedAt : Date.now(),
        }
    })
}

export function exportNotes(notes: Note[]) {
    const blob = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'zk-notes.json'
    a.click()
    URL.revokeObjectURL(url)
}
