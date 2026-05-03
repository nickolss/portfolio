import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { slugify, uid, type Note } from '../../../lib/zkStorage'

type NoteRow = {
  id: string
  title: string
  slug: string
  content: string
  created_at: string
  updated_at: string
}

function mapRowToNote(row: NoteRow): Note {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    content: row.content,
    createdAt: new Date(row.created_at).getTime(),
    updatedAt: new Date(row.updated_at).getTime(),
  }
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('zk_notes')
    .select('id,title,slug,content,created_at,updated_at')
    .order('updated_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json((data as NoteRow[]).map(mapRowToNote))
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))

  // Import mode: replace all notes with provided payload.
  if (Array.isArray(body?.notes)) {
    const notes = body.notes as Note[]
    const rows = notes.map((n) => ({
      id: n.id || crypto.randomUUID(),
      title: n.title || '',
      slug: n.slug || slugify(n.title || ''),
      content: n.content || '',
      created_at: new Date(n.createdAt || Date.now()).toISOString(),
      updated_at: new Date(n.updatedAt || Date.now()).toISOString(),
    }))

    const { error: deleteError } = await supabaseAdmin.from('zk_notes').delete().neq('id', '')
    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    if (rows.length > 0) {
      const { error: insertError } = await supabaseAdmin.from('zk_notes').insert(rows)
      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 })
      }
    }

    return NextResponse.json({ ok: true })
  }

  const now = new Date().toISOString()
  const id = crypto.randomUUID()
  const slug = uid()

  const { data, error } = await supabaseAdmin
    .from('zk_notes')
    .insert({
      id,
      title: '',
      slug,
      content: '',
      created_at: now,
      updated_at: now,
    })
    .select('id,title,slug,content,created_at,updated_at')
    .single()

  if (error || !data) {
    return NextResponse.json({ error: error?.message || 'Failed to create note' }, { status: 500 })
  }

  return NextResponse.json(mapRowToNote(data as NoteRow), { status: 201 })
}
