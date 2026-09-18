import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('studyflow-user') || 'null'))
    const login = (email) => { const next = { name: email.split('@')[0], email }; setUser(next); localStorage.setItem('studyflow-user', JSON.stringify(next)) }
    const logout = () => { setUser(null); localStorage.removeItem('studyflow-user') }
    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)