import { Field, FieldControl, FieldError, FieldLabel, useFieldContext } from '../../ui/form';
import { inputClasses } from '../../mobile-form/fields/styles';

const AccountLastNameField = () => {
  const field = useFieldContext<string>();

  return (
    <Field>
      <FieldLabel>Last name *</FieldLabel>
      <FieldControl>
        <input
          type="text"
          name={field.name}
          placeholder="e.g. Gonzalez"
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          value={field.state.value}
          className={inputClasses}
        />
      </FieldControl>
      <FieldError />
    </Field>
  );
};

export { AccountLastNameField };
