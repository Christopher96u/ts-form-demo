import { useStore } from "@tanstack/react-form";
import { Field, FieldControl, FieldError, FieldLabel, useFieldContext, useFormContext } from "../../ui/form";
import type { MobileFormValues } from "../schemas";
import { inputClasses } from "./styles";

const MobileCurrentMobileNumberField = () => {
  const field = useFieldContext<string>();
  const form = useFormContext<MobileFormValues>();
  const isLocked = useStore(
    form.store,
    (state) => state.values.otpStatus === 'VERIFIED'
  );
  return (
    <Field>
     <FieldLabel>Current mobile number *</FieldLabel>
     <FieldControl>
        <input
          type="text"
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          placeholder="Mobile number"
          className={inputClasses}
          disabled={isLocked}
          />
      </FieldControl> 
      <FieldError/>
    </Field>
  )
  }
  export {MobileCurrentMobileNumberField}
