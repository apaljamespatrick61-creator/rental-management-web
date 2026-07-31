"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddRoomMutation } from "../hooks/room/use-add-room-mutation";
import {
  addRoomSchema,
  type AddRoomFormValues,
} from "../schema/add-room-schema";
interface AddRoomProps {
  onClose: () => void;
  title?: string;
}

const AddRoom = ({ onClose, title }: AddRoomProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const maintenanceOptions = [
    "Plumbing",
    "Electrical",
    "Painting",
    "Cleaning",
    "Other",
    " None",
  ];

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<AddRoomFormValues>({
    resolver: zodResolver(addRoomSchema),
  });
  const { addRoomMutation } = useAddRoomMutation();

  const previewUrl = useMemo(
    () => (selectedImage ? URL.createObjectURL(selectedImage) : null),
    [selectedImage],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
          return;
        }

        reject(new Error("Failed to convert image to string"));
      };
      reader.onerror = () => reject(new Error("Failed to read selected image"));
      reader.readAsDataURL(file);
    });

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedImage(file);

    if (!file) {
      setValue("photo_url", "", { shouldValidate: true });
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      setValue("photo_url", dataUrl, { shouldValidate: true });
      clearErrors("photo_url");
    } catch {
      setValue("photo_url", "", { shouldValidate: true });
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setValue("photo_url", "", { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data: AddRoomFormValues) => {
    addRoomMutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 bg-opacity-50">
        <div className="relative z-[100000] w-full sm:max-w-lg lg:max-w-xl rounded-xl bg-white p-6 shadow-lg ">
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          <div className="mt-6 space-y-4 p-4">
            <div>
              <label htmlFor="name" className="font-semibold">
                Room Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Room Name"
                className="w-full p-2 border border-gray-300 rounded"
                {...register("room_number")}
              />
              {errors.room_number && (
                <p className="text-red-500 text-sm">{errors.room_number.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="status" className="font-semibold">
                Status
              </label>
              <select
                id="status"
                className="w-full p-2 border border-gray-300 rounded"
                {...register("status")}
              >
                <option value="">Select status</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="monthly_rent" className="font-semibold">
                Monthly Rent
              </label>
              <input
                id="monthly_rent"
                type="number"
                placeholder="Monthly Rent"
                className="w-full p-2 border border-gray-300 rounded"
                {...register("rent_price", { valueAsNumber: true })}
              />
              {errors.rent_price && (
                <p className="text-red-500 text-sm">
                  {errors.rent_price.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="capacity" className="font-semibold">
                Capacity
              </label>
              <input
                id="capacity"
                type="number"
                placeholder="Capacity"
                className="w-full p-2 border border-gray-300 rounded"
                {...register("capacity", { valueAsNumber: true })}
              />
              {errors.capacity && (
                <p className="text-red-500 text-sm">
                  {errors.capacity.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="maintenance" className="font-semibold">
                Maintenance
              </label>
              <select
                id="maintenance"
                className="w-full p-2 border border-gray-300 rounded"
                {...register("maintenance")}
              >
                <option value="">Select maintenance</option>
                {maintenanceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {errors.maintenance && (
                <p className="text-red-500 text-sm">
                  {errors.maintenance.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="room-image" className="font-semibold">
                Image
              </label>
              <input
                id="room-image"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={handlePickImage}
                >
                  Upload Image
                </button>
                {selectedImage ? (
                  <span className="text-sm text-gray-600">
                    {selectedImage.name}
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">
                    No file selected
                  </span>
                )}
              </div>

              {previewUrl ? (
                <div className="mt-3 rounded-md border border-gray-200 p-2">
                  <Image
                    src={previewUrl}
                    alt="Room preview"
                    width={640}
                    height={240}
                    className="h-36 w-full rounded object-cover"
                    unoptimized
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      className="text-sm font-medium text-red-600 hover:text-red-700"
                      onClick={handleRemoveImage}
                    >
                      Remove image
                    </button>
                  </div>
                </div>
              ) : null}
              {errors.photo_url && (
                <p className="mt-2 text-red-500 text-sm">
                  {errors.photo_url.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
            >
              Save Room
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddRoom;
