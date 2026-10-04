import { useCallback, useEffect, useState, type ReactNode } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import AdminTable, { type TableColumn } from "./AdminTable";
import Button from "./Button";
import Modal from "./Modal";
import RowsSkeleton from "./RowsSkeleton";

interface ResourcePageProps<T> {
  title: string;
  description: string;
  /** Plural noun used in the count and error copy, e.g. "drivers". */
  noun: string;
  addLabel: string;
  emptyMessage: string;
  load: () => Promise<T[]>;
  columns: TableColumn<T>[];
  keyExtractor: ((item: T) => string) | keyof T;
  renderDetail: (item: T, reload: () => void) => ReactNode;
  renderAddForm: (onSuccess: () => void, onCancel: () => void) => ReactNode;
}

/** Shared list page for each admin section: header, table and add panel. */
export default function ResourcePage<T>({
  title,
  description,
  noun,
  addLabel,
  emptyMessage,
  load,
  columns,
  keyExtractor,
  renderDetail,
  renderAddForm,
}: ResourcePageProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      setItems(await load());
      setError(null);
    } catch (err) {
      console.error(`Error fetching ${noun}:`, err);
      setError(`Couldn't load ${noun}. Check the API is running, then reload the page.`);
    } finally {
      setLoading(false);
    }
  }, [load, noun]);

  useEffect(() => {
    reload();
  }, [reload]);

  const handleCreated = () => {
    setAdding(false);
    reload();
  };

  return (
    <div className="px-6 py-8 lg:px-10">
      <header className="mb-8 flex flex-wrap items-end gap-x-6 gap-y-4">
        <div className="min-w-0 flex-1">
          <h1 className="flex items-baseline gap-3 font-heading text-3xl">
            {title}
            {!loading && !error && (
              <span className="text-xl font-normal text-ash tabular-nums" aria-label={`${items.length} ${noun}`}>
                {items.length}
              </span>
            )}
          </h1>
          <p className="mt-1.5 text-ash">{description}</p>
        </div>
        <Button onClick={() => setAdding(true)}>
          <PlusIcon className="-ml-1 h-5 w-5" aria-hidden />
          {addLabel}
        </Button>
      </header>

      {loading ? (
        <RowsSkeleton />
      ) : error ? (
        <p role="alert" className="border-l-2 border-signal py-1 pl-3">
          {error}
        </p>
      ) : (
        <AdminTable
          data={items}
          columns={columns}
          emptyMessage={emptyMessage}
          keyExtractor={keyExtractor}
          expandableContent={(item) => renderDetail(item, reload)}
        />
      )}

      <Modal isOpen={adding} onClose={() => setAdding(false)} title={addLabel}>
        {renderAddForm(handleCreated, () => setAdding(false))}
      </Modal>
    </div>
  );
}
