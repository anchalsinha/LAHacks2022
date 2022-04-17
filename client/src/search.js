import { useNavigate } from 'react-router-dom';

const SearchBar = ({ searchQuery, setSearchQuery, pdlData, setPdlData }) => {
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
                    Search Fields
                </span>
            </label>
            <input
                value={searchQuery}
                onInput={(e) => setSearchQuery(e.target.value)}
                type="text"
                id="header-search"
                placeholder="Search Fields"
                name="s"
            />
            <button type="submit" 
            onClick = {
                () => {
                    //fetch latlong endpoint using search query
                    fetch(`/latlong?industry=${searchQuery}`, {
                        method: 'GET',
                        mode: 'cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: {
                          'Content-Type': 'application/json'
                          // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        redirect: 'follow', // manual, *follow, error
                        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                      })
                      .then(response => response.json())
                      .then(response => {
                            const names = response.map(e => e['name']);
                            const lats = response.map(e => e['lat']);
                            const lons = response.map(e => e['lon']);
                            pdlData = {names: names, lat: lats, lon: lons};
                            setPdlData(pdlData);
                      })
                }
            }>Search
            
            </button>
        </form>
    );
};

export default SearchBar;