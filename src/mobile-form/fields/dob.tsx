import { Field, FieldControl, FieldError, FieldLabel, useFieldContext } from "../../ui/form";


const MobileDOBField = () => {
  const field = useFieldContext<string>();

  return (
    <Field>
     <FieldLabel>Date of birth *</FieldLabel>
     <FieldControl>
        <input
          type="text"
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          placeholder="Date of birth"
          className="border text-small placeholder:text-xs"
          />
      </FieldControl> 
      <FieldError/>
    </Field>
  )
  }
  export {MobileDOBField}