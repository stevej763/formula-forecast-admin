import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

export default function TextField({ id, label, error, className = "", ...props }: TextFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`h-10 w-full rounded-md border bg-carbon px-3 text-chalk placeholder:text-ash/70 focus:outline-none ${
          error ? "border-signal" : "border-graphite focus:border-chalk"
        }`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-signal">
          {error}
        </p>
      )}
    </div>
  );
}
