import { Field, FieldControl, FieldError, FieldLabel, useFieldContext } from "../../ui/form";


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
          className="border text-small placeholder:text-xs w-[300px]"
          />
      </FieldControl> 
      <FieldError/>
    </Field>
  )
  }
  export {MobileAccountNumberField}