import type { PartnerType } from "../../../../contexts/Partners"

import { Link } from "react-router-dom"

import "./PartnersCard.css"

type PartnersCardProps = Pick<
    PartnerType,
    "id" |
    "trade" |
    "name" |
    "logo" |
    "thumbnail" |
    "locationsNumber"
> & {
    location: string,
}

const PartnersCard = ({
    id,
    name, 
    trade,
    logo,
    thumbnail,
    locationsNumber,
    location,
}:PartnersCardProps) => {
    return <div
        className="partners-card"
    >
        <section className="partners-card__section partners-card--top">
            <header className="partners-card__desc">
                <img 
                    src={logo} 
                    alt={`${name} logo`} 
                    className="partners-card__logo" 
                />
                <span className="partners-card__name">
                    {name}
                </span>
            </header>
            <ul className="partners-card__info-list">
                <li className="partners-card__info-item">
                    {`Category: ${trade}`}
                </li>
                <li className="partners-card__info-item">
                    {`Locations: ${locationsNumber}`}
                </li>
            </ul>
        </section>
        <section className="partners-card__section partners-card--middle">
            <img 
                src={thumbnail} 
                alt={`${name}'s thumbnail`}
                className="partners-card__thumbnail"
            />
        </section>
        <section className="partners-card__section partners-card--bottom">
            <Link
                to={`/sales?location=${location}&partner=${id}`}
                className="btn btn--primary btn--in-partners-card"
            >
                Order now!
            </Link>
        </section>
    </div>
}

export default PartnersCard