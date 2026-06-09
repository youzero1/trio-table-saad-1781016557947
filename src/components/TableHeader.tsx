import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Row, SortState } from '@/types';

type TableHeaderProps = {
  sort: SortState;
  onSort: (col: keyof Row) => void;
};

const COLUMNS: { key: keyof Row; label: string }[] = [
  { key: 'col1', label: 'Name' },
  { key: 'col2', label: 'Department' },
  { key: 'col3', label: 'Level' },
];

export default function TableHeader({ sort, onSort }: TableHeaderProps) {
  return (
    <thead>
      <tr className="bg-primary text-white">
        {COLUMNS.map((col) => {
          const isActive = sort.column === col.key;
          return (
            <th
              key={col.key}
              onClick={() => onSort(col.key)}
              className={cn(
                'px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider cursor-pointer select-none transition-colors',
                isActive ? 'bg-primary-dark' : 'hover:bg-primary-dark'
              )}
            >
              <div className="flex items-center gap-2">
                <span>{col.label}</span>
                {isActive && sort.direction === 'asc' && <ArrowUp size={14} />}
                {isActive && sort.direction === 'desc' && <ArrowDown size={14} />}
                {!isActive && <ArrowUpDown size={14} className="opacity-50" />}
              </div>
            </th>
          );
        })}
        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider w-32">
          Actions
        </th>
      </tr>
    </thead>
  );
}
