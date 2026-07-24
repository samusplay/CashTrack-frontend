import { z } from 'zod'
//Esquema de zod de Validacion
export const RegisterSchema = z.object({
    email: z.string()
        .min(1, { message: 'El Email es obligatorio' })
        .email({ message: 'Email no valido' }),
    name: z.string()
        .min(1, { message: 'Tu nombre no puede ir vacio' }),
    password: z.string()
        .min(8, { message: 'El password es muy corto,minimo  8 caracteres' }),
    //validacion
    password_confirmation: z.string(),
//Para que el password se repita y si no son iguales rechaza
}).refine((data) => data.password === data.password_confirmation, {
    message: 'Los passwords no son iguales',
    path: ['password_confirmation']
})

export const  SucccessSchema=z.string().min(1,{message:'Valor no valido'})

export const ErrorResponseSchema=z.object({
    error:z.string()
})

//esqema validar codigo de confirmacion de cuenta
export const TokenSchema=z.string(({message:'Token no valido'}))
.min(6,{message:'Token no valido'})
.max(6,{message:'Token no valido'})
