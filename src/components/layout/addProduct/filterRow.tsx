import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

import { useState } from 'react'

export const DropDown = () => {
  const [open, setopen] = useState(true)
  const arr = ['few', 'some', 'all']
  return (
    <div className='ml-10'>
      <div
        onClick={() => setopen(!open)}
        className='flex w-[8rem] bg-white p-2 rounded-md text-blue-400'
      >
        <span>
          All Products
          <ArrowForwardIosIcon
            sx={{
              fontSize: '1rem',
              marginLeft: '0.7rem',
              transform: open ? 'rotateZ(-90deg)' : 'rotateZ(90deg)',
            }}
          />
        </span>
      </div>
      {open && (
        <div className='flex bg-white  absolute items-center  flex-col'>
          {arr.map((e) => (
            <div
              key={e}
              onClick={() => setopen(false)}
              className='flex justify-center p-1 hover:bg-black/10 w-[8rem]'
            >
              <span>{e}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const AddProductButton = () => {
  return (
    <div className='bg-blue-400 p-2 h-10 flex items-center  rounded-lg text-white cursor-pointer '>
      <AddCircleOutlineIcon sx={{ marginRight: '0.7rem' }} />
      <span>Add Product</span>
    </div>
  )
}
