"use server"

import getToken from "@/src/auth/token"
import { Budget, DraftBudgetSchema, ErrorResponseSchema, SucccessSchema } from "@/src/schemas"
import { revalidateTag } from "next/cache"

type ActionStateType = {
    errors: string[]
    success: string
}
//le agregamos el Type de Budget y solo le extraemos el id ya que la firma lo necesita
//para poder tener los props y trabajar con ellos
export async function editBudget(budgetId: Budget['id'], prevstate: ActionStateType, formData: FormData) {
    //Extraemos los datos de Formdata
    const budgetData = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }
    //validamos el schema con safe parse ya que viene del formdata
    const budget = DraftBudgetSchema.safeParse(budgetData)

    if (!budget.success) {
        return {
            //solo accedemos al mensaje de error en el arreglo con Map
            errors: budget.error.issues.map(issue => issue.message),
            success: ''
        }

    }
    //2 paso token y url con fecth
    const token=getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}`

    const req=await fetch(url,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`

        },
        body:JSON.stringify({
            //primero acceder a esa constante que tipamos con Zod
            name:budget.data.name,
            amount:budget.data.amount

        })     
    })
    const json=await req.json()
    //hay que tipar json
    
    //Mnajemaos el error
    if(!req.ok){
        //extraemos la propiedad del error extaryendo el parse
        const {error}=ErrorResponseSchema.parse(json)
        return{
            errors:[error],
            success:''
        }

    }
    //resetar el cache ya que next hace mucho cacheo
    //cuando los datos hayan sido mutados
    //ciertas peticiones en el cache
    revalidateTag('all-budgets')
    const success=SucccessSchema.parse(json)
    return {
        errors: [],
        success: success
    }
}