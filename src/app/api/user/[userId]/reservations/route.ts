import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params: { userId } }: { params: { userId: string } }) {
  const { searchParams } = new URL(request.url);

  console.log({ userId });

  if (!userId) {
    return {
      status: 400,
      body: {
        message: "Missing userId",
      },
    };
  }

  const reservations = await prisma.tripReservation.findMany({
    where: {
      userId: userId,
    },
    include: {
      trip: true,
    },
  });

  console.log({ reservations });

  return new NextResponse(JSON.stringify(reservations), { status: 200 });
}