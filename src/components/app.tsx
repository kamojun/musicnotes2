import React, { useState, useEffect } from 'react'
import { MyScore } from './score'
import { Timer } from './timer'
import { ShowPosition } from './showPosition'
import { Keyboard } from './keyboard'

const problems = [
  [60, 62, 64, 65, 67, 65, 64, 62],
]

const App = () => {
  const [time, setTime] = useState(0)
  const [notes, setNotes] = useState(problems[0])
  const [position, setPosition] = useState(0)
  const onClick = e => {
    if (+e.target.dataset.midi === notes[position] % 12) {
      if (position + 1 === notes.length) {
        setPosition(0)
      } else {
        setPosition(position + 1)
      }
    }
  }
  return <>
    <h1>ランダムハノン!</h1>
    <Timer></Timer>
    <ShowPosition pos={position}></ShowPosition>
    <MyScore notes={notes}></MyScore>
    <Keyboard onClick={onClick}></Keyboard>
  </>
}

export { App }