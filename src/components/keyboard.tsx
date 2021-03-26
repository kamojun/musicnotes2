import React from 'react'
import { ProgressPlugin } from 'webpack'


type KeyColor = 0 | 1
const KeyColors: KeyColor[] = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0]
const KeyPosition: number[] = [0, 0.6, 1, 1.6, 2, 3, 3.6, 4, 4.6, 5, 5.6, 6]

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
  return <div style={{ display: "inline-block", width: "100%" }}>
    <svg {...keysize}>
      <g onClick={onClick} transform={`scale(${scale}, ${scale})`}>
        {KeyColors.map((c, i) => <PianoKey
          key={i}
          color={c === 0 ? 'white' : 'black'}
          midi={i}
          width={sizes[c].width}
          height={sizes[c].height}
          x={KeyPosition[i] * keyWidth}
        ></PianoKey>)}
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
    <rect
      {...others}
      className="pianokey"
      data-midi={midi}
      y="0" fill={color === "white" ? "none" : "black"} stroke="black" strokeWidth="1"
    />
  </g>
}
export { Keyboard }
