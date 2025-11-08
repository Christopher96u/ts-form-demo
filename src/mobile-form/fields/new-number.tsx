import { Field, FieldControl, FieldError, FieldLabel, useFieldContext } from "../../ui/form";
import { selectClasses } from "./styles";
import { useQuery } from "@tanstack/react-query";
import { fetchAvailableNumbers } from "../../api/available-numbers";

const MobileNewNumberSelectField = () => {
  const field = useFieldContext<string>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['available-numbers'],
    queryFn: fetchAvailableNumbers,
    staleTime: 'static',
  });
  const numbers = data?.numbers ?? [];

  return (
    <Field>
      <FieldLabel>Choose your new number *</FieldLabel>
      <FieldControl>
        {isError ? (
          <p className="text-sm text-rose-300">Unable to load numbers, please try again later.</p>
        ) : (
          <select
            name={field.name}
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
            onBlur={field.handleBlur}
            className={selectClasses}
            disabled={isLoading}
          >
            <option value="" disabled>
              {isLoading ? 'Loading numbers…' : 'Select a number'}
            </option>
            {numbers.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        )}
      </FieldControl>
      <FieldError />
    </Field>
  );
};

export { MobileNewNumberSelectField };
