
// ## Acceptance Criteria
// - [ ] `src/components/SearchBar.tsx` is a **controlled input** — its `value` comes from state and `onChange` updates it
// - [ ] The search text state lives in `App` and is passed down to `SearchBar` as props (value + a setter function)
// - [ ] The main product grid only shows products whose `title` contains the search text
// - [ ] Search is **case-insensitive** (`"STEAK"` and `"steak"` give the same results)
// - [ ] Shows how many results match, e.g. `Showing 4 of 30 products`
// - [ ] When nothing matches, the `EmptyState` from 2.2 shows up

type SearchBarTS = {
    value: string,
    onChange: ((value:string)=> void),
}

export const SearchBar = ({value, onChange}: SearchBarTS) => {
    return(
        <>
        <div>
            <input className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 ml-10 mr-10 text-slate-900 placeholder:text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400" id="searchArea" type="text" value={value} onChange={(e)=> onChange(e.target.value)} placeholder="search for products"/>
        </div>
        </>
    )
};
