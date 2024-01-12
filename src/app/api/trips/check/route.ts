import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { differenceInDays } from "date-fns";

export async function POST(request: Request) {

  const req = await request.json();

  const trip = await prisma.trip.findUnique({
    where: {
      id: req.tripId,
    },
  });
  const reservations = await prisma.tripReservation.findMany({
    where: {
      tripId: req.tripId,
      // VERIFICA SE EXISTE RESERVA ENTRE AS DATAS
      startDate: {
        lte: new Date(req.startDate),
      },
      endDate: {
        gte: new Date(req.endDate),
      },
    },
  });
  if (reservations.length > 0) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "TRIP_ALREADY_RESERVED",
        },
      })
    );
  }
  return new NextResponse(
    JSON.stringify({
      success: true,
      trip,
      totalPrice: differenceInDays(new Date(req.endDate), new Date(req.startDate)) * Number(trip?.pricePerDay),
    })
  );
}