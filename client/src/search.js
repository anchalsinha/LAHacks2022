import { useNavigate } from 'react-router-dom';

const SearchBar = ({ searchQuery, setSearchQuery, pdlData, setPdlData, metric, setMetric }) => {
    const navigate = useNavigate();
    const onSubmit = (e) => {
        navigate(`?s=${searchQuery}`);
        e.preventDefault();
    };
    const handleChange = (e) => {
        console.log(e.target.value);
        setMetric(e.target.value);
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
                        setMetric("overall_score");
                        const names = response.map(e => e['name']);
                        const lats = response.map(e => e['lat']);
                        const lons = response.map(e => e['lon']);
                        const overall_scores = response.map(e => e['overall_score']);
                        const competition_scores = response.map(e => e['score_competition']);
                        const saturation_scores = response.map(e => e['score_saturation']);
                        const growth_rate_scores = response.map(e => e['score_growth_rate']);
                        pdlData = {names: names, lat: lats, lon: lons, overall_scores: overall_scores, competition_scores: competition_scores, saturation_scores: saturation_scores, growth_rate_scores: growth_rate_scores};
                        setPdlData(pdlData);
                      })
                }
            }>Search
            
            </button>
            
            <select value={metric} onChange={handleChange} class="metricSelect">
                <option value="overall_score">Overall</option>
                <option value="score_competition">Competition</option>
                <option value="score_saturation">Saturation</option>
                <option value="score_growth_rate">Growth Rate</option>
            </select>

        </form>
    );
};

export default SearchBar;