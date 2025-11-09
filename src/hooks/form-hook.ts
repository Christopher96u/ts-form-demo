import { createFormHook } from "@tanstack/react-form"
import { fieldContext, formContext } from "../ui/form"
import { AccountFirstNameField } from "../account-form/fields/first-name"
import { AccountLastNameField } from "../account-form/fields/last-name"
import { MobileKeepNumberField } from "../mobile-form/fields/keep-number"
import { MobileSimTypeField } from "../mobile-form/fields/sim-type"
import { MobileServiceAddressField } from "../mobile-form/fields/service-address"
import { MobileNewNumberSelectField } from "../mobile-form/fields/new-number"
import { MobilePlanField } from "../mobile-form/fields/current-plan"
import { MobileDOBField } from "../mobile-form/fields/dob"
import { MobileCurrentMobileNumberField } from "../mobile-form/fields/current-mobile-number"
import { MobileOTPField } from "../mobile-form/fields/otp"
import { MobileAccountNumberField } from "../mobile-form/fields/account-number"

const { useAppForm, withForm: withAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    FirstName: AccountFirstNameField,
    LastName: AccountLastNameField,
    KeepNumber: MobileKeepNumberField,
    NewMobileNumber: MobileNewNumberSelectField,
    ServiceAddress: MobileServiceAddressField,
    SimType: MobileSimTypeField,
    PlanField: MobilePlanField,
    DOBField: MobileDOBField,
    CurrentMobileNumberField: MobileCurrentMobileNumberField,
    OTPField: MobileOTPField,
    AccountNumberField: MobileAccountNumberField,
  },
  formComponents: {},
})

export { useAppForm, withAppForm }
export type AppFormApi = ReturnType<typeof useAppForm>
