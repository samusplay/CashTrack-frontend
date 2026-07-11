"use server"

import { RegisterSchema } from "@/src/schemas";

type ActionStateType = {
    errors: string[];
}
//los server actions son funciones asincronas
// Se debe usar el objeto de formdata para capturar los datos del formulario
//La idea no es usar any no es bueno
//Recodar que el Formdata son los datos que pone el usuario
//hay que pasarle el stateprevio
export async function register(prevState: ActionStateType, formData: FormData) {
    //generamos un objeto para recuperar los datos
    const registerData = {
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
        //validacion
        password_confirmation: formData.get('password_confirmation'),
    }
    //validamos con zod
    //le pasamos el Objeto al Metodo se safe Parse
    //Nos va devolver un  objeto 
    const register = RegisterSchema.safeParse(registerData)

    //agregamos una validacion luego que idententique que no haya errores

    if (!register.success) {
        //acceder a los errores atravez del arreglo
        const errors = register.error.issues.map(error => error.message)
        return {
            errors
        }

    }


    //enviamos peticion a  a la api con la variable de entorno
    const url = `${process.env.API_URL}/auth/create-account `
    //utilizamos fecth porque next.js utiliza Node en el servidor
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //Convertimos ese objeto en un Json para el Request
        body: JSON.stringify({
            name: register.data.name,
            password: register.data.password,
            email: register.data.email,

        })
    })
    //devuelve la repuesta de nuestro servidor
    const json = await req.json()
    console.log(json)
    //tenemos que retornar los errores si todo salio bien
    return{
        errors:[]
    }

}