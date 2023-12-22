"use client";

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import { differenceInDays } from "date-fns";
import Input from "@/components/Input";
import { Controller, useForm } from "react-hook-form";
//import { useRouter } from "next/navigation";

interface TripReservationProps {
  tripId: string;
  tripEndDate: Date;
  tripStarDate: Date;
  maxGuests?: number;
  pricePerDay: number;
}

//tipando a validação
interface TripResrvationForm {
  guest: number;
  starDate: Date | null;
  endDate: Date | null;
}

const TripReservation = ({
  tripStarDate,
  tripEndDate,
  maxGuests,
  pricePerDay,
  tripId,
}: TripReservationProps) => {
  //passando a tipagem da validação para o form
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<TripResrvationForm>();

  //const router = useRouter();

  const handleSubmitPress = async (data: TripResrvationForm) => {
    const response = await fetch("/api/trips/check", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          starDate: data.starDate,
          endDate: data.endDate,
          tripId,
        })
      )
    })

    const res = await response.json();
    console.log({res});

    /*
    router.push(`/trips/confirmation?startDate=${data.starDate?.toISOString()}endDate=${data.endDate?.toISOString()}guest=${data.guest}`)
    */
  };

  const stardate = watch('starDate')
  const enddate = watch('endDate')


  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4 ">
        <Controller
          name="starDate"
          rules={{
            required: {
              value: true,
              message: "Data inicial é obrigatória.",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              error={!!errors?.starDate}
              errorMessage={errors?.starDate?.message}
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
              placeholderText="Data de Início"
              minDate={tripStarDate}
            />
          )}
        />

        <Controller
          name="endDate"
          rules={{
            required: {
              value: true,
              message: "Data final é obrigatória.",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              error={!!errors?.endDate}
              errorMessage={errors?.endDate?.message}
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
              placeholderText="Data final"
              minDate={stardate ?? tripStarDate}
            />
          )}
        />
      </div>
      <Input
        {...register("guest", {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório",
          },
          max: {
            value: maxGuests,
            message: `Número de hóspedes (max: ${maxGuests})`
          },
        })}
        className="mt-4"
        placeholder={`Número de Hóspedes (max: ${maxGuests})`}
        // colocando o filedset vermelho
        error={!!errors?.guest}
        //colocando a mensagem de error
        errorMessage={errors?.guest?.message}
        type="number"
      />
      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total: </p>
        <p className="font-medium text-sm text-primaryDarker">{stardate && enddate ? `R${differenceInDays(enddate, stardate) * pricePerDay}` : 'R$0'}</p>
      </div>

      <div className="pb-10 border-b border-grayLighter w-full">
        <Button
          onClick={() => handleSubmit(handleSubmitPress)()}
          className="mt-3 w-full"
        >
          Reservar agora
        </Button>
      </div>
    </div>
  );
};

export default TripReservation;
