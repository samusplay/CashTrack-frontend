"use server"
//los server actions son funciones asincronas
// Se debe usar el objeto de formdata para capturar los datos del formulario
//La idea no es usar any no es bueno
export async function register(formData:FormData){
    console.log(formData)

    //generamos un objeto para recuperar los datos

    const registerData={
        email:formData.get('email'),
        name:formData.get('name'),
        password:formData.get('password'),
        //validacion
        password_confirmation:formData.get('password_confirmation'),
    }

   //validamos con zod


   //enviamos peticion a  a la api

}