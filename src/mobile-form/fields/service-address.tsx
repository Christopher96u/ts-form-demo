import { Field, FieldControl, FieldError, FieldLabel, useFieldContext } from "../../ui/form";
import { inputClasses } from "./styles";


const MobileServiceAddressField = () => {
  const field = useFieldContext<string>();

  return (
    <Field>
     <FieldLabel>Service address *</FieldLabel>
     <FieldControl>
        <input
          type="text"
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          placeholder="Service address"
          className={inputClasses}
          />
      </FieldControl> 
      <FieldError/>
    </Field>
  )
  }
  export {MobileServiceAddressField}
