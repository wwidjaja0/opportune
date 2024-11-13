import { InferSchemaType, Schema, model } from "mongoose";
import { applicationStatusSchema } from "./ApplicationStatus";

const applicationSchema = new Schema({
  _id: {
    type: String,
    unique: true,
    required: true,
  },
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
    timestamps: { createdAt: 'dateCreated', updatedAt: 'dateModified' }
  }
);

type Application = InferSchemaType<typeof applicationSchema>;

export default model<Application>("Application", applicationSchema);
