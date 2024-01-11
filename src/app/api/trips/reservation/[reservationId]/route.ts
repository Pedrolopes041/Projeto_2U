import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params: { reservationId } }: { params: { reservationId: string } }) {
    
  if (!reservationId) {
    return new NextResponse(
      JSON.stringify({
        message:"Missing reservationId",
      }),
      { status: 400 }
    );
  }

  await prisma.tripReservation.delete({
    where: {
      id: reservationId,
    },
  });

  return new NextResponse("Unauthorized", { status: 200 });
}