import { useState, type ReactNode } from "react";

interface DetailListProps {
  items: { label: string; value: ReactNode }[];
}

/** Label/value pairs for an expanded row. */
export function DetailList({ items }: DetailListProps) {
  return (
    <dl className="grid max-w-3xl grid-cols-[max-content_1fr] gap-x-8 gap-y-2.5 text-sm">
      {items.map((item) => (
        <div key={item.label} className="contents">
          <dt className="text-ash">{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Internal IDs are only needed for support and API calls, so copy rather than display. */
export function CopyId({ id, label = "Copy ID" }: { id: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.prompt("Copy this ID", id);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      title={id}
      className="-mx-2 -my-1 rounded-md px-2 py-1 text-sm text-ash hover:bg-graphite hover:text-chalk"
    >
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
