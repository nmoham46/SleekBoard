import { createContext, useContext, useState } from "react";

const LoaderContext = createContext()

export const useLoader = () => {
  return useContext(LoaderContext)
}

export const LoaderProvider = ({ children }) => {
  const [isGlobalLoading, setIsGlobalLoading] = useState(false)

  const startGlobalLoading = () => setIsGlobalLoading(true)
  const stopGlobalLoading = () => setIsGlobalLoading(false)

  return <LoaderContext.Provider value={{
                                        isGlobalLoading,
                                        startGlobalLoading,
                                        stopGlobalLoading
                                       }}>
    {children}
  </LoaderContext.Provider>
}
