"use client"

import { createbudget } from "@/actions/create-budget-action"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"
import ErrorMessage from "../ui/ErrorMessage"
import BudgetForm from "./budgetForm"

export default function CreateBudgetForm() {

    //hook de router
    const router=useRouter()
    //useformstate
    const[state,dispatch]=useFormState(createbudget,{
        //le pasamos la firma que nos comprometemos
        errors:[],
        success:''

    })
    //usamos el usee efefct para motrarles los mensajes y redirigirlo segun el state
    useEffect(()=>{
        if(state.success){
            toast.success(state.success)
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
                <BudgetForm />
                <input
                    type="submit"
                    className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                    value='Crear Presupuesto'
                />
            </form>
  )
}