"use client"
import React from 'react'
import { Note } from '../../../lib/zkStorage'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function NoteViewer({ note, onEdit, onDelete, canManage }:
  { note: Note, onEdit: () => void, onDelete: () => void, canManage?: boolean }) {

  if (!note) return <div>Note not found</div>

  return (
    <div className="zk-viewer">
      <header>
        <h2>{note.title || 'Untitled'}</h2>
        <div className="zk-meta">
          Updated {new Date(note.updatedAt).toLocaleString()} · Reference <code>[[{note.slug}]]</code>
        </div>
      </header>

      <article className="zk-content-md zk-markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown>
      </article>

      {canManage && (
        <div className="zk-viewer-actions">
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      )}
    </div>
  )
}
