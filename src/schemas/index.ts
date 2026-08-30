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

export const LoginSchema = z.object({
        email: z.string()
                .min(1, {message: 'El Email es Obligatorio'})
                .email( {message: 'Email no válido'}),
        password: z.string()
                .min(1, {message: 'El Password no puede ir vacio'})
})



//esqema validar codigo de confirmacion de cuenta
export const TokenSchema=z.string(({message:'Token no valido'}))
.min(6,{message:'Token no valido'})
.max(6,{message:'Token no valido'})


export const ForgotPasswordSchema = z.object({
        email: z.string()   
                .min(1, {message: 'El Email es Obligatorio'})
                .email( {message: 'Email no válido'}),
    })



export const  SucccessSchema=z.string().min(1,{message:'Valor no valido'})

export const ResetPasswordSchema = z.object({
        password: z.string()
                .min(8, {message: 'El Password debe ser de al menos 8 caracteres'}),
        password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
        message: "Los Passwords no son iguales",
        path: ["password_confirmation"]
});

export const DraftBudgetSchema = z.object({
        name: z.string()
                .min(1, {message: 'El Nombre del presupuesto es obligatorio'}),
        amount: z.coerce.
                number({message: 'Cantidad no válida'})
                .min(1, {message: 'Cantidad no válida'}),
})

export const ErrorResponseSchema=z.object({
    error:z.string()
})

export const UserSchema = z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email()
})


//definir schemas tambien Gnerar Types para el panel de admin
//Pasamos un esquema de Zod a un type
export type User=z.infer<typeof UserSchema>