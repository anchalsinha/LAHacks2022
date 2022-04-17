import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Search from './search';
import Messenger from './msg';

const fields = [
    { id: '1', name: 'Medical Devices' },
    { id: '2', name: 'Medical Practice' },
    { id: '3', name: 'Pharmaceuticals' },
    { id: '4', name: 'Hospitals & Health Care' },
];

const filterFields = (fields, query) => {
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
    const query = new URLSearchParams(search).get('search_field');
    const [searchQuery, setQuery] = useState(query || '');
    const filteredFields = filterFields(fields, searchQuery);

    return (
        <Router>
            <div className="App">
                <Messenger
                    message={`${filteredFields.length} fields`}
                />
                <Search
                    searchQuery={searchQuery}
                    setQuery={setQuery}
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