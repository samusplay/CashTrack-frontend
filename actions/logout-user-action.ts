"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logout(){
   //1. paso quitra cookies
   //primero se llama la funcion y luego al metodo
   //La cookie solo esta en el servidor de next
   cookies().delete('CASHTRACKR_TOKEN')

   redirect('/auth/login')
}