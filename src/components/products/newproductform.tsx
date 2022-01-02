import { Dispatch, SetStateAction, useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import axios from 'axios'
export const AddProductImageUpload = () => {
  const key =
    'https://com-partheev.s3.ap-south-1.amazonaws.com/myKey.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY3RL4JSTDIB2TYZW%2F20211231%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20211231T112308Z&X-Amz-Expires=1800&X-Amz-SignedHeaders=content-type%3Bhost&X-Amz-Signature=81c86f5fbcf94d476b4645829f2f1787000163acc74c36753831d5ad51e57679'
  const imgref = useRef<HTMLInputElement>(null)
  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      imgref.current &&
      imgref.current.files &&
      imgref.current.files.length > 0
    ) {
      let options = {
        headers: {
          'Content-Type': imgref.current.files[0].type,
        },
      }
      console.log('sent requset')
      const { data } = await axios.put(key, imgref.current.files[0], options)
      console.log(e.target.files, data)
    }
  }
  const UploadBox = () => {
    return (
      <div
        onClick={() => (imgref.current ? imgref.current.click() : null)}
        className='max-w-md flex-col m-auto border-dashed hover:bg-slate-50 cursor-pointer border-2 border-indigo-600 rounded-md flex justify-center items-center h-40 '
      >
        <input
          onChange={handleFileInput}
          ref={imgref}
          multiple
          type='file'
          className='hidden'
        />
        <UploadFileIcon sx={{ color: 'blue' }} />
        <div className='text-slate-400'>Upload Images</div>
      </div>
    )
  }
  return (
    <div className=''>
      <UploadBox />
    </div>
  )
}
export const CategoryField = ({
  setCategoryPop,
  setcategory,
}: {
  setCategoryPop: Dispatch<SetStateAction<boolean>>
  setcategory: any
}) => {
  return (
    <div className='w-full md:w-2/6 p-3 mb-6 md:mb-0'>
      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
        CATEGORY
      </label>
      <div className='relative'>
        <select
          defaultValue={'no'}
          className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          onChange={(e) => {
            if (e.target.value === 'add') setCategoryPop(true)
            else setcategory.categoryRef.concat(e.target.value)
          }}
        >
          <option value='no' disabled hidden>
            Choose here
          </option>{' '}
          <option value='add'>+ Add New Category</option>
          <option value='miss'>Missouri</option>
          <option value='texas'>Texas</option>
        </select>
        <div className='pointer-events-none rotate-90 absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
          <ArrowForwardIosIcon sx={{ fontSize: '1rem' }} />
        </div>
      </div>
    </div>
  )
}
export const TextField = ({
  tag,
  placeholder,
  size,
  formData,
  Okey,
}: {
  formData: any
  tag: string
  placeholder: string
  size: string
  Okey: string
}) => {
  return (
    <div className={` md:w-${size} w-full p-3`}>
      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
        {tag}
      </label>
      <input
        onChange={(e) => (formData[Okey] = e.target.value)}
        value={formData[Okey]}
        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
        type='text'
        placeholder={placeholder}
      ></input>
    </div>
  )
}

export const HighlightPoints = ({
  allpointsRef,
}: {
  allpointsRef: string[]
}) => {
  const [points, setpoints] = useState<string[]>([])
  const pointRef = useRef<HTMLInputElement>(null)
  const addProductHandler = () => {
    if (pointRef.current != null && pointRef.current.value != '') {
      points.push(pointRef.current.value)
      allpointsRef.length = 0
      points.forEach((value) => allpointsRef.push(value))
      pointRef.current.value = ''
      setpoints([...points])
    }
  }
  const deleteProductHandler = (index: number) => {
    points.splice(index, 1)
    allpointsRef.length = 0
    points.forEach((value) => allpointsRef.push(value))
    setpoints([...points])
  }
  const Point = ({ point, index }: { point: string; index: number }) => {
    return (
      <div className='flex justify-between my-4'>
        <ArrowRightIcon />
        <p className='w-[90%] '>{point}</p>
        <div onClick={() => deleteProductHandler(index)}>
          <CloseIcon sx={{ fontSize: '1rem', cursor: 'pointer' }} />
        </div>
      </div>
    )
  }
  return (
    <div className={` md:w-3/6 w-full p-3`}>
      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
        Highlight Points
      </label>
      {points.map((point, index) => (
        <Point key={index} point={point} index={index} />
      ))}
      <input
        ref={pointRef}
        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
        type='text'
        placeholder='Enter product highlight feature'
      ></input>
      <div className='flex justify-end  '>
        <div
          onClick={addProductHandler}
          className='bg-blue-400 text-white p-2 rounded mt-2'
        >
          Add Point
        </div>
      </div>
    </div>
  )
}
