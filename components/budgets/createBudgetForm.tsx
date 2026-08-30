"use client"

import { createbudget } from "@/actions/create-budget-action"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"
import ErrorMessage from "../ui/ErrorMessage"

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
            toast.success(state.success,{
                //llevarlo a la pagina de ediacion del presupuesto
                onClose:()=>{
                    router.push('/admin')
                },
                onClick:()=>{
                    router.push('/admin')
                }
                
            })
        }

    },[state])


  return (
    <form
      className="mt-10 space-y-3"
      noValidate
      action={dispatch}
    >
        {state.errors.map(error=><ErrorMessage key={error}>{error}</ErrorMessage>)}
      <div className="space-y-3">
          <label htmlFor="name" className="text-sm uppercase font-bold">
              Nombre Presupuesto
          </label>
          <input
              id="name"
              className="w-full p-3  border border-gray-100 bg-slate-100"
              type="text"
              placeholder="Nombre del Presupuesto"
              name="name"
          />
      </div>
      <div className="space-y-3">
          <label htmlFor="amount" className="text-sm uppercase font-bold">
              Cantidad Presupuesto
          </label>
          <input
              type="number"
              id="amount"
              className="w-full p-3  border border-gray-100 bg-slate-100"
              placeholder="Cantidad Presupuesto"
              name="amount"
          />
      </div>
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Crear Presupuesto'
      />
    </form>
  )
}