import React, { useState, useEffect } from 'react'
import { MyScore } from './score'
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

const problemNum = 5;

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

const chooseRandom = <T,>(arr: T[]): T => arr[getRandomInt(0, arr.length)]

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

const defaultState = {
  timerOn: false,
  startTime: null,
  problemCount: 0,
  message: "譜面をタップしてスタート",
  soundOn: false,
  showSound: false,
  notes: [],
  base: 0,
  position: 0,
}

const App = () => {
  const [state, setState] = useState(defaultState)
  useEffect(() => {
    (async () => {
      mp3s.sound0 = await loadSound(sound0)
      mp3s.sound2 = await loadSound(sound2)
      mp3s.sound4 = await loadSound(sound4)
      mp3s.sound5 = await loadSound(sound5)
      mp3s.sound7 = await loadSound(sound7)
      mp3s.sound9 = await loadSound(sound9)
      mp3s.sound11 = await loadSound(sound11)
    })().then(() => setState({ ...state, showSound: true }))  // 音が正しくロードされた時だけ、効果音機能出現
  }, [])
  const onNotesClick = () => {
    if (!state.timerOn) {
      setState({
        ...state,
        timerOn: true,
        problemCount: 1,
        message: `1/${problemNum}`,
        startTime: Date.now(),
        notes: chooseRandom(problems)
      })
    }
  }
  const onClick = e => {
    if (+e.target.dataset.midi === getMidi("C", state.base, state.notes[state.position])) {
      if (state.base === 0 && state.soundOn) {
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
      if (state.position + 1 === state.notes.length) {
        setState({
          ...state,
          position: 0,
          problemCount: state.problemCount + 1,
          message: `${state.problemCount + 1}/${problemNum}`,
          notes: chooseRandom(problems),
          base: getRandomInt(baseRange.min, baseRange.max)
        })
        if (state.problemCount === problemNum) {
          setState({
            ...state,
            message: `記録 : ${(Date.now() - state.startTime) / 1000}\n譜面をタップしてスタート`,
            timerOn: false,
            notes: []
          })
        }
      } else {
        setState({
          ...state,
          position: state.position + 1
        })
      }
    }
  }
  return <>
    <h1>ランダムハノン</h1>
    {state.message.split('\n').map(line => <p>{line}</p>)}
    {state.showSound && <label><input type="checkbox" onChange={() => {
      setState({ ...state, soundOn: !state.soundOn })
    }} checked={state.soundOn}></input>ピアノの音あり</label>}
    <ShowPosition pos={state.position}></ShowPosition>
    <MyScore _key="C" base={state.base} notes={state.notes} onClick={onNotesClick}></MyScore>
    <Keyboard onClick={onClick}></Keyboard>
  </>
}

export { App }