import { prisma } from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function DELETE(_request: NextApiRequest, { params: { reservationId } }: { params: { reservationId: string } }) {
    
  if (!reservationId) {
    return {
      status: 400,
      body: {
        message: "Missing reservationId",
      },
    };
  }

  await prisma.tripReservation.delete({
    where: {
      id: reservationId,
    },
  });

  return NextResponse.json({status: 200});
}