"use client"

import { confirmAccount } from "@/actions/confirm-account-action"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { useState } from "react"
import { useFormState } from "react-dom"

export default function ConfirmAccountForm(){
    //usestate para guardar el estado
    //hay que enviar el token al server action
    const [token,setToken]=useState("")

    //genera una nueva funcion para pasar datos adicionales
    const confirmAccountWithToken=confirmAccount.bind(null,token)
    //validaciones extra UseFormState
    //el dispatch es el disparador para el server acction
    const [state,dispatch]=useFormState(confirmAccountWithToken,{
        //le pasamos el state incial esn este cas errors
        errors:[]
    })

    //funcion manejadora guardar el token
    const handleChange=(token:string)=>{
        //set almacena datos unicos es una estrctura de datos
        setToken(token)
       
    }
    //disparamos un evento en automatico
    //mandar a llamar el server action y comprobarlo
    const handleComplete=()=>{
       dispatch()

    }



    //Utilizamos libreria Chakra
    return(
        <div className='flex justify-center gap-5 my-10'>
            <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
            
            >
                <PinInputField  className="h-10 w-10 border-gray-300 shadow rounded-lg text-center placeholder-white"/>
                <PinInputField  className="h-10 w-10 border-gray-300 shadow rounded-lg text-center placeholder-white"/>
                <PinInputField  className="h-10 w-10 border-gray-300 shadow rounded-lg text-center placeholder-white"/>
                <PinInputField  className="h-10 w-10 border-gray-300 shadow rounded-lg text-center placeholder-white"/>
                <PinInputField  className="h-10 w-10 border-gray-300 shadow rounded-lg text-center placeholder-white"/>
                <PinInputField  className="h-10 w-10 border-gray-300 shadow rounded-lg text-center placeholder-white"/>
            </PinInput>
        </div>
    )
}