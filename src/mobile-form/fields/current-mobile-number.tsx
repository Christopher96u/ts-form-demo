import { Field, FieldControl, FieldError, FieldLabel, useFieldContext } from "../../ui/form";


const MobileCurrentMobileNumberField = () => {
  const field = useFieldContext<string>();
// if the OTP is verified we should lock this input
  return (
    <Field>
     <FieldLabel>Current mobile number *</FieldLabel>
     <FieldControl>
        <input
          type="text"
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          placeholder="Mobile number"
          className="border text-small placeholder:text-xs"
          />
      </FieldControl> 
      <FieldError/>
    </Field>
  )
  }
  export {MobileCurrentMobileNumberField}