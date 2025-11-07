import { Field, FieldControl, FieldError, FieldLabel, useFieldContext } from "../../ui/form";



const MobileSimTypeField = () => {
  const field = useFieldContext<string | undefined>();

  return (
    <Field>
      <FieldLabel>Which sim type do you prefer? *</FieldLabel>
      <FieldControl>
        <div className="space-x-6">
          <label>
            <input
              type="radio"
              name={field.name}
              checked={field.state.value === 'ESIM'}
              onChange={() => field.handleChange('ESIM')}
              onBlur={field.handleBlur}
            />
            <span>ESIM</span>
          </label>
          <label>
            <input
              type="radio"
              name={field.name}
              checked={field.state.value === 'PHYSICAL'}
              onChange={() => field.handleChange('PHYSICAL')}
              onBlur={field.handleBlur}
            />
            <span>PHYSICAL</span>
          </label>
        </div>
      </FieldControl>
      <FieldError />
    </Field>
  );
};

export { MobileSimTypeField };