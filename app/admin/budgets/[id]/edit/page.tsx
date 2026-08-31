import getToken from "@/src/auth/token"
import { BudgetAPIResponseSchema } from "@/src/schemas"
import Link from "next/link"
import { notFound } from "next/navigation"
//Routing dinamico acceder un recurdos por medio del ID
//funcion para hacer fecth a la api osea GET
const getBudget = async (budgetId: string) => {
    //todos los request debe ser autenticados
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

}

//directamente ya es un server component
//utilizamos los params para extaraer en la url es la fuente de la verdad
//Firma del componente del id ya que son numericos
export default async function EditBudgetPage({ params }: { params: { id: string } }) {
    //esto va recuperar el id gracias al Routing dinamico
    //literal con console.log(params.id)
    //recuperar el id
    const { id } = params

    const budget = await getBudget(id)

    return (
        <>
            <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
                <div className='w-full md:w-auto'>
                    <h1 className='font-black text-4xl text-purple-950 my-5'>
                        Editar Presupuesto:{budget.name}
                    </h1>
                    <p className="text-xl font-bold">Llena el formulario y crea un nuevo {''}
                        <span className="text-amber-500">presupuesto</span>
                    </p>
                </div>
                <Link
                    href={'/admin'}
                    className='bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
                >
                    Volver
                </Link>
            </div>
            <div className='p-10 mt-10  shadow-lg border '>

            </div>
        </>
    )
}