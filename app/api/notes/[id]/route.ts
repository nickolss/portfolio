import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'
import { slugify, type Note } from '../../../../lib/zkStorage'

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

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = (await request.json()) as Note

  const nextTitle = body.title || ''
  const nextSlug = body.slug || slugify(nextTitle)

  const { data, error } = await supabaseAdmin
    .from('zk_notes')
    .update({
      title: nextTitle,
      slug: nextSlug,
      content: body.content || '',
      updated_at: new Date(body.updatedAt || Date.now()).toISOString(),
    })
    .eq('id', id)
    .select('id,title,slug,content,created_at,updated_at')
    .single()

  if (error || !data) {
    return NextResponse.json({ error: error?.message || 'Failed to update note' }, { status: 500 })
  }

  return NextResponse.json(mapRowToNote(data as NoteRow))
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { error } = await supabaseAdmin.from('zk_notes').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
