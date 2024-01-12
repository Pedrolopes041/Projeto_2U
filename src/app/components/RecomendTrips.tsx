import { Trip } from "@prisma/client";
import TripItem from "./TripItem";
import { prisma } from "@/lib/prisma";

const getTrips = async () => {
  const trips = await prisma.trip.findMany({});
  return trips;
};

const RecomendTrips = async () => {

  const data = await getTrips();

  return (
    <div>
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter"></div>
        <h2 className="px-5 font-medium text-grayPrimary whitespace-nowrap">
          Destinos Recomendados
        </h2>
        <div className="w-full h-[1px] bg-grayLighter"></div>
      </div>

      <div className="flex flex-col items-center mt-5 gap-5">
        {data.map((trip: Trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default RecomendTrips;
