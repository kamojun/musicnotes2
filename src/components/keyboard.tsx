import React from 'react'
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
export const Keyboard = ({ onClick }) => {
  const keyWidth = 13.5
  const keyHeight = 40
  const sizes = [
    {
      width: keyWidth,
      height: keyHeight,
    }, {
      width: 9,
      height: 24,
    },
  ]
  const scale = 3
  const keysize = {
    width: keyWidth * 7 * scale,
    height: keyHeight * scale,
  }
  return <div>
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