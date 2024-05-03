import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import { useIconsContext } from "../../contexts/Icon"
import { useCitiesContext } from "../../contexts/Cities"
import { usePartnersContext } from "../../contexts/Partners"

import Search from "../../components/Search/Search"
import SearchLocation from "../../components/SearchLocation/SearchLocation"
import PartnersCard from "./components/PartnersCard/PartnersCard"

import "./Partners.css"

const Partners = () => {


    const { FaLocationDot } = useIconsContext()

    const [searchParams] = useSearchParams();
    const [searchPartners, setSearhPartners] = useState<string>("")

    const city = useCitiesContext().find(
        (city) => city.name == searchParams.get("location")
    )

    const partners = usePartnersContext()

    const cityPartners = partners.filter(
        (partner) => city?.partners.includes(partner.id)
    )

    if(
        searchParams.get("location") == "" ||
        !searchParams.get("location")
    ) return <main className="partners__main">
        <header className="partners__header">
            <h1 className="partners__heading">
                Our partners
            </h1>
            <div className="partners__logos">
                {
                    partners?.map(({name, logo, website}) => {
                        return <a 
                            href={website}
                            className="partners__logos__link"
                            target="_blank"
                        >
                            <img 
                                src={logo}
                                alt={`${name} logo`}
                                className="partners__logos__logo"
                            />
                        </a>
                    })
                }
            </div>
        </header>
        <div className="partners__location-search-container">
            <SearchLocation />
        </div>
    </main>
    
    return <main className="partners__main">
        <header className="partners__header">
            <h1 className="partners__heading">
                Our partners
            </h1>
            <h2 className="partners__location">
                <FaLocationDot 
                    className="partners__location-icon"
                    size={20}
                />
                <span className="partners__location-content">
                    {`Location: ${searchParams.get("location")}`}
                </span>
            </h2>
            <div className="partners__search-container">
                <Search
                    placeholder="Find our partner"
                    value={searchPartners}
                    onChange={(changed: string) => setSearhPartners(changed)}
                />
            </div>
        </header>
        <section className="partners__partners">
            {
                cityPartners?.
                    filter(({name}) => 
                        name
                        .toLowerCase()
                        .includes(
                            searchPartners.toLowerCase()
                        )
                    ).
                    map((partner) => {
                        return <PartnersCard 
                            id={partner.id}
                            location={searchParams.get("location")!}
                            trade={partner.trade}
                            name={partner.name}
                            logo={partner.logo}
                            thumbnail={partner.thumbnail}
                            locationsNumber={partner.locationsNumber}
                        />
                    })
            }
        </section>
    </main>

    return "0";

}

export default Partners