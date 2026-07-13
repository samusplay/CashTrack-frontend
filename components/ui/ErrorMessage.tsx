

export default function ErrorMessage({children}:{children:React.ReactNode}){
    //le pasamos por Children Props a este componente
    return(
        <p className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase text-sm">
            {children}
        </p>
    )
}