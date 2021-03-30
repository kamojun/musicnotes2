import React, { useState, useEffect } from 'react'
import { MyScore } from './score'
import { Timer } from './timer'
import { ShowPosition } from './showPosition'
import { Keyboard } from './keyboard'
import dosound from '../assets/media/do.mp3'
import resound from '../assets/media/re.mp3'
import misound from '../assets/media/mi.mp3'
import fasound from '../assets/media/fa.mp3'
import sosound from '../assets/media/so.mp3'
import rasound from '../assets/media/ra.mp3'
import sisound from '../assets/media/si.mp3'

const problems = [
  [0, 1, 2, 3, 4, 3, 2, 1],
  [0, 2, 3, 4, 5, 4, 3, 2],  // キー上で最低音0 = baseから何番目か
  [5, 3, 2, 1, 0, 1, 2, 3],
  [0, 2, 5, 4, 3, 4, 3, 2],
  [5, 2, 0, 1, 2, 1, 2, 3],
  [0, 2, 5, 4, 3, 2, 3, 4],
  [5, 2, 0, 1, 2, 3, 2, 1],
  [0, 1, 0, 2, 5, 4, 3, 2],
  [5, 4, 5, 2, 0, 1, 2, 3],
]

const baseRange = { min: -10, max: 10 }

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
  const [soundOn, setSound] = useState(false)
  const [notes, setNotes] = useState(problems[getRandomInt(0, problems.length)])
  // const [base, setBase] = useState(getRandomInt(baseRange.min, baseRange.max))
  const [base, setBase] = useState(0)
  const [position, setPosition] = useState(0)
  const audios = {
    sound0: new Audio(dosound),
    sound2: new Audio(resound),
    sound4: new Audio(misound),
    sound5: new Audio(fasound),
    sound7: new Audio(sosound),
    sound9: new Audio(rasound),
    sound11: new Audio(sisound),
  }
  const onClick = e => {
    if (+e.target.dataset.midi === getMidi("C", base, notes[position])) {
      if (soundOn) {
        const sound = audios[`sound${e.target.dataset.midi}`]
        sound.position = 0
        sound.play()
      }
      if (position + 1 === notes.length) {
        setPosition(0)
        setNotes(problems[getRandomInt(0, problems.length)])
        // setBase(getRandomInt(baseRange.min, baseRange.max))
        setBase(0)
      } else {
        setPosition(position + 1)
      }
    }
  }
  return <>
    <h1>ランダムハノン</h1>
    <Timer></Timer>
    <label><input type="checkbox" onChange={() => setSound(!soundOn)} checked={soundOn}></input>ピアノの音あり</label>
    <ShowPosition pos={position}></ShowPosition>
    <MyScore _key="C" base={base} notes={notes}></MyScore>
    <Keyboard onClick={onClick}></Keyboard>
  </>
}

export { App }