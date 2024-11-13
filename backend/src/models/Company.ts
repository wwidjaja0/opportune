import { InferSchemaType, Schema, model } from "mongoose";

const companySchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    city: {
      type: String,
      trim: true,
      required: false,
    },
    state: {
      type: String,
      trim: true,
      required: false,
    },
  },
  {
    // Automatically generates created and updated times
    timestamps: true,
  },
);

type Company = InferSchemaType<typeof companySchema>;

export default model<Company>("Company", companySchema);
