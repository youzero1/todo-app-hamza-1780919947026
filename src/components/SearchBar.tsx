import { Search } from 'lucide-react';

type SearchBarProps = {
  search: string;
  onSearch: (v: string) => void;
};

export default function SearchBar({ search, onSearch }: SearchBarProps) {
  return (
    <div className="relative mb-4">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
        placeholder="Search todos..."
        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}
