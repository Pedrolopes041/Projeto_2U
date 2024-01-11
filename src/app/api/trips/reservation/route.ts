import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const req = await request.json();

  const { startDate, endDate, userId, tripId, totalPaid, guests } = req;

  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  if (!trip) {
    return new Response(
      JSON.stringify({
        error: {
          code: "TRIP_NOT_FOUND",
        },
      })
    );
  }

  await prisma.tripReservation.create({
    data: {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      userId,
      tripId,
      totalPaid,
      guests,
    },
  });

  return new Response(
    JSON.stringify({
      success: true,
    }),
    { status: 201 }
  );
}
