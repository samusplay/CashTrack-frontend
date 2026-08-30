"use server"

import { ErrorResponseSchema, TokenSchema } from "@/src/schemas";


//El Type es la firma de nuestros tipos de datos
type ActionStateType = {
    errors: string[];
    success: string
}
//Recordar que debemos pasarle el Prevstate une stado previo antes de la soclitud
//Como utilizamos chackrea Ui no hay necesidad de pasarle el formdata
export async function validateToken(token: string, prevstate: ActionStateType) {
    //queremos ejcutar esa validacion del token solo cuando tenga 6 caractres
    //lo validamos con el Schema de Zod
    const resetPasswordToken = TokenSchema.safeParse(token)

    //si no es exitoso
    if (!resetPasswordToken.success) {
        return {
            //accedemos por medio de map y issues la propiedad de errors y leer el message
            errors: resetPasswordToken.error.issues.map(issue => issue.message),
            success: ''
        }
    }
    //ENVIO DE PETICION HACIA EL BACKEND
    const url = `${process.env.API_URL}/auth/validate token`
    const req = await fetch(url, {
        //Objeto de configuracion
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //ENVIAREMOS EL TOKEN EN FORMATO JSON
        //desde el reset Password token es un objeto con la propieda de data
        body: JSON.stringify({
            token: resetPasswordToken.data
        })
    })
    //ESPERAMOS QUE NOS RESPONDA REQ CON EL FECTH
    const json = await req.json()

    //DEVOLVEMOS ERRORES
    if (!req.ok) {
        //sacamos la propiedad de error de zod
        //Recordar que pasrse solo evalua si esos e adecua al Schema
        const { error } = ErrorResponseSchema.parse(json)
        return {
            errors:[error],
            success:''

        }
    }

    //Debememos retornan dicha firma
    return {
        errors: [],
        success: ''
    }
}