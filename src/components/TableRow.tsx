import { Pencil, Trash2, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Row } from '@/types';

type TableRowProps = {
  row: Row;
  isEditing: boolean;
  editValues: Partial<Row>;
  rowIndex: number;
  onEdit: (row: Row) => void;
  onDelete: (id: number) => void;
  onSave: (id: number) => void;
  onCancel: () => void;
  onUpdateEdit: (key: keyof Row, value: string) => void;
};

export default function TableRow({
  row,
  isEditing,
  editValues,
  rowIndex,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  onUpdateEdit,
}: TableRowProps) {
  const isEven = rowIndex % 2 === 0;

  const editableFields: (keyof Row)[] = ['col1', 'col2', 'col3'];

  return (
    <tr
      className={cn(
        'transition-colors',
        isEven ? 'bg-white' : 'bg-slate-50',
        'hover:bg-indigo-50'
      )}
    >
      {editableFields.map((field) => (
        <td key={field} className="px-6 py-3 text-sm text-slate-700 border-b border-slate-100">
          {isEditing ? (
            <input
              type="text"
              value={editValues[field] ?? ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onUpdateEdit(field, e.target.value)
              }
              className="w-full px-2 py-1 border border-indigo-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ) : (
            <span>{row[field]}</span>
          )}
        </td>
      ))}
      <td className="px-6 py-3 text-sm border-b border-slate-100">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={() => onSave(row.id)}
                className="p-1.5 rounded-md bg-accent text-white hover:opacity-80 transition"
                title="Save"
              >
                <Check size={14} />
              </button>
              <button
                onClick={onCancel}
                className="p-1.5 rounded-md bg-slate-400 text-white hover:opacity-80 transition"
                title="Cancel"
              >
                <X size={14} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onEdit(row)}
                className="p-1.5 rounded-md bg-primary text-white hover:opacity-80 transition"
                title="Edit"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => onDelete(row.id)}
                className="p-1.5 rounded-md bg-danger text-white hover:opacity-80 transition"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
