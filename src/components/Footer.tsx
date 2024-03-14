import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center p-5 bg-">
      <h1 className="font-semibold text-2xl text-grayPrimary text-center">
        GO<span className="text-primary">TRIPS!</span>
      </h1>
      <p className="text-sm font-semibold text-primaryDarker mt-1">
        Todos os direitos reservados
      </p>
    </div>
  );
};

export default Footer;
