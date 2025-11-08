import { Field, FieldControl, FieldError, FieldLabel, useFieldContext } from "../../ui/form";
import { inputClasses } from "./styles";


const MobileAccountNumberField = () => {
  const field = useFieldContext<string>();

  return (
    <Field>
     <FieldLabel>Account number *</FieldLabel>
     <FieldControl>
        <input
          type="text"
          name={field.name}
          value={field.state.value}
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
