import { useContext, useState, useEffect } from "react";
import UserDataContext from "../../context/UserDataProvider";
import "./styles.css"

export function AboutYou({handleValidationConfirmation, handleInputErrorClass}){

    // user data context
    const {userData, setUserData} = useContext(UserDataContext)

    // states to track if inputs are valid
    const [validAbout, setValidAbout] = useState(false)
    
    // used by "Proximo passo" button to check if all inputs are valid
    useEffect(()=>{
        handleValidationConfirmation(
            validAbout
        )
    }, [handleValidationConfirmation, validAbout])

    // controls for inputs validation
    useEffect(()=>{
        if(userData.sobre)
            setValidAbout(true)
        else
            setValidAbout(false)
    },[userData.sobre])

    return (
        <section className="fields-container about-fields">
            <label className="sobre-field">
                <span>
                    Nos conte mais sobre você
                    <span className={handleInputErrorClass(validAbout) ? "hidden" : ""}> *Obrigatório</span>
                </span> 
                <textarea
                    className={ handleInputErrorClass(validAbout) ? "" : "field-error" } 
                    value={ userData.sobre } 
                    onChange={(e) => setUserData( prev => ({ ...prev, "sobre": e.target.value }))}
                />
            </label>
        </section>
    )
}