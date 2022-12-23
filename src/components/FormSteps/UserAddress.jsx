import { useContext, useState, useEffect } from "react";
import UserDataContext from "../../context/UserDataProvider";
import "./styles.css"

// 00000-000
const CEP_REGEX = new RegExp("^[0-9]{5}-[0-9]{3}$");

// Any number; at least 1 digit
const NUMBER_REGEX = new RegExp('^[0-9]{1,}$');

export function UserAddress({handleValidationConfirmation, handleInputErrorClass }){

    // user data context
    const {userData, setUserData} = useContext(UserDataContext)

    // states to track if inputs are valid
    const [validCEP, setValidCEP] = useState(false);
    const [validStreet, setValidStreet] = useState(false);
    const [validNumber, setValidNumber] = useState(false);
    const [validBairro, setValidBairro] = useState(false);
    const [validCity, setValidCity] = useState(false);
    const [validReference, setValidReference] = useState(false);

    // used by "Proximo passo" button to check if all inputs are valid
    useEffect(()=>{
        handleValidationConfirmation(
            validCEP &&
            validStreet &&
            validNumber &&
            validBairro &&
            validCity &&
            validReference
        )
    }, [handleValidationConfirmation, validCEP, validStreet, validNumber, validBairro, validCity, validReference])


    // controls for inputs validation
    useEffect(()=>{
        setValidCEP(CEP_REGEX.test(userData.cep))
    },[userData.cep])

    useEffect(()=>{
        if(userData.rua)
            setValidStreet(userData.rua)
        else 
            setValidStreet(false)
    },[userData.rua])

    useEffect(()=>{
        setValidNumber(NUMBER_REGEX.test(userData.numero))
    },[userData.numero])

    useEffect(()=>{
        if(userData.bairro)
            setValidBairro(true)
        else
            setValidBairro(false)
    },[userData.bairro])

    useEffect(()=>{
        if(userData.cidade)
            setValidCity(true)
        else 
            setValidCity(false)
    },[userData.cidade])

    useEffect(()=>{
        if(userData.referencia)
            setValidReference(true)
        else
            setValidReference(false)
    },[userData.referencia])

    return (
        <section className="fields-container address-fields">
            <label className="cep-field">
                <span>
                    CEP
                    <span className={handleInputErrorClass(validCEP) ? "hidden" : ""}> *Formato 00000-000</span>
                </span> 
                <input
                    mask="00000-00"
                    className={ handleInputErrorClass(validCEP) ? "" : "field-error" }
                    value={ userData.cep } 
                    onChange={(e) => setUserData( prev => ({ ...prev, "cep": e.target.value }))}
                />
            </label>
            <label className="rua-field">
                <span>
                    Rua
                    <span className={handleInputErrorClass(validStreet) ? "hidden" : ""}> *Obrigatório</span>
                </span> 
                <input
                    className={ handleInputErrorClass(validStreet) ? "" : "field-error" }
                    value={ userData.rua } 
                    onChange={(e) => setUserData( prev => ({ ...prev, "rua": e.target.value }))}
                />
            </label>
            <div className="numero-bairro-field">
                <label className="numero-field">
                    <span>
                        Número
                        <span className={handleInputErrorClass(validNumber) ? "hidden" : ""}> *Inválido</span>
                    </span> 
                    <input
                        className={ handleInputErrorClass(validNumber) ? "" : "field-error" }
                        value={ userData.numero } 
                        onChange={(e) => setUserData( prev => ({ ...prev, "numero": e.target.value }))}
                    />
                </label>
                <label className="bairro-field">
                    <span>
                        Bairro
                        <span className={handleInputErrorClass(validBairro) ? "hidden" : ""}> *Obrigatório</span>
                    </span> 
                    <input
                        className={ handleInputErrorClass(validBairro) ? "" : "field-error" } 
                        value={ userData.bairro } 
                        onChange={(e) => setUserData( prev => ({ ...prev, "bairro": e.target.value }))}
                    />
                </label>
            </div>
            <label className="cidade-field">
                <span>
                    Cidade
                        <span className={handleInputErrorClass(validCity) ? "hidden" : ""}> *Obrigatório</span>
                </span> 
                <input 
                    className={ handleInputErrorClass(validCity) ? "" : "field-error" }
                    value={ userData.cidade } 
                    onChange={(e) => setUserData( prev => ({ ...prev, "cidade": e.target.value }))}
                />
            </label>
            <label className="referencia-field">
                <span>
                    Ponto de Referência
                    <span className={handleInputErrorClass(validReference) ? "hidden" : ""}> *Obrigatório</span>
                </span>
                <input 
                    className={ handleInputErrorClass(validReference) ? "" : "field-error" }
                    value={ userData.referencia } 
                    onChange={(e) => setUserData( prev => ({ ...prev, "referencia": e.target.value }))}
                />
            </label>
        </section>
    )
}