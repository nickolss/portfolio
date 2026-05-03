export type Note = {
    id: string
    title: string
    slug: string
    content: string
    createdAt: number
    updatedAt: number
}

const STORAGE_KEY = 'zk_notes_v1'

function uid() {
    return Math.random().toString(36).slice(2, 9)
}

export function slugify(title: string) {
    return (title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || uid()
}

export function loadNotes(): Note[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return []
        return JSON.parse(raw) as Note[]
    } catch (e) {
        console.error('loadNotes', e)
        return []
    }
}

export function saveNotes(notes: Note[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export function createNote(): Note {
    const now = Date.now()
    const n: Note = { id: uid(), title: '', slug: uid(), content: '', createdAt: now, updatedAt: now }
    const notes = loadNotes()
    notes.unshift(n)
    saveNotes(notes)
    return n
}

export function updateNote(n: Note) {
    const notes = loadNotes().map(x => x.id === n.id ? n : x)
    saveNotes(notes)
}

export function deleteNote(id: string) {
    const notes = loadNotes().filter(n => n.id !== id)
    saveNotes(notes)
}

export function importNotes(parsed: unknown) {
    if (!Array.isArray(parsed)) throw new Error('Invalid')
    type Raw = Record<string, unknown>
    const arr = parsed as Raw[]
    const normalized = arr.map((p) => {
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
    saveNotes(normalized)
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
