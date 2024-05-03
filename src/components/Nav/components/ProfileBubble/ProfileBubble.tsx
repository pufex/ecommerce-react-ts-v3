import { useState } from "react";
import { useAuth } from "../../../../contexts/Auth";

import UnloggedMenu from "./components/UnloggedMenu/UnloggedMenu";
import LoggedMenu from "./components/LoggedMenu/LoggedMenu";

import "./ProfileBubble.css"

const ProfileBubble = () => {

    const {currentUser} = useAuth();

    const [display, setDisplay] = useState<boolean>(false);

    const handleSwitchDisplay = () => {
        setDisplay(previous => !previous)
    }

    return <>
        <div className="profile-bubble__container">
            <div
                className="profile-bubble"
                onClick={handleSwitchDisplay}
            />
                {
                    display 
                        && <>
                            {
                                !currentUser
                                    ? <UnloggedMenu 
                                        onClose={handleSwitchDisplay}
                                        onChoice={handleSwitchDisplay}
                                    />
                                    : <LoggedMenu 
                                        onClose={handleSwitchDisplay}
                                        username={currentUser.displayName ?? undefined}
                                    />
                            }
                        </>
                }
        </div>
    </>
}

export default ProfileBubble
