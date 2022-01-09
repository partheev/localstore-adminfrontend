import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { ReactNode, useEffect, useRef, useState } from 'react'
import {
  AddProductImageUpload,
  CategoryField,
  HighlightPoints,
  TextField,
} from '../../../components/products/newproductform'
import { apiRoutes } from '../../../routing'

const FlexWrap = ({ children }: { children: ReactNode }) => {
  return <div className='flex flex-wrap'>{children}</div>
}

const Addproducts = () => {
  const [categoryPop, setCategoryPop] = useState(false)
  const [categories, setcategories] = useState<string[]>([])
  const [discountType, setDiscountType] = useState('')
  const [loading, setloading] = useState(true)

  const productRefs = {
    productName: useRef<HTMLInputElement>(),
    brandName: useRef<HTMLInputElement>(),
    description: useRef<HTMLInputElement>(),
    availableQty: useRef<HTMLInputElement>(),
    price: useRef<HTMLInputElement>(),
    discountPrice: useRef<HTMLInputElement>(),
    discountPercent: useRef<HTMLInputElement>(),
    radius: useRef<HTMLInputElement>(),
    deliveryCharge: useRef<HTMLInputElement>(),
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(apiRoutes.Route(apiRoutes.getcategory))
        const categorydata = res.data.categoryList
        console.log(categorydata)
        setcategories([...categorydata])
        setloading(false)
      } catch (e) {
        console.log('failed in categry get')
      }
    }

    fetchCategories()
  }, [])
  const NewCategory = () => {
    const [category, setcategory] = useState('')
    const addCategoryHandler = async () => {
      try {
        const res = await axios.post(apiRoutes.Route(apiRoutes.addcategory), {
          categoryName: category,
        })
        setCategoryPop(false)
      } catch (e) {
        console.log(e)
      }
    }
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

          <button
            onClick={addCategoryHandler}
            className='bg-sky-400 block  p-2 rounded-md'
          >
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

  const DiscountType = ({ value }: { value: string }) => {
    if (value === 'percent') {
      return (
        <TextField
          tag='Discount Percentage(%)'
          placeholder='Enter  discount pecentage'
          size='2/6'
          ref={productRefs.discountPercent}
        />
      )
    } else if (value === 'price') {
      return (
        <TextField
          tag='Discount Price($)'
          placeholder='Enter  discount price'
          size='2/6'
          ref={productRefs.discountPrice}
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
        {loading ? (
          <div className=' min-h-screen flex  justify-center items-center'>
            <ReactLoading type='spinningBubbles' color='gray' />
          </div>
        ) : (
          <div className='rounded-xl min-h-screen w-full bg-white'>
            <form className='pt-1 pb-10 pl-8 pr-4'>
              <Title no={1} name={'Product Details'} />
              <FlexWrap>
                <TextField
                  tag='PRODUCT NAME'
                  placeholder='Enter product name'
                  size='2/6'
                  ref={productRefs.productName}
                />
                <TextField
                  tag='BRAND NAME'
                  placeholder='Enter product brand'
                  size='2/6'
                  ref={productRefs.brandName}
                />
                <CategoryField
                  categories={categories}
                  setCategoryPop={setCategoryPop}
                />

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
                  ref={productRefs.availableQty}
                />
                <HighlightPoints />
              </FlexWrap>

              <Title no={2} name={'Pricing Details'} />
              <FlexWrap>
                <TextField
                  tag='Product Price'
                  placeholder='Enter price of product'
                  size='2/6'
                  ref={productRefs.price}
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
              </FlexWrap>
              <Title no={3} name={'Delivery Options'} />
              <FlexWrap>
                <TextField
                  tag={'Radius (in Kms)'}
                  placeholder='Select radius you can delivery.'
                  size='2/6'
                  ref={productRefs.radius}
                />
                <TextField
                  tag={'Delivery Charge (enter 0 for free delivery)'}
                  placeholder='Select radius you can delivery.'
                  size='2/6'
                  ref={productRefs.deliveryCharge}
                />
              </FlexWrap>
              <Title no={4} name={'Upload Images'} />
              <AddProductImageUpload />
              <div>submit</div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Addproducts
