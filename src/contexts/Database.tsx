import type { User, UserCredential } from "firebase/auth"
import type { ReactElement } from "react"

import { 
    createContext, 
    useContext, 
    useState, 
    useEffect 
} from "react"
import { useStorage } from "../hooks/useInput/useStorage";

import Loading from "../pages/Loading/Loading";

import {auth, db, citiesCollection, partnersCollection} from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateEmail } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { signOut } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc, updateDoc} from "firebase/firestore";

export type CredentialsForUser = {
    name: string,
    surname: string,
    location: string,
    postalCode: string,
    address: string,
    email: string,
}

export type UserDocument = {
    id: string,
    username: string,
    email: string,
    profilePic: string,
    credentials: CredentialsForUser,
}

export type CityType = {
    id: string,
    name: string,
    partners: string[],
}

export type PartnerType = {
    id: string,
    trade: string,
    name: string,
    logo: string,
    thumbnail: string,
    website: string,
    locations: string[],
}

export type ProductType = {
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number | "unlimited",
    thumbnails: string[],
}

export type ProductTypeObj = {
    id: string,
    products: ProductType[],
}

export type FetchAllPartnersFunction = () => Promise<unknown>
export type FetchSomePartnersFunction = (arr: string[]) => Promise<unknown>
export type FetchSinglePartnerFunction = (partnerId: string) => Promise<unknown>

export type FetchProductFunction = (partnerId: string) => Promise<unknown>

export type RegisterFunction = (username: string, email: string, password: string) => Promise<unknown>
export type GiveUserNameFunction = (username: string) => Promise<void>
export type LoginFunction = (email: string, password: string) => Promise<UserCredential>
export type LogoutFunction = () => Promise<void>
export type ResetPasswordFunction = (email: string) => Promise<void>

export type ChangeUsernameFunction = (username: string) => Promise<void>
export type ChangeEmailFunction = (email: string) => Promise<void>
export type UpdateCredentialsFunction = (
    name: string,
    surname: string,
    email: string,
    location: string,
    address: string,
    postalCode: string,
) => Promise<unknown>

export type DatabaseContextType = {
    currentUser: User | undefined,
    currentDocument: UserDocument | undefined,
    cities: CityType[],
    partners?: PartnerType[],
    products?: ProductTypeObj,

    fetchProducts: FetchProductFunction,

    register: RegisterFunction,
    login: LoginFunction,
    logout: LogoutFunction,
    resetPassword: ResetPasswordFunction,

    changeUsername: ChangeUsernameFunction,
    changeEmail: ChangeEmailFunction,
    updateCredentials: UpdateCredentialsFunction,
}

const DatabaseContext = createContext<DatabaseContextType | null>(null)

export const useDatabase = () => {
    const dbContext = useContext(DatabaseContext);
    if(!dbContext) throw Error("Cannot be used outside a provider.")
    else return dbContext;
}

type DatabaseProviderProps = {
    children: ReactElement[] | ReactElement
} 

const DatabaseProvider = ({
    children,
}: DatabaseProviderProps) => {

    const [currentDocument, setCurrentDocument] = useState<UserDocument | undefined>()
    const [currentUser, setCurrentUser] = useState<User | undefined>()
    const [loadingUser, setLoadingUser] = useState<boolean>(true);

    const [cities, setCities] = useState<CityType[]>([]);
    const [loadingCities, setLoadingCities] = useState<boolean>(true);
    
    // @ts-expect-error: how is that not fixed 
    const [partners, setPartners] = useStorage<PartnerType[] | undefined>("", "eccomerce-partners-key")
    const [loadingPartners, setLoadingPartners] = useState<boolean>(true);

    // @ts-expect-error: how is that not fixed 
    const [products, setProducts] = useStorage<ProductTypeObj | undefined>("", "eccomerce-products-key")
 
    useEffect(() => {
        console.log(cities)
    }, [cities])

    useEffect(() => {
        const unsub = onSnapshot(citiesCollection, (snapshot) => {
            setLoadingCities(true);
            const citiesArray: CityType[] = [];
            snapshot.docs.forEach((doc) => {
                // @ts-expect-error
                citiesArray.push({...doc.data(), id: doc.id});
            })
            setCities(citiesArray)
            setLoadingCities(false)
        }, (err) => {
            console.error(err)
            setLoadingCities(false)
        })
        return unsub;
    })

    useEffect(() => {
        const unsub = onSnapshot(partnersCollection, (snapshot) => {
            setLoadingPartners(true)
            const partnersArr: PartnerType[] = []
            snapshot.docs.forEach((doc) => {
                // @ts-expect-error
                partnersArr.push({...doc.data(), id: doc.id})
            })
            setPartners(partnersArr)
            setLoadingPartners(false)
        }, (error) => {
            console.error(error)
            setLoadingPartners(false)
        })
        return unsub;
    }, [])

    const fetchProducts: FetchProductFunction = async (partnerId) => {
        const productDoc = doc(db, "products", partnerId);
        try{
            const products = await getDoc(productDoc);
            const productsArr: ProductType[] = 
                Object.values({...products.data()}).map((product, index) => {
                    return {...product, id: index.toString(),}
                });
            setProducts({products: productsArr, id: products.id});
        }catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setLoadingUser(true);
            if(user){
                setCurrentUser(user)
                getDoc(doc(db, "users", user.uid))
                    .then((doc) => {
                        // @ts-expect-error
                        const usersDocument: UserDocument = doc.data();
                        setCurrentDocument(usersDocument)
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }else{
                setCurrentUser(undefined)
            }
            setLoadingUser(false);
        })
        return unsubscribe
    }, [])

    const register: RegisterFunction = async (username, email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                const userDoc = doc(db, "users", user.uid)
                setDoc(userDoc, {
                    username,
                    email,
                    profilePic: "https://media.istockphoto.com/id/164415004/vector/hungry-emoticon.jpg?s=612x612&w=0&k=20&c=AQ6XTs0Las-fArXrnoTnZgKKWN_McJ10RemSMO-eCjI=",
                    credentials: {
                        name: "",
                        surname: "",
                        location: "",
                        postalCode: "",
                        address: "",
                        email: "",
                    }
                })
            })
            .catch((err) => {
                console.error(err)
            })
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

    const changeUsername: ChangeUsernameFunction = (username) => {
        const userDoc = doc(db, "users", currentUser?.uid ?? "");
        return updateDoc(userDoc, {username})
    }
    
    const changeEmail: ChangeEmailFunction = async (email) => {
        const userDoc = doc(db, "users", currentUser?.uid ?? "");
        try{
            await updateEmail(currentUser!, email);
            await updateDoc(userDoc, {email})
        }catch(error){
            console.error(error)
        }
    }

    const updateCredentials: UpdateCredentialsFunction = (name, surname, email, location, address, postalCode) => {
       const userRef = doc(db, "users", currentUser?.uid ?? "") 

       return updateDoc(userRef, {
         "credentials.name": name,
         "credentials.surname": surname,
         "credentials.email": email,
         "credentials.location": location,
         "credentials.address": address,
         "credentials.postalCode": postalCode,
       })
    }

    const value: DatabaseContextType = {
        cities,
        partners,
        products,
        currentDocument,
        currentUser,
        fetchProducts,
        register,
        login,
        logout,
        resetPassword,
        changeUsername,
        changeEmail,
        updateCredentials,
    }

    return <DatabaseContext.Provider
        value={value}
    >
        {
            loadingUser ||
            loadingPartners ||
            loadingCities
                ? <Loading /> 
                : children
        }
    </DatabaseContext.Provider>
}

export default DatabaseProvider
