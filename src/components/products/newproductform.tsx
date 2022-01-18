import { Dispatch, forwardRef, SetStateAction, useRef, useState } from 'react'
import imgfile from './loginbg.jpg'
import CloseIcon from '@mui/icons-material/Close'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import axios from 'axios'
export const AddProductImageUpload = () => {
  const [imageList, setimageList] = useState<File[]>([])
  const [showupload, setshowupload] = useState(true)
  const imgref = useRef<HTMLInputElement>(null)
  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      imgref.current &&
      imgref.current.files &&
      imgref.current.files.length > 0
    ) {
      console.log(imgref.current.files[0])
      let options = {
        headers: {
          'Content-Type': imgref.current.files[0].type,
        },
      }

      try {
        const res = await axios.post(
          'http://localhost:4000/api/s3-signed-url',
          {
            productId: 'part123id',
            filetype: imgref.current.files[0].type,
          }
        )
        
       await axios.put(
          res.data.signedUrl,
          imgref.current.files[0],
          options
        )
      } catch (e) {
        console.log('signedurl failed')
      }
    }
  }
  const UploadBox = () => {
    return (
      <div
        onClick={() => (imgref.current ? imgref.current.click() : null)}
        className='max-w-md flex-col mb-5 mx-auto border-dashed hover:bg-slate-50 cursor-pointer border-2 border-indigo-600 rounded-md flex justify-center items-center h-40 '
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
  const ImageList = () => {
    const ImageItem = () => {
      return (
        <div className='flex flex-wrap'>
          <img
            alt='image ecom'
            className='rounded object-cover w-[7rem] m-2 h-[7rem]'
            src={imgfile.src}
          ></img>
          <img
            alt='image ecom'
            className='rounded object-cover w-[7rem] m-2 h-[7rem]'
            src={imgfile.src}
          ></img>
          <img
            alt='image ecom'
            className='rounded object-cover w-[7rem] m-2 h-[7rem]'
            src={imgfile.src}
          ></img>
          <div
            onClick={() => (imgref.current ? imgref.current.click() : null)}
            className=' flex-col m-2 w-[7rem]  border-dashed hover:bg-slate-50 cursor-pointer border-2 border-indigo-600 rounded-md flex justify-center items-center  '
          >
            <input
              onChange={handleFileInput}
              ref={imgref}
              multiple
              type='file'
              className='hidden'
            />
            <UploadFileIcon sx={{ color: 'blue' }} />
            <span className='text-slate-400  text-center'>Add more Images</span>
          </div>
        </div>
      )
    }
    return (
      <div className='bg-gray-100 p-2 rounded-md'>
        <ImageItem />
      </div>
    )
  }
  return <div className=''>{showupload ? <UploadBox /> : <ImageList />}</div>
}
export const CategoryField = ({
  setCategoryPop,
  categories,
}: {
  categories: string[]
  setCategoryPop: Dispatch<SetStateAction<boolean>>
}) => {
  const [category, setcategory] = useState('no')
  console.log('category rendering')
  return (
    <div className='w-full md:w-2/6 p-3 mb-6 md:mb-0'>
      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
        CATEGORY
      </label>
      <div className='relative'>
        <select
          value={category}
          className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          onChange={(e) => {
            if (e.target.value === 'add') setCategoryPop(true)
            else setcategory(e.target.value)
          }}
        >
          <option value='no' disabled hidden>
            Choose here
          </option>{' '}
          <option value='add'>+ Add New Category</option>
          {categories.map((e) => {
            return (
              <option key={e} value={e}>
                {e}
              </option>
            )
          })}
        </select>
        <div className='pointer-events-none rotate-90 absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
          <ArrowForwardIosIcon sx={{ fontSize: '1rem' }} />
        </div>
      </div>
    </div>
  )
}
export const TextField = forwardRef(
  (
    {
      tag,
      placeholder,
      size,
    }: {
      tag: string
      placeholder: string
      size: string
    },
    ref: any
  ) => {
    return (
      <div className={` md:w-${size} w-full p-3`}>
        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
          {tag}
        </label>
        <input
          ref={ref}
          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          type='text'
          placeholder={placeholder}
        ></input>
      </div>
    )
  }
)

export const HighlightPoints = ({
  setPoints,
  points,
}: {
  points: string[]
  setPoints: (x: string[]) => void
}) => {
  const pointRef = useRef<HTMLInputElement>(null)
  const addProductHandler = () => {
    if (pointRef.current != null && pointRef.current.value != '') {
      points.push(pointRef.current.value)
      pointRef.current.value = ''
      setPoints([...points])
    }
  }
  const deleteProductHandler = (index: number) => {
    points.splice(index, 1)
    setPoints([...points])
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
