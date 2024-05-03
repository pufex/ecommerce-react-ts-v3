import type { InputTextType } from "../../types/types"

import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../../contexts/Auth"

import FormComponent from "../../components/FormComponent/FormComponent"
import Input from "../../components/Input/Input"

import "./Login.css"

const Login = () => {

    const [searchParams] = useSearchParams();

    const redirectParam = searchParams.get("redirect")

    const navigate = useNavigate();

    const {
        login
    } = useAuth();

    const [error, setError] = useState<boolean | string>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const [email, setEmail] = useState<InputTextType>({
        value: "",
        isError: false,
        errorMessage: "Invalid Email"
    });

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        setEmail({...email,
            value
        })
    }

    const [password, setPassword] = useState<InputTextType>({
        value: "",
        isError: false,
        errorMessage: "Invalid Email"
    });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        setPassword({...password,
            value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);
        setEmail({...email, isError: false})
        setPassword({...password, isError: false})

        let shouldReturn = false;

        if(!password.value.length){
            shouldReturn = true;
            setPassword({...password,
                isError: true,
                errorMessage: "Can't be empty"
            })
        }

        if(!email.value.length){
            shouldReturn = true;
            setEmail({...email,
                isError: true,
                errorMessage: "Can't be empty"
            })
        }

        if(shouldReturn) return

        try{
            setLoading(true);
            await login(email.value, password.value);
            if(!redirectParam)
                navigate("/")
            else navigate(`/${redirectParam}`)

        }catch{
            return setError("Failed to log in.")
        }

        setLoading(false)

    }

    return <main className="login-page__main">
        <section className="login-page__form-container">
            <FormComponent
                onSubmit={handleSubmit}
                title="Log In"
                isError={typeof error == "string"}
                errorMessage={typeof error == "string" ? error : undefined}
            >   
                <div className="login-page__form__group">
                    <div className="login-page__form__input-container">
                        <Input
                            value={email.value}
                            placeholder="Your email"
                            onChange={handleEmailChange}
                            isError={email.isError}
                            errorMessage={email.errorMessage}
                        >
                            Email
                        </Input>
                    </div>
                    <div className="login-page__form__input-container">
                        <Input
                            value={password.value}
                            placeholder="Your password"
                            onChange={handlePasswordChange}
                            isError={password.isError}
                            errorMessage={password.errorMessage}
                            isPassword={true}
                        >
                            Password
                        </Input>
                    </div>
                </div>
                <div className="login-page__form__submit-container">
                    <button
                        className="btn btn--primary login-page__form__submit"                    
                        type="submit"
                        disabled={loading}
                    >
                        Log In
                    </button>
                </div>
            </FormComponent>
        </section>
    </main>
}

export default Login
