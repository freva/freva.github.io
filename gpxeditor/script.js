mapboxgl.accessToken = 'pk.eyJ1IjoiZnJldmEiLCJhIjoiY2tsOGhyZXF1MGNkbTJ1bGJudHpzaXI0ZiJ9.dlT0AHlMq5DLOU5doA7h6g';

function updatePoints() {
    const { map, points, removed } = window.state;
    const lineString = {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: points.filter((_, i) => !removed.includes(i)).map(({ lon, lat }) => [ lon, lat ])
        }
    };

    map.getSource('points').setData(lineString);
    const distanceElement = document.getElementById('distance');
    distanceElement.style.display = 'block';
    distanceElement.children[0].textContent =
        'Distance: ' + turf.length(lineString).toLocaleString() + 'km, Points: ' + lineString.geometry.coordinates.length;
}

function exportGpx() {
    const { gpx, points, removed } = window.state;
    const trkseg = gpx.getElementsByTagName('trkseg')[0];
    while (trkseg.firstChild) trkseg.removeChild(trkseg.firstChild);

    points.filter((_, i) => !removed.includes(i)).forEach(({ lat, lon, elev, time }) => {
        const trkpt = gpx.createElement("trkpt");
        trkpt.setAttribute("lat", lat);
        trkpt.setAttribute("lon", lon);

        const eleTag = gpx.createElement("ele");
        eleTag.appendChild(gpx.createTextNode(elev));
        trkpt.appendChild(eleTag);

        const timeTag = gpx.createElement("time");
        timeTag.appendChild(gpx.createTextNode(time));
        trkpt.appendChild(timeTag);

        trkseg.appendChild(trkpt);
    })
    const serialized = new XMLSerializer().serializeToString(gpx).replace('xmlns="" ', '');
    download('activity.gpx', serialized);
}

async function onFileUpload(event) {
    const text = await event.target.files.item(0).text();
    const gpx = new DOMParser().parseFromString(text, "text/xml");
    const points = [...gpx.getElementsByTagName("trkpt")]
        .map(point => ({
            lon: parseFloat(point.getAttribute('lon')),
            lat: parseFloat(point.getAttribute('lat')),
            elev: point.getElementsByTagName('ele')[0].textContent,
            time: point.getElementsByTagName('time')[0].textContent
        }));

    document.body.removeChild(document.getElementById("btn-upload"));

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [points[0].lon, points[0].lat],
        zoom: 18
    });
    window.state = { gpx, map, points, removed: [] };

    map.on('load', function () {
        map.addSource('points', {
             type: 'geojson',
             data: { type: 'FeatureCollection', features: [] }
        });

        map.addLayer({
            id: 'route',
            type: 'line',
            source: 'points',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#888',
                'line-width': 2
            }
        });

        map.addLayer({
            id: 'point',
            type: 'circle',
            source: 'points',
            paint: {
                'circle-radius': 10,
                'circle-color': '#3887be'
            }
        });

        map.on('mouseup', 'point', function (e) {
            e.preventDefault();

            const { lng: eLon, lat: eLat } = e.lngLat;
            const index = points
                .map(({lon, lat}) => Math.abs(lon - eLon) + Math.abs(lat - eLat))
                .reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0);

            window.state.removed.push(index);
            updatePoints();
        });

        updatePoints();
    });
}

function download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("btn-upload").addEventListener("change", onFileUpload, false);
});

document.addEventListener("keydown", function(e) {
    e = e || window.event;
    const key = e.keyCode;
    const ctrlDown = e.ctrlKey || e.metaKey;

    if (ctrlDown && e.altKey || !ctrlDown) return true

    if (key === 90) { // Z
        e.preventDefault();
        const popped = window.state?.removed?.pop();
        if (popped != null)
            updatePoints();
        return false;
    } else if (key === 83) { // S
        e.preventDefault();
        exportGpx();
        return false;
    }
    return true;
}, false);
