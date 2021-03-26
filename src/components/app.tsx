import React, { useState } from 'react'
import { MyScore } from './score'
import { Timer } from './timer'

const App = () => {
  const [time, setTime] = useState(0)

  return (<>
    <h1>hello world</h1>
    <Timer></Timer>
    <MyScore notes={[60, 61, 62, 63, 64, 65, 66, 67]}></MyScore>
  </>)
}

export { App }