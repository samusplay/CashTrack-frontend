"use client"

import { useRouter } from "next/navigation"

export default function AddExpensesButton(){

    const router=useRouter()
    //usamos query string para agregar las variables a la url
    return(
        <button
        type="button"
        className="bg-amber-500 px-10 py-2 rounded-lg text-white font bold cursor-pointer"
        onClick={()=>router.push(location.pathname+'?addExpense=true&showModal=true')}
        >
            Agregar Gasto

        </button>
    )
}