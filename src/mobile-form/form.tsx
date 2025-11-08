import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "../ui/form";
import { MobileKeepNumberField } from "./fields/keep-number";
import { MobileSimTypeField } from "./fields/sim-type";
import { MobileServiceAddressField } from "./fields/service-address";
import { MobileNewNumberSelectField } from "./fields/new-number";
import { MobilePlanField } from "./fields/current-plan";
import { MobileDOBField } from "./fields/dob";
import { MobileCurrentMobileNumberField } from "./fields/current-mobile-number";
import { MobileOTPField } from "./fields/otp";
import { MobileAccountNumberField } from "./fields/account-number";

// This hook is only for "mobile form"
export const { useAppForm: useMobileForm, withForm: withMobileForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    KeepNumber: MobileKeepNumberField,
    NewMobileNumber: MobileNewNumberSelectField,
    ServiceAddress: MobileServiceAddressField,
    SimType: MobileSimTypeField,
    PlanField: MobilePlanField,
    DOBField: MobileDOBField,
    CurrentMobileNumberField: MobileCurrentMobileNumberField,
    OTPField: MobileOTPField,
    AccountNumberField: MobileAccountNumberField
  },
  formComponents: {},
});

export type MobileFormApi = ReturnType<typeof useMobileForm>;
