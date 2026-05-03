"use client"
import React from 'react'
import { Note } from '../../../lib/zkStorage'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function NoteViewer({ note, onEdit, onDelete, canManage }:
  { note: Note, onEdit: () => void, onDelete: () => void, canManage?: boolean }) {

  if (!note) return <div>Nota não encontrada</div>

  return (
    <div className="zk-viewer">
      <header>
        <h2>{note.title || 'Sem título'}</h2>
        <div className="zk-meta">
          Atualizado {new Date(note.updatedAt).toLocaleString()} · Referência <code>[[{note.slug}]]</code>
        </div>
      </header>

      <article className="zk-content-md zk-markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown>
      </article>

      {canManage && (
        <div className="zk-viewer-actions">
          <button onClick={onEdit}>Editar</button>
          <button onClick={onDelete}>Excluir</button>
        </div>
      )}
    </div>
  )
}
