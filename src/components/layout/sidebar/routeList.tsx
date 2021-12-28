import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import { routes } from '../../../routing'
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
        route: routes.Analytics,
      },
    ],
  },
  {
    name: 'Products',
    icon: <ShoppingBagIcon />,
    subroutes: [
      {
        name: 'Manage Products',
        route: routes.ManageProducts,
      },
      {
        name: 'Add Products',
        route: routes.AddProduct,
      },
    ],
  },
]
