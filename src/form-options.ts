import { formOptions } from "@tanstack/react-form";
import { MobileFormValues } from "./mobile-form/schemas";
export const mobileFormOptions = ({
    simType,
    draft
  }: {
    simType: "ESIM" | "PHYSICAL";
    // This 'draft' will come sometimes from Zustand store
    // to initialize the form after saving it
    draft?: MobileFormValues
  }) => {
    const baseValues: MobileFormValues = {
      serviceAddress: "",
      simType,
      keepNumber: "UNSELECTED",
      newMobileNumber: "",
      planType: "",
      mobileNumber: "",
      otp: "",
      otpStatus: "IDLE",
      dob: "",
      accountNumber: "",
    };

    const defaultValues: MobileFormValues = draft
      ? { ...baseValues, ...draft }
      : baseValues;

    return formOptions({
      defaultValues,
    });
  }
