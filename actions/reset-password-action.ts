"use server"

import { ErrorResponseSchema, ResetPasswordSchema, SucccessSchema } from "@/src/schemas"

type ActionStateType={
    errors:string[],
    success:string
}
//Esta la firma lo que no comprometemos para los componente en los tipos de datos
export async function resetPassword(token:string,prevstate:ActionStateType,formdata:FormData){
     //Confirmacion de que el token llega al sever action
     console.log(token)
    
    
    //Recuperar los campos del formulario
     const resetPasswordInput={
        password:formdata.get('password'),
        password_confirmation:formdata.get('password_confirmation'),
     }
     //le pasamos el Schema para confirmar el safeParse 
     const resetPassword=ResetPasswordSchema.safeParse(resetPasswordInput)
     if(!resetPassword.success){
        return{
            //Recuperar los errores en nuevo arreglo
            errors:resetPassword.error.issues.map(issue=>issue.message),
            success:''
        }
     }
     //Envio de datos a la peticion 
     const url = `${process.env.API_URL}/auth/reset-password/${token}`

     const req=await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        //le pasmaos los campos que le habiamos definido a body
        body:JSON.stringify({
            password:resetPasswordInput.password
            
        })
     })
     //damos la respuesta del Json 
     const json=await req.json()
     if(!req.ok){
        const {error}=ErrorResponseSchema.parse(json)
        return{
            errors:[error],
            success:''
        }
     }
     const success=SucccessSchema.parse(json)

    //le pasamos esa asigancion de success al retorno validando lso campos del json
    return{
        errors:[],
        success:success
    }
}