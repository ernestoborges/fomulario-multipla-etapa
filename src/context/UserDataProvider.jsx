import { createContext, useState } from "react"

const UserDataContext = createContext(null)

export function UserDataProvider({children}){

    const [userData, setUserData] = useState({
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
    })

    return (
        <UserDataContext.Provider value={{userData, setUserData}}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserDataContext