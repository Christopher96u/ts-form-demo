import { Field, FieldControl, FieldError, FieldLabel, useFieldContext } from "../../ui/form";
import { pillOptionBase } from "./styles";



const MobileSimTypeField = () => {
  const field = useFieldContext<string | undefined>();

  return (
    <Field>
      <FieldLabel>Which sim type do you prefer? *</FieldLabel>
      <FieldControl>
        <div className="grid gap-3 sm:grid-cols-2">
          {["ESIM", "PHYSICAL"].map((option) => (
            <label
              key={option}
              className={`${pillOptionBase} ${
                field.state.value === option ? 'border-sky-400 bg-sky-400/10 text-sky-100 shadow-[0_10px_50px_rgba(56,189,248,0.35)]' : ''
              }`}
            >
              <input
                type="radio"
                name={field.name}
                checked={field.state.value === option}
                onChange={() => field.handleChange(option)}
                onBlur={field.handleBlur}
                className="h-4 w-4 accent-sky-400"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </FieldControl>
      <FieldError />
    </Field>
  );
};

export { MobileSimTypeField };
