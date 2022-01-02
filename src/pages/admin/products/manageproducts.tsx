import {
  AddProductButton,
  DropDown,
} from '../../../components/products/filterRow'
import {
  ProductsList,
  ProductTitleRow,
} from '../../../components/products/product'

const ManageProducts = () => {
  return (
    <div>
      <div className='text-xl  mb-10 font-bold'>Manage Products</div>
      <div className='flex justify-between'>
        <div className='flex '>
          <span className='text-md font-medium'> Filter By</span>
          <DropDown />
          <DropDown />
        </div>
        <AddProductButton />
      </div>
      <ProductTitleRow />
      <ProductsList />
    </div>
  )
}

export default ManageProducts
