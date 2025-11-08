import type { AnyFormApi } from "@tanstack/react-form";

type FormMetaApi = Pick<AnyFormApi, "setFieldMeta">;

type ServerError = { message?: string };

const updateServerError = (
  form: FormMetaApi,
  field: string,
  updater: (prev?: ServerError[]) => ServerError[] | undefined,
) => {
  form.setFieldMeta(field, (prev) => {
    const previousErrors = prev.errorMap?.onServer as ServerError[] | undefined;
    const nextErrors = updater(previousErrors);
    return {
      ...prev,
      errorMap: { ...prev.errorMap, onServer: nextErrors },
      errorSourceMap: {
        ...prev.errorSourceMap,
        onServer: nextErrors ? "form" : undefined,
      },
    };
  });
};

export const clearServerError = (form: FormMetaApi, field: string) => {
  updateServerError(form, field, () => undefined);
};

export const setServerError = (form: FormMetaApi, field: string, message: string) => {
  updateServerError(form, field, () => [{ message }]);
};
