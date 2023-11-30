"use client";

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";

interface TripReservationProps {
  tripEndDate: Date ;
  tripStarDate: Date;
  maxGuests: number
}

//tipando a validação
interface TripResrvationForm {
  guest: number;
}

const TripReservation = ({ tripStarDate, tripEndDate, maxGuests }: TripReservationProps) => {

  //passando a tipagem da validação para o form 
  const {register, handleSubmit, formState: {errors}} = useForm<TripResrvationForm>()

  const handleSubmitPress = (data: any) => {
    console.log({data});
  }

  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4 ">
        <DatePicker
          placeholderText="Data de Início"
          onChange={() => {}}
          className="w-full"
          minDate={tripStarDate}
        />
        <DatePicker
          placeholderText="Data Final"
          onChange={() => {}}
          className="w-full"
          maxDate={tripEndDate}
        />
      </div>
      <Input
        {...register('guest', {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório"
          },
        })}
        className="mt-4"
        placeholder={`Número de Hóspedes (max: ${maxGuests})`}


        // colocando o filedset vermelho
        error={!!errors?.guest}
        //colocando a mensagem de error
        errorMessage={errors?.guest?.message}


      />
      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total: </p>
        <p className="font-medium text-sm text-primaryDarker">R$2500</p>
      </div>

      <div className="pb-10 border-b border-grayLighter w-full">
        <Button onClick={() => handleSubmit(handleSubmitPress)()} className="mt-3 w-full">Reservar agora</Button>
      </div>
    </div>
  );
};

export default TripReservation;
