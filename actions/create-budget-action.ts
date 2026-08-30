"use server"

import { DraftBudgetSchema, SucccessSchema } from "@/src/schemas"
import { cookies } from "next/headers"

type ActionStateType = {
    errors: string[]
    success: string
}

export async function createbudget(prevstate: ActionStateType, formData: FormData) {
    //validamos con el Esuqmea de zod los campos del formulario
    const budget = DraftBudgetSchema.safeParse({
        name: formData.get('name'),
        amount: formData.get('amount')
    })
    if (!budget.success) {
        return {
            //Mostramos los errores si hay
            errors: budget.error.issues.map(issue => issue.message),
            success: ''
        }
    }
    //ENVIO DE SOLCITUD HACIA EL BACKEND
    //Requiere acceder al token usar Cokies
    const token = cookies().get('CASHTRACKR_TOKEN')?.value
    const url = `${process.env.API_URL}/budgets`

    const req=await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            //le inyectamos el tokeb
            'Authorization':`Bearer ${token}`

        },
        body:JSON.stringify({
            name:budget.data.name,
            amount:budget.data.amount
        })
    })
    const json=await req.json()

    //para evitar errores con eso valida si es True
    const success=SucccessSchema.parse(json)

    return {
        errors: [],
        success: success
    }

}