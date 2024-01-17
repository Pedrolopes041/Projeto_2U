import { prisma } from "@/lib/prisma";
import TripHeader from "./components/TripHeader";
import TripReservation from "./components/TripReservation";
import TripAbout from "./components/TripAbout";
import TripHightLights from "./components/TripHightLight";
import TripLocation from "./components/TripLocation";

const getTripsDetails = async (tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });
  return trip;
};

const TripDetails = async ({ params }: { params: { tripId: string } }) => {
  const trip = await getTripsDetails(params.tripId);

  if (!trip) return null;

  return (
    <div className="container mx-auto lg:px-40 ">
      {/* aqui é a imagem */}
      <TripHeader trip={trip} />

      <div className="flex flex-col lg:flex-row lg:gap-20">
        <div className="lg:order-2">
          {/* aqui é o inputs */}
          <TripReservation
            tripId={trip.id}
            pricePerDay={trip.pricePerDay as any}
            maxGuests={trip.maxGuests}
            tripStartDate={trip.startDate}
            tripEndDate={trip.endDate}
          />
        </div>

        <div className="lg:order-1">
          {/*Descrição */}
          <TripAbout description={trip.description} />
          {/*Destaques */}
          <TripHightLights hightLights={trip.highlights} />
        </div>
      </div>

      {/*Localização */}
      <TripLocation
        location={trip.location}
        locationDescription={trip.locationDescription}
      />
    </div>
  );
};

export default TripDetails;
