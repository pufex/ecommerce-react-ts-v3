import { ReactElement, createContext, useContext } from "react"

export type CityType = {
  id: string,
  name: string,
  partners: string[],
}

type CitiesContextType = CityType[];

const CitiesContext = createContext<CitiesContextType | null>(null)

export const useCitiesContext = () => {
  const citiesContext = useContext(CitiesContext)
  if(!citiesContext)
    throw Error("Cannot use outside a provider.")
  else return citiesContext
}

const value: CitiesContextType = [
  {
    id: "0",
    name: 'Warszawa',
    partners: [],
  },
  {
    id: "1",
    name: 'Kraków',
    partners: [],
  },
  {
    id: "2",
    name: 'Wrocław',
    partners: [],
  },
  {
    id: "3",
    name: 'Poznań',
    partners: [],
  },
  {
    id: "4",
    name: 'Kołobrzeg',
    partners: [
      "0","1", "2"
    ],
  },
  {
    id: "5",
    name: 'Gdańsk',
    partners: [],
  },
  {
    id: "6",
    name: 'Katowice',
    partners: [],
  },
  {
    id: "7",
    name: 'Wrocławek',
    partners: [],
  },
]

type CitiesProps = {
  children: ReactElement[] | ReactElement,
}

const CitiesProvider = ({children}:CitiesProps) => {
  return <CitiesContext.Provider
    value={value}
  >
    {children}
  </CitiesContext.Provider>
}

export default CitiesProvider
