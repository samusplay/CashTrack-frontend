"use client"

import { useState } from "react"
import ResetPasswordForm from "./ResetPasswordForm"
import ValidateTokenForm from "./ValidateTokenForm"
//orquestado para manejar otros componentes
export default function PasswordResetHandler(){
    //State para poder renderizar lo componentes
    //usamos usestate osea vamos ir cambiando dinamicamente
    //El token se valida en ek backend

    //Dicha expresion Ternaria ejecuta la logica
    const[isValidateToken,setIsValidToken]=useState(false)

    return(
    <>
    {!isValidateToken ?<ValidateTokenForm/>:<ResetPasswordForm/>}
    </>
    )
}