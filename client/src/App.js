import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Plot from 'react-plotly.js';
import logo from './logo.svg';
import './App.css';
import Search from './search';
import Messenger from './messenger';

const fields = [
    { id: '1', name: 'Medical Devices' },
    { id: '2', name: 'Medical Practice' },
    { id: '3', name: 'Pharmaceuticals' },
    { id: '4', name: 'Hospital & Wellness' },
];

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
    const filteredFields = filterField(fields, searchQuery);

    return (
        <Router>
            <div className="App">
                <Messenger
                    message={`${filteredFields.length} fields`}
                />
                <img src={logo} className="App-logo" alt="logo" />
                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <Plot
                    data={[
                    {
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                    {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                    ]}
                    layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
                />
                <ul>
                    {filteredFields.map((field) => (
                        <li key={field.id}>{field.name}</li>
                    ))}
                </ul>
            </div>
        </Router>
    );
};

export default App;