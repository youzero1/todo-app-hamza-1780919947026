import { useState } from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import { Priority } from '@/types';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const PRIORITIES: { label: string; value: Priority; color: string }[] = [
  { label: 'Low', value: 'low', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { label: 'Med', value: 'medium', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { label: 'High', value: 'high', color: 'bg-rose-100 text-rose-700 border-rose-300' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState<string>('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 bg-white rounded-2xl shadow-md p-5 mb-6 border border-slate-100"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className={clsx(
            'flex items-center gap-1 px-5 py-3 rounded-xl font-semibold text-white transition-all',
            text.trim()
              ? 'bg-indigo-500 hover:bg-indigo-600 shadow-md hover:shadow-lg'
              : 'bg-slate-300 cursor-not-allowed'
          )}
        >
          <Plus size={18} />
          Add
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-sm text-slate-500 mr-1">Priority:</span>
        {PRIORITIES.map(p => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            className={clsx(
              'px-3 py-1 rounded-lg border text-xs font-semibold transition-all',
              p.color,
              priority === p.value ? 'ring-2 ring-offset-1 ring-indigo-400 scale-105' : 'opacity-60 hover:opacity-100'
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
    </form>
  );
}
