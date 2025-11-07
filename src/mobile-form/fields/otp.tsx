import { useStore } from "@tanstack/react-form";
import { Field, FieldControl, FieldError, FieldLabel, useFieldContext, useFormContext } from "../../ui/form";
import type { MobileFormValues } from "../schemas";

export const VALID_OTPS = [
  '1111',
  '2222',
  '3333',
  '4444',
  '5555',
  '6666',
  '7777',
  '8888',
  '9999'
]

const MobileOTPField = () => {
  const field = useFieldContext<string>();
  const form = useFormContext<MobileFormValues>();
  const isLocked = useStore(
    form.store,
    (state) => state.values.otpStatus === 'VERIFIED'
  );
  return (
    <Field>
     <FieldLabel>OTP *</FieldLabel>
     <FieldControl>
        <input
          type="text"
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          placeholder="OTP"
          className="border text-small placeholder:text-xs disabled:bg-gray-100"
          disabled={isLocked}
          />
      </FieldControl> 
      <FieldError/>
    </Field>
  )
  }
  export {MobileOTPField}
