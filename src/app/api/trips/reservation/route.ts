import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { startDate, endDate, userId, tripId, totalPaid, guests } = req.body;

    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId,
      },
    });

    if (!trip) {
      res.status(404).json({ error: { code: "TRIP_NOT_FOUND" } });
      return;
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

    res.status(201).json({ success: true });
  }
}
