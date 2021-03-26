import React, { useState, useEffect } from 'react'
import { MyScore } from './score'
import { Timer } from './timer'
import { ShowPosition } from './showPosition'
import { KeyboardContainer } from './keyboard'
import { useRootContext } from '../context'

const App = () => {
  const [time, setTime] = useState(0)
  const { state } = useRootContext()
  return <>
    <h1>ランダムハノン!</h1>
    <Timer></Timer>
    <ShowPosition pos={state.position}></ShowPosition>
    <MyScore notes={state.problem}></MyScore>
    <KeyboardContainer></KeyboardContainer>
  </>
}

export { App }