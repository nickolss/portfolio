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
      if (!res.ok) throw new Error('Erro ao carregar notas')
      const data = (await res.json()) as Note[]
      setNotes(data)
      if (data.length > 0) {
        setSelectedId((prev) => prev ?? data[0].id)
      }
    } catch (err) {
      console.error(err)
      alert('Nao foi possivel carregar as notas no banco.')
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
      if (!res.ok) throw new Error('Erro ao criar nota')
      const n = (await res.json()) as Note
      setNotes(prev => [n, ...prev])
      setEditingId(n.id)
      setSelectedId(n.id)
    } catch (err) {
      console.error(err)
      alert('Nao foi possivel criar a nota.')
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
      if (!res.ok) throw new Error('Erro ao salvar nota')
      const saved = (await res.json()) as Note
      setNotes(prev => prev.map(n => n.id === saved.id ? saved : n))
      setEditingId(null)
      setSelectedId(saved.id)
    } catch (err) {
      console.error(err)
      alert('Nao foi possivel salvar a nota.')
    }
  }

  async function handleDelete(id: string) {
    if (!isAdmin) return
    if (!confirm('Excluir nota?')) return
    try {
      const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Erro ao excluir nota')
      setNotes(prev => prev.filter(n => n.id !== id))
      setSelectedId(null)
      setEditingId(null)
    } catch (err) {
      console.error(err)
      alert('Nao foi possivel excluir a nota.')
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
        if (!res.ok) throw new Error('Erro ao importar notas')
        await loadNotesFromApi()
        alert('Importado com sucesso')
      } catch {
        alert('Erro ao importar')
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
      alert('Defina NEXT_PUBLIC_NOTES_ADMIN_PASSWORD no ambiente para habilitar login de administrador.')
      return
    }
    const typed = prompt('Senha de administrador')
    if (typed && typed === configuredPassword) {
      sessionStorage.setItem('zk_admin_session', '1')
      setIsAdmin(true)
      alert('Modo administrador habilitado.')
      return
    }
    alert('Senha inválida.')
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
            <h1>Zettelkasten — Notas</h1>
            <p className="zk-subtitle">
              Crie notas atômicas, conecte conceitos com links internos e acompanhe a rede de conhecimento no grafo.
            </p>
          </div>

          <div className="zk-header-actions">
            <Link href="/" className="zk-link-pill">Home</Link>
            {isAdmin ? (
              <>
                <button onClick={handleCreate} className="zk-primary">Nova nota</button>
                <button onClick={handleExport} className="zk-secondary">Exportar JSON</button>
                <label className="zk-import zk-secondary">
                  Importar
                  <input
                    type="file"
                    accept="application/json"
                    onChange={(ev) => {
                      const files = (ev.target as HTMLInputElement).files
                      if (files) handleImport(files[0])
                    }}
                  />
                </label>
                <button onClick={handleAdminLogout} className="zk-secondary">Sair do admin</button>
              </>
            ) : (
              <button onClick={handleAdminLogin} className="zk-primary">Entrar como admin</button>
            )}
            <button onClick={() => setIsGraphOpen(prev => !prev)} className="zk-secondary">
              {isGraphOpen ? 'Ocultar grafo' : 'Abrir grafo'}
            </button>
          </div>
        </div>

        <div className="zk-hero-grid">
          <article className="zk-tutorial-card">
            <span className="zk-card-label">Como usar</span>
            <ol className="zk-steps">
              <li>1. Clique em “Nova nota” e escreva uma ideia única.</li>
              <li>2. Para criar um link, digite <strong>[[slug-da-outra-nota]]</strong>.</li>
              <li>3. Abra o grafo para ver as conexões entre as notas.</li>
            </ol>
          </article>

          <article className="zk-tutorial-card zk-tutorial-strong">
            <span className="zk-card-label">Dica prática</span>
            <p>
              Cada nota salva inclui um <strong>slug</strong> interno. Use esse slug dentro de <strong>[[ ]]</strong>
              para referenciar outra nota. Exemplo: <code>[[react-hooks]]</code>.
            </p>
            <p className="zk-tip-small">
              Markdown funciona no editor e no preview. Você pode fazer listas, código, links e títulos.
            </p>
          </article>

          <article className="zk-tutorial-card zk-tutorial-stats">
            <span className="zk-card-label">Status</span>
            <div className="zk-stats-row">
              <strong>{notes.length}</strong>
              <span>notas salvas</span>
            </div>
            <div className="zk-stats-row">
              <strong>{isAdmin ? 'Admin' : 'Leitura'}</strong>
              <span>modo atual</span>
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
              <h2>Carregando notas</h2>
              <p>Aguarde enquanto buscamos suas notas no banco.</p>
            </div>
          ) : isAdmin && editingId && activeNote ? (
            <NoteEditor note={activeNote} onSave={handleSave} onCancel={() => setEditingId(null)} />
          ) : selectedId && activeNote ? (
            <NoteViewer note={activeNote} onEdit={() => setEditingId(selectedId)} onDelete={() => handleDelete(selectedId!)} canManage={isAdmin} />
          ) : (
            <div className="zk-empty">
              <h2>Comece por uma nota pequena</h2>
              <p>Escreva um conceito, faça um link para outra nota com <strong>[[slug]]</strong> e veja a rede crescer.</p>
            </div>
          )}
        </section>
      </main>

      {isGraphOpen && (
        <section className="zk-panel zk-graph-section">
          <div className="zk-graph-header">
            <h2>Mapa de conexoes</h2>
            <p>Clique em um no para abrir a nota conectada.</p>
          </div>
          <GraphView notes={notes} onNodeClick={(id) => { setSelectedId(id); setEditingId(null); }} />
        </section>
      )}
    </div>
  )
}
