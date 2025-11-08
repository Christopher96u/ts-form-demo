import { Field, FieldControl, FieldError, FieldLabel, useFieldContext } from '../../ui/form';
import { inputClasses } from '../../mobile-form/fields/styles';

const AccountFirstNameField = () => {
  const field = useFieldContext<string>();

  return (
    <Field>
      <FieldLabel>First name *</FieldLabel>
      <FieldControl>
        <input
          type="text"
          name={field.name}
          placeholder="e.g. Maria"
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

export { AccountFirstNameField };
