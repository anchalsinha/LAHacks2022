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
                        headers: {
                          'Content-Type': 'application/json'
                        },
                      })
                      .then(response => response.json())
                      .then(response => {
                        const names = response.map(e => e['name']);
                        const lats = response.map(e => e['lat']);
                        const lons = response.map(e => e['lon']);
                        const scores = response.map(e => e['competition_score']);
                        pdlData = {names: names, lat: lats, lon: lons, scores: scores};
                        setPdlData(pdlData);
                      })
                }
            }>Search
            
            </button>
        </form>
    );
};

export default SearchBar;