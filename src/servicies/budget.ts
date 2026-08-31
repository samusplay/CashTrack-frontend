//Routing dinamico acceder un recurdos por medio del ID

import { notFound } from "next/navigation"
import { cache } from "react"
import getToken from "../auth/token"
import { BudgetAPIResponseSchema } from "../schemas"

//funcion para hacer fecth a la api osea GET
export const getBudget = cache(async (budgetId: string) => {
    //todos los request debe ser autenticados
    //si los datos no cambiado cacheamos
    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId} `

    //Peticion
    const req = await fetch(url, {
        headers: {
            //le inyectamos el tokeb
            'Authorization': `Bearer ${token}`

        },
    })
    //Respuesta
    const json = await req.json()
    //si no esta okey
    if (!req.ok) {
        //le mandamos una funcion de 404 que no se encontro dicho recurso
        notFound()


    }
    //validamos el esquema 
    const budget = BudgetAPIResponseSchema.parse(json)
    return budget

})