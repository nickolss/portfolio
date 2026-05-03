"use client"
import { Note } from '../../../lib/zkStorage'

export default function NotesList({ notes, onSelect, onEdit, onDelete, selectedId, canManage }:
  {
    notes: Note[],
    onSelect: (id: string) => void,
    onEdit: (id: string) => void,
    onDelete: (id: string) => void,
    selectedId?: string | null,
    canManage?: boolean
  }) {

  return (
    <div className="zk-list">
      <input placeholder="Search..." className="zk-search" onChange={() => { /* small enhancement later */ }} />
      <ul>
        {notes.map(n => (
          <li key={n.id} className={n.id === selectedId ? 'selected' : ''}>
            <div className="zk-note-item" onClick={() => onSelect(n.id)}>
              <strong>{n.title || 'Untitled'}</strong>
              <div className="zk-meta">{new Date(n.updatedAt).toLocaleString()}</div>
            </div>
            {canManage && (
              <div className="zk-note-actions">
                <button onClick={() => onEdit(n.id)}>✎</button>
                <button onClick={() => onDelete(n.id)}>🗑</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
