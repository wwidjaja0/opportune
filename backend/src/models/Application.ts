import { InferSchemaType, Schema, model } from "mongoose";

const applicationStatusSchema = new Schema({
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const applicationSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  progress: {
    type: [applicationStatusSchema],
    default: [],
  },
  },
  {
    timestamps: true
  }
);

type Application = InferSchemaType<typeof applicationSchema>;

export default model<Application>("Application", applicationSchema);

