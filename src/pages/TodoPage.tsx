import { useTodos } from '@/hooks/useTodos';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import FilterBar from '@/components/FilterBar';
import StatsBar from '@/components/StatsBar';
import SearchBar from '@/components/SearchBar';

export default function TodoPage() {
  const {
    filteredTodos,
    filter,
    setFilter,
    search,
    setSearch,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-indigo-600 tracking-tight mb-2">
            ✅ My Todos
          </h1>
          <p className="text-slate-500 text-lg">Stay organized, stay productive.</p>
        </div>

        {/* Add Todo */}
        <AddTodoForm onAdd={addTodo} />

        {/* Stats */}
        <StatsBar activeCount={activeCount} completedCount={completedCount} />

        {/* Search */}
        <SearchBar search={search} onSearch={setSearch} />

        {/* Filter Bar */}
        <FilterBar filter={filter} onFilterChange={setFilter} onClearCompleted={clearCompleted} completedCount={completedCount} />

        {/* Todo List */}
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>
    </div>
  );
}
