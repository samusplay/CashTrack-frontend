"use server"

import { ErrorResponseSchema, SucccessSchema, TokenSchema } from "@/src/schemas"



//Usamos un type para poder validar los tipo de datos
type ActionStateType={
    errors:string[]
    success:string

}
export async function confirmAccount( token:string,prevState:ActionStateType){
  
    //capturamos con zod si se trajo el token desde el compoenente
    const confirmToken=TokenSchema.safeParse(token)
    if(!confirmToken.success){
        //nos retorna los errores atravez de un arreglo
        return{
            errors:confirmToken.error.issues.map(issue=>issue.message),
            success:''
        }
    }

   //enviamos peticion a  a la api con la variable de entorno
    const url = `${process.env.API_URL}/auth/confirm-account `
    //utilizamos fecth porque next.js utiliza Node en el servidor
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //Convertimos ese objeto en un Json para el Request
        body: JSON.stringify({
            //pasamos el Token que limpiado Zod
           token:confirmToken.data
        })
    })
    const json=await req.json()
    const {error}=ErrorResponseSchema.parse(json)
    if(!req.ok){
        return{
            errors:[error],
            success:''
        }
    }
    //aseguramos que el formato de exito es el correcto
    const success=SucccessSchema.parse(json)

    return{
        errors:[],
        success
    }
}