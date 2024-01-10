"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Trip } from "@prisma/client";
import TripItem from "@/app/components/TripItem";

const Trips = () => {
  const searchParams = useSearchParams();
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(
        `/api/trips/search?text=${searchParams.get("text") ?? ""}&startDate=${
          searchParams.get("startDate") ?? ""
        }&budget=${searchParams.get("budget") ?? ""}`
      );

      const data = await response.json();
      setTrips(data);
    };

    fetchTrips();
  }, []);

  return (
    <div className="container mx-auto flex flex-col justify-center items-center p-5">
      <h1 className="text-primaryDarker font-semibold text-xl">{trips.length > 0 ? "Viagens encontradas" : "Desculpa !"}</h1>
      <h2 className="text-grayPrimary font-medium mb-6">{trips.length > 0 ? "Listamos as melhores viagens para você!" : "Não encontramos nenhuma viagem"}</h2>
      <div className="flex flex-col gap-4">
        {trips.map((trip) => (
          <TripItem trip={trip} key={trip.id} />
        ))}
      </div>
    </div>
  );
};

export default Trips;
