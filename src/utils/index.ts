//FUNCION PARA formatear la moneda
export function formatCurrency(quantity:number){
    //Creamos la nueva instancia
    return new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD'

    }).format(quantity)
}
//Funcion para justar la fecha
export function formatDate(isoString:string){
    const date=new Date(isoString)

    const formatter=new Intl.DateTimeFormat('es-ES',{
        year:'numeric',
        month:'long',
        day:'numeric'
    })

    return formatter.format(date)
}

