import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import CircularProgress from '@mui/material/CircularProgress'
import axios from 'axios'
import { createContext, Dispatch, useEffect, useReducer, useState } from 'react'
import { reducerConstants } from '../components/stateConstants'
import { useRouter } from 'next/router'
import { routes } from '../routing'
interface IUserDetails {
  username: string
  first_name: string
  last_name: string
  image_url: string | null
  email: string
}
interface IState {
  loading: boolean
  login: boolean
  userDetails: IUserDetails | null
}
interface IAction {
  type: reducerConstants
  payload: any
}

interface GlobalContextType {
  dispatch: Dispatch<IAction>
  state: IState
}
const initialState: IState = {
  loading: true,
  login: true,
  userDetails: null,
}
export const GlobalContext = createContext<GlobalContextType>({
  state: initialState,
  dispatch: () => {},
})
const reducer: React.Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case reducerConstants.loggedUser:
      return {
        ...state,
        loading: false,
        login: true,
        userDetails: action.payload,
      }
    case reducerConstants.notLoggedUser:
      return {
        ...state,
        login: false,
        loading: false,
      }
    case reducerConstants.loadingStart:
      return {
        ...state,
        loading: true,
      }
    case reducerConstants.loadingStop:
      return {
        ...state,
        loading: false,
      }
  }
}
function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const router = useRouter()
  useEffect(() => {
    const fetchAdminUserDetails = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/api/admin/verifyUser',
          { withCredentials: true }
        )
        dispatch({
          type: reducerConstants.loggedUser,
          payload: res.data.adminUser,
        })
        if (router.pathname === routes.Login) {
          router.replace(routes.AddProduct)
        }
      } catch (e) {
        console.log('verification failed')
        router.replace(routes.Login)

        dispatch({ type: reducerConstants.notLoggedUser, payload: null })
      }
    }
    fetchAdminUserDetails()
  }, [])
  return (
    <GlobalContext.Provider value={{ state: state, dispatch: dispatch }}>
      {state.loading ? (
        <div className='flex w-screen h-screen justify-center items-center'>
          <CircularProgress />
        </div>
      ) : (
        <div>
          {state.login ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </div>
      )}
    </GlobalContext.Provider>
  )
}

export default MyApp
