import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import axios from 'axios'
import { apiRoutes, routes } from '../../routing'
import { GlobalContext } from '../_app'
import { reducerConstants } from '../../components/stateConstants'
import { useRouter } from 'next/router'
export default function Login() {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const { dispatch } = useContext(GlobalContext)
  const router = useRouter()
  const onLoginHandler = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        apiRoutes.login,
        {
          username,
          password,
        },
        { withCredentials: true }
      )

      dispatch({
        type: reducerConstants.loggedUser,
        payload: {
          ...data,
        },
      })
      router.replace(routes.Analytics)
    } catch (e) {
      console.log('invalid credentials')
    }
  }

  return (
    <div>
      <div className="h-screen w-screen z-[-1] fixed bg-[url('/loginbg.jpg')] bg-cover blur-md"></div>
      <div className='flex w-screen h-screen justify-center items-center'>
        <form className='flex py-7 px-5 mx-5  flex-col items-center h-[20rem] w-full max-w-[25rem] bg-white/20 rounded-md'>
          <span className='text-white text-xl font-bold  mb-3'>
            Admin Login
          </span>
          <div className='w-full bg-white/50 p-1 rounded flex items-center mt-3'>
            <span>
              <PersonIcon />
            </span>
            <input
              onChange={(e) => setusername(e.target.value)}
              value={username}
              type='text'
              className='focus:outline-none bg-transparent ml-1 p-2 '
              placeholder='Admin Username'
            />
          </div>{' '}
          <div className='w-full bg-white/50 p-1 rounded flex items-center mt-3'>
            <span>
              <LockIcon />
            </span>
            <input
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              type='password'
              className='focus:outline-none bg-transparent ml-1 p-2 '
              placeholder='Password'
            />
          </div>
          <div className=' w-full my-2 flex justify-end'>
            <span>Need help?</span>
          </div>
          <button
            onClick={onLoginHandler}
            className='rounded-full bg-white/40 p-2 w-full'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
