import clsx from 'clsx';
import { FilterType } from '@/types';

type FilterBarProps = {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  onClearCompleted: () => void;
  completedCount: number;
};

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function FilterBar({ filter, onFilterChange, onClearCompleted, completedCount }: FilterBarProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={clsx(
              'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
              filter === f.value
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-xs text-slate-400 hover:text-rose-500 transition-colors font-medium"
        >
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  );
}
