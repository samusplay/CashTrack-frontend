"use client"

import { confirmAccount } from "@/actions/confirm-account-action"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"
import SuccessMessage from "../ui/SuccessMessage"

//argumentos adicionales al server action 
export default function ConfirmAccountForm(){
    const[isComplete,setIsComlete]=useState(false)
    //usestate para guardar el estado
    //hay que enviar el token al server action
    const [token,setToken]=useState("")
    //use efecct para cuando algo va cambiar
   

    //genera una nueva funcion para pasar datos adicionales
    const confirmAccountWithToken=confirmAccount.bind(null,token)
    //validaciones extra UseFormState
    //el dispatch es el disparador para el server acction
    const [state,dispatch]=useFormState(confirmAccountWithToken,{
        //le pasamos el state incial esn este cas errors
        errors:[],
        success:''
    })

     useEffect(()=>{
        if(isComplete){
            dispatch()
        }
        //utiliza un arreglo de dependencias osea cuando solo cambie es variable
    },[isComplete])

    //vamos usar Useffecct ya que remosc audno tenga errores mandemmos con Toast
    useEffect(()=>{
        //si se cumple la con dicion de los errores se av eejcutar
        if(state.errors){
            state.errors.forEach(error=>{
               toast.error(error)
            })
        }

        //escucha cuando los cambios ya estan
    },[state])

    //funcion manejadora guardar el token
    const handleChange=(token:string)=>{
        setIsComlete(false)
        //set almacena datos unicos es una estrctura de datos
        setToken(token)
       
    }
    //disparamos un evento en automatico
    //mandar a llamar el server action y comprobarlo
    const handleComplete=()=>{
       setIsComlete(true)

    }



    //Utilizamos libreria Chakra
    //esos parentesis son renderziar los subcomponetes pasandoles props
    return(
        <>
        
        {state.success &&<SuccessMessage>{state.success}</SuccessMessage>}
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
        </>
    )
}