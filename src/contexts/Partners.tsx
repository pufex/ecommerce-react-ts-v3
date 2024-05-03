import { ReactElement, createContext, useContext } from "react"

export type ProductType = {
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number | "unlimited",
    thumbnails: string[],
}

export type PartnerType = {
    id: string,
    trade: string,
    name: string,
    logo: string,
    thumbnail: string,
    website: string,
    locationsNumber: number,
    products: {
        id: string,
        products: ProductType[]
    },
}

type PartnersContextType = PartnerType[];

const PartnersContext = createContext<PartnersContextType | null>(null)

export const usePartnersContext = () => {
    const partnersContext = useContext(PartnersContext)
    if(!partnersContext)
        throw Error("Cannot use outside a provider.")
    else return partnersContext;
}

const value: PartnersContextType = [
    {
        id: "0",
        trade: "Food Chain",
        name: "McDonald's",
        logo: "https://pufex.github.io/ecommerce-react-ts-images/logos/0.png",
        thumbnail: "https://pufex.github.io/ecommerce-react-ts-images/thumbnails/0.jpg",
        website: "https://www.mcdonalds.com/us/en-us.html",
        locationsNumber: 999,
        products: {
            id: "0",
            products: [
                {
                    id: "0",
                    name: "Hamburger",
                    description: "Pyszna bułka z naturalnej produkcji mięsem, piklami i pomidorem",
                    price: 7.99,
                    stock: "unlimited",
                    thumbnails: [
                        "https://pufex.github.io/ecommerce-react-ts-images/productsThumbnails/0/0.png",
                        "https://pufex.github.io/ecommerce-react-ts-images/productsThumbnails/0/0.png",
                    ]
                },
                {
                    id: "1",
                    name: "Cheeseburger",
                    description: "Pyszna bułka z naturalnej produkcji mięsem, serem, piklami i pomidorem",
                    price: 8.99,
                    stock: "unlimited",
                    thumbnails: [
                        "https://pufex.github.io/ecommerce-react-ts-images/productsThumbnails/1/0.png",
                    ]
                },
                {
                    id: "2",
                    name: "Frytki - Małe",
                    description: "Frytki ziemniaczane. Do każdego opakowania dorzucamy ketchup!",
                    price: 5.99,
                    stock: "unlimited",
                    thumbnails: [
                        "https://pufex.github.io/ecommerce-react-ts-images/productsThumbnails/2/0.png",
                    ]
                },
                {
                    id: "3",
                    name: "Frytki - Średnie",
                    description: "Frytki ziemniaczane. Do każdego opakowania dorzucamy ketchup!",
                    price: 9.99,
                    stock: "unlimited",
                    thumbnails: [
                        "https://pufex.github.io/ecommerce-react-ts-images/productsThumbnails/3/0.png",
                    ]
                },
                {
                    id: "4",
                    name: "Frytki - Duże",
                    description: "Duża paczka frytek. Tylko nie przesadź, kolego!",
                    price: 12.99,
                    stock: "unlimited",
                    thumbnails: [
                        "https://pufex.github.io/ecommerce-react-ts-images/productsThumbnails/4/0.jpg",
                    ]
                },
                {
                    id: "5",
                    name: "Nuggetsy - 6 sztuk",
                    description: "Pyszne kurczaczki dla wspaniałych klientów. Z naturalnego drobiu!",
                    price: 7.99,
                    stock: "unlimited",
                    thumbnails: [
                        "https://pufex.github.io/ecommerce-react-ts-images/productsThumbnails/5/0.jpg",
                    ]
                },
                {
                    id: "6",
                    name: "Nuggetsy - 9 sztuk",
                    description: "Pyszne kurczaczki dla wspaniałych klientów. Z naturalnego drobiu!",
                    price: 12.99,
                    stock: "unlimited",
                    thumbnails: [
                        "https://pufex.github.io/ecommerce-react-ts-images/productsThumbnails/6/0.jpg",
                    ]
                },
                {
                    id: "7",
                    name: "Nuggetsy - 20 sztuk",
                    description: "Super pudło z 20 kurczakami! Kurczaków nigdy za wiele!",
                    price: 19.99,
                    stock: "unlimited",
                    thumbnails: [
                        "https://pufex.github.io/ecommerce-react-ts-images/productsThumbnails/7/0.jpg",
                    ]
                },
                {
                    id: "8",
                    name: "Wrap Standard",
                    description: "Pyszna zawijana tortilla z sałatą, kurczakiem, pomidorem i sosem.",
                    price: 12.99,
                    stock: "unlimited",
                    thumbnails: [
                        "https://pufex.github.io/ecommerce-react-ts-images/productsThumbnails/8/0.jpg",
                    ]
                },
                {
                    id: "9",
                    name: "Wrap Vege",
                    description: "Pyszna zawijana tortilla z sałatą, pomidorem i sosem, ale bez mięsa - dla wybrednych.",
                    price: 20.99,
                    stock: "unlimited",
                    thumbnails: [
                        "https://pufex.github.io/ecommerce-react-ts-images/productsThumbnails/9/0.jpg",
                    ]
                },
                {
                    id: "10",
                    name: "Wieśmak",
                    description: "Co tu dużo mówić - tej kanapce wystaje słoma z butów.",
                    price: 15.99,
                    stock: "unlimited",
                    thumbnails: [
                        "https://pufex.github.io/ecommerce-react-ts-images/productsThumbnails/10/0.jpg",
                    ]
                },
                {
                    id: "11",
                    name: "Bacon Burger",
                    description: "Duża, podwójna bułka z kotletem, serem, boczkiem i dodatkami.",
                    price: 20.99,
                    stock: "unlimited",
                    thumbnails: [
                        "https://pufex.github.io/ecommerce-react-ts-images/productsThumbnails/11/0.png",
                    ]
                },
                {
                    id: "12",
                    name: "Mała cola",
                    description: "Mała cola. Co tu dużo mówić - nomen es omen.",
                    price: 4.99,
                    stock: "unlimited",
                    thumbnails: [
                        "https://pufex.github.io/ecommerce-react-ts-images/productsThumbnails/12/0.png",
                    ]
                },
                {
                    id: "13",
                    name: "Średnia cola",
                    description: "Średnia cola. Co tu dużo mówić - nomen es omen.",
                    price: 7.99,
                    stock: "unlimited",
                    thumbnails: [
                        "https://pufex.github.io/ecommerce-react-ts-images/productsThumbnails/13/0.png",
                    ]
                },
                {
                    id: "14",
                    name: "Duża cola",
                    description: "Duża cola. Co tu dużo mówić - nomen es omen.",
                    price: 9.99,
                    stock: "unlimited",
                    thumbnails: [
                        "https://pufex.github.io/ecommerce-react-ts-images/productsThumbnails/14/0.png",
                    ]
                },
            ]
        },
    },
    {
        id: "1",
        trade: "Shops Chain",
        name: "Biedronka",
        logo: "https://pufex.github.io/ecommerce-react-ts-images/logos/1.png",
        thumbnail: "https://pufex.github.io/ecommerce-react-ts-images/thumbnails/1.jpg",
        website: "https://www.biedronka.pl/pl?gad_source=1&gclid=CjwKCAjwoa2xBhACEiwA1sb1BHScDEY45UfK_dKtPm_67YLrifBfFIsyNYIOSGYn9RYiCe9qTmdp7RoCwO4QAvD_BwE",
        locationsNumber: 999,
        products: {
            id: "1",
            products: []
        },
    },
    {
        id: "2",
        trade: "Food Chain",
        name: "KFC",
        logo: "https://pufex.github.io/ecommerce-react-ts-images/logos/2.png",
        thumbnail: "https://pufex.github.io/ecommerce-react-ts-images/thumbnails/2.jpg",
        website: "https://kfc.pl/",
        locationsNumber: 999,
        products: {
            id: "2",
            products: [],
        },
    },
]

type PartnersProviderContext = {
    children: ReactElement[] | ReactElement,
}

const PartnersProvider = ({children}:PartnersProviderContext) => {
  return <PartnersContext.Provider
    value={value}
  >
    {children}
  </PartnersContext.Provider>
}

export default PartnersProvider
