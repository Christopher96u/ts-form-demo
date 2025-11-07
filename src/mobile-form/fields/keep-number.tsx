import { Field, FieldControl, FieldError, FieldLabel, useFieldContext } from "../../ui/form";
import type { MobileFormValues } from "../schemas";

const MobileKeepNumberField = () => {
  const field = useFieldContext<MobileFormValues["keepNumber"]>();

  return (
    <Field>
      <FieldLabel>Do you want to keep your current phone number? *</FieldLabel>
      <FieldControl>
        <div className="space-x-6">
          <label>
            <input
              type="radio"
              name={field.name}
              checked={field.state.value === 'KEEP-NUMBER'}
              onChange={() => field.handleChange('KEEP-NUMBER')}
              onBlur={field.handleBlur}
            />
            <span>Yes</span>
          </label>
          <label>
            <input
              type="radio"
              name={field.name}
              checked={field.state.value === 'NEW-NUMBER'}
              onChange={() => field.handleChange('NEW-NUMBER')}
              onBlur={field.handleBlur}
            />
            <span>No</span>
          </label>
        </div>
      </FieldControl>
      <FieldError />
    </Field>
  );
};

export { MobileKeepNumberField };
