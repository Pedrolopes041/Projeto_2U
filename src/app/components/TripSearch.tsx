"use client";

import Button from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface TripSearchForm {
  text: string;
  starDate: Date | null;
  budget: number;
}

const TripSearch = () => {

  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripSearchForm>();

  const onSubmit = (data: TripSearchForm) => {
    router.push(`/trips/search?text=${data.text}&starDate=${data.starDate}&budget=${data.budget}`)
  };

  return (
    <div className="container mx-auto p-5 bg-search-background">
      <h1 className="font-semibold text-2xl text-grayPrimary text-center">
        Encontre sua próxima <span className="text-primary">viagem!</span>
      </h1>
      <div className="flex flex-col gap-4 mt-5">
        <Input
          error={!!errors.text}
          errorMessage={errors.text?.message}
          placeholder="Onde você quer ir"
          {...register("text", {
            required: {
              value: true,
              message: "Texto é obrigatório.",
            },
          })}
        />
        <div className=" flex gap-4">
          <Controller
            name="starDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                onChange={field.onChange}
                selected={field.value}
                className="w-full"
                placeholderText="Data de Início"
                minDate={new Date()}
              />
            )}
          />

          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                placeholder="Orçamento"
                onValueChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>
        <Button onClick={() => handleSubmit(onSubmit)()}>Buscar</Button>
      </div>
    </div>
  );
};

export default TripSearch;
