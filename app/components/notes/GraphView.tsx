"use client"
import { useEffect, useRef } from 'react'
import type { Note } from '../../../lib/zkStorage'

export default function GraphView({ notes, onNodeClick }:
    { notes: Note[], onNodeClick: (id: string) => void }) {

    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

            ; (async () => {
                try {
                    const visModule = await import('vis-network/standalone')
                    type VisModule = {
                        DataSet?: { new(items?: unknown): unknown }
                        Network?: { new(container: HTMLElement, data: unknown, options?: unknown): { on: (event: string, cb: (params: unknown) => void) => void } }
                        default?: {
                            DataSet?: { new(items?: unknown): unknown }
                            Network?: { new(container: HTMLElement, data: unknown, options?: unknown): { on: (event: string, cb: (params: unknown) => void) => void } }
                        }
                    }
                    const vm = visModule as unknown as VisModule
                    const DataSet = vm.DataSet || vm.default?.DataSet
                    const NetworkCtor = vm.Network || vm.default?.Network

                    if (!DataSet || !NetworkCtor) {
                        console.warn('vis-network did not export expected symbols; skipping graph')
                        return
                    }

                    type NodeItem = { id: string; label: string; title: string }
                    type EdgeItem = { from: string; to: string }

                    const nodes: NodeItem[] = notes.map(n => ({ id: n.id, label: n.title || n.slug, title: n.title || n.slug }))

                    const slugMap: Record<string, string> = {}
                    notes.forEach(n => { slugMap[n.slug] = n.id })

                    const edges: EdgeItem[] = []
                    notes.forEach(n => {
                        const re = /\[\[([\w-]+)\]\]/g
                        let m: RegExpExecArray | null
                        while ((m = re.exec(n.content)) !== null) {
                            const targetSlug = m[1]
                            const targetId = slugMap[targetSlug]
                            if (targetId) edges.push({ from: n.id, to: targetId })
                        }
                    })

                    const data = { nodes: new DataSet(nodes), edges: new DataSet(edges) }
                    const options = { nodes: { shape: 'dot', size: 10 }, edges: { arrows: 'to' }, physics: { stabilization: true } }
                    const network = new NetworkCtor(container, data, options)

                    network.on('click', (params: { nodes?: string[] }) => {
                        if (params.nodes && params.nodes.length) onNodeClick(params.nodes[0])
                    })
                } catch (err) {
                    console.error('Error loading vis-network', err)
                }
            })()

        return () => { if (container) container.innerHTML = '' }
    }, [notes, onNodeClick])

    return <div className="zk-graph-canvas" ref={containerRef} />
}
