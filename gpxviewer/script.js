const colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];
const data = { type: 'FeatureCollection', features: [] };
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
//    zoom: 12,
//    center: [10.434, 63.425],
    accessToken: 'pk.eyJ1IjoiZnJldmEiLCJhIjoiY2tsOGhyZXF1MGNkbTJ1bGJudHpzaXI0ZiJ9.dlT0AHlMq5DLOU5doA7h6g',
});

const length = (points) => turf.length(turf.lineString(points.map(({ lng, lat }) => [ lng, lat ])), {units: 'meters'}) | 0;
const distance = (p1, p2) => turf.distance([p1.lng, p1.lat], [p2.lng, p2.lat], {units: 'meters'});
const elevation = (points) => points.reduce(
    (acc, cur) => ({prev: cur.elev, sum: acc.sum + Math.max(cur.elev - acc.prev, 0)}),
    {sum: 0, prev: Number.MAX_VALUE}).sum | 0;

map.on('load', function () {
    map.addSource('points', { type: 'geojson', data });
    map.addSource('closest', { type: 'geojson', data });

    map.addLayer({
        id: 'route',
        type: 'line',
        source: 'points',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': ['get', 'color'],
            'line-width': 1,
        }
    });

    map.addLayer({
        id: 'point',
        type: 'circle',
        source: 'points',
        paint: {
            'circle-radius': 2,
            'circle-color': ['get', 'color']
        }
    });

    map.addLayer({
        id: 'closest_point',
        type: 'circle',
        source: 'closest',
        paint: {
            'circle-radius': 6,
            'circle-color': ['get', 'color']
        }
    });

    const render = (fprops, fpoints, point) => {
        const subPoints = point == null ? null : fpoints.slice(0, point.id + 1);
        const sLength = (point ? `${length(subPoints)} / ` : '') + fprops.length;
        const sElevation = (point ? `${point.elev | 0} / ${elevation(subPoints)} / ` : '') + fprops.elevation;
        const sPoints = (point ? `${subPoints.length} / ` : '') + fprops.points;
        return `<tr><td><span style="color: ${fprops.color}">${fprops.title}</span></td><td>${sLength}</td><td>${sElevation}</td><td>${sPoints}</td></tr>`;
    };

    map.on('mousemove', (e) => {
        const closestPoints = data.features
            .map(({ points }) => closestPoint(points, e.lngLat))
            .filter(([distance]) => distance < 500)
            .map(([, point]) => point);

        const closest = (closestPoints.length === data.features.length ? closestPoints : [])
            .map(({ lng, lat }, i) => ({
                type: 'Feature',
                properties: { color: data.features[i].properties.color },
                geometry: { type: 'Point', coordinates: [ lng, lat ] }
            }));
        map.getSource('closest').setData({ type: 'FeatureCollection', features: closest });

        const distanceElement = document.getElementById('meta');
        distanceElement.innerHTML = '<table><tr><th>Source</th><th>Distance</th><th>Elevation</th><th>#points</th></tr>' +
            data.features.map((f, i) => render(f.properties, f.points, closestPoints[i])).join('') +
            '</table>';
    });

    const urls = [...new URLSearchParams(window.location.search).getAll('url')];
    for (let i = 0; i < urls.length; i++)
        loadFromUrl(urls[i], colors[i]);
});

function loadFromUrl(url, title, color) {
    const client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = () => client.readyState === 4 && addLine(client.responseText, title, color);
    client.send();
}

function addLine(gpxText, color) {
    const gpx = new DOMParser().parseFromString(gpxText, "text/xml");
    const title = gpx.getElementsByTagName('trk')[0].getElementsByTagName('name')[0].textContent;
    const points = [...gpx.getElementsByTagName("trkpt")]
        .map((point, id) => ({
            id,
            lng: parseFloat(point.getAttribute('lon')),
            lat: parseFloat(point.getAttribute('lat')),
            elev: parseFloat(point.getElementsByTagName('ele')[0].textContent),
            time: point.getElementsByTagName('time')[0].textContent
        }));

    data.features.push({
        type: 'Feature',
        points,
        properties: {
            id: data.features.length,
            color,
            title,
            length: length(points),
            elevation: elevation(points),
            points: points.length,
        },
        geometry: { type: 'LineString', coordinates: points.map(({ lng, lat }) => [ lng, lat ]) },
    });
    map.getSource('points').setData(data);
    const [minX, minY, maxX, maxY] = turf.bbox(data.features[data.features.length - 1].geometry);
    map.fitBounds([[minX, minY], [maxX, maxY]]);
}

function closestPoint(points, target) {
    let closestDistance = Number.MAX_VALUE, closestPoint = null;
    for (const point of points) {
        const d = distance(point, target);
        if (d < closestDistance) {
            closestDistance = d;
            closestPoint = point;
        }
    }
    return [closestDistance, closestPoint];
}
