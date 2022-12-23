import "./styles.css"
import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import UserDataContext from "../../context/UserDataProvider";
export function SuccessPage(){
    const navigate = useNavigate();
    const {userData, setUserData} = useContext(UserDataContext)

    function handdleNewUserClick(){
        setUserData(() => (
                {
                    nome: "",
                    senha: "",
                    confirmarSenha: "",
                    email: "",
                    nascimento: "",
                    cep: "",
                    rua: "",
                    numero: "",
                    bairro: "",
                    cidade: "",
                    referencia: "",
                    sobre: "",
                }
            )
        );
        navigate("/");
    }
    return (
        <section className="success-card">
            <header>
                <h1>Usuário criado!</h1>
            </header>
            <section className="user-data-section">
                <label>
                    Nome
                    <output>{userData.nome}</output>
                </label>
                <label>
                    Email
                    <output>{userData.email}</output>
                </label>
                <hr />
                <div className="rua-numero-container">
                    <label>
                        Rua
                        <output>{userData.rua}</output>
                    </label>
                    <label>
                        Número
                        <output>{userData.numero}</output>
                    </label>
                </div>
                <label>
                    CEP
                    <output>{userData.cep}</output>
                </label>
            </section>
            <footer className="new-user-button-container">
                <button className="new-user-button" onClick={handdleNewUserClick}>Novo usuário</button>
            </footer>
        </section>
    )
}