import { cookies } from "next/headers";
//para hacerlo mnatenible
export default function getToken(){
    const token = cookies().get('CASHTRACKR_TOKEN')?.value

    return token
}