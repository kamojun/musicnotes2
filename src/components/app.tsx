import React, { useState } from 'react'
import { MyScore } from './score'
import { Timer } from './timer'
import { KeyboardContainer } from './keyboard'
import { useRootContext } from '../context'

const App = () => {
  const [time, setTime] = useState(0)
  const { state } = useRootContext()
  return <>
    <h1>ランダムハノン!</h1>
    <Timer></Timer>
    <MyScore notes={state.problem}></MyScore>
    <KeyboardContainer></KeyboardContainer>
  </>
}

export { App }