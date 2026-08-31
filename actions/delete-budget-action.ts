"use server"

import getToken from "@/src/auth/token";
import { Budget, ErrorResponseSchema, passwordValidationSchema, SucccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
    errors: string[];
    success:string

}

export async function deleteBudget(budgetId: Budget['id'], prevstate: ActionStateType, formData: FormData) {
    console.log(formData.get('password'))
    //utilizamos ele esquema con safe parse para devolver el error
    const currentPassword = passwordValidationSchema.safeParse(
        formData.get('password')
    )
    if (!currentPassword.success) {
        return {
            //acceder a cada uno de los errores map va generar un nuevo arreglo nuevo
            errors: currentPassword.error.issues.map(issue => issue.message),
            success:''
        }
    }
    //COMPROBAR la api con el checkpassword
    const token = getToken()
    const checkpasswordUrl = `${process.env.API_URL}/auth/check-password `

    const checkPasswordReq = await fetch(checkpasswordUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({
            password: currentPassword.data

        })
    })
    const checkpasswordJson = await checkPasswordReq.json()
    if (!checkPasswordReq.ok) {
        const { error } = ErrorResponseSchema.parse(checkpasswordJson)
        return {
            errors: [error],
            success:''
        }
    }
    //eliminar el presupuesto
    const deleteBudgetUrl=`${process.env.API_URL}/budgets/${budgetId} `
    const deleteBudgetReq=await fetch(deleteBudgetUrl,{
        method:'DELETE',
         headers: {
            'Authorization': `Bearer ${token}`,
            

        },
    })
    const deleteBudgetJson= await deleteBudgetReq.json()

     if (!deleteBudgetReq.ok) {
        const { error } = ErrorResponseSchema.parse(deleteBudgetJson)
        return {
            errors: [error],
            success:''
        }
    }
    //revaldiar los datos el caching
    revalidatePath('/admin')


  //validamos el success
  const success=SucccessSchema.parse(deleteBudgetJson)
    return {
        errors: [],
        success

    }
}