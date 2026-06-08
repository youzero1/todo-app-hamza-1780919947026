import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const PRIORITY_BADGE: Record<string, string> = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-700',
};

const PRIORITY_BORDER: Record<string, string> = {
  low: 'border-l-emerald-400',
  medium: 'border-l-amber-400',
  high: 'border-l-rose-400',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);

  function handleEditSubmit(): void {
    onEdit(todo.id, editText);
    setEditing(false);
  }

  function handleEditCancel(): void {
    setEditText(todo.text);
    setEditing(false);
  }

  return (
    <li
      className={clsx(
        'flex items-center gap-3 bg-white rounded-xl shadow-sm border border-slate-100 border-l-4 px-4 py-3 transition-all group',
        PRIORITY_BORDER[todo.priority],
        todo.completed && 'opacity-60'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500 text-white'
            : 'border-slate-300 hover:border-indigo-400'
        )}
        aria-label="Toggle todo"
      >
        {todo.completed && <Check size={13} strokeWidth={3} />}
      </button>

      {/* Text or Edit Input */}
      {editing ? (
        <input
          autoFocus
          value={editText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') handleEditSubmit();
            if (e.key === 'Escape') handleEditCancel();
          }}
          className="flex-1 rounded-lg border border-indigo-300 px-3 py-1 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
        />
      ) : (
        <span
          className={clsx(
            'flex-1 text-slate-800 text-sm',
            todo.completed && 'line-through text-slate-400'
          )}
        >
          {todo.text}
        </span>
      )}

      {/* Priority Badge */}
      {!editing && (
        <span
          className={clsx(
            'hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full',
            PRIORITY_BADGE[todo.priority]
          )}
        >
          {todo.priority}
        </span>
      )}

      {/* Actions */}
      {editing ? (
        <div className="flex gap-1">
          <button
            onClick={handleEditSubmit}
            className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
            aria-label="Save"
          >
            <Check size={15} />
          </button>
          <button
            onClick={handleEditCancel}
            className="p-1.5 rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="Cancel"
          >
            <X size={15} />
          </button>
        </div>
      ) : (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            aria-label="Edit"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            aria-label="Delete"
          >
            <Trash2 size={15} />
          </button>
        </div>
      )}
    </li>
  );
}
