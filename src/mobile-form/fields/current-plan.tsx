import { Field, FieldControl, FieldError, FieldLabel, useFieldContext } from "../../ui/form";
import { selectClasses } from "./styles";
import type { MobileFormValues } from "../schemas";


const PLANS: MobileFormValues['planType'][] = ['PREPAID', 'POSTPAID'];

const MobilePlanField = () => {
  const field = useFieldContext<MobileFormValues['planType']>();

  return (
    <Field>
      <FieldLabel>Choose your current plan *</FieldLabel>
      <FieldControl>
        <select
          value={field.state.value ?? ''}
          name={field.name}
          onChange={(event) =>
            field.handleChange(event.target.value as MobileFormValues['planType'])
          }
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
