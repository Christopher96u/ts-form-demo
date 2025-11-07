import { Field, FieldControl, FieldError, FieldLabel, useFieldContext } from "../../ui/form";


const HARD_CODED_NUMBERS = [
  '0400 111 001',
  '0400 111 002',
  '0400 111 003',
  '0400 111 004',
  '0400 111 005',
  '0400 111 006',
  '0400 111 007',
  '0400 111 008',
  '0400 111 009',
  '0400 111 010',
];

const MobileNewNumberSelectField = () => {
  const field = useFieldContext<string>();

  return (
    <Field>
      <FieldLabel>Choose your new number *</FieldLabel>
      <FieldControl>
        <select
          value={field.state.value ?? ''}
          onChange={(event) => field.handleChange(event.target.value)}
          onBlur={field.handleBlur}
          className="border"
        >
          <option value="" disabled>
            Select a number
          </option>
          {HARD_CODED_NUMBERS.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </FieldControl>
      <FieldError />
    </Field>
  );
};

export { MobileNewNumberSelectField };