import { useMemo } from "react"

function FieldSet({ ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      {...props}
    />
  )
}

function FieldLegend({
  ...props
}: React.ComponentProps<"legend">) {
  return (
    <legend
      data-slot="field-legend"
      {...props}
    />
  )
}

function FieldGroup({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      {...props}
    />
  )
}

function Field({
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="field"
      {...props}
    />
  )
}

function FieldContent({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      {...props}
    />
  )
}

function FieldLabel({
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="field-label"
      {...props}
    />
  )
}

function FieldTitle({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      {...props}
    />
  )
}

function FieldDescription({...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      {...props}
    >
      {children && (
        <span
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul>
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
