import { useState } from "react";
import { useAuth } from "../../../../../../contexts/Auth";
import { useIconsContext } from "../../../../../../contexts/Icon";

import "./LoggedMenu.css"

type LoggedMenuProps = {
    username?: string,
    onClose: () => void;
}

// https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithpopup

const LoggedMenu = ({
    username,
    onClose,
}:LoggedMenuProps) => {

    const [error, setError] = useState<boolean | string>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const { logout } = useAuth()

    const {
        MdOutlineLogout
    } = useIconsContext()

    const handleLogout = async () => {
        try{
            error
            setLoading(true)
            await logout();
            window.location.reload();
        }catch{
            setError("Failed to log out.")
        }
        setLoading(false)
    }

    return <>
        <div 
            className="logged-menu__event-capturer"
            onClick={onClose}
        ></div>
        <div className="logged-menu__container">
            <header className="logged-menu__header">
                <h1 className="logged-menu__heading">
                    Logged in
                </h1>
                {
                    username 
                        && <p className="logged-menu__paragraph">
                            Hello, {username}!
                        </p>
                }
            </header>
            <div className="logged-menu__options">
                <button
                    className="btn logged-menu__option"
                    onClick={handleLogout}
                    disabled={loading}
                >
                    <span className="logged-menu__option-title">
                        Log out
                    </span>
                    <MdOutlineLogout 
                        className="logged-menu__icon-logout"
                        size={20}
                    />
                </button>
            </div>
        </div>
    </>
    
}

export default LoggedMenu
