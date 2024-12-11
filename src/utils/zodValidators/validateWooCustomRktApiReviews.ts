import { ReviewsRespSchema } from "@/types/services";
import { ZodError } from "zod";

export const ValidateWooCustomRktApiReviews = (data: any) => {
  try {
    ReviewsRespSchema.parse(data);
    return true;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(
        "Validation failed in ValidatewooCustomRktApiReviews:",
        error.errors
      );
      return false;
    }
    console.error("Unexpected error:", error);
    return false;
  }
};
