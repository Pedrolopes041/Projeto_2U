import { BounceLoader } from "react-spinners";

const Loading = () =>{
    return(
        <div className="flex w-full flex-col justify-center items-center">
            <BounceLoader color="#312A4F" />
        </div>
    )

}

export default Loading;