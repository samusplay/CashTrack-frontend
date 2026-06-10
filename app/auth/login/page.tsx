
import LoginForm from '@/components/auth/LoginForm'
import type { Metadata } from 'next'

//metadata mejorar el ceo usamos el type de Metadat
export const metadata: Metadata = {
    title: "CashTrackr -Iniciar Sesion",
    description: "CashTrackr -Iniciar Sesion",
    keywords: 'Nextjs, Tailwindcss'

}

//el formualrio se eejcuta en el cliente
export default function RegisterPage() {


    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">Iniciar Sesion</h1>
            <p className="text-3xl font-bold ">Controla tus <span className="text-amber-500">finanzas</span></p>

            <LoginForm />


        </>
    )
}