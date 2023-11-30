import { FcOk } from "react-icons/fc";

interface TripHightLightsProps {
  hightLights: string[];
}

const TripHightLights = ({ hightLights }: TripHightLightsProps) => {
  return (
    <div className="flex flex-col p-5">
      <h1 className="font-semibold text-primaryDarker mb-2">Destaques</h1>

      <div className="flex flex-wrap gap-y-3">
        {hightLights.map((hightLights, index) => (
          <div className="flex items-center gap-2 w-1/2">
            <FcOk />

            <p className="text-grayPrimary text-xs">{hightLights}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHightLights;
