import { createContext, ReactNode, useContext, useState } from "react";

interface LoadingContextData{
  isLoading: boolean;
  setLoadingTrue: () => void;
  closeLoading: () => void;
}

interface LoadingContextProvider{
  children : ReactNode
}

export const LoadingContext = createContext({} as LoadingContextData)

export function LoadingProvider({children} : LoadingContextProvider){
  const [ isLoading, setIsloading ] = useState(false)

  function setLoadingTrue(){
    setIsloading(true)
  }
  function  closeLoading(){
    setIsloading(false)
  }
  return(
    <LoadingContext.Provider
      value={{
        isLoading,
        setLoadingTrue,
        closeLoading
      }}
    >
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  return useContext(LoadingContext)
}