import { useContext, useEffect, useState } from "react";
import UserDataContext from "../../context/UserDataProvider";
import "./styles.css"

// Any alphabet letter; at least 1 digit; at least 1 uppercase letter; minimum 8 characters
const PASSWORD_REGEX = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.{8,})');

// general email regex copy paste (RFC 5322)
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// valid --> yyyy-mm-dd
const BIRTH_REGEX = new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}$");

export function UserIdentification({handleValidationConfirmation, handleInputErrorClass}){

    // user data context
    const {userData, setUserData} = useContext(UserDataContext)

    // states to track if inputs are valid
    const [validName, setValidName] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validPasswordConfirm, setValidPasswordConfirm] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validBirth, setValidBirth] = useState(false);

    // used by "Próximo passo" button to check if all inputs are valid
    useEffect(() => {
        handleValidationConfirmation(
            validName &&
            validPassword &&
            validPasswordConfirm &&
            validEmail &&
            validBirth
        )
    },[handleValidationConfirmation, validName, validPassword, validPasswordConfirm, validEmail, validBirth]) 


    // controls for inputs validation
    useEffect(() => {
        if(userData.nome)
            setValidName(true)
        else 
            setValidName(false)
    },[userData.nome])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(userData.senha))
    },[userData.senha])

    useEffect(()=> {
        setValidPasswordConfirm(userData.senha === userData.confirmarSenha && validPassword)
    },[userData.senha, userData.confirmarSenha, validPassword])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(userData.email))
    },[userData.email])

    useEffect(() => {
        let today = new Date();
        let todayYear = today.getFullYear();
        let [inputYear, inputMonth, inputDay] = userData.nascimento.split("-")
        setValidBirth(
            BIRTH_REGEX.test(userData.nascimento) && // if date format is 0000-00-00
            inputYear <= todayYear &&                
            inputMonth <= 12 && 
            inputDay <= 31
        )
    },[userData.nascimento])

    return (
        <section className="fields-container user-fields">
            <label className="nome-field"> 
                <span>
                    Nome
                    <span className={handleInputErrorClass(validName) ? "hidden" : ""}> *Obrigatório</span>
                </span>
                <input 
                    className={ handleInputErrorClass(validName) ? "" : "field-error" }
                    value={ userData.nome } 
                    onChange={ (e) => {setUserData( prev => ({ ...prev, "nome": e.target.value }))}}    
                />
            </label>
            <label className="senha1-field">
                <span>
                    Senha
                    <span className={handleInputErrorClass(validPassword) ? "hidden" : ""}> *Mínimo 8 caracteres, 1 letra maiúscula</span>
                </span>
                <input
                    className={ handleInputErrorClass(validPassword) ? "" : "field-error"}
                    type="password"
                    value={ userData.senha } 
                    onChange={(e) => setUserData( prev => ({ ...prev, "senha": e.target.value }))}
                />
            </label>
            <label className="senha2-field">
                <span>
                    Confirmar Senha
                    <span className={handleInputErrorClass(validPasswordConfirm) ? "hidden" : ""}> *Senhas não coincidem</span>
                </span>
                <input
                    className={ handleInputErrorClass(validPasswordConfirm) ? "" : "field-error" }
                    type="password"
                    value={ userData.confirmarSenha } 
                    onChange={(e) => setUserData( prev => ({ ...prev, "confirmarSenha": e.target.value }))}
                />
            </label>
            <label className="email-field">
                <span>
                    Email
                    <span className={handleInputErrorClass(validEmail) ? "hidden" : ""}> *Formato de email inválido</span>
                </span>
                <input
                    className={ handleInputErrorClass(validEmail) ? "" : "field-error" }
                    type="email"
                    value={ userData.email }  
                    onChange={(e) => setUserData( prev => ({ ...prev, "email": e.target.value }))}
                />
            </label>
            <label className="nascimento-field">
                <span>
                    Data de nascimento
                    <span className={handleInputErrorClass(validBirth) ? "hidden" : ""}> *Data inválida</span>
                </span>
                <input
                    type="date"
                    className={ handleInputErrorClass(validBirth) ? "" : "field-error" }
                    value={ userData.nascimento }
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setUserData((prev) => ({...prev, nascimento: e.target.value}))}
                />
            </label>
        </section>
    )
}