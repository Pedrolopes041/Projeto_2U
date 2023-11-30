interface TripAboutProps {
  description: string;
}

const TripAbout = ({ description }: TripAboutProps) => {
  return (
    <div className="flex flex-col p-5">
      <h1 className="font-semibold text-primaryDarker">Sobre a Viagem</h1>
      <p className="text-xs leading-5 text-primaryDarker mt-1">{description}</p>
    </div>
  );
};

export default TripAbout;
