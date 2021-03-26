import React, { useEffect, useRef } from 'react'

import VexFlow from 'vexflow'
const VF = VexFlow.Flow

const midi2code = (midi: number): [string, number] => {
  const c = midi % 12
  const d = midi / 12 | 0
  return [`${"ccddeffggaab"[c]}/${d - 1}`, [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0][c]]
}

const MyScore: React.FC<{ notes: number[] }> = props => {
  const refContainer = useRef(null);
  console.log(props.notes.slice(0, 4).map(midi2code))
  useEffect(() => {
    const renderer = new VF.Renderer(refContainer.current, VF.Renderer.Backends.SVG);
    renderer.resize(320, 200);
    const context = renderer.getContext()
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    // Create a stave of width 400 at position 10, 40 on the canvas.
    const stave = new VF.Stave(10, 10, 300);
    // Add a clef and time signature.
    stave
      .addClef("treble")
      .addTimeSignature("4/4")
      .setContext(context).draw()

    const notes = props.notes
      .map(midi2code)
      .map(([key, accidental]) => {
        const note = new VF.StaveNote({ clef: "treble", keys: [key], duration: "8" })
        return accidental === 0 ? note : note.addAccidental(0, new VF.Accidental("#"))
      })
    VF.Formatter.FormatAndDraw(context, stave, notes)

    const beam1 = new VF.Beam(notes.slice(0, 4))
    const beam2 = new VF.Beam(notes.slice(4, 8))
    beam1.setContext(context).draw()
    beam2.setContext(context).draw()
  })
  return (
    <div ref={refContainer}></div>
  )
}

export { MyScore }