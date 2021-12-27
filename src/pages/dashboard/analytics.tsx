import React from 'react'

const analytics = () => {
  const arr = []
  for (let i = 1; i < 100; i++) {
    arr.push(1)
  }
  return (
    <div>
      {arr.map(() => (
        <h1>Hello</h1>
      ))}
    </div>
  )
}

export default analytics
