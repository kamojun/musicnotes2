import React, { useEffect, useRef } from 'react'

import VexFlow from 'vexflow'
const { Formatter, Renderer, Stave, StaveNote } = VexFlow.Flow

const MyScore = () => {
  const refContainer = useRef(null);
  useEffect(() => {
    const renderer = new Renderer(refContainer.current, Renderer.Backends.SVG);
    renderer.resize(500, 500);
    const context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    // Create a stave of width 400 at position 10, 40 on the canvas.
    const stave = new Stave(10, 40, 400);

    // Add a clef and time signature.
    stave.addClef("treble").addTimeSignature("4/4");

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();
  })
  return (
    <div ref={refContainer}></div>
  )
}

export { MyScore }