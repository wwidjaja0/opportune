import { InferSchemaType, Schema, model } from "mongoose";

export enum ApplicationStatus {
  APPLIED = "APPLIED",
  OA = "OA",
  PHONE = "PHONE",
  FINAL = "FINAL",
  OFFER = "OFFER",
  REJECTED = "REJECTED",
}

const applicationStatusSchema = new Schema({
  status: {
    type: String,
    enum: Object.values(ApplicationStatus),
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
});

const applicationSchema = new Schema(
  {
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
    process: {
      type: [applicationStatusSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

type Application = InferSchemaType<typeof applicationSchema>;

export default model<Application>("Application", applicationSchema);
