import Image from "next/image"



//componente d eimagen Image de next.js
export default function Logo() {
    return (
        <Image
            src="/logo.svg"
            alt="Logo CashTrackr"
            width={0}
            height={0}
            className="w-full"
            priority 
        />

    )
}