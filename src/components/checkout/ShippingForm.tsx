/** @format */

"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CITIES_KABUPATEN } from "@/constants/components";
// ShippingInfo type from '../../types' can be used as a reference or for other parts of the app.
// For the form itself, it's often cleaner to rely on the Zod schema's inferred type.

export const shippingSchema = z.object({
  fullName: z.string().min(3, { message: "Nama lengkap minimal 3 karakter" }),
  phone: z
    .string()
    .min(10, { message: "Nomor telepon minimal 10 digit" })
    .regex(/^\+?[0-9\s-]{10,}$/, "Format nomor telepon tidak valid"),
  address: z.string().min(10, { message: "Alamat minimal 10 karakter" }),
  city: z.string().min(1, { message: "Kota/Kabupaten harus dipilih" }),
  postalCode: z
    .string()
    .min(5, { message: "Kode pos minimal 5 digit" })
    .regex(/^[0-9]{5}$/, "Format kode pos tidak valid"),
  additionalNotes: z.string().optional(),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

interface ShippingFormProps {
  onSubmitShipping: (data: ShippingFormValues) => void; // Use inferred type
  defaultValues?: Partial<ShippingFormValues>; // Use inferred type
}

const ShippingForm: React.FC<ShippingFormProps> = ({
  onSubmitShipping,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: defaultValues, // This should be fine now
  });

  const onSubmit: SubmitHandler<ShippingFormValues> = (data) => {
    onSubmitShipping(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fullName">Nama Lengkap</Label>
          <Input
            id="fullName"
            {...register("fullName")}
            placeholder="Masukkan nama lengkap"
            className={`mt-1 ${errors.fullName ? "border-red-500" : ""}`}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Nomor Telepon</Label>
          <Input
            id="phone"
            {...register("phone")}
            placeholder="Masukkan nomor telepon"
            type="tel"
            className={`mt-1 ${errors.phone ? "border-red-500" : ""}`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="address">Alamat Lengkap</Label>
        <Input
          id="address"
          {...register("address")}
          placeholder="Masukkan alamat lengkap (nama jalan, nomor rumah, RT/RW)"
          className={`mt-1 ${errors.address ? "border-red-500" : ""}`}
        />
        {errors.address && (
          <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="city">Kota/Kabupaten</Label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  className={`mt-1 w-full ${
                    errors.city ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Pilih Kota/Kabupaten" />
                </SelectTrigger>
                <SelectContent>
                  {CITIES_KABUPATEN.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.city && (
            <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="postalCode">Kode Pos</Label>
          <Input
            id="postalCode"
            {...register("postalCode")}
            placeholder="Masukkan kode pos"
            className={`mt-1 ${errors.postalCode ? "border-red-500" : ""}`}
          />
          {errors.postalCode && (
            <p className="mt-1 text-xs text-red-500">
              {errors.postalCode.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="additionalNotes">Catatan Tambahan (Opsional)</Label>
        <Input
          id="additionalNotes"
          {...register("additionalNotes")}
          placeholder="Petunjuk khusus untuk pengiriman"
          className="mt-1"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gray-800 hover:bg-gray-900 text-white"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Memproses..." : "Lanjut ke Pembayaran"}
      </Button>
    </form>
  );
};

export default ShippingForm;
