import { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"
import { useDatabase } from "../../contexts/Database";
import { useCart } from "../../hooks/useCart";

import { Link } from "react-router-dom";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import CartItem from "./CartItem/CartItem";

import { calculateProvision } from "../../utils/calculateProvision";

import "./Cart.css"

const Cart = () => {

    const navigate = useNavigate();

    const {partners} = useDatabase();

    const [searchParams] = useSearchParams();
    const partnerId = searchParams.get("partner")!;

    if(!partnerId)
    return <ErrorComponent />


    const partner = useMemo(() => {

        return partners?.
            find(({id}) => id == partnerId);
    }, [partners])
    const {
        cart, 
        removeFromCart, 
        incrementInCart, 
        decrementInCart
    } = useCart(partnerId);
    
    let inTotal = useMemo(() => cart.cart?.reduce((accumulator, {price, amount}) => accumulator + price * amount, 0,)
    , [cart])
    
    let provision = calculateProvision(inTotal)
    
    if(cart.cart?.length <= 0)
    return <main className="cart-page__main">
        <div className="cart-page__empty-cart">
            <h1 className="cart-page__empty-message">
                Your cart is empty!
            </h1>
            <button
                className="btn btn--link-like cart-page__link"
                onClick={() => navigate(-1)}
            >
                Go back.
            </button>
        </div>
    </main>

    return <main className="cart-page__main">
        <div className="cart-page__go-back-container">
            <button
                className="btn btn--primary cart-page__go-back"
                onClick={() => navigate(-1)}
            >
                Go back
            </button>
        </div>
        <summary className="cart-page__section cart-page__cart-summary">
            <h1 className="cart-summary__heading">
                Summary:
            </h1>
            <span className="cart-summary__information">
                {`Partner: ${partner?.name}`}
            </span>
            <ul className="cart-summary__list">
                <li className="cart-summary__list-item">
                    {`Total value of cart: $${inTotal.toFixed(2)}`}
                </li>
                <li className="cart-summary__list-item">
                    {`Our provision: $${provision.toFixed(2)}`}
                </li>
            </ul>
            <h2 className="cart-summary__total">
                {`Total: $${(inTotal+provision).toFixed(2)}`}
            </h2>
        </summary>
        <section className="cart-page__section cart-page__cart-content">
            {
                cart?.cart.map(({
                    id,
                    name,
                    price,
                    thumbnails,
                    amount
                }) => {
                    return <CartItem
                        id={id}
                        name={name}
                        price={price}
                        thumbnails={thumbnails}
                        amount={amount}
                        removeFromCart={removeFromCart}
                        incrementInCart={incrementInCart}
                        decrementInCart={decrementInCart}
                    />
                })
            }
        </section>
        <section className="cart-page__section cart-page__submit-container">
            <Link
                to={`/pay-form?partner=${partnerId}`}
                className="btn btn--primary cart-page__pay-now"
            >
                Pay now!
            </Link>
        </section>
    </main>
}

export default Cart
