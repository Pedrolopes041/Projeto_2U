interface TripAboutProps {
  description: string;
}

const TripAbout = ({ description }: TripAboutProps) => {
  return (
    <div className="flex flex-col p-5 lg:p-0 lg:mt-5">
      <h1 className="font-semibold text-primaryDarker lg:text-xl">Sobre a Viagem</h1>
      <p className="text-xs leading-5 text-primaryDarker mt-1 lg:mt-5 lg:text-base lg:leading-7">{description}</p>
    </div>
  );
};

export default TripAbout;
