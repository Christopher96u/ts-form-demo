import { Field, FieldControl, FieldError, FieldLabel, useFieldContext } from "../../ui/form";
import { inputClasses } from "./styles";


const MobileDOBField = () => {
  const field = useFieldContext<string>();

  return (
    <Field>
     <FieldLabel>Date of birth *</FieldLabel>
     <FieldControl>
        <input
          type="text"
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          placeholder="Date of birth"
          className={inputClasses}
        />
      </FieldControl> 
      <FieldError/>
    </Field>
  )
  }
  export {MobileDOBField}
