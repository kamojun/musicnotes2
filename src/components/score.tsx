import React, { useState, useEffect, useRef } from 'react'

import VexFlow from 'vexflow'
const VF = VexFlow.Flow

const midi2code = (midi: number): [string, number] => {
  const c = midi % 12
  const d = midi / 12 | 0
  return [`${"ccddeffggaab"[c]}/${d - 1}`, [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0][c]]
}

// もうちょっと綺麗にできそう
const getCode = (key: string, base: number) => (sound: number) => {
  if (key === "C") {
    const basePosition = base % 7
    const keys = "cdefgabcdefga".slice(basePosition, basePosition + 7)
    const octave = ((base + sound) / 7 | 0) + 4
    return [`${keys[sound]}/${octave}`, 0]
  } else {
    throw Error('key other than C is unimplemented')
  }
}

const MyScore: React.FC<{ _key: string, base: number, notes: number[] }> = props => {
  const refContainer = useRef(null);
  useEffect(() => {
    const renderer = new VF.Renderer(refContainer.current, VF.Renderer.Backends.SVG);
    renderer.resize(320, 100);
    const context = renderer.getContext()
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    // Create a stave of width 400 at position 10, 40 on the canvas.
    const stave = new VF.Stave(10, 0, 300);
    // Add a clef and time signature.
    stave
      .addClef("treble")
      .addTimeSignature("4/4")
      .setContext(context).draw()

    const notes = props.notes
      .map(getCode(props._key, props.base))
      .map(([key, accidental]) => {
        const note = new VF.StaveNote({ clef: "treble", keys: [key], duration: "8" })
        return accidental === 0 ? note : note.addAccidental(0, new VF.Accidental("#"))
      })

    const beam1 = new VF.Beam(notes.slice(0, 4))
    const beam2 = new VF.Beam(notes.slice(4, 8))
    VF.Formatter.FormatAndDraw(context, stave, notes)
    beam1.setContext(context).draw()
    beam2.setContext(context).draw()
    return () => { refContainer.current.innerHTML = '' }  // 毎回なぜか追加されていくので、unmount時に中身を消す
  })
  return (
    <div ref={refContainer}></div>
  )
}

export { MyScore }