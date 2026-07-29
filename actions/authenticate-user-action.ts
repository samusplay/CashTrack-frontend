'use server'

import { LoginSchema } from "@/src/schemas"
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
    //retornamos los errores para darle consistencia pero Vacio
    //Ya que hasta este punto no hay errores
    //devolvemos el tipo de dato Para que no sea Undefined
    return{
        errors:[]
    }


}