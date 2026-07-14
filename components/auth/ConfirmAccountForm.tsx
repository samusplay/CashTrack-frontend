"use client"

import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { useState } from "react"

export default function ConfirmAccountForm(){
    //usestate para guardar el estado
    const [token,setToken]=useState("")

    //funcion manejadora guardar el token
    const handleChange=(token:string)=>{
        //set almacena datos unicos es una estrctura de datos
        setToken(token)
       
    }
    //disparamos un evento en automatico
    //mandar a llamar el server action y comprobarlo
    const handleComplete=()=>{
       

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