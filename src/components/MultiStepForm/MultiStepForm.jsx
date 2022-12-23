import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { AboutYou } from "../FormSteps/AboutYou";
import { UserAddress } from "../FormSteps/UserAddress";
import { UserIdentification } from "../FormSteps/UserIdentification"
import "./styles.css"
export function MultiStepForm(){

    // used to navigate to "Usuário criado" page
    const navigate = useNavigate();

    const [formStep, setFormStep] = useState(0);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isFirstAttempt, setIsFirstAttempt] = useState(true);

    // progress bar name and icon name
    const formTitles = [
        { icon: "user", name: "Identificação do Usuário"},
        { icon: "home", name:"Endereço do usuário"},
        { icon: "sheet", name:"Sobre você"}
    ]

    // control form page to show
    function DisplayFormStep(){
        switch(formStep){
            case 0 :
                return (
                    <UserIdentification 
                        handleValidationConfirmation={handleValidationConfirmation}
                        handleInputErrorClass={handleInputErrorClass}
                    />
                )
            case 1 :
                return (
                    <UserAddress 
                        handleValidationConfirmation={handleValidationConfirmation} 
                        handleInputErrorClass={handleInputErrorClass}
                    />      
                )
            case 2 :
                return (
                    <AboutYou 
                        handleValidationConfirmation={handleValidationConfirmation} 
                        handleInputErrorClass={handleInputErrorClass}
                     />
                )
            default:
                break;
        }
    }

    // go to next step
    function handleNextStep(){
        if(formStep < formTitles.length - 1 && formStep >= 0){
            setIsFirstAttempt(true);
            setFormStep(formStep + 1)
        }
    }

    // go to previous step
    function handlePreviousStep(){
        if(formStep > 0){
            setIsFirstAttempt(false);
            setFormStep(formStep - 1)
        }
    }

    // used to lock or not user on page until all inputs on specific page are valid
    function handleValidationConfirmation(isValid){
        setIsFormValid(isValid);
    }

    // used on "FormSteps" components to show or not the inputs error messages
    function handleInputErrorClass( valid ){
        if(!isFirstAttempt){
            if(valid) {
                return true
            }
            return false
        }
        return true
    }

    // provide the icon ( copy pasted from figma ) to show on progress bar on a cleaner way. 
    function IconsProvider(icon, index){
        switch(icon){
            case "user":
                return (
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                            d="M3.38999 14.539C2.00145 13.5598 0.960735 12.1639 0.418622 10.5537C-0.123492 8.9434 -0.138846 7.20234 0.374786 5.58276C0.888417 3.96318 1.90435 2.54919 3.27541 1.54565C4.64646 0.542115 6.30141 0.00115967 8.00049 0.00115967C9.69956 0.00115967 11.3545 0.542115 12.7256 1.54565C14.0966 2.54919 15.1126 3.96318 15.6262 5.58276C16.1398 7.20234 16.1245 8.9434 15.5824 10.5537C15.0402 12.1639 13.9995 13.5598 12.611 14.539L14.694 19.299C14.7274 19.3752 14.7413 19.4585 14.7344 19.5415C14.7275 19.6244 14.7001 19.7043 14.6545 19.7739C14.6089 19.8435 14.5467 19.9007 14.4734 19.9401C14.4001 19.9796 14.3182 20.0002 14.235 20H1.76499C1.6819 20.0001 1.6001 19.9795 1.52697 19.9401C1.45383 19.9007 1.39168 19.8436 1.34612 19.7742C1.30056 19.7047 1.27303 19.6249 1.26603 19.5422C1.25902 19.4594 1.27275 19.3761 1.30599 19.3L3.38899 14.539H3.38999ZM4.11899 8.97C4.33654 9.83449 4.83649 10.6016 5.53956 11.1497C6.24262 11.6977 7.10855 11.9953 7.99999 11.9953C8.89143 11.9953 9.75735 11.6977 10.4604 11.1497C11.1635 10.6016 11.6634 9.83449 11.881 8.97L9.94099 8.48499C9.83333 8.91836 9.58374 9.30323 9.23198 9.57829C8.88022 9.85336 8.44652 10.0028 7.99999 10.0028C7.55345 10.0028 7.11976 9.85336 6.768 9.57829C6.41624 9.30323 6.16665 8.91836 6.05899 8.48499L4.11899 8.97Z" 
                            fill={formStep > index ? "#00AE63" : formStep === index ? "#5357B1" : "#8C98A9"}
                        />
                    </svg>
                )
            case "home":
                return (
                    <svg className = {formStep === index ? "current-step" : "current-step"} 
                        width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                            d="M19 19C19 19.2652 18.8946 19.5196 18.7071 19.7071C18.5196 19.8946 18.2652 20 18 20H4C3.73478 20 3.48043 19.8946 3.29289 19.7071C3.10536 19.5196 3 19.2652 3 19V10H0L10.327 0.611996C10.5111 0.444474 10.7511 0.351639 11 0.351639C11.2489 0.351639 11.4889 0.444474 11.673 0.611996L22 10H19V19ZM10 12V18H12V12H10Z" 
                            fill={formStep > index ? "#00AE63" : formStep === index ? "#5357B1" : "#8C98A9"}
                        />
                    </svg>
                )
            case "sheet":
                return (
                    <svg className = {formStep === index ? "current-step" : "current-step"}
                        width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                            d="M18 7V18.993C18.0009 19.1243 17.976 19.2545 17.9266 19.3762C17.8772 19.4979 17.8043 19.6087 17.7121 19.7022C17.6199 19.7957 17.5101 19.8701 17.3892 19.9212C17.2682 19.9723 17.1383 19.9991 17.007 20H0.993C0.729813 20 0.477391 19.8955 0.291196 19.7095C0.105001 19.5235 0.000265042 19.2712 0 19.008V0.992C0 0.455 0.447 0 0.998 0H11V6C11 6.26522 11.1054 6.51957 11.2929 6.70711C11.4804 6.89464 11.7348 7 12 7H18ZM18 5H13V0.00300002L18 5ZM5 5V7H8V5H5ZM5 9V11H13V9H5ZM5 13V15H13V13H5Z" 
                            fill={formStep > index ? "#00AE63" : formStep === index ? "#5357B1" : "#8C98A9"}
                        
                        />
                    </svg>
                )
            default:
                break;
        }   
    }

    return (
    <form className="card">
        <header>
            <h1>Criação de usuário</h1>
        </header>
        <section className="form-steps-progress">
            <ul>
            {formTitles.map( (title, index) => (
                    <li key={index}>
                        <div className="icon-container">
                            {IconsProvider(title.icon, index)}
                        </div>
                        <span>{title.name}</span>
                    </li>
                )
            )}
            </ul>
        </section>
        {DisplayFormStep()}
        <footer className="form-button-container">
            <button
                className={`${formStep === 0 ? "hidden" : ""} form-button button-previous`}
                type="button"
                onClick={ ()=>handlePreviousStep() }
            >Anterior</button>
            <button 
                className="form-button button-next" 
                type="button"
                onClick = { 
                    !isFormValid 
                        ? () => setIsFirstAttempt(false)
                        : formStep === formTitles.length -1 
                            ? () => navigate("/success") 
                            : ()=> handleNextStep() } 
            >Proximo passo</button>
        </footer>
    </form>
    )
}