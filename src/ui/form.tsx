import * as React from "react"
import { createFormHookContexts, useStore } from "@tanstack/react-form"
import type { ReactFormExtendedApi } from "@tanstack/react-form"
import { Slot } from "@radix-ui/react-slot"
import * as scn from "../ui/field"

const cx = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(" ")

const {
  useFieldContext,
  useFormContext: useUntypedFormContext,
  fieldContext,
  formContext,
} = createFormHookContexts()

function useFormContext<TFormData = Record<string, never>>() {
  return useUntypedFormContext() as unknown as ReactFormExtendedApi<
    TFormData,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >
}

function Form(props: React.ComponentProps<"form">) {
  const form = useFormContext()

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation()
        e.preventDefault()
        form.handleSubmit()
      }}
      {...props}
    />
  )
}

const IdContext = React.createContext<string>(null as never)

function useFieldComponentContext() {
  const field = useFieldContext()
  const idContext = React.useContext(IdContext)

  if (typeof idContext !== "string") {
    throw new Error("Form components should be used within <Field>")
  }

  const errors = useStore(field.store, (state) => state.meta.errors)
  const isTouched = useStore(field.store, (state) => state.meta.isTouched)
  const submissionAttempts = useStore(
    field.form.store,
    (state) => state.submissionAttempts
  )

  const fieldComponent = React.useMemo(() => {
    const showError = isTouched || submissionAttempts > 0

    let errorMessage: string | null = null
    if (showError && errors.length > 0) {
      const error = errors[0]

      if (typeof error === "string") {
        errorMessage = error
      } else if (typeof error === "object" && error !== null) {
        if ("message" in error && typeof error.message === "string") {
          errorMessage = error.message
        }
      } else if (error !== null && error !== undefined) {
        errorMessage = String(error)
      }
    }

    return {
      formControlId: `${idContext}-form-item`,
      formDescriptionId: `${idContext}-form-item-description`,
      formMessageId: `${idContext}-form-item-message`,
      error: errorMessage,
      hasError: showError && errorMessage !== null,
    }
  }, [idContext, isTouched, submissionAttempts, errors])

  return fieldComponent
}

function Field({
  className,
  ...props
}: React.ComponentProps<typeof scn.Field>) {
  const id = React.useId()
  const field = useFieldContext()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const isTouched = useStore(field.store, (state) => state.meta.isTouched)
  const submissionAttempts = useStore(
    field.form.store,
    (state) => state.submissionAttempts
  )
  const showError = isTouched || submissionAttempts > 0
  const hasError = showError && errors.length > 0

  return (
    <IdContext.Provider value={id}>
      <scn.Field
        data-slot="form-item"
        data-invalid={hasError ? "true" : undefined}
        className={cx("space-y-2", className)}
        {...props}
      />
    </IdContext.Provider>
  )
}

function FieldLabel({
  ...props
}: React.ComponentProps<typeof scn.FieldLabel>) {
  const { formControlId, hasError } = useFieldComponentContext()

  return (
    <scn.FieldLabel
      data-slot="form-label"
      data-error={hasError ? "true" : undefined}
      htmlFor={formControlId}
      className={cx("text-sm font-semibold text-white", props.className)}
      {...props}
    />
  )
}

function FieldControl(props: React.ComponentProps<typeof Slot>) {
  const { formControlId, formDescriptionId, formMessageId, hasError } =
    useFieldComponentContext()

  const describedBy = [formDescriptionId, hasError ? formMessageId : null]
    .filter(Boolean)
    .join(" ")

  return (
    <Slot
      data-slot="form-control"
      id={formControlId}
      aria-describedby={describedBy || undefined}
      aria-invalid={hasError}
      {...props}
    />
  )
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<typeof scn.FieldDescription>) {
  const { formDescriptionId } = useFieldComponentContext()

  return (
    <scn.FieldDescription
      data-slot="form-description"
      id={formDescriptionId}
      className={className}
      {...props}
    />
  )
}

function FieldError({
  className,
  ...props
}: React.ComponentProps<typeof scn.FieldError>) {
  const { error, formMessageId } = useFieldComponentContext()
  const body = error ?? props.children

  if (!body) {
    return null
  }

  return (
    <scn.FieldError
      data-slot="form-message"
      id={formMessageId}
      className={cx("text-[13px] font-medium text-rose-300", className)}
      {...props}
    >
      {body}
    </scn.FieldError>
  )
}

export {
  Form,
  Field,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldError,
  fieldContext,
  useFieldContext,
  formContext,
  useFormContext,
}
