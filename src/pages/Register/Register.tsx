import type { InputTextType } from "../../types/types"

import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../../contexts/Auth"

import FormComponent from "../../components/FormComponent/FormComponent"
import Input from "../../components/Input/Input"

import "./Register.css"

const Register = () => {

    const [searchParams] = useSearchParams();

    const redirectParam = searchParams.get("redirect")

    const navigate = useNavigate();

    const {
        register,
        giveusername,
    } = useAuth();

    const [error, setError] = useState<boolean | string>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const [username, setUsername] = useState<InputTextType>({
        value: "",
        isError: false,
        errorMessage: "Invalid username"
    });

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        setUsername({...username,
            value
        })
    }

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
        errorMessage: "Invalid Password"
    });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        setPassword({...password,
            value
        })
    }

    const [confirmPassword, setConfirmPassword] = useState<InputTextType>({
        value: "",
        isError: false,
        errorMessage: "Invalid"
    });

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        setConfirmPassword({...confirmPassword,
            value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);
        setEmail({...email, isError: false})
        setPassword({...password, isError: false})

        let shouldReturn = false;

        
        if(!username.value.length){
            shouldReturn = true;
            setUsername({...username,
                isError: true,
                errorMessage: "Can't be empty",
            })
        }

        if(!email.value.length){
            shouldReturn = true;
            setEmail({...email,
                isError: true,
                errorMessage: "Can't be empty",
            })
        }

        if(!password.value.length){
            shouldReturn = true;
            setPassword({...password,
                isError: true,
                errorMessage: "Can't be empty"
            })
        }

        if(!confirmPassword.value.length){
            shouldReturn = true;
            setConfirmPassword({...confirmPassword,
                isError: true,
                errorMessage: "Can't be empty"
            })
        }

        if(shouldReturn) return

        if(confirmPassword.value != password.value){
            setConfirmPassword({...confirmPassword,
                isError: true,
                errorMessage: "Doesn't match"
            })
            setError("Passwords don't match")
            return;
        }
        
        try{
            setLoading(true);
            await register(email.value, password.value);
            await giveusername(username.value)
            if(!redirectParam)
                navigate("/")
            else navigate(`/${redirectParam}`)

        }catch{
            return setError("Failed to register.")
        }

        setLoading(false)
    }

    return <main className="login-page__main">
        <section className="login-page__form-container">
            <FormComponent
                onSubmit={handleSubmit}
                title="Register"
                isError={typeof error == "string"}
                errorMessage={typeof error == "string" ? error : undefined}
            >   
                <div className="login-page__form__group">
                    <div className="login-page__form__input-container">
                        <Input
                            value={username.value}
                            placeholder="Your username"
                            onChange={handleUsernameChange}
                            isError={username.isError}
                            errorMessage={username.errorMessage}
                        >
                            Username
                        </Input>
                    </div>
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
                    <div className="login-page__form__input-container">
                        <Input
                            value={confirmPassword.value}
                            placeholder="Confirm Password"
                            onChange={handleConfirmPasswordChange}
                            isError={confirmPassword.isError}
                            errorMessage={confirmPassword.errorMessage}
                            isPassword={true}
                        >
                            Confirm Password
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

export default Register
