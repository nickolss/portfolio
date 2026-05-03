"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Note, normalizeImportedNotes, exportNotes } from '../../../lib/zkStorage'
import NotesList from './NotesList'
import NoteEditor from './NoteEditor'
import NoteViewer from './NoteViewer'
import GraphView from './GraphView'
import './notes.css'

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isGraphOpen, setIsGraphOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  async function loadNotesFromApi() {
    setIsLoading(true)
    try {
      const res = await fetch('/api/notes', { cache: 'no-store' })
      if (!res.ok) throw new Error('Failed to load notes')
      const data = (await res.json()) as Note[]
      setNotes(data)
      if (data.length > 0) {
        setSelectedId((prev) => prev ?? data[0].id)
      }
    } catch (err) {
      console.error(err)
      alert('Could not load notes from the database.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadNotesFromApi()
  }, [])

  useEffect(() => {
    try {
      setIsAdmin(sessionStorage.getItem('zk_admin_session') === '1')
    } catch {
      setIsAdmin(false)
    }
  }, [])

  async function handleCreate() {
    if (!isAdmin) return
    try {
      const res = await fetch('/api/notes', { method: 'POST' })
      if (!res.ok) throw new Error('Failed to create note')
      const n = (await res.json()) as Note
      setNotes(prev => [n, ...prev])
      setEditingId(n.id)
      setSelectedId(n.id)
    } catch (err) {
      console.error(err)
      alert('Could not create the note.')
    }
  }

  async function handleSave(updated: Note) {
    if (!isAdmin) return
    try {
      const res = await fetch(`/api/notes/${updated.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      if (!res.ok) throw new Error('Failed to save note')
      const saved = (await res.json()) as Note
      setNotes(prev => prev.map(n => n.id === saved.id ? saved : n))
      setEditingId(null)
      setSelectedId(saved.id)
    } catch (err) {
      console.error(err)
      alert('Could not save the note.')
    }
  }

  async function handleDelete(id: string) {
    if (!isAdmin) return
    if (!confirm('Delete note?')) return
    try {
      const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete note')
      setNotes(prev => prev.filter(n => n.id !== id))
      setSelectedId(null)
      setEditingId(null)
    } catch (err) {
      console.error(err)
      alert('Could not delete the note.')
    }
  }

  function handleImport(file: File) {
    if (!isAdmin) return
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        const normalized = normalizeImportedNotes(parsed)
        const res = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notes: normalized }),
        })
        if (!res.ok) throw new Error('Failed to import notes')
        await loadNotesFromApi()
        alert('Imported successfully')
      } catch {
        alert('Import failed')
      }
    }
    reader.readAsText(file)
  }

  function handleExport() {
    if (!isAdmin) return
    exportNotes(notes)
  }

  function handleAdminLogin() {
    const configuredPassword = process.env.NEXT_PUBLIC_NOTES_ADMIN_PASSWORD
    if (!configuredPassword) {
      alert('Set NEXT_PUBLIC_NOTES_ADMIN_PASSWORD in your environment to enable admin login.')
      return
    }
    const typed = prompt('Admin password')
    if (typed && typed === configuredPassword) {
      sessionStorage.setItem('zk_admin_session', '1')
      setIsAdmin(true)
      alert('Admin mode enabled.')
      return
    }
    alert('Invalid password.')
  }

  function handleAdminLogout() {
    sessionStorage.removeItem('zk_admin_session')
    setIsAdmin(false)
    setEditingId(null)
  }

  const activeNote = editingId
    ? notes.find((note) => note.id === editingId)
    : selectedId
      ? notes.find((note) => note.id === selectedId)
      : null

  return (
    <div className="zk-root">
      <header className="zk-hero">
        <div className="zk-hero-top">
          <div>
            <p className="zk-eyebrow">Knowledge network</p>
            <h1>Zettelkasten — Notes</h1>
            <p className="zk-subtitle">
              Create atomic notes, connect concepts with internal links, and explore your knowledge network in the graph.
            </p>
          </div>

          <div className="zk-header-actions">
            <Link href="/" className="zk-link-pill">Home</Link>
            {isAdmin ? (
              <>
                <button onClick={handleCreate} className="zk-primary">New note</button>
                <button onClick={handleExport} className="zk-secondary">Export JSON</button>
                <label className="zk-import zk-secondary">
                  Import
                  <input
                    type="file"
                    accept="application/json"
                    onChange={(ev) => {
                      const files = (ev.target as HTMLInputElement).files
                      if (files) handleImport(files[0])
                    }}
                  />
                </label>
                <button onClick={handleAdminLogout} className="zk-secondary">Exit admin</button>
              </>
            ) : (
              <button onClick={handleAdminLogin} className="zk-primary">Login as admin</button>
            )}
            <button onClick={() => setIsGraphOpen(prev => !prev)} className="zk-secondary">
              {isGraphOpen ? 'Hide graph' : 'Show graph'}
            </button>
          </div>
        </div>

        <div className="zk-hero-grid">
          <article className="zk-tutorial-card">
            <span className="zk-card-label">How to use</span>
            <ol className="zk-steps">
              <li>1. Click “New note” and write one atomic idea.</li>
              <li>2. To link notes, type <strong>[[other-note-slug]]</strong>.</li>
              <li>3. Open the graph to see connections between notes.</li>
            </ol>
          </article>

          <article className="zk-tutorial-card zk-tutorial-strong">
            <span className="zk-card-label">Practical tip</span>
            <p>
              Every saved note includes an internal <strong>slug</strong>. Use this slug inside <strong>[[ ]]</strong>
              to reference another note. Example: <code>[[react-hooks]]</code>.
            </p>
            <p className="zk-tip-small">
              Markdown works in both editor and preview. You can write lists, code blocks, links, and headings.
            </p>
          </article>

          <article className="zk-tutorial-card zk-tutorial-stats">
            <span className="zk-card-label">Status</span>
            <div className="zk-stats-row">
              <strong>{notes.length}</strong>
              <span>saved notes</span>
            </div>
            <div className="zk-stats-row">
              <strong>{isAdmin ? 'Admin' : 'Read-only'}</strong>
              <span>current mode</span>
            </div>
          </article>
        </div>
      </header>

      <main className="zk-main">
        <aside className="zk-panel zk-aside">
          <NotesList notes={notes} onSelect={setSelectedId} onEdit={setEditingId} onDelete={handleDelete} selectedId={selectedId} canManage={isAdmin} />
        </aside>

        <section className="zk-panel zk-content">
          {isLoading ? (
            <div className="zk-empty">
              <h2>Loading notes</h2>
              <p>Please wait while we fetch your notes from the database.</p>
            </div>
          ) : isAdmin && editingId && activeNote ? (
            <NoteEditor note={activeNote} onSave={handleSave} onCancel={() => setEditingId(null)} />
          ) : selectedId && activeNote ? (
            <NoteViewer note={activeNote} onEdit={() => setEditingId(selectedId)} onDelete={() => handleDelete(selectedId!)} canManage={isAdmin} />
          ) : (
            <div className="zk-empty">
              <h2>Start with a small note</h2>
              <p>Write one concept, link to another note with <strong>[[slug]]</strong>, and watch your graph grow.</p>
            </div>
          )}
        </section>
      </main>

      {isGraphOpen && (
        <section className="zk-panel zk-graph-section">
          <div className="zk-graph-header">
            <h2>Connection map</h2>
            <p>Click a node to open the connected note.</p>
          </div>
          <GraphView notes={notes} onNodeClick={(id) => { setSelectedId(id); setEditingId(null); }} />
        </section>
      )}
    </div>
  )
}
