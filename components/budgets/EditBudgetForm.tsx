"use client"

import { editBudget } from "@/actions/edit-budget-action";
import { Budget } from "@/src/schemas";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import ErrorMessage from "../ui/ErrorMessage";
import BudgetForm from "./budgetForm";
//le pasamos el esquema de Budget para que concida la firma de los Props
export default function EditBudgetForm({budget}:{budget:Budget}) {

    const router=useRouter()
    //En este cas vamos 
    //usamos FormState
    const editBudgetWithId=editBudget.bind(null,budget.id)
    const[state,dispatch]=useFormState(editBudgetWithId,{
        
        errors:[],
        success:''
        
    })
    //Utilizamos un use effect para motsrat el toast
    useEffect(()=>{
        if(state.success){
            toast.success(state.success)
            //Vamos redirecionar al usuario
            router.push('/admin')
        }

    },[state])
    return (
        <form
            className="mt-10 space-y-3"
            noValidate
            action={dispatch}
        >
            {state.errors.map(error=><ErrorMessage key={error}>{error}</ErrorMessage>)}
            
            <BudgetForm 
            budget={budget}
            />
            <input
                type="submit"
                className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                value='Editar Presupuesto'
            />
        </form>
    )
}