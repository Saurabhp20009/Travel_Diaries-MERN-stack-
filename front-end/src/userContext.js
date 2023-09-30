import React, { createContext } from 'react'

const userContext= createContext(null)

const UserContextFile = ({children}) => {
    let user= localStorage.getItem("user")
    user= JSON.parse(user)
  return (
     
    <userContext.Provider value={user}>
        {children}
    </userContext.Provider>

  )
}

export {UserContextFile,userContext}