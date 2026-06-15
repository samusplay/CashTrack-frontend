
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import type { Metadata } from 'next'

//metadata mejorar el ceo usamos el type de Metadat
export const metadata: Metadata = {
    title: "CashTrackr -Olvide mi Password",
    description: "CashTrackr -Olvide mi Password",
    keywords: 'Nextjs, Tailwindcss'

}

//el formualrio se eejcuta en el cliente
export default function ForgotPasswordPage() {


    return (
        <>
            <h1 className="font-black text-6xl text-purple-950">¿Olvidaste tu Contraseña?</h1>
            <p className="text-3xl font-bold ">aqui puedes<span className="text-amber-500">reestablecerla</span></p>


           <ForgotPasswordForm />
        </>
    )
}