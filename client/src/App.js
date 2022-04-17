import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Plot from 'react-plotly.js';
// import logo from './logo.svg';
import './App.css';
import Search from './search';
import Messenger from './messenger';

const fields = [
    { id: '1', name: 'Medical Devices' },
    { id: '2', name: 'Pharmaceuticals' },
];

const colors = {
    "overall_score": "YlGnBu",
    "score_competition": "Portland",
    "score_saturation": "RdBu",
    "score_growth_rate": "Blackbody"
};

const filterField = (fields, query) => {
    if (!query) {
        return fields;
    }

    return fields.filter((field) => {
        const fieldName = field.name.toLowerCase();
        return fieldName.includes(query);
    });
};

const App = () => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const [pdlData, setPdlData] = useState('');
    const [metric, setMetric] = useState('');

    const [width, setWidth]   = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);


    const filteredFields = filterField(fields, searchQuery);

    return (
        <Router>
            {/* <div class='container container-dark p-y-md'>
            <div class='header-content'>
                <h1>Search Field</h1>
                <h2>Search Field</h2>
            </div>
            </div> */}
            <div className="App">
                <Messenger
                    message={`${filteredFields.length} fields`}
                />
                
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <Plot
                    data={[
                        {
                            type: 'densitymapbox',
                            mode: 'markers',
                            // text: pdlData['names'],
                            lat: pdlData['lat'],
                            lon: pdlData['lon'],
                            z: pdlData[metric],
                            hoverinfo: 'skip',
                            coloraxis: 'coloraxis',
                            showscale: false,
                        },
                    ]}
                    layout = {{mapbox: {style: 'light'}, coloraxis: {colorscale: colors[metric]}, style: "outdoors", width: width, height: height, margin: {t: 0, b: 0, l: 0, r: 0}}}
                    config = {{mapboxAccessToken: "pk.eyJ1IjoiYW5jaGFsc2luaGEiLCJhIjoiY2tuNWwwZW8xMDU5djJvcDd6OG9jb29vcSJ9.FbawMaKUirZV9t57sHHCog"}}
                />
                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    pdlData={pdlData}
                    setPdlData={setPdlData}
                    metric={metric}
                    setMetric={setMetric}
                />
                
                {/* <ul>
                    {filteredFields.map((field) => (
                        <li key={field.id}>{field.name}</li>
                    ))}
                </ul> */}
            </div>
        </Router>
    );
};

export default App;