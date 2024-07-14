mapboxgl.accessToken = 'pk.eyJ1IjoiZnJldmEiLCJhIjoiY2tsOGhyZXF1MGNkbTJ1bGJudHpzaXI0ZiJ9.dlT0AHlMq5DLOU5doA7h6g';

function toDuration(totalSecs) {
    const hours   = Math.floor(totalSecs / 3600);
    const minutes = Math.floor(totalSecs / 60) % 60;
    const seconds = totalSecs % 60;
    return [hours, minutes, seconds].map(v => v < 10 ? "0" + v : v).join(":");
}

function updateUrl(props) {
    const url = new URL(window.location.href);
    Object.entries(props).forEach(([key, value]) => url.searchParams.set(key, value));
    window.history.replaceState(null, null, url);
}

function createMap(lon, lat, zoom) {
    return new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: lat ? [lon, lat ] : [10.420218, 63.437325],
        zoom: zoom ?? 14,
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const searchParams = new URLSearchParams(window.location.search);
    const map = createMap(...(searchParams.get('view')?.split(',')?.map(s => parseFloat(s)) ?? []));
    const source = searchParams.get('source') ?? 'trimmed_valerij.jsonl';
    const resultsElem = document.getElementById('results');

    function updateView() {
        const center = map.getCenter();
        updateUrl({ view: `${center.lng},${center.lat},${map.getZoom()}` });
    }

    map.on('dragend', updateView);
    map.on('zoomend', updateView);

    map.on('load', async () => {
        const activities = await fetch(source)
            .then(response => response.text())
            .then(response => response
                .split('\n')
                .filter(line => line.length > 0)
                .map(line => JSON.parse(line)));

        map.addSource('activities', { type: 'geojson', data: { type: 'FeatureCollection', features: [] }});
        map.addLayer({ id: 'lines', type: 'line', source: 'activities' });

        function loadStateFromUrl() {
            const searchParams = new URLSearchParams(window.location.search);

            const type = searchParams.get('type') ?? 'all';
            const from = new Date(searchParams.get('from')).valueOf() / 1000 || 0;
            const to = new Date(searchParams.get('to')).valueOf() / 1000 || Number.MAX_SAFE_INTEGER;
            const filter = type === 'all'  ? activity => true :
                           type === 'walk' ? activity => activity.type === 'walk' || activity.type === 'hike' :
                                             activity => activity.type === type;

            let distance = 0, duration = 0, numActivities = 0;
            const features = activities
                .filter(activity => filter(activity) && activity.start > from && activity.start < to)
                .flatMap(activity => {
                    numActivities++;
                    distance += activity.distance;
                    duration += activity.duration;
                    return activity.coords;
                })
                .map(coordinates => ({
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates,
                    }
                }));
            map.getSource('activities').setData({ type: 'FeatureCollection', features });
            results.innerHTML = `${numActivities} activities: ${(distance / 1000).toFixed(1)}km in ${toDuration(duration)}`;
        }

        document.querySelectorAll('input').forEach(element => {
            element.onchange = event => {
                updateUrl({ [event.currentTarget.name]: event.currentTarget.checked ? event.currentTarget.id : event.currentTarget.value });
                loadStateFromUrl();
            };
        });
        searchParams.forEach((value, key) => {
            let element = document.getElementById(value);
            if (element) element.checked = true;
            element = document.getElementById(key);
            if (element) element.value = value;
        });

        loadStateFromUrl();
    });
});
