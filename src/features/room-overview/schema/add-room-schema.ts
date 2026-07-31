import z from "zod";
export const addRoomSchema = z.object({
  room_number: z.string().min(1, "Room Name is required"),
  status: z.enum(["available", "occupied"], {
    message: "Status is required",
  }),
  rent_price: z.number({ message: "Monthly Rent is required" })
    .refine((val) => !Number.isNaN(val))
    .int()
    .positive()
    .min(1),
  capacity: z.number({ message: "Capacity is required" })
    .refine((val) => !Number.isNaN(val))
    .int()
    .positive()
    .min(1),
  maintenance: z.string().min(1, "Maintenance is required"),
  photo_url: z.string().min(1, "Image is required"),
});

export type AddRoomFormValues = z.infer<typeof addRoomSchema>;

