import { NextPage } from 'next'
import NavBar from './NavBar'
import SidebarItems from './sidebar/SidebarItems'
import LogoImg from '../../../public/logo.png'
import Image from 'next/image'
import Link from 'next/link'
const Logo = () => {
  return (
    <Link href='/'>
      <div>
        <Image src={LogoImg}></Image>
      </div>
    </Link>
  )
}
const Layout: NextPage = ({ children }) => {
  return (
    <div className='flex'>
      {/* sidebar */}
      <div className='bg-gradient-to-b from-slate-400 to-slate-500 w-[14rem] p-1 h-screen  overflow-y-auto fixed'>
        <Logo />

        <SidebarItems />
      </div>
      {/* maincontent */}
      <div className='w-full ml-[14rem] '>
        <NavBar />
        {children}
      </div>
    </div>
  )
}

export default Layout
