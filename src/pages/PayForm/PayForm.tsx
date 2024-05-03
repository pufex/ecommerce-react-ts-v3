import type { ChangeEvent } from "react"

import { useState, useRef } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useCart } from "../../hooks/useCart"
import { usePartnersContext } from "../../contexts/Partners"

import ErrorComponent from "../../components/ErrorComponent/ErrorComponent"
import FormComponent from "../../components/FormComponent/FormComponent"
import Input from "../../components/Input/Input"
import Radio from "../../components/Radio/Radio"
import DropdownWithContent from "../../components/DropdownWithContent/DropdownWithContent"
import PayFormProduct from "./components/PayFormProduct/PayFormProduct"

import { countDigits } from "../../utils/countDigits"

import { digitsWithCharsArray } from "../../utils/digitsWithCharsArray"

import "./PayForm.css"

type InputStateType = {
    value: string,
    isInvalid: boolean,
}

type PaymentMethods =
    "unset" |
    "cod" |
    "credit-card"

const PayForm = () => {

    let navigate = useNavigate();

    const [firstDropDisplay, setFirstDropDisplay] = useState<boolean>(true)
    const [secondDropDisplay, setSecondDropDisplay] = useState<boolean>(false)
    const [thirdDropDisplay, setThirdDropDisplay] = useState<boolean>(false)

    const firstDropRef = useRef<HTMLDivElement | null>(null);
    const secondDropRef = useRef<HTMLDivElement | null>(null);

    const [nameInput, setNameInput] = useState<InputStateType>({
        value: "",
        isInvalid: false,
    })

    const validateNameLike = (changed: string): boolean => {
        let isInvalid = false;
        if(!changed.match(/[A-Z][a-z]+$/) || changed.length == 0)
            isInvalid = true;
        return isInvalid;
    }

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNameInput({...nameInput, value, isInvalid: validateNameLike(value)});
    }

    const [surnameInput, setSurnameInput] = useState<InputStateType>({
        value: "",
        isInvalid: false,
    })

    const handleSurnameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSurnameInput({...surnameInput, value, isInvalid: validateNameLike(value)});
    }

    const [addressInput, setAddressInput] = useState<InputStateType>({
        value: "",
        isInvalid: false,
    })

    const validateAddress = (changed: string) => {
        let isInvalid = false;
        if(changed.length == 0)
            isInvalid = true;
        return isInvalid
    }

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAddressInput({...addressInput, 
            value,
            isInvalid: validateAddress(value)
        });
    }

    const [postCodeInput, setPostCodeInput] = useState<InputStateType>({
        value: "",
        isInvalid: false,
    })

    const validateCode = (changed: string) => {

        let str = changed;
        if(isNaN(Number(str[str.length-1])))
            str = str.slice(0,str.length-1)

        let isInvalid = false;
        switch(str.length){
            case 0:
                isInvalid = true;
                break;
            case 3: 
                if(!str.includes("-"))
                    str = str.slice(0,2) + "-" + str.slice(2);
                break;
            case 6: 
                if(!str.includes("-")) isInvalid = true;
                break;
            default: isInvalid = true;
        }
        if(str[2] != "-")
            isInvalid = true;
        return [str, isInvalid] as const;
    }

    const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let [newValue, isInvalid] = validateCode(value)
        if(value.length <= 6)
            setPostCodeInput({...postCodeInput, value: newValue, isInvalid})
    }

    const [cityInput, setCityInput] = useState<InputStateType>({
        value: "",
        isInvalid: false,
    })

    const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        setCityInput({...cityInput, value, isInvalid: validateNameLike(value)})
    }
 
    const [emailInput, setEmailInput] = useState<InputStateType>({
        value: "",
        isInvalid: false,
    })

    const validateEmail = (changed: string) => {
        let isInvalid = false;
        if(
            !String(changed)
                .toLowerCase()
                .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            || changed.length == 0
        ) isInvalid = true
        return isInvalid;
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        setEmailInput({...emailInput, value, isInvalid: validateEmail(value)})
    }

    const [phoneInput, setPhoneInput] = useState<InputStateType>({
        value: "",
        isInvalid: false,
    })

    const validatePhone = (changed: string) => {
        const digits = [0,1,2,3,4,5,6,7,8,9];
        let str = changed;
        let isInvalid = false;

        if(!digits.includes(parseFloat(str[str.length-1])))
            str = str.slice(0, str.length-1)

        if(countDigits(str) != 9 || str == "")
            isInvalid = true;
        return [str, isInvalid] as const
    }

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        const [newValue, isInvalid] = validatePhone(value);
        setPhoneInput({...phoneInput, value: newValue, isInvalid})
    }

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>("unset");

    const [cardNumberInput, setCardNumberInput] = useState<InputStateType>({
        value: "",
        isInvalid: false,
    })

    const validateCreditCardNumber = (changed: string) => {
        const digits = [0,1,2,3,4,5,6,7,8,9];
        let value = changed;
        let isInvalid = false;

        if(!digits.includes(parseFloat(value[value.length-1])))
            value = value.slice(0, value.length-1)

        if(countDigits(value) != 16)
            isInvalid = true;

        return [value, isInvalid] as const
    }

    const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        const [newValue, isInvalid] = validateCreditCardNumber(value);
        setCardNumberInput({...cardNumberInput, value: newValue, isInvalid})
    }


    const [cardHolderFullnameInput, setCardHolderFullnameInput] = useState<InputStateType>({
        value: "",
        isInvalid: false,
    })

    const validateFullname = (changed: string) => {
        let isInvalid = false;
        const regex = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
        if(changed == "" || !changed.match(regex))
            isInvalid = true;
        return isInvalid;
    }

    const handleFullnameChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        setCardHolderFullnameInput({...cardHolderFullnameInput, 
            value, 
            isInvalid: validateFullname(value),
        })
    }

    const [cvvInput, setCvvInput] = useState<InputStateType>({
        value: "",
        isInvalid: false,
    })

    const validateCvv = (changed: string) => {
        let str = changed;
        let isInvalid = false;

        if(!digitsWithCharsArray.includes(str[str.length-1])){
            console.log("Condition fulfilled.")
            str = str.slice(0, str.length-1);
        }



        return [str, isInvalid] as const
    }

    const handleCvvChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const [newValue, isInvalid] = validateCvv(value);

        setCvvInput({...cvvInput,
            value: newValue,
            isInvalid,
        })
    }

    const [cardHolderEmailInput, setCardHolderEmailInput] = useState<InputStateType>({
        value: "",
        isInvalid: false,
    })

    const handleCardEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCardHolderEmailInput({...cardHolderEmailInput,
            value,
            isInvalid: validateEmail(value)
        })
    }

    const [searchParams] = useSearchParams();
    const partnerId = searchParams.get("partner")!


    const partner =
        usePartnersContext()
            .find(({ id }) => id == partnerId)

    const { cart, clearCart } = useCart(partnerId);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let shouldReturn = false;
        let navigateTo = 0

        if(nameInput.isInvalid || validateNameLike(nameInput.value)){
            shouldReturn = true;
            if(navigateTo == 0)
                navigateTo = 1;
            setNameInput({...nameInput, isInvalid: true})
        }
        if(surnameInput.isInvalid || validateNameLike(surnameInput.value)){
            shouldReturn = true;
            if(navigateTo == 0)
                navigateTo = 1;
            setSurnameInput({...surnameInput, isInvalid: true})
        }
        if(addressInput.isInvalid || validateAddress(addressInput.value)){
            shouldReturn = true;
            if(navigateTo == 0)
                navigateTo = 1;
            setAddressInput({...addressInput, isInvalid: true})
        }
        if(postCodeInput.isInvalid || validateCode(postCodeInput.value)[1]){
            shouldReturn = true;
            if(navigateTo == 0)
                navigateTo = 1;
            setPostCodeInput({...postCodeInput, isInvalid: true})
        }
        if(cityInput.isInvalid || validateNameLike(cityInput.value)){
            shouldReturn = true;
            if(navigateTo == 0)
                navigateTo = 1;
            setCityInput({...cityInput, isInvalid: true})
        }
        if(emailInput.isInvalid || validateEmail(emailInput.value)){
            shouldReturn = true;
            if(navigateTo == 0)
                navigateTo = 1;
            setEmailInput({...emailInput, isInvalid: true})
        }
        if(phoneInput.isInvalid || validatePhone(phoneInput.value)[1]){
            shouldReturn = true;
            if(navigateTo == 0)
                navigateTo = 1;
            setPhoneInput({...phoneInput, isInvalid: true})
        }
        if(paymentMethod == "credit-card"){
            if(cardNumberInput.isInvalid || validateCreditCardNumber(cardNumberInput.value)[1]){
                shouldReturn = true;
                if(navigateTo == 0)
                    navigateTo = 2;
                setCardNumberInput({...cardNumberInput, isInvalid: true})
            }
            if(cardHolderFullnameInput.isInvalid || validateFullname(cardHolderFullnameInput.value)){
                shouldReturn = true;
                if(navigateTo == 0)
                    navigateTo = 2;
                setCardHolderFullnameInput({...cardHolderFullnameInput, 
                    isInvalid: true
                })
            }
            if(cvvInput.isInvalid || validateCvv(cvvInput.value)[1]){
                shouldReturn = true;
                if(navigateTo == 0)
                    navigateTo = 2;
                setCvvInput({...cvvInput, isInvalid: true})
            }
            if(cardHolderEmailInput.isInvalid || validateEmail(cardHolderEmailInput.value)){
                shouldReturn = true;
                if(navigateTo == 0)
                    navigateTo = 2;
                setCardHolderEmailInput({...cardHolderEmailInput, isInvalid: true})
            }
        }

        switch(navigateTo){
            case 1:
                setFirstDropDisplay(true)
                setSecondDropDisplay(true) 
                firstDropRef.current?.scrollIntoView({behavior: "smooth"})
                break; 
            case 2:
                setSecondDropDisplay(true) 
                secondDropRef.current?.scrollIntoView({behavior: "smooth"})
                break; 
            default: break;
        }

        if(shouldReturn) return

        clearCart();
        navigate("/conclusion")

    }

    if (!searchParams.get("partner"))
        return <ErrorComponent />

    

    return <main className="pay-form__main">
        <h1 className="pay-form__heading">
            {`Your check-out for ${partner?.name}:`}
        </h1>
        <section className="pay-form__form-container">
            <FormComponent
                onSubmit={handleSubmit}
            >
                <DropdownWithContent
                    title="1. Your credentials"
                    display={firstDropDisplay}
                    switchDisplay={() => setFirstDropDisplay(previous => !previous)}
                    ref={firstDropRef}
                >
                    <div className="pay-form__dropdown-content">
                        <div className="pay-form__double-input-container">
                            <Input

                                placeholder={"Your name"}
                                isError={nameInput.isInvalid}
                                errorMessage="Invalid Name"
                                value={nameInput.value}
                                onChange={handleNameChange}
                            >
                                Name
                            </Input>
                            <Input
                                placeholder={"Your surname"}
                                isError={surnameInput.isInvalid}
                                errorMessage="Invalid Surname"
                                value={surnameInput.value}
                                onChange={handleSurnameChange}
                            >
                                Surname
                            </Input>
                        </div>
                        <div className="pay-form__input-container">
                            <Input
                                placeholder={"Your address"}
                                isError={addressInput.isInvalid}
                                errorMessage="Invalid address"
                                value={addressInput.value}
                                onChange={handleAddressChange}
                            >
                                Address
                            </Input>
                        </div>
                        <div className="pay-form__double-input-container">
                            <Input
                                placeholder={"Post code"}
                                isError={postCodeInput.isInvalid}
                                errorMessage="Invalid Code"
                                value={postCodeInput.value}
                                onChange={handleCodeChange}
                            >
                                Post code
                            </Input>
                            <Input
                                placeholder={"City"}
                                value={cityInput.value}
                                isError={cityInput.isInvalid}
                                errorMessage="Invalid City"
                                onChange={handleCityChange}
                            >
                                City
                            </Input>
                        </div>
                        <div className="pay-form__input-container">
                            <Input
                                placeholder={"Your Email Address"}
                                isError={emailInput.isInvalid}
                                errorMessage="Invalid email"
                                value={emailInput.value}
                                onChange={handleEmailChange}
                            >
                                Email
                            </Input>
                        </div>
                        <div className="pay-form__input-container">
                            <Input
                                placeholder={"Your Phone Number"}
                                isError={phoneInput.isInvalid}
                                errorMessage="Invalid Phone"
                                value={phoneInput.value}
                                onChange={handlePhoneChange}
                            >
                                Phone number
                            </Input>
                        </div>
                    </div>
                </DropdownWithContent>
                <DropdownWithContent
                    title="2. Payment Method"
                    display={secondDropDisplay}
                    switchDisplay={() => setSecondDropDisplay(previous => !previous)}
                    ref={secondDropRef}
                >
                    <div className="pay-form__radios-container">
                        <Radio
                            groupValue={paymentMethod}
                            heldValue={"cod"}
                            onChoice={() => setPaymentMethod("cod")}
                            height={4}
                        >
                            COD (Cash on arrival)
                        </Radio>
                        <Radio
                            groupValue={paymentMethod}
                            heldValue={"credit-card"}
                            onChoice={() => setPaymentMethod("credit-card")}
                            height={4}
                        >
                            Credit Card
                        </Radio>
                    </div>
                    {
                        paymentMethod == "credit-card"
                            ? <div className="pay-form__credit-card-credentials">
                                <h1 className="pay-form__credit-card-credentials__heading">
                                    Card Holder's Credentials
                                </h1>
                                <div className="pay-form__input-container">
                                    <Input
                                        placeholder={"Your Credit Card Number"}
                                        isError={cardNumberInput.isInvalid}
                                        errorMessage="Invalid Card Number"
                                        value={cardNumberInput.value}
                                        onChange={handleCardNumberChange}
                                    >
                                        Card Number
                                    </Input>
                                </div>
                                <div className="pay-form__double-input-container">
                                    <Input
                                        placeholder={"Your Fullname"}
                                        isError={cardHolderFullnameInput.isInvalid}
                                        errorMessage="Invalid"
                                        value={cardHolderFullnameInput.value}
                                        onChange={handleFullnameChange}
                                    >
                                        Full name
                                    </Input>
                                    <Input
                                        placeholder={"CVV code"}
                                        isError={cvvInput.isInvalid}
                                        errorMessage="Invalid CVV"
                                        value={cvvInput.value}
                                        onChange={handleCvvChange}
                                    >
                                        CVV
                                    </Input>
                                </div>
                                <div className="pay-form__input-container">
                                    <Input
                                        placeholder={"Your Email Address"}
                                        isError={cardHolderEmailInput.isInvalid}
                                        errorMessage="Invalid Email"
                                        value={cardHolderEmailInput.value}
                                        onChange={handleCardEmailChange}
                                    >
                                        Email Address
                                    </Input>
                                </div>
                            </div>
                            : <></>
                    }
                </DropdownWithContent>
                <DropdownWithContent
                    title="3. Summary"
                    display={thirdDropDisplay}
                    switchDisplay={() => setThirdDropDisplay(previous => !previous)}
                >
                    <summary className="pay-form__summary">
                        <h1 className="pay-form__summary-heading">
                            Your credentials
                        </h1>
                        <div className="pay-form__summary-credentials-container">
                            <ul className="pay-form__summary-list">
                                <li className="pay-form__summary-list-item">
                                    {`${nameInput.value} ${surnameInput.value}`}
                                </li>
                                <li className="pay-form__summary-list-item">
                                    {`${addressInput.value}`}
                                </li>
                                <li className="pay-form__summary-list-item">
                                    {`${postCodeInput.value}`}
                                </li>
                                <li className="pay-form__summary-list-item">
                                    {`${cityInput.value}`}
                                </li>
                                <li className="pay-form__summary-list-item">
                                    {`${emailInput.value}`}
                                </li>
                                <li className="pay-form__summary-list-item">
                                    {`${phoneInput.value}`}
                                </li>
                            </ul>
                            <ul className="pay-form__summary-list">
                                <li className="pay-form__summary-list-item">
                                    {`Payment Method: ${function () {
                                        switch (paymentMethod) {
                                            case "cod":
                                                return "COD"
                                            case "credit-card":
                                                return "Credit Card"
                                            default:
                                                return "Unset"
                                        }
                                    }()
                                        }`}
                                </li>
                                {
                                    paymentMethod == "credit-card"
                                        ? <>
                                            <li className="pay-form__summary-list-item">
                                                {`${cardHolderFullnameInput.value}`}
                                            </li>
                                            <li className="pay-form__summary-list-item">
                                                {`${cardNumberInput.value}`}
                                            </li>
                                            <li className="pay-form__summary-list-item">
                                                {`${cvvInput.value}`}
                                            </li>
                                            <li className="pay-form__summary-list-item">
                                                {`${cardHolderEmailInput.value}`}
                                            </li>
                                        </>
                                        : null
                                }
                            </ul>
                        </div>
                        <div className="pay-form__cart-products">
                            {
                                cart?.cart.map(({
                                    name,
                                    thumbnails,
                                    price,
                                    amount,
                                }) => {
                                    return <PayFormProduct
                                        name={name}
                                        thumbnails={thumbnails}
                                        price={price}
                                        amount={amount}
                                    />
                                })
                            }
                        </div>
                        <button
                            className="btn btn--primary"
                            type="submit"
                        >
                            Submit
                        </button>
                    </summary>
                </DropdownWithContent>
            </FormComponent>
        </section>
    </main>
}

export default PayForm
