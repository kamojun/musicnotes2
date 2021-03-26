import React from 'react'

export const ShowPosition: React.FC<{ pos: number }> = ({ pos }) => (
  <div>
    <svg width="320" height="20">
      <circle r="5" cy="10" cx={95 + pos * 27} fill="gray"></circle>
    </svg>
  </div>
)