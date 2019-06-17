#!flask/bin/python
from flask import Flask, jsonify
from itertools import product, filterfalse, combinations
from geopy.distance import distance, lonlat
import datetime
import requests
import json

app = Flask(__name__)

API_KEY = 'd529744e-1762-4c7d-8352-383573b24434'

TOTAL = {}


def parseSearchResult(requestText, result):
    TOTAL[requestText] = []
    for res in result['features']:
        TOTAL[requestText].append(res['geometry']['coordinates'])


def search(searchText, _bbox=''):
    bbox = _bbox if _bbox != '' else '37.321,55.577~37.871,55.919'
    r = requests.get(
        'https://search-maps.yandex.ru/v1/?type=biz&lang=ru_RU&results=50&bbox={0}&text={1}&apikey={2}'.format(bbox, searchText, API_KEY))
    outJson = r.json()
    return outJson


def distance_less(x):
    for roll in combinations(x, 2):
        dis = distance((roll[0][1], roll[0][0]),
                       (roll[1][1], roll[1][0])).meters
        if dis > 500:
            return True
    return False


def combinate():
    arrs = []
    for value in TOTAL.values():
        arrs.append(value)

    listt = product(*arrs, repeat=1)

    data = list(filterfalse(distance_less, listt))

    return data


@app.route('/api/v1.0/search/<string:_search_str>', methods=['GET'])
def get_tasks(_search_str):
    searchStrings = _search_str.split(',')
    for str_ in searchStrings:
        serached = search(str_.strip())
        parseSearchResult(str_.strip(), serached)

    outCoordinates = combinate()

    return json.dumps(outCoordinates)


if __name__ == '__main__':
    app.run(debug=True)
