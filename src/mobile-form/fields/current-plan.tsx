import { Field, FieldControl, FieldError, FieldLabel, useFieldContext } from "../../ui/form";
import { selectClasses } from "./styles";


const PLANS = [
  'PREPAID',
  'POSTPAID',
];

const MobilePlanField = () => {
  const field = useFieldContext<string>();

  return (
    <Field>
      <FieldLabel>Choose your current plan *</FieldLabel>
      <FieldControl>
        <select
          value={field.state.value ?? ''}
          onChange={(event) => field.handleChange(event.target.value)}
          onBlur={field.handleBlur}
          className={selectClasses}
        >
          <option value="" disabled>
            Select your current plan
          </option>
          {PLANS.map((planType) => (
            <option key={planType} value={planType}>
              {planType}
            </option>
          ))}
        </select>
      </FieldControl>
      <FieldError />
    </Field>
  );
};

export { MobilePlanField };
