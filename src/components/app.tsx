import React, { useState, useEffect } from 'react'
import { MyScore } from './score'
import { Timer } from './timer'
import { ShowPosition } from './showPosition'
import { Keyboard } from './keyboard'

const problems = [
  [0, 2, 3, 4, 5, 4, 3, 2],  // キー上で最低音0 = baseから何番目か
  [5, 3, 2, 1, 0, 1, 2, 3],
  [0, 2, 5, 4, 3, 4, 3, 2],
  [5, 2, 0, 1, 2, 1, 2, 3],
  [0, 2, 5, 4, 3, 2, 3, 4],
  [5, 2, 0, 1, 2, 3, 2, 1],
  [0, 1, 0, 2, 5, 4, 3, 2],
  [5, 4, 5, 2, 0, 1, 2, 3],
]

const baseRange = { min: -10, max: 7 }

// baseは、C4~B4までをキーに応じてゼロとし、音階上の音数で数える
const getMidi = (key: string, base: number, sound: number): number => {
  // キーはCのみ対応
  return [0, 2, 4, 5, 7, 9, 11][(base + sound + 70) % 7]  // 長調だったらこの配列でok
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const App = () => {
  const [time, setTime] = useState(0)
  const [notes, setNotes] = useState(problems[getRandomInt(0, problems.length)])
  const [base, setBase] = useState(getRandomInt(baseRange.min, baseRange.max))
  // const [base, setBase] = useState(-2)
  const [position, setPosition] = useState(0)
  const onClick = e => {
    if (+e.target.dataset.midi === getMidi("C", base, notes[position])) {
      if (position + 1 === notes.length) {
        setPosition(0)
        setNotes(problems[getRandomInt(0, problems.length)])
        setBase(getRandomInt(baseRange.min, baseRange.max))
      } else {
        setPosition(position + 1)
      }
    }
  }
  return <>
    <h1>ランダムハノン</h1>
    <Timer></Timer>
    <ShowPosition pos={position}></ShowPosition>
    <MyScore _key="C" base={base} notes={notes}></MyScore>
    <Keyboard onClick={onClick}></Keyboard>
  </>
}

export { App }