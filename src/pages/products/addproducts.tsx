import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useState } from 'react'

const addproducts = () => {
  const [categoryPop, setCategoryPop] = useState(false)
  const [discountType, setDiscountType] = useState('')

  const NewCategory = () => {
    const [category, setcategory] = useState('')
    return (
      <div className=' p-5 rounded-xl z-10 w-[20rem] top-[20%] left-[45%] bg-white shadow-md  fixed '>
        <div className='w-full my-3 '>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
            CATEGORY
          </label>
          <input
            onChange={(e) => setcategory(e.target.value)}
            value={category}
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            type='text'
            placeholder='Enter new category'
          ></input>
        </div>
        <div className='flex justify-between'>
          <div
            onClick={() => setCategoryPop(false)}
            className='text-sky-400 m-2 cursor-pointer'
          >
            Close
          </div>

          <button className='bg-sky-400 block  p-2 rounded-md'>
            Add Category
          </button>
        </div>
      </div>
    )
  }
  const Title = ({ no, name }: { no: number; name: string }) => {
    return (
      <div className='flex my-10 text-[1.2rem] font-medium items-center'>
        <div className='bg-violet-600 flex items-center justify-center mr-2 text-white rounded-full w-5 h-5'>
          <span>{no}</span>
        </div>
        <div>{name}</div>
      </div>
    )
  }
  const TextField = ({
    tag,
    placeholder,
    size,
  }: {
    tag: string
    placeholder: string
    size: string
  }) => {
    return (
      <div className={` md:w-${size} w-full p-3`}>
        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
          {tag}
        </label>
        <input
          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          type='text'
          placeholder={placeholder}
        ></input>
      </div>
    )
  }
  const DiscountType = ({ value }: { value: string }) => {
    if (value === 'percent') {
      return (
        <TextField
          tag='Discount Percentage(%)'
          placeholder='Enter  discount pecentage'
          size='2/6'
        />
      )
    } else if (value === 'price') {
      return (
        <TextField
          tag='Discount Price($)'
          placeholder='Enter  discount price'
          size='2/6'
        />
      )
    } else {
      return null
    }
  }
  return (
    <div>
      {categoryPop && <NewCategory />}
      <div className={categoryPop ? 'blur none' : ''}>
        <div className=' text-xl  mb-5 font-bold'>Add New Product</div>
        <div className='rounded-xl min-h-screen w-full bg-white'>
          <form className='pt-1 pl-8 pr-4'>
            <Title no={1} name={'Product Details'} />
            <div className='flex flex-wrap'>
              <TextField
                tag='PRODUCT NAME'
                placeholder='Enter product name'
                size='2/6'
              />
              <TextField
                tag='BRAND NAME'
                placeholder='Enter product brand'
                size='2/6'
              />

              <div className='w-full md:w-2/6 p-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  CATEGORY
                </label>
                <div className='relative'>
                  <select
                    className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    onChange={(e) => {
                      if (e.target.value === 'add') setCategoryPop(true)
                    }}
                  >
                    <option value='no' selected disabled hidden>
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

              <div className='w-full md:w-2/3 p-3'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  DESCRIPTION
                </label>
                <textarea
                  className='appearance-none h-[8rem] block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  placeholder='Description about product....'
                ></textarea>
              </div>
              <TextField
                tag='AVAILABLE QUANTITY'
                placeholder='Enter stock available'
                size='2/6'
              />
            </div>
            <Title no={2} name={'Pricing Details'} />
            <div className='flex flex-wrap'>
              <TextField
                tag='Product Price'
                placeholder='Enter price of product'
                size='2/6'
              />

              <div className='w-full md:w-2/6 p-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  DISCOUNT TYPE
                </label>
                <div className='relative'>
                  <select
                    className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    defaultValue={'no'}
                    onChange={(e) => setDiscountType(e.target.value)}
                  >
                    <option value='no'>No Discount</option>
                    <option value='percent'>Discount by Percentage</option>
                    <option value='price'>Discount by Price</option>
                  </select>
                  <div className='pointer-events-none rotate-90 absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                    <ArrowForwardIosIcon sx={{ fontSize: '1rem' }} />
                  </div>
                </div>
              </div>
              <DiscountType value={discountType} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default addproducts
