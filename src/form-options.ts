import { formOptions } from "@tanstack/react-form";
import { MobileFormValues, MobileFormDraft } from "./mobile-form/schemas";
export const mobileFormOptions = ({
    simType,
    draft
  }: {
    simType: "ESIM" | "PHYSICAL";
    // This 'draft' will come sometimes from Zustand store
    // to initialize the form after saving it
    draft?: MobileFormDraft
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

    const mergeWithDraft = (partial?: MobileFormDraft): MobileFormValues => {
      if (!partial) {
        return baseValues;
      }

      return {
        ...baseValues,
        ...partial,
      } as MobileFormValues;
    };

    const defaultValues = mergeWithDraft(draft);

    return formOptions({
      defaultValues,
    });
  }
