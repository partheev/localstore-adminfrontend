import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
export interface subroute {
  name: string
  route: string
}
export interface routeList {
  name: string
  icon: JSX.Element
  subroutes: subroute[]
}
export const sideBarRouteList: routeList[] = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon />,
    subroutes: [
      {
        name: 'Analytics',
        route: '/dashboard/analytics',
      },
    ],
  },
  {
    name: 'Products',
    icon: <ShoppingBagIcon />,
    subroutes: [
      {
        name: 'Manage Products',
        route: '/products/manageproducts',
      },
      {
        name: 'Add Products',
        route: '/products/addProducts',
      },
    ],
  },
]
