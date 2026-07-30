'use server'

import { ErrorResponseSchema, LoginSchema } from "@/src/schemas"
import { cookies } from "next/headers"
//creamos un Type para ese prevState hace parte del 3 paso
type ActionStateType={
    errors:string[]
}

//Use form state para conectar el resultado de una accion con un estado 
export async function authenticacte(prevState:ActionStateType,formData:FormData){
    //usamos prevstate como firma para determinar el anterior estado
    //formdata recuperamos los datos del formulario
    console.log(prevState)
   

    //la constante que utilizamos para recuperar los datos del formulario
    const loginCredentials={
        email:formData.get('email'),
        password:formData.get('password')
    }
    //2.Paso validarlo con Zod
    //usamos safeparse para los errores
    const auth=LoginSchema.safeParse(loginCredentials)

    //validacion de errores solo si no passa la validacion
    if(!auth.success){
        //3.retornamos los errores porque el componete lo requiere 
        //con el UseFormState
        return{
            //retorna el arreglo de errores 
            errors:auth.error.issues.map(issue=>issue.message)
        }
    }
    //ENVIO PETICION BACKEND
    const url = `${process.env.API_URL}/auth/login`
    //le pasamos la configuracion de envio si lo dejamos vacio por default es GET
    const req=await fetch(url,{
        method:"POST",
        headers:{
            'Content-type':'application/json'

        },
        //pasamos formato Json
        body:JSON.stringify({
            password:auth.data.password,
            email:auth.data.email
        })
    })
    //3 Paso esperar la respuesta del Request y pasarla en JSON
    const json=await req.json()
    //condicion 4
    if(!req.ok){
        //destruturacion para guardar en un propiedad en  una variable
        //extraer la propiead de error
        const {error}=ErrorResponseSchema.parse(json)
        return{
            //cualquiera de los tres ecenarios
            errors:[error]

        }
    }
   //1.COOKIES
   //setear 
   cookies().set({
    //objeto de configuraciones de la cookie require minimo name y value
    name:'CASHTRACKR_TOKEN',
    value:json,
    //solamente el servidor puede acceder al cookie si es true
    httpOnly:true,
    path:'/'
   })


    //retornamos los errores para darle consistencia pero Vacio
    //Ya que hasta este punto no hay errores
    //devolvemos el tipo de dato Para que no sea Undefined
    return{
        errors:[]
    }


}