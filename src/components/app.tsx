import React, { useState, useEffect } from 'react'
import { MyScore } from './score'
import { Timer } from './timer'
import { ShowPosition } from './showPosition'
import { Keyboard } from './keyboard'
import sound0 from '../assets/media/do.mp3'
import sound2 from '../assets/media/re.mp3'
import sound4 from '../assets/media/mi.mp3'
import sound5 from '../assets/media/fa.mp3'
import sound7 from '../assets/media/so.mp3'
import sound9 from '../assets/media/ra.mp3'
import sound11 from '../assets/media/si.mp3'

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

const audios = {
  sound0,
  sound2,
  sound4,
  sound5,
  sound7,
  sound9,
  sound11,
}

const ctx = new AudioContext()
async function loadSound(sound: "*.mp3") {
  const response = await fetch(sound);
  const arrayBuffer = await response.arrayBuffer();
  // Web Audio APIで使える形式に変換
  const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
  return audioBuffer;
}
const mp3s = {
  sound0: null,
  sound2: null,
  sound4: null,
  sound5: null,
  sound7: null,
  sound9: null,
  sound11: null,
}


const App = () => {
  const [time, setTime] = useState(0)
  const [showSound, setShowSound] = useState(false)
  const [soundOn, setSound] = useState(false)
  const [notes, setNotes] = useState(problems[getRandomInt(0, problems.length)])
  // const [base, setBase] = useState(getRandomInt(baseRange.min, baseRange.max))
  const [base, setBase] = useState(0)
  const [position, setPosition] = useState(0)
  useEffect(() => {
    (async () => {
      mp3s.sound0 = await loadSound(audios.sound0)
      mp3s.sound2 = await loadSound(audios.sound2)
      mp3s.sound4 = await loadSound(audios.sound4)
      mp3s.sound5 = await loadSound(audios.sound5)
      mp3s.sound7 = await loadSound(audios.sound7)
      mp3s.sound9 = await loadSound(audios.sound9)
      mp3s.sound11 = await loadSound(audios.sound11)
    })().then(() => setShowSound(true))  // 音が正しくロードされた時だけ、効果音機能出現
  }, [])
  const onClick = e => {
    if (+e.target.dataset.midi === getMidi("C", base, notes[position])) {
      if (base === 0 && soundOn) {
        ctx.resume()
        const source = ctx.createBufferSource();
        source.buffer = mp3s[`sound${e.target.dataset.midi}`]
        const gainNode = ctx.createGain()
        source.connect(gainNode)
        gainNode.connect(ctx.destination);
        gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5)
        source.start()
      }
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
    {showSound && <label><input type="checkbox" onChange={() => {
      setSound(!soundOn)
    }} checked={soundOn}></input>ピアノの音あり</label>}
    <ShowPosition pos={position}></ShowPosition>
    <MyScore _key="C" base={base} notes={notes}></MyScore>
    <Keyboard onClick={onClick}></Keyboard>
  </>
}

export { App }