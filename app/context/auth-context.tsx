import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import * as SecureStore from "expo-secure-store"

interface AuthProps {
    authState?: {
        token: string | null
        authenticated: boolean | null
    }
    onRegister?: (email: string, password: string) => Promise<any>
    onLogin?: (email: string, password: string) => Promise<any>
    onLogout?: () => Promise<any>
}

const TOKEN_KEY = "my-jwt"
export const API_URL = "https://api.developbetterapps.com"

const AuthContext = createContext<AuthProps>({})

export const useAuth = () => {
    return useContext(AuthContext)
}

type AuthTypeArg = {
    token: string | null
    authenticated: boolean | null
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<AuthTypeArg>({
        token: null,
        authenticated: null
    })

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY)
            console.log("stored-token", token);

            if (token) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

                setAuthState({
                    token,
                    authenticated: true
                })
            }

        }

        loadToken()
    }, []);

    const register = async (email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/users`, { email, password })
        } catch (error) {
            return { error: true, msg: (error as any).response.data.msg }
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/auth`, { email, password })

            console.log("auth-context", result)

            setAuthState({
                token: result.data.token,
                authenticated: true
            })

            axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token)

            return result
        } catch (error) {
            return { error: true, msg: (error as any).response.data.msg }
        }
    }

    const logout = async () => {
        // Delete token from storage
        await SecureStore.deleteItemAsync(TOKEN_KEY)

        // Update the HTTP axios header
        axios.defaults.headers.common["Authorization"] = ""

        // Update auth state
        setAuthState({
            token: null,
            authenticated: null
        })
    }



    const value: AuthProps = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    }
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}