import type { User, UserCredential } from "firebase/auth"
import type { ReactElement } from "react"

import { 
    createContext, 
    useContext, 
    useState, 
    useEffect 
} from "react"

import Loading from "../pages/Loading/Loading";

import {auth} from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { signOut } from "firebase/auth";
import { updateProfile } from "firebase/auth";

export type RegisterFunction = (email: string, password: string) => Promise<UserCredential>
export type GiveUserNameFunction = (username: string) => Promise<void>
export type LoginFunction = (email: string, password: string) => Promise<UserCredential>
export type LogoutFunction = () => Promise<void>
export type ResetPasswordFunction = (email: string) => Promise<void>

export type AuthContextType = {
    currentUser: User | undefined,
    register: RegisterFunction,
    giveusername: GiveUserNameFunction,
    login: LoginFunction,
    logout: LogoutFunction,
    resetPassword: ResetPasswordFunction,
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
    const authContext = useContext(AuthContext);
    if(!authContext)
        throw Error("Cannot be used outside a provider.")
    else return authContext
}

type AuthProviderProps = {
    children: ReactElement[] | ReactElement
} 

const AuthProvider = ({
    children,
}: AuthProviderProps) => {

    const [currentUser, setCurrentUser] = useState<User>()
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log(user)
            if(user){
                setCurrentUser(user)
            }
            setLoading(false);
        })
        return unsubscribe
    }, [])

    const register: RegisterFunction = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const giveusername: GiveUserNameFunction = (username) => {
        return updateProfile(auth.currentUser!, {displayName: username})
    }

    const login: LoginFunction = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout: LogoutFunction = () => {
        return signOut(auth)
    }

    const resetPassword: ResetPasswordFunction = (email: string) => {
        return sendPasswordResetEmail(auth, email);
    }

    const value: AuthContextType = {
        currentUser,
        register,
        giveusername,
        login,
        logout,
        resetPassword,
    }

    return <AuthContext.Provider
        value={value}
    >
        {loading ? <Loading /> : children}
    </AuthContext.Provider>
}

export default AuthProvider
