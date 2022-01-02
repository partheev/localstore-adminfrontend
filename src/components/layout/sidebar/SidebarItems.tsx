import { useEffect, useState } from 'react'
import { routeList, sideBarRouteList, subroute } from './routeList'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import Link from 'next/link'
import { useRouter } from 'next/router'
const SubItem = ({ item, urls }: { item: subroute; urls: string[] }) => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (urls.length > 1) {
      const currPath = item.route.substring(1).split('/')[2]
      if (currPath === urls[1]) {
        setOpen(true)
      } else {
        setOpen(false)
      }
    } else {
      setOpen(false)
    }
  }, [urls])
  return (
    <Link href={item.route}>
      <div
        className={`cursor-pointer hover:bg-white/20 text-white p-2 ${
          open ? 'bg-white/20' : ''
        }`}
      >
        <FiberManualRecordIcon
          sx={{
            fontSize: 10,
            color: 'white',
            marginLeft: '0.5rem',
            marginRight: '1rem',
          }}
        />
        {item.name}
      </div>
    </Link>
  )
}
const MainTitle = ({ items, urls }: { items: routeList; urls: string[] }) => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (urls.length > 1) {
      const currPath = items.subroutes[0].route.substring(1).split('/')[1]
      if (currPath === urls[0]) {
        setOpen(true)
      } else {
        setOpen(false)
      }
    } else {
      setOpen(false)
    }
  }, [urls])
  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        className={`cursor-pointer mt-1 text-white ${
          open ? 'bg-white/20' : 'bg-transparent'
        } p-2`}
      >
        <div className='flex items-center justify-between '>
          <div>
            {items.icon}
            <span className='ml-2'>{items.name}</span>
          </div>
          <div className={`ease-in duration-200  ${open ? 'rotate-90' : ''}`}>
            <ArrowForwardIosIcon />
          </div>
        </div>
      </div>
      {open && (
        <div className=' rounded-b-md bg-white/10'>
          {items.subroutes.map((item) => {
            return <SubItem key={item.route} item={item} urls={urls} />
          })}
        </div>
      )}
    </div>
  )
}
const SidebarItems = () => {
  const router = useRouter()
  const currUrl = router.pathname
  let modifiedUrlArray = currUrl.substring(1).split('/', 3)
  modifiedUrlArray.splice(0, 1)
  const [urlList, seturlList] = useState(modifiedUrlArray)

  useEffect(() => {
    const handleRouteChange = (u: string, { shallow }: { shallow: any }) => {
      const modifiedUrl = u.substring(1)
      modifiedUrlArray = modifiedUrl.split('/', 3)
      modifiedUrlArray.splice(0, 1)
      seturlList([...modifiedUrlArray])
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])
  console.log(urlList)
  return (
    <div>
      {sideBarRouteList.map((main) => {
        return <MainTitle key={main.name} urls={urlList} items={main} />
      })}
    </div>
  )
}

export default SidebarItems
