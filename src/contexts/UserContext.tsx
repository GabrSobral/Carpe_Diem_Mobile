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
    user: UserProps;
    token: string;
  };
  message?: string;
}
interface UserContextProps {
  Sign: ({name, password, email, query}: SignProps) => any;
  username: String;
  Logout: () => Promise<unknown>;
  user?: UserProps;
  updateUserState: () => void;
  handleUpdate: (...args: any) => Promise<UserProps>;
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
  const [ username, setUsername ] = useState('')
  const [ user, setUser ] = useState<UserProps>()

  const updateUserState = useCallback(async () => {
    const userStore = await storage.get('user')
    if(userStore){
      setUser(userStore)

      if(userStore){
        const firstName = userStore.name.split(' ')[0]
        setUsername(firstName)
      }
    }
  },[])

  const handleUpdate = useCallback(async({...args}): Promise<UserProps> => {
    let newUser: UserProps;

    return new Promise(resolve => {
      setUser(prevUser => {
        prevUser = { ...prevUser, ...args } as UserProps;
        newUser = prevUser;
        (async () => await storage.set('user', prevUser))();
        return prevUser;
      })
      return resolve(newUser)
    })
  },[])

  useEffect(() => {
    (async () => {
      if(getToken()) {
        updateUserState()
      }
    })()
  },[ updateUserState ])


  const Sign = useCallback((
    {name, email, password, query = '/login'}: SignProps) => {
    return new Promise((resolve, reject) => {
      const result = {} as SignResult

      api.post(query, { name, email, password })
      .then(({ data }: SignResult) => {
        const firstName = data.user.name.split(' ')[0]
        storage.set('user', data.user)
        
        result.data = data
        result.message = "ok"

        setToken(data.token)
        setUser(data.user)
        setUsername(firstName)
        return resolve(result)
      })
      .catch((error) => {
        result.message = error.response.data.error
        return reject(result)
      })
    })
  },[])

  function Logout(){
    return new Promise((resolve, reject) => {
      storage.remove('user')
      storage.remove('activities')
      removeToken()
      setUsername('')
      setUser(undefined)

      return resolve('ok')
    })
  }

  return(
    <UserContext.Provider 
      value={{
        Sign,
        username,
        Logout,
        user,
        updateUserState,
        handleUpdate
      }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUsers(){
  return useContext(UserContext)
}