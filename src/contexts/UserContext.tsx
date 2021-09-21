import { useCallback } from "react";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { getToken, removeToken, setToken } from "../utils/handleToken";
import { storage } from "../utils/ionicStorage";

interface UserProviderProps {
  children: ReactNode;
}
interface SignProps {
  name?: String;
  email: String;
  password: String;
  query: '/login' | '/users'
}
interface SignResult {
  data: {
    user: {
      id: String;
      name: String;
      email: String;
      created_at: Date;
      updated_at: Date;
    };
    token: String;
  };
  message?: String;
}
interface UserContextProps {
  Sign: ({name, password, email, query}: SignProps) => any;
  username: String;
  isAuthenticated: Boolean;
  Logout: () => Promise<unknown>;
  user?: UserProps;
  handleFinishActivityInUser: () => void;
  setHasAnswered: () => void;
  updateUserState: () => void;
  handleUpdateQuantityOfActivities: (quantity: number) => void;
}
interface UserProps {
  id: string;
  name: string;
  email: string;
  activities_finished_today: number;
  all_activities_finished: number;
  quantity_of_activities: number;
  created_at: Date;
  updated_at: Date;
  hasAnswered?: boolean;
}

const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: UserProviderProps){
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  const [ username, setUsername ] = useState('')
  const [ user, setUser ] = useState<UserProps>()

  const updateUserState = useCallback(async () => {
    const userStore = await storage.get('user')
    if(userStore){
      setUser(userStore)
      if(userStore){
        const firstName = userStore.name.split(' ')[0]

        console.log(firstName)
        setUsername(firstName)
      }
    }
  },[])

  useEffect(() => {
    (async () => {
      if(getToken()) {
        setIsAuthenticated(true) 
        updateUserState()
      }
    })()
  },[ updateUserState ])


  async function Sign({name, email, password, query = '/login'}: SignProps) {
    const result = {} as SignResult

    try {
      const { data } = await api.post(query, { name, email, password })
      setUser(data.user)

      // api.interceptors.request.use((config) => {
      //   config.headers.authorization = `Bearer ${data.token}`
      //   return config
      // })
      
      setToken(data.token)
      await storage.set('user', data.user)
      const firstName = data.user.name.split(' ')[0]
      setUsername(firstName)
      setIsAuthenticated(true)

      result.data = data
      result.message = "ok"
    } catch(error: any) {
      result.message = error.response.data.error
    } finally {
      return result
    }
  }

  function Logout(){
    return new Promise((resolve, reject) => {
      storage.remove('user')
      storage.remove('activities')
      removeToken()
      setIsAuthenticated(false)
      setUsername('')
      setUser(undefined)

      return resolve('ok')
    })
  }

  async function handleFinishActivityInUser(){
    setUser(prev => {
      if(prev){
        prev.all_activities_finished++
        prev.activities_finished_today++

        (async () => {
          await storage.set('user', prev)
        })()

        return prev
      }
      return undefined
    })
  }

  function setHasAnswered(){
    setUser(prev => {
      if(prev) {
        (async () => {
          prev.hasAnswered = true
          await storage.set('user', prev)
        })()
        return prev
      }
      return undefined
    })
  }

  function handleUpdateQuantityOfActivities(quantity: number){
    setUser(prev => {
      prev && (prev.quantity_of_activities = quantity)
      return prev
    })
  }

  return(
    <UserContext.Provider 
      value={{
        Sign,
        isAuthenticated,
        username,
        Logout,
        user,
        handleFinishActivityInUser,
        setHasAnswered,
        updateUserState,
        handleUpdateQuantityOfActivities
      }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUsers(){
  return useContext(UserContext)
}