"use server"

import { ErrorResponseSchema, ForgotPasswordSchema, SucccessSchema } from "@/src/schemas"


//Type la definicion de datos que requerimos
type ActionStateType={
    //Va hacer un arreglo de string
    errors:string[],
    success:string
}
//le pasamos el parametro que va ejeuctar al principio suie stado y formdata que 
//seran los campos del formulario
export async function forgotPassword(prevstate:ActionStateType,formData:FormData){
    //Utilizamos Schema de Forgot password de zod
    //El safeparse  devuleve un  objeto booleano
    //no intirrumpe la ejeuccion del codigo
    const forgotPassword=ForgotPasswordSchema.safeParse({
        email:formData.get('email')
    })
    //Negamos el succes no tiene formato valido
    //zod es un isnpector de seguridas ai que nos avd ar el success con booleano
    //si fala entra a pasar los errores
    if(!forgotPassword.success){

        return{
            //recorremos los errores del objeto para su mensaje
            //el issue es propiedad del objeto de error
            //debe concindir con Nuestro type
            errors:forgotPassword.error.issues.map(issue=>issue.message),
            success:''
        }
    }
    //ENVIO PETICION BACKEND
    const url=`${process.env.API_URL}/auth/forgot-password`
    const req=await fetch(url,{
        //le pasamos la configuracion de envio
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        //convertimos el objetos en JSON
        body:JSON.stringify({
            //mandamos el email
            email:forgotPassword.data.email
        })
    })
    //Esperamos el Resultado atravez de una respuesta en formato json
    const json=await req.json()
    //devolvemos los errores si hay
    if(!req.ok){
        //pasamos el esquema de errores
        //le pasamos parase para que pause la ejecucion
        const {error}=ErrorResponseSchema.parse(json)
        //devolvemos el erroes en un arreglo
        return{
            errors:[error],
            success:''

        }

    }
    const success=SucccessSchema.parse(json)
    return{
        errors:[],
        //ya le pasamos la variable que validamos con parse que evalua el Json con la respuesta
        success
    }

}