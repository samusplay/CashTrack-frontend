
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import type { Metadata } from 'next'
import Link from 'next/link'

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

           <nav className='mt-10 flex flex-col space-y-4'>
                <Link 
                href='/auth/login'
                className='text-center text-gray-500'
                >
                ¿Ya tienes cuenta? Iniciar Sesion
                </Link>

                <Link 
                href='/auth/forgot-password'
                className='text-center text-gray-500'
                >
                ¿Olvidaste tu contraseña? Reestablecer
                </Link>

                <Link
                    href='/auth/register'
                    className='text-center text-gray-500'
                >
                    ¿No tienes cuenta? Crear una
                </Link>
            </nav>
        </>
    )
}