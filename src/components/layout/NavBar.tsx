import MenuIcon from '@mui/icons-material/Menu'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Badge } from '@mui/material'
import { useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { apiRoutes, routes } from '../../routing'
import { useRouter } from 'next/router'
import { GlobalContext } from '../../pages/_app'
import { reducerConstants } from '../stateConstants'
const NavBar = ({ toggleSideBar }: { toggleSideBar: () => void }) => {
  const AccountIcon = () => {
    const [open, setopen] = useState(false)
    const myRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const { dispatch } = useContext(GlobalContext)
    const logoutHandler = async () => {
      try {
        await axios.post(apiRoutes.logout, {}, { withCredentials: true })
        dispatch({ type: reducerConstants.notLoggedUser, payload: null })
        router.replace(routes.Login)
      } catch (e) {
        console.log('logout failed')
      }
    }
    const items = [
      {
        name: 'Profile',
        route: '/profile',
      },
    ]
    const handleClickOutside = (e: any) => {
      if (myRef.current && !myRef.current.contains(e.target)) {
        setopen(false)
      }
    }

    const handleClickInside = () => setopen(false)

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])
    const Item = ({
      name,
      route,
      closeFun,
    }: {
      name: string
      route: string
      closeFun: () => void
    }) => {
      return (
        <Link href={route}>
          <div
            onClick={closeFun}
            className='w-[7rem] cursor-pointer hover:bg-slate-300 flex flex-col items-center'
          >
            <span className='p-2'>{name}</span>
          </div>
        </Link>
      )
    }
    return (
      <div ref={myRef} className=''>
        <div onClick={() => setopen(!open)}>
          <AccountCircleIcon
            sx={{ fontSize: '2rem', marginRight: '1rem', cursor: 'pointer' }}
          />
        </div>
        {open && (
          <div className='absolute rounded-md shadow right-2 bg-white'>
            {items.map((e) => {
              return (
                <Item
                  key={e.route}
                  closeFun={handleClickInside}
                  name={e.name}
                  route={e.route}
                />
              )
            })}
            <div
              onClick={logoutHandler}
              className='p-2 border-t-2 border-slate-300 w-[7rem] cursor-pointer hover:bg-slate-300 flex flex-col items-center'
            >
              LogOut
            </div>
          </div>
        )}
      </div>
    )
  }
  return (
    <div className='h-16 w-full flex justify-between items-center bg-white shadow-md'>
      <div
        onClick={toggleSideBar}
        className='bg-slate-200 mx-4 rounded-full p-[0.4rem] cursor-pointer'
      >
        <MenuIcon sx={{ fontSize: '1.7rem', color: 'gray' }} />
      </div>
      <div className='flex items-center'>
        <Badge sx={{ marginRight: '2rem' }} badgeContent={4} color='primary'>
          <NotificationsNoneIcon sx={{ cursor: 'pointer' }} />
        </Badge>
        <AccountIcon />
      </div>
    </div>
  )
}

export default NavBar
