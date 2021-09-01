import { createContext, ReactNode, useContext, useState } from "react";

interface UserProviderProps {
  children: ReactNode;
}
interface UserContextProps {

}

const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: UserProviderProps){
  const [] = useState()

  return(
    <UserContext.Provider 
    value={{
      
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUsers(){
  return useContext(UserContext)
}