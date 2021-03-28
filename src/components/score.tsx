import React, { useState, useEffect, useRef } from 'react'

import VexFlow from 'vexflow'
const VF = VexFlow.Flow

// もうちょっと綺麗にできそう
const getCode = (key: string, base: number) => (sound: number) => {
  if (key === "C") {
    const basePosition = (base + 70) % 7  // +70は負の数への対応
    const keys = "cdefgabcdefga".slice(basePosition, basePosition + 7)
    const octave = ((base + sound + 28) / 7 | 0) // +28は国際オクターブ表記への対応
    return [`${keys[sound]}/${octave}`, 0]
  } else {
    throw Error('key other than C is unimplemented')
  }
}

const MyScore: React.FC<{ _key: string, base: number, notes: number[] }> = props => {
  const refContainer = useRef(null);
  const clef = ((props.base + 2 + 28) / 7 | 0) < 4 ? "bass" : "treble"  // 一番下がA3くらいまでト音記号
  useEffect(() => {
    const renderer = new VF.Renderer(refContainer.current, VF.Renderer.Backends.SVG);
    renderer.resize(320, 110);
    const context = renderer.getContext()
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    // Create a stave of width 400 at position 10, 40 on the canvas.
    const stave = new VF.Stave(10, 0, 300);
    // Add a clef and time signature.
    stave
      .addClef(clef)
      .addTimeSignature("2/2")
      .setContext(context).draw()

    const notes = props.notes
      .map(getCode(props._key, props.base))
      .map(([key, accidental]) => {
        const note = new VF.StaveNote({ clef, keys: [key], duration: "8" })
        return accidental === 0 ? note : note.addAccidental(0, new VF.Accidental("#"))
      })
    const beams = VF.Beam.generateBeams(notes, {
      groups: [new VF.Fraction(4, 8), new VF.Fraction(4, 8)]
    })
    VF.Formatter.FormatAndDraw(context, stave, notes)
    for (const beam of beams) {
      beam.setContext(context).draw()
    }
    return () => { refContainer.current.innerHTML = '' }  // 毎回なぜか追加されていくので、unmount時に中身を消す
  })
  return (
    <div ref={refContainer}></div>
  )
}

export { MyScore }