import type { CartProductType } from "../../hooks/useCart"

import {useLocation, useSearchParams, useNavigate} from "react-router-dom"
import { usePartnersContext } from "../../contexts/Partners"
import { useCart } from "../../hooks/useCart"

import ErrorComponent from "../../components/ErrorComponent/ErrorComponent"
import Carousel from "../../components/Carousel/Carousel"
import Amount from "../../components/Amount/Amount"

import "./Product.css"
import { useState } from "react"


const Product = () => {
    
    const {search} = useLocation();
    if(
        !search.includes("location=") ||
        !search.includes("partner=") ||
        !search.includes("product=")
    )
    return <ErrorComponent />
    
    const navigate = useNavigate();

    const [amount, setAmount] = useState<number>(1);

    const [searchParams] = useSearchParams();

    const location = searchParams.get("location")
    const partnerId = searchParams.get("partner")!
    const productId = searchParams.get("product")

    const product = usePartnersContext()
        .find(({id}) => id == partnerId)
        ?.products.products
        .find(({id}) => id == productId)!

    const { addToCart} = useCart(partnerId);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {id, name, stock, price, description, thumbnails} = product
        const newProduct: CartProductType = {
            id,
            name,
            stock,
            price,
            description,
            thumbnails,
            amount: 0,
        }
        addToCart(newProduct, amount);
        navigate(`/sales?location=${location}&partner=${partnerId}`)
    }

    const {
        name,
        price,
        description,
        thumbnails,
        stock,
    } = product

    return <main className="product-page__main">
        <div className="product-page__go-back-container">
            <button 
                className="btn btn--primary product-page__go-back"
                onClick={() => navigate(-1)}
            >
                Go back
            </button>
        </div>
        <form 
            className="product-page__form"
            onSubmit={handleSubmit}
        >
            <section className="product-page__thumbnails">
                <Carousel 
                    photos={thumbnails}
                />
            </section>
            <section className="product-page__specifics">
                <header className="product-page__header">
                    <h1 className="product-page__name">
                        {name}
                    </h1>
                    <span className="product-page__price">
                        {`$${price}`}
                    </span>
                </header>
                <p className="product-page__description">
                    {description}
                </p>
            </section>
            <section className="product-page__cart-settings">
                <div className="product-page__amount-container">
                    {
                        stock == "unlimited"
                            ? null
                            : <h1 className="amount__title">
                                {`In stock: ${stock}`}
                            </h1>
                    }
                    <Amount
                        value={amount}
                        onDecrease={() => setAmount(previous => 
                            previous > 0
                                ? previous-1
                                : previous
                        )}
                        onIncrease={() => setAmount(previous => previous + 1)}
                    />
                </div>
                <button 
                    className="btn btn--primary btn--in-product-page"
                    type="submit"
                >
                    Add to cart
                </button>
            </section>
        </form>
    </main>
}

export default Product
