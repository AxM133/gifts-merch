import { SearchIcon } from '@/shared/ui'
import { cn } from '@/shared/lib'
import { useSiteSearch } from '../model/useSiteSearch'

export function SearchField({ className }) {
  const { query, setQuery, submit } = useSiteSearch()
  return (
    <form
      role="search"
      onSubmit={submit}
      className={cn(
        'group flex items-center gap-3 rounded-full border-[3px] border-ink px-5 py-[0.7rem] transition duration-300 focus-within:border-brand focus-within:shadow-soft',
        className,
      )}
    >
      <SearchIcon className="size-5 shrink-0 text-body transition-colors group-focus-within:text-brand" />
      <label htmlFor="site-search" className="sr-only">
        Поиск по каталогу
      </label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск"
        className="w-full min-w-0 bg-transparent text-[0.8rem] outline-none placeholder:text-body/70 [&::-webkit-search-cancel-button]:appearance-none"
      />
    </form>
  )
}
