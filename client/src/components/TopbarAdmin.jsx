import React from 'react'

const TopbarAdmin = (props) => {
  return (
    <div className=' w-screen h-[92px] bg-red-300'>
      <div>TopbarAdmin</div>
      <div>{props.name}</div>
      {props.children}

    </div>
  )
}

export default TopbarAdmin