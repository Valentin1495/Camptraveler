import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import auth from "../firebase"

const AuthContext = React.createContext()

const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const history = useHistory()
    
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setLoading(false)
            setUser(user)
            if (user) {
                history.push("/chats")
            }
        })
    }, [user, history])

    const value = { user }
 
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export { useAuth, AuthProvider };