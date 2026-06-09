import { useState, useCallback } from 'react';
import type { Row, SortState } from '@/types';
import { generateId } from '@/lib/utils';

const INITIAL_DATA: Row[] = [
  { id: 1, col1: 'Alice Johnson', col2: 'Engineering', col3: 'Senior' },
  { id: 2, col1: 'Bob Smith', col2: 'Design', col3: 'Mid' },
  { id: 3, col1: 'Carol White', col2: 'Marketing', col3: 'Junior' },
  { id: 4, col1: 'David Brown', col2: 'Engineering', col3: 'Lead' },
  { id: 5, col1: 'Eva Martinez', col2: 'Sales', col3: 'Senior' },
  { id: 6, col1: 'Frank Lee', col2: 'Design', col3: 'Junior' },
];

export function useTable() {
  const [rows, setRows] = useState<Row[]>(INITIAL_DATA);
  const [sort, setSort] = useState<SortState>({ column: null, direction: null });
  const [search, setSearch] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<Row>>({});

  const filteredRows = rows.filter((row) => {
    const q = search.toLowerCase();
    return (
      row.col1.toLowerCase().includes(q) ||
      row.col2.toLowerCase().includes(q) ||
      row.col3.toLowerCase().includes(q)
    );
  });

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sort.column || !sort.direction) return 0;
    const aVal = a[sort.column];
    const bVal = b[sort.column];
    const cmp = String(aVal).localeCompare(String(bVal));
    return sort.direction === 'asc' ? cmp : -cmp;
  });

  const handleSort = useCallback((col: keyof Row) => {
    setSort((prev) => {
      if (prev.column !== col) return { column: col, direction: 'asc' };
      if (prev.direction === 'asc') return { column: col, direction: 'desc' };
      return { column: null, direction: null };
    });
  }, []);

  const addRow = useCallback(() => {
    const newRow: Row = { id: generateId(), col1: 'New Name', col2: 'Department', col3: 'Level' };
    setRows((prev) => [...prev, newRow]);
  }, []);

  const deleteRow = useCallback((id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const startEdit = useCallback((row: Row) => {
    setEditingId(row.id);
    setEditValues({ col1: row.col1, col2: row.col2, col3: row.col3 });
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditValues({});
  }, []);

  const saveEdit = useCallback((id: number) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, ...editValues } : r
      )
    );
    setEditingId(null);
    setEditValues({});
  }, [editValues]);

  const updateEditValue = useCallback((key: keyof Row, value: string) => {
    setEditValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  return {
    rows: sortedRows,
    sort,
    search,
    setSearch,
    handleSort,
    addRow,
    deleteRow,
    editingId,
    editValues,
    startEdit,
    cancelEdit,
    saveEdit,
    updateEditValue,
  };
}
