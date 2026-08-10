"use client"

import { forgotPassword } from "@/actions/forgot-password-action"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"


export default function ForgotPasswordForm() {
    //UseFormstate es el puente entre el action y el componente
    //el state es la informacion que nos da el servidor luego de hacer la accion

    //el disptach es la funcion que va con el formulario
    //los parametros que le pasamos es mientras todvia el usuariono interactuado 
    //con el state
    
    const[state,dispatch]=useFormState(forgotPassword,{
        //devolvemos estos valores ya que los firmamos en el action y definimos
        errors:[],
        success:''
    })
    useEffect(()=>{
        if(state.errors){
            //recorremos los errores delstate con el for each para mandarlo
            state.errors.forEach(error=>{
                toast.error(error)
            })
        }
        //si este state es positivo mostramos el mensaje
        if(state.success){
            toast.success(state.success)
        }
        //cuando cambie el state esta vigilante de este cambio es una dependencia

    },[state])


    return (
        <form
            action={dispatch}
            className=" mt-14 space-y-5"
            noValidate
        >
            <div className="flex flex-col gap-2 mb-10">
                <label
                className="font-bold text-2xl"
                >Email</label>
        
                <input
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="email"
                />
            </div>
        
            <input 
                type="submit"
                value='Enviar Instrucciones'
                className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer "
            />
        </form>
    )
}