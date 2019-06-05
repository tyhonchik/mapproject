const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const fetch = require('node-fetch');

const API_KEY = 'd529744e-1762-4c7d-8352-383573b24434';

function search(searchText, _bbox = null) {
    try {
        const bbox = _bbox ? _bbox : '37.321,55.577~37.871,55.919';

        const _str = encodeURI(
            `https://search-maps.yandex.ru/v1/?type=biz&lang=ru_RU&results=50&bbox=${bbox}&text=${searchText}&apikey=${API_KEY}`
        );

        const data = Promise.resolve(
            fetch(_str)
                .then(res => res.json())
                .then(data => data)
        );
        return data;
    } catch (e) {
        console.log(e);
    }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.post('/api/world', async (req, res) => {
    // console.log(req.body);

    // await ymaps.load('https://api-maps.yandex.ru/2.1/?lang=en_US').then(maps => init(maps));

    // https://search-maps.yandex.ru/v1/?text=Аптеки&type=biz&lang=ru_RU&results=500&bbox=36.83,55.67~38.24,55.91&

    search(req.body.post).then(data => res.send(data));
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
