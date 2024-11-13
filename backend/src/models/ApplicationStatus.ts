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

type ApplicationStatus = InferSchemaType<typeof applicationStatusSchema>;

export { applicationStatusSchema };
export default model<ApplicationStatus>(
  "ApplicationStatus",
  applicationStatusSchema,
);
