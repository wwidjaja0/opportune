import { InferSchemaType, Schema, model } from "mongoose";

const companySchema = new Schema({
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
});

type Company = InferSchemaType<typeof companySchema>;

export default model<Company>("Company", companySchema);
