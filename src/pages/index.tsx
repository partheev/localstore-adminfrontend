import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <Link href='/dashboard/analytics'>
      <h1 className='mx-2 font-bold underline'>Hello world</h1>
    </Link>
  )
}

export default Home
