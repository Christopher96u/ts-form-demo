import { Field, FieldControl, FieldError, FieldLabel, useFieldContext } from "../../ui/form";

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
 // If the current value of the input is present in VALID_OTPS we shoud lock the input
  return (
    <Field>
     <FieldLabel>OTP *</FieldLabel>
     <FieldControl>
        <input
          type="text"
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          placeholder="OTP"
          className="border text-small placeholder:text-xs"
          />
      </FieldControl> 
      <FieldError/>
    </Field>
  )
  }
  export {MobileOTPField}