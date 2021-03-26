import React from 'react'

const KeyBoard: React.FC<{ onPush: () => void }> = (props) => {
  return (
    <div onClick={props.onPush}>keyboard</div>
  )
}

export { KeyBoard }