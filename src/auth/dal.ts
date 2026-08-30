//Usamos server only ya que solo se quedara en el servidor de next
import "server-only"

//DATA Access layer
//CAPA PARA saber si esta autenticado

import { redirect } from "next/navigation"
import { cache } from "react"
import { UserSchema } from "../schemas"
import getToken from "./token"
export const verifySession =cache( async () => {
    //le pasamos a cookies el COOKIE
    const token =getToken()

    //comprobacion si no posse el token
    if (!token) {
        redirect('/auth/login')
    }
    //ENVIO DE DATOS AL BACKEND DESDE EL BEARBER

    const url = `${process.env.API_URL}/auth/user`
    const req = await fetch(url, {
        //enviamos la Configuracion por Bearer de seguridad
        headers: {
            Authorization: `Bearer ${token}` // <- Agrega un espacio aquí
        }

    })
    //esperamos la respuesta
    const session = await req.json()
    const result = UserSchema.safeParse(session)

    if (!result.success) {
        redirect('auth/login')

    }
    return {
        user: result.data,
        isAuth: true
    }


})