import { Field, FieldControl, FieldError, FieldLabel, useFieldContext } from "../../ui/form";
import type { MobileFormValues } from "../schemas";
import { pillOptionBase } from "./styles";

const MobileKeepNumberField = () => {
  const field = useFieldContext<MobileFormValues["keepNumber"]>();

  return (
    <Field>
      <FieldLabel>Do you want to keep your current phone number? *</FieldLabel>
      <FieldControl>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: 'Yes, keep it', value: 'KEEP-NUMBER' },
            { label: 'No, give me a new number', value: 'NEW-NUMBER' },
          ].map((option) => (
            <label
              key={option.value}
              className={`${pillOptionBase} ${
                field.state.value === option.value ? 'border-sky-400 bg-sky-400/10 text-sky-100 shadow-[0_10px_50px_rgba(56,189,248,0.35)]' : ''
              }`}
            >
              <input
                type="radio"
                name={field.name}
                checked={field.state.value === option.value}
                onChange={() => field.handleChange(option.value as MobileFormValues['keepNumber'])}
                onBlur={field.handleBlur}
                className="h-4 w-4 accent-sky-400"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </FieldControl>
      <FieldError />
    </Field>
  );
};

export { MobileKeepNumberField };
