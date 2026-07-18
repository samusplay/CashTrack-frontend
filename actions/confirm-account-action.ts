"use server"
//Usamos un type para poder validar los tipo de datos
type ActionStateType={
    errors:string[]

}
export async function confirmAccount( token:string,prevState:ActionStateType){
    console.log('desde confirm account')
    console.log(token)

    return{
        errors:[]
    }
}