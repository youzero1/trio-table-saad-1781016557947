import { Plus } from 'lucide-react';
import { useTable } from '@/hooks/useTable';
import TableHeader from '@/components/TableHeader';
import TableRow from '@/components/TableRow';
import SearchBar from '@/components/SearchBar';

export default function TablePage() {
  const {
    rows,
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
  } = useTable();

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Data Table</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage your 3-column table with sort, search, edit and delete.</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
            <SearchBar value={search} onChange={setSearch} />
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">
                {rows.length} row{rows.length !== 1 ? 's' : ''}
              </span>
              <button
                onClick={addRow}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition"
              >
                <Plus size={15} />
                Add Row
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <TableHeader sort={sort} onSort={handleSort} />
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-slate-400 text-sm">
                      No rows found. Add one or clear your search.
                    </td>
                  </tr>
                ) : (
                  rows.map((row, idx) => (
                    <TableRow
                      key={row.id}
                      row={row}
                      rowIndex={idx}
                      isEditing={editingId === row.id}
                      editValues={editValues}
                      onEdit={startEdit}
                      onDelete={deleteRow}
                      onSave={saveEdit}
                      onCancel={cancelEdit}
                      onUpdateEdit={updateEditValue}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-400">
            <span>Click any column header to sort</span>
            <span>Click <strong className="text-slate-600">✏️</strong> to edit a row inline</span>
          </div>
        </div>
      </div>
    </div>
  );
}
