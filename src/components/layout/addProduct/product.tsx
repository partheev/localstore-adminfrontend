import axios from 'axios'
import { useEffect, useState } from 'react'
import { Product } from '../../typedeclarations'

export const ProductItem = ({ product }: { product: Product }) => {
  return (
    <div className='p-3 mt-5 bg-white grid grid-cols-7  rounded-lg'>
      <div className='col-span-1 h-10 w-10'>
        <img className=' h-20 w-20' src={product.image_url[0]} />
      </div>
      <div className='h-10 m-1 bg-blue-400 col-span-2 '>
        {product.name}
        {product.category}
      </div>
      <div className='h-10 m-1 bg-blue-400 col-span-1'>{product.price}</div>
      <div className='h-10 m-1 bg-blue-400 col-span-1'>
        {product.qty_available}
      </div>
      <div className='h-10 m-1 bg-blue-400 col-span-1'>date</div>
      <div className='h-10 m-1 bg-blue-400 col-span-1'>status</div>
    </div>
  )
}

export const ProductsList = () => {
  const [products, setproducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      let { data }: { data: Product[] } = await axios.get(
        'http://localhost:4000/api/all-products'
      )
      console.log(data)
      setproducts(data)
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
