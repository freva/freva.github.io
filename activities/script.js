mapboxgl.accessToken = 'pk.eyJ1IjoiZnJldmEiLCJhIjoiY2tsOGhyZXF1MGNkbTJ1bGJudHpzaXI0ZiJ9.dlT0AHlMq5DLOU5doA7h6g';

const colors = {
    run: '#000000',
    walk: '#9B59B6',
    hike: '#3498DB',
    ride: '#C70039',
};

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
    });
}

function createElement(tag, props = {}, children = []) {
    const element = document.createElement(tag);
    Object.entries(props).forEach(([key, value]) => {
        if (key.startsWith('data-')) {
            element.setAttribute(key, value);
        } else {
            element[key] = value;
        }
    });
    children.forEach(child => element.appendChild(child));
    return element;
}

document.addEventListener('DOMContentLoaded', () => {
    const searchParams = new URLSearchParams(window.location.search);
    const map = createMap(...(searchParams.get('view')?.split(',')?.map(s => parseFloat(s)) ?? []));
    const source = searchParams.get('source');
    const resultsElem = document.getElementById('results');

    if (!source) return;

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
        const allTypes = new Set();
        activities.forEach(activity => allTypes.add(activity.type));

        map.addSource('activities', { type: 'geojson', data: { type: 'FeatureCollection', features: [] }});
        map.addLayer({
            id: 'lines',
            type: 'line',
            source: 'activities',
            paint: {
                'line-color': ['get', 'color']
            }
        });

        function loadStateFromUrl() {
            const searchParams = new URLSearchParams(window.location.search);

            const types = new Set(searchParams.get('type')?.split(',') ?? allTypes);
            const from = new Date(searchParams.get('from')).valueOf() / 1000 || 0;
            const to = new Date(searchParams.get('to')).valueOf() / 1000 || Number.MAX_SAFE_INTEGER;

            let distance = 0, duration = 0, numActivities = 0;
            const features = activities
                .filter(activity => types.has(activity.type) && activity.start > from && activity.start < to)
                .map(activity => {
                    numActivities++;
                    distance += activity.distance;
                    duration += activity.duration;
                    return { coordinates: activity.coords.flatMap(s => s), color: colors[activity.type] ?? '#FFC300' };
                })
                .map(({ coordinates, color }) => ({
                    type: 'Feature',
                    properties: {
                        color,
                    },
                    geometry: {
                        type: 'LineString',
                        coordinates,
                    }
                }));
            map.getSource('activities').setData({ type: 'FeatureCollection', features });
            results.innerHTML = `${numActivities} activities: ${(distance / 1000).toFixed(1)}km in ${toDuration(duration)}`;
        }

        const types = new Set(searchParams.get('type')?.split(',') ?? allTypes);
        const filterSwitch = document.getElementById('filter-switch');
        [...allTypes].sort().forEach(type => {
            const label = createElement('label', { htmlFor: type } );
            label.innerText = type;
            filterSwitch.appendChild(createElement('li', { className: 'filter-switch-item' }, [
                createElement('input', { type: 'checkbox', name: 'type', id: type, value: type, checked: types.has(type) }),
                label
            ]));
        });

        document.querySelectorAll('input').forEach(element => {
            element.onchange = event => {
                const value = event.currentTarget.type === 'checkbox' ?
                    [...document.getElementsByName(event.currentTarget.name)].filter(e => e.checked).map(e => e.value).sort().join(',') :
                    event.currentTarget.value;
                updateUrl({ [event.currentTarget.name]: value });
                loadStateFromUrl();
            };
        });

        loadStateFromUrl();
    });
});
