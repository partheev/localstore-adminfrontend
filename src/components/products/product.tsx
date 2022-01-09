import axios from 'axios'
import { useEffect, useState } from 'react'
import { apiRoutes } from '../../routing'
import { Product } from '../typedeclarations'

export const ProductTitleRow = () => {
  return (
    <div className=' mt-10 grid grid-cols-7 '>
      <div className=' col-span-3 '>Product Name</div>
      <div className=' col-span-1'>Price</div>
      <div className=' col-span-1'>Quantity Available</div>
      <div className=' col-span-1'>Date</div>
      <div className=' col-span-1'>Status</div>
    </div>
  )
}
export const ProductItem = ({ product }: { product: Product }) => {
  const ProductStatus = ({ qty }: { qty: number }) => {
    return (
      <div
        className={`bg-blue-400 p-1 flex justify-center max-w-[7rem] rounded-md  ${
          qty == 0
            ? ' bg-red-400	 text-red-600'
            : qty < 10
            ? ' bg-orange-200 text-orange-600'
            : 'bg-lime-300  text-lime-600'
        }`}
      >
        {qty == 0 ? 'Out of Stock' : qty < 10 ? 'Low Stock ' : 'In Stock'}
      </div>
    )
  }
  return (
    <div className='p-3 mt-3 bg-white grid grid-cols-7  rounded-lg'>
      <div className='mr-2 col-span-1'>
        <img
          className='   rounded object-center object-cover'
          src={product.image_url[0]}
        />
      </div>
      <div className='h-10 m-1 col-span-2 '>
        <div>{product.name}</div>
        <div>{product.category}</div>
        <div>Product ID: #{product.id}</div>
      </div>
      <div className='h-10 m-1 col-span-1'>${product.price}</div>
      <div className='h-10 m-1 col-span-1'>{product.qty_available}</div>
      <div className='h-10 m-1 col-span-1'>date</div>
      <div className='h-10 m-1 col-span-1'>
        <ProductStatus qty={product.qty_available} />
      </div>
    </div>
  )
}

export const ProductsList = () => {
  const [products, setproducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res = await axios.get(apiRoutes.Route(apiRoutes.getallproducts))
        const productsdata = res.data.productsList as Product[]
        setproducts(productsdata)
      } catch (err) {
        setproducts([])
      }
    }
    fetchProducts()
  }, [])

  return (
    <div>
      {products.map((prod) => {
        return <ProductItem key={prod.id} product={prod} />
      })}
    </div>
  )
}
