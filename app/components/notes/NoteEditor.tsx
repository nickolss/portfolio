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
      <input className="zk-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <p className="zk-editor-hint">
        To reference this note elsewhere, use <code>[[{note.slug}]]</code>. The editor preview renders Markdown in real time.
      </p>
      <div className="zk-editor-modes">
        <button
          type="button"
          className={viewMode === 'write' ? 'active' : ''}
          onClick={() => setViewMode('write')}
        >
          Write
        </button>
        <button
          type="button"
          className={viewMode === 'split' ? 'active' : ''}
          onClick={() => setViewMode('split')}
        >
          Split
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
            placeholder="# My note"
          />
        )}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`zk-preview zk-markdown ${viewMode === 'preview' ? 'zk-editor-full' : ''}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || '_Start writing to see the preview._'}</ReactMarkdown>
          </div>
        )}
      </div>

      <div className="zk-editor-actions">
        <button onClick={save}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}
