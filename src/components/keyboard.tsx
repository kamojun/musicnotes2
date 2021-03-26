import React from 'react'
import { Keys, reducer, useRootContext } from '../context'
import styled from 'styled-components'

const Rect = styled.rect`
  &:hover {
    fill: red;
    opacity: 0.5;
  }
`

type KeyColor = 0 | 1
const KeyColors: KeyColor[] = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0]
const KeyPosition: number[] = [0, 0.6, 1, 1.6, 2, 3, 3.6, 4, 4.6, 5, 5.6, 6]
const DrawingOrder = [0, 2, 4, 5, 7, 9, 11, 1, 3, 6, 8, 10]

// クリックされた時に何をするかは知らないキーボード
const Keyboard = ({ onClick }) => {
  const keyWidth = 12
  const keyHeight = 40
  const sizes = [
    {
      width: 12,
      height: 40,
    }, {
      width: 8,
      height: 26,
    },
  ]
  const scale = 3
  const keysize = {
    width: keyWidth * 7 * scale,
    height: keyHeight * scale,
  }
  return <div style={{ display: "inline-block", width: "100%", margin: 30 }}>
    <svg {...keysize}>
      <g transform={`scale(${scale}, ${scale})`}>
        {DrawingOrder.map((key, i) => {
          const color = KeyColors[key]
          return <PianoKey
            key={i}
            midi={key}
            x={KeyPosition[key] * keyWidth}
            color={color === 0 ? 'white' : 'black'}
            width={sizes[color].width}
            height={sizes[color].height}
            onClick={onClick}
          ></PianoKey>
        })}
      </g>
    </svg>
  </div>
}

// 白、または黒の腱板
const PianoKey = (props) => {
  const { midi, color, ...others } = props;
  return <g>
    {/* 黒鍵をおくときに、下に白い長方形を置いて、透かしても下の白鍵の境界が見えないようにする。 */}
    {color !== "black" ? null : <rect
      {...others}
      y="0" fill='white'
    />}
    <Rect
      {...others}
      className="pianokey"
      data-midi={midi}
      y="0" fill={color} stroke="black" strokeWidth="1"
    />
  </g>
}

export const KeyboardContainer = () => {
  const { dispatch } = useRootContext()
  const onClick = e => {
    dispatch({ type: "keyPress", key: +e.target.dataset.midi }) // datasetの中は文字列になっているので、数値に変換して渡す。
  }
  return <Keyboard onClick={onClick}></Keyboard>
}