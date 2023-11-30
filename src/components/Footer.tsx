import Image from "next/image"

const Footer = () => {

    return(
        <div className="flex flex-col justify-center items-center p-5 bg-">
            <Image src="/logo.png" alt="logo" width={133} height={23}/>
            <p className="text-sm font-semibold text-primaryDarker mt-1">Todos os direitos reservados</p>
        </div>
    )

}

export default Footer