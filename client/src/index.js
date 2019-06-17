import React, { setGlobal, addReducer } from 'reactn';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './screens/Home';
import * as serviceWorker from './serviceWorker';

setGlobal({
    orgs: {},
    coords: [],
});

addReducer('search', (global, dispatch, _searchString) =>
    fetch('/api/world', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: _searchString }),
    })
        .then(res => res.json())
        .then(data => ({
            orgs: {
                [_searchString]: ((data || {}).features || []).map(
                    feat => feat.geometry.coordinates
                ),
            },
        }))
);

addReducer('searchv2', (global, dispatch, _searchString) =>
    fetch(`/api/v1.0/search/${_searchString}`)
        .then(res => res.json())
        .then(data => ({
            coords: data,
        }))
);

ReactDOM.render(<Home />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
