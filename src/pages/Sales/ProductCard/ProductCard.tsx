import type { ProductType } from "../../../contexts/Partners" 

import { Link } from "react-router-dom"
import Carousel from "../../../components/Carousel/Carousel"

import "./ProductCard.css"

type ProductCardType = Pick<
    ProductType,
    "id" |
    "name" |
    "price" |
    "stock" |
    "thumbnails"
> & {location: string, partnerId: string,}

const ProductCard = ({
    location,
    partnerId,
    id,
    name,
    price,
    stock,
    thumbnails
}:ProductCardType) => {
  return <div className="product-card__container">
    <div className="product-card--top">
        <Carousel 
          title={name}
          photos={thumbnails}
        />
    </div>
    <div className="product-card--middle">
        <h1 className="product-card__title">
            {name}
        </h1>
        <div className="product-card__info">
          <span className="product-card__price">
            {`$${price}`}
          </span>
          <span className="product-card__stock">
            {stock == "unlimited" ? null : `${stock} available`}
          </span>
        </div>
    </div>
    <div className="product-card--bottom">
      <Link
        to={`/product?location=${location}&partner=${partnerId}&product=${id}`}
        className="btn btn--primary btn--add-to-cart"
      >
        Add to cart
      </Link>
    </div>
  </div>
}

export default ProductCard
