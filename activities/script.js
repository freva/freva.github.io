mapboxgl.accessToken = 'pk.eyJ1IjoiZnJldmEiLCJhIjoiY2tsOGhyZXF1MGNkbTJ1bGJudHpzaXI0ZiJ9.dlT0AHlMq5DLOU5doA7h6g';

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

    function updateView() {
        const center = map.getCenter();
        updateUrl({ view: `${center.lng},${center.lat},${map.getZoom()}` });
    }

    map.on('dragend', updateView);
    map.on('zoomend', updateView);

    map.on('load', async () => {
        let total = 0, inline = 0, too_close = 0;
        const activities = await fetch('activities_valerij.jsonl')
            .then(response => response.text())
            .then(response => response
                .split('\n')
                .filter(line => line.length > 0)
                .map(line => JSON.parse(line))
                .flatMap(activity => {
                    const results = [];
                    const allCords = activity.coords.map(([lat, lon]) => [lon, lat]);
                    total += allCords.length;
                    let coords = [], last;
                    for (let i = 0; i < allCords.length; i++) {
                        if (i === 0 || i === allCords.length - 1) {
                            coords.push(allCords[i]);
                            last = allCords[i];
                            continue;
                        }

                        const distance = turf.distance(last, allCords[i]);
                        if (distance > 0.1) { // If the distance is more than 100m from the previous point, create new line
                            if (coords.length > 0) {
                                results.push({...activity, coords });
                                coords = [];
                            }
                        }

                        const a = allCords[i - 1][0], b = allCords[i][0], c = allCords[i + 1][0];
                        const d = allCords[i - 1][1], e = allCords[i][1], f = allCords[i + 1][1];
                        const determinant = Math.abs((d - e) * (a - c) - (d - f) * (a - b));
                        // Skip points that are (almost) in line with the immediately previous and immediately next
                        // point to this one
                        if (determinant < 1e-10 && distance < 0.09) {
                            inline++;
                            continue;
                        }

                        if (distance < 0.005) { // Skip points less than 5m from the previous point
                            too_close++;
                            continue;
                        }

                        coords.push(allCords[i]);
                        last = allCords[i];
                    }
                    if (coords.length > 0)
                        results.push({ ...activity, coords });
                    return results;
                }));
        console.log('points', { total, inline, too_close })

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

            let distance = 0, points = 0, activitiesStart = new Set();
            const features = activities
                .filter(activity => filter(activity) && activity.start > from && activity.start < to)
                .map(activity => {
                    activitiesStart.add(activity.start);
                    distance += activity.distance;
                    points += activity.coords.length;
                    return activity;
                })
                .map(activity => ({
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: activity.coords,
                    }
                }));
            console.log('displaying', { activities: activitiesStart.size, distance, points });
            map.getSource('activities').setData({ type: 'FeatureCollection', features });
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
