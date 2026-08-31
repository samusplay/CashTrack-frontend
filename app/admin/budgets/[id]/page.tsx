import AddExpensesButton from "@/components/expenses/AddExpenseButton"
import ModalContainer from "@/components/ui/ModalContainer"
import { getBudget } from "@/src/servicies/budget"
import { Metadata } from "next"

//generar la metadata dinamica
export async function generateMetadata({ params }: { params: { id: string }}):Promise<Metadata>{
    const budget=await getBudget(params.id)
    return{
        title:`CashTrackr -${budget.name}`,
        description:`CashTrackr -${budget.name}`
    }

}
//Recuperar el id donde estamos visitando
export default async function BudgetDetailsPage({ params }: { params: { id: string } }) {
    //consultamos el presupuesto
    const budget = await getBudget(params.id)
    
    return (
        <>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className="font-black text-4xl text-purple-950">{budget.name}</h1>
                    <p className="text-xl font-bold">Administra tus {''} <span className="text-amber-500">gastos</span></p>
                </div>
                <AddExpensesButton/>

            </div>
            <ModalContainer/>

        </>
    )
}