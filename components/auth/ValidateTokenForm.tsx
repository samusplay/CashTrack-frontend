
import { validateToken } from "@/actions/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
type ValidateTokenProps={
  setIsValidToken:Dispatch<SetStateAction<boolean>>
  token:string
  setToken:Dispatch<SetStateAction<string>>

}
//le pasamos los props a la funcion del handler 
//Extraemos via Props delc omponente padre que es el Handler
export default function ValidateTokenForm({setIsValidToken,token,setToken}:ValidateTokenProps) {
    //Requrimos un state
    
    const[isComplete,setIsComplete]=useState(false)
    //copiamos lo campos de la funcion y bind le agregamos el token
    //Se va volver el primer parametro
    const validateTokenInput=validateToken.bind(null,token)
    //Usremos en use form state para que actue entre puente entre el action y componente
    const[state,dispatch]=useFormState(validateTokenInput,{
       errors:[],
       success:''
    })
  
    //Debemos disparar dicha accion lpo logramos con useEfect
    //CUANDO Leea el estado de IsComplete
    //ssiempre va leer el use effect
    useEffect(()=>{
        //si esta completado lanzamos el action
        if(isComplete){
            dispatch()
        }

    },[isComplete])
    //vamos usar useEffect para iterar errores
    //y muestre un Toast
    useEffect(()=>{
      if(state.errors){
        state.errors.forEach(error=>{
          toast.error(error)
        })
      }
      //evaluamos cuando el token es exitoso
      if(state.success){
        toast.success(state.success)
        setIsValidToken(true)
      }

    },[state])

  const handleChange = (token: string) => {
    //La funcion es cada vez que el usurio teclea o borra un numero
    //el setIscomplete es para cuando elimina algo numero se pone en rojo
    setIsComplete(false)
    setToken(token)

  }

  const handleComplete = () => {
    //Logica que va ir hacia el Bakcn con el action component
    setIsComplete(true)
    
  
  }

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
      </PinInput>
    </div>
  )
}