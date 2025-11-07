import { Field, FieldControl, FieldError, FieldLabel, useFieldContext } from "../../ui/form";
import { inputClasses } from "./styles";


const MobileAccountNumberField = () => {
  const field = useFieldContext<string>();
//form.resetField('accountNumber');
  return (
    <Field>
     <FieldLabel>Account number *</FieldLabel>
     <FieldControl>
        <input
          type="text"
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          placeholder="Account number"
          className={inputClasses}
          />
      </FieldControl> 
      <FieldError/>
    </Field>
  )
  }
  export {MobileAccountNumberField}
