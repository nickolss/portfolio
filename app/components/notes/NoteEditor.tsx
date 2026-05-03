"use client"
import React, { useState } from 'react'
import { Note } from '../../../lib/zkStorage'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function NoteEditor({ note, onSave, onCancel }:
  { note: Note, onSave: (n: Note) => void, onCancel: () => void }) {

  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [viewMode, setViewMode] = useState<'write' | 'split' | 'preview'>('split')

  function save() {
    const updated = { ...note, title, content, updatedAt: Date.now() }
    onSave(updated)
  }

  return (
    <div className="zk-editor">
      <input className="zk-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" />
      <p className="zk-editor-hint">
        Para referenciar esta nota em outra, use <code>[[{note.slug}]]</code>. O preview do editor mostra o Markdown em tempo real.
      </p>
      <div className="zk-editor-modes">
        <button
          type="button"
          className={viewMode === 'write' ? 'active' : ''}
          onClick={() => setViewMode('write')}
        >
          Escrever
        </button>
        <button
          type="button"
          className={viewMode === 'split' ? 'active' : ''}
          onClick={() => setViewMode('split')}
        >
          Dividido
        </button>
        <button
          type="button"
          className={viewMode === 'preview' ? 'active' : ''}
          onClick={() => setViewMode('preview')}
        >
          Preview
        </button>
      </div>
      <div className="zk-editor-grid">
        {(viewMode === 'write' || viewMode === 'split') && (
          <textarea
            className={`zk-textarea ${viewMode === 'write' ? 'zk-editor-full' : ''}`}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="# Minha nota"
          />
        )}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`zk-preview zk-markdown ${viewMode === 'preview' ? 'zk-editor-full' : ''}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || '_Comece a escrever para ver o preview._'}</ReactMarkdown>
          </div>
        )}
      </div>

      <div className="zk-editor-actions">
        <button onClick={save}>Salvar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  )
}
