import { useHistory } from 'react-router-dom';

const Search = ({searchQuery, setQuery}) => {
    const history = useHistory();
    const onSubmit = (e) => {
        history.push('?s=${searchQuery}');
        e.preventDefault();
    };

    return (
        <form
            action="/"
            method="get"
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <label htmlFor="header-search">
                <span className="visually-hidden">
                    Search Field
                </span>
            </label>
            <input
                value={searchQuery}
                onInput={(e) => setQuery(e.target.value)}
                type="text"
                id="header-search"
                placeholder="Search Bussiness Field"
                name="search_field"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default Search;