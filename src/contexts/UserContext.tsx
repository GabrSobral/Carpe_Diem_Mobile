import { useEffect } from "react";
import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api";
import { getToken, setToken } from "../utils/handleToken";

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
}

const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: UserProviderProps){
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  const [ username, setUsername ] = useState('')

  useEffect(() => {
    if(getToken()) {
      setIsAuthenticated(true)
    }
  },[])

  async function Sign({name, email, password, query = '/login'}: SignProps) {
    const result = {} as SignResult

    try {
      const { data } = await api.post(query, { name, email, password })
      setToken(data.token)
      setUsername(data.user.name)
      setIsAuthenticated(true)

      result.data = data
      result.message = "ok"
    } catch(error: any) {
      result.message = error.response.data.error
    } finally {
      return result
    }
  }

  return(
    <UserContext.Provider 
      value={{
        Sign,
        isAuthenticated,
        username
      }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUsers(){
  return useContext(UserContext)
}