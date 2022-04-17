import { useNavigate } from 'react-router-dom';

const Search = ({searchQuery, setQuery}) => {
    const navigate = useNavigate();
    const onSubmit = (e) => {
        navigate(`?s=${searchQuery}`);
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