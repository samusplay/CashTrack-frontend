"use client"

import { useState } from "react"
import ResetPasswordForm from "./ResetPasswordForm"
import ValidateTokenForm from "./ValidateTokenForm"
//orquestado para manejar otros componentes
//Componente Padre
export default function PasswordResetHandler(){
    //State para poder renderizar lo componentes
    //usamos usestate osea vamos ir cambiando dinamicamente
    //El token se valida en ek backend

    //Dicha expresion Ternaria ejecuta la logica
    const[isValidateToken,setIsValidToken]=useState(false)

    //Token va guardar en memoria los numeros
    const[token,setToken]=useState('')

    //Como le pasmoas props de como ponente padre lo podemos hacer a todos los compoentes

    return(
    <>
    {!isValidateToken ?
    <ValidateTokenForm
        setIsValidToken={setIsValidToken}
        token={token}
        setToken={setToken}
    
    />:
    <ResetPasswordForm
     token={token}
    />}
    </>
    )
}