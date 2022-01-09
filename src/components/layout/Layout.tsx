import { NextPage } from 'next'
import NavBar from './NavBar'
import SidebarItems from './sidebar/SidebarItems'
import LogoImg from '../../../public/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
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
  const [openSideBar, setopenSideBar] = useState(true)
  const toggleSideBar = () => {
    setopenSideBar(!openSideBar)
  }
  return (
    <div className='flex'>
      {/* sidebar */}
      {openSideBar && (
        <div className='bg-gradient-to-b from-slate-400 to-slate-500 w-[14rem] p-1 h-screen  overflow-y-auto fixed'>
          <Logo />
          <SidebarItems />
        </div>
      )}

      {/* maincontent */}
      <div
        className={`${
          openSideBar ? ' ml-[14rem] ' : ' '
        } w-full min-h-screen  bg-[#f7f8fb] `}
      >
        <NavBar toggleSideBar={toggleSideBar} />
        <div className='p-10'>{children}</div>
      </div>
    </div>
  )
}

export default Layout
