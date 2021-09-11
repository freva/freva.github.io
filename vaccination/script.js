const all = 'all';
const kommunes = [{id:all,name:'Norway'},{id:'1820',name:'Alstahaug'},{id:'5403',name:'Alta'},{id:'3428',name:'Alvdal'},{id:'4631',name:'Alver'},{id:'1871',name:'Andøy'},{id:'3012',name:'Aremark'},{id:'4203',name:'Arendal'},{id:'3025',name:'Asker'},{id:'4645',name:'Askvoll'},{id:'4627',name:'Askøy'},{id:'1547',name:'Aukra'},{id:'1576',name:'Aure'},{id:'4641',name:'Aurland'},{id:'3026',name:'Aurskog-Høland'},{id:'4625',name:'Austevoll'},{id:'4632',name:'Austrheim'},{id:'1554',name:'Averøy'},{id:'5422',name:'Balsfjord'},{id:'3813',name:'Bamble'},{id:'5416',name:'Bardu'},{id:'1839',name:'Beiarn'},{id:'4601',name:'Bergen'},{id:'5440',name:'Berlevåg'},{id:'1811',name:'Bindal'},{id:'4216',name:'Birkenes'},{id:'1114',name:'Bjerkreim'},{id:'4624',name:'Bjørnafjorden'},{id:'1804',name:'Bodø'},{id:'1145',name:'Bokn'},{id:'4648',name:'Bremanger'},{id:'1813',name:'Brønnøy'},{id:'4220',name:'Bygland'},{id:'4222',name:'Bykle'},{id:'5443',name:'Båtsfjord'},{id:'3024',name:'Bærum'},{id:'1867',name:'Bø'},{id:'4613',name:'Bømlo'},{id:'3431',name:'Dovre'},{id:'3005',name:'Drammen'},{id:'3815',name:'Drangedal'},{id:'5420',name:'Dyrøy'},{id:'1827',name:'Dønna'},{id:'4619',name:'Eidfjord'},{id:'3416',name:'Eidskog'},{id:'3035',name:'Eidsvoll'},{id:'1101',name:'Eigersund'},{id:'3420',name:'Elverum'},{id:'3028',name:'Enebakk'},{id:'3425',name:'Engerdal'},{id:'4611',name:'Etne'},{id:'3450',name:'Etnedal'},{id:'1853',name:'Evenes'},{id:'4219',name:'Evje og Hornnes'},{id:'4206',name:'Farsund'},{id:'1841',name:'Fauske'},{id:'4633',name:'Fedje'},{id:'4615',name:'Fitjar'},{id:'4646',name:'Fjaler'},{id:'1578',name:'Fjord'},{id:'1859',name:'Flakstad'},{id:'5049',name:'Flatanger'},{id:'4207',name:'Flekkefjord'},{id:'3050',name:'Flesberg'},{id:'3039',name:'Flå'},{id:'3429',name:'Folldal'},{id:'3004',name:'Fredrikstad'},{id:'3022',name:'Frogn'},{id:'4214',name:'Froland'},{id:'5036',name:'Frosta'},{id:'5014',name:'Frøya'},{id:'3823',name:'Fyresdal'},{id:'3811',name:'Færder'},{id:'5439',name:'Gamvik'},{id:'3441',name:'Gausdal'},{id:'1838',name:'Gildeskål'},{id:'1532',name:'Giske'},{id:'1557',name:'Gjemnes'},{id:'3032',name:'Gjerdrum'},{id:'4211',name:'Gjerstad'},{id:'1122',name:'Gjesdal'},{id:'3407',name:'Gjøvik'},{id:'4650',name:'Gloppen'},{id:'3041',name:'Gol'},{id:'3446',name:'Gran'},{id:'1825',name:'Grane'},{id:'5414',name:'Gratangen'},{id:'4202',name:'Grimstad'},{id:'5045',name:'Grong'},{id:'3417',name:'Grue'},{id:'4635',name:'Gulen'},{id:'1866',name:'Hadsel'},{id:'3001',name:'Halden'},{id:'3403',name:'Hamar'},{id:'1875',name:'Hamarøy'},{id:'5406',name:'Hammerfest'},{id:'1517',name:'Hareid'},{id:'5402',name:'Harstad'},{id:'5433',name:'Hasvik'},{id:'1826',name:'Hattfjelldal'},{id:'1106',name:'Haugesund'},{id:'5055',name:'Heim'},{id:'1832',name:'Hemnes'},{id:'3042',name:'Hemsedal'},{id:'1515',name:'Herøy (Møre og Romsdal)'},{id:'1818',name:'Herøy (Nordland)'},{id:'5056',name:'Hitra'},{id:'3819',name:'Hjartdal'},{id:'1133',name:'Hjelmeland'},{id:'3044',name:'Hol'},{id:'3038',name:'Hole'},{id:'3802',name:'Holmestrand'},{id:'5026',name:'Holtålen'},{id:'3801',name:'Horten'},{id:'3037',name:'Hurdal'},{id:'1579',name:'Hustadvika'},{id:'3011',name:'Hvaler'},{id:'4637',name:'Hyllestad'},{id:'1119',name:'Hå'},{id:'4226',name:'Hægebostad'},{id:'4638',name:'Høyanger'},{id:'5046',name:'Høylandet'},{id:'5413',name:'Ibestad'},{id:'5053',name:'Inderøy'},{id:'5054',name:'Indre Fosen'},{id:'3014',name:'Indre Østfold'},{id:'4218',name:'Iveland'},{id:'3053',name:'Jevnaker'},{id:'5437',name:'Karasjok'},{id:'5423',name:'Karlsøy'},{id:'1149',name:'Karmøy'},{id:'5430',name:'Kautokeino'},{id:'4602',name:'Kinn'},{id:'1120',name:'Klepp'},{id:'3006',name:'Kongsberg'},{id:'3401',name:'Kongsvinger'},{id:'3814',name:'Kragerø'},{id:'4204',name:'Kristiansand'},{id:'1505',name:'Kristiansund'},{id:'3046',name:'Krødsherad'},{id:'4622',name:'Kvam'},{id:'4227',name:'Kvinesdal'},{id:'4617',name:'Kvinnherad'},{id:'3821',name:'Kviteseid'},{id:'1144',name:'Kvitsøy'},{id:'5411',name:'Kvæfjord'},{id:'5429',name:'Kvænangen'},{id:'5426',name:'Kåfjord'},{id:'3805',name:'Larvik'},{id:'5415',name:'Lavangen'},{id:'5438',name:'Lebesby'},{id:'1822',name:'Leirfjord'},{id:'5052',name:'Leka'},{id:'3432',name:'Lesja'},{id:'5037',name:'Levanger'},{id:'3049',name:'Lier'},{id:'5042',name:'Lierne'},{id:'3405',name:'Lillehammer'},{id:'4215',name:'Lillesand'},{id:'3030',name:'Lillestrøm'},{id:'4205',name:'Lindesnes'},{id:'3434',name:'Lom'},{id:'5432',name:'Loppa'},{id:'1112',name:'Lund'},{id:'3054',name:'Lunner'},{id:'1834',name:'Lurøy'},{id:'4644',name:'Luster'},{id:'4225',name:'Lyngdal'},{id:'5424',name:'Lyngen'},{id:'4642',name:'Lærdal'},{id:'1851',name:'Lødingen'},{id:'3029',name:'Lørenskog'},{id:'3412',name:'Løten'},{id:'5031',name:'Malvik'},{id:'3013',name:'Marker'},{id:'4634',name:'Masfjorden'},{id:'5028',name:'Melhus'},{id:'1837',name:'Meløy'},{id:'5034',name:'Meråker'},{id:'3817',name:'Midt-Telemark'},{id:'5027',name:'Midtre Gauldal'},{id:'4629',name:'Modalen'},{id:'3047',name:'Modum'},{id:'1506',name:'Molde'},{id:'1874',name:'Moskenes'},{id:'3002',name:'Moss'},{id:'5418',name:'Målselv'},{id:'5434',name:'Måsøy'},{id:'5007',name:'Namsos'},{id:'5044',name:'Namsskogan'},{id:'3036',name:'Nannestad'},{id:'1806',name:'Narvik'},{id:'3034',name:'Nes'},{id:'3040',name:'Nesbyen'},{id:'1828',name:'Nesna'},{id:'3023',name:'Nesodden'},{id:'5442',name:'Nesseby'},{id:'3822',name:'Nissedal'},{id:'3031',name:'Nittedal'},{id:'3816',name:'Nome'},{id:'3451',name:'Nord-Aurdal'},{id:'3436',name:'Nord-Fron'},{id:'3414',name:'Nord-Odal'},{id:'5435',name:'Nordkapp'},{id:'3020',name:'Nordre Follo'},{id:'3448',name:'Nordre Land'},{id:'5428',name:'Nordreisa'},{id:'3052',name:'Nore og Uvdal'},{id:'3808',name:'Notodden'},{id:'5060',name:'Nærøysund'},{id:'5021',name:'Oppdal'},{id:'5059',name:'Orkland'},{id:'3430',name:'Os'},{id:'5020',name:'Osen'},{id:'0301',name:'Oslo'},{id:'4630',name:'Osterøy'},{id:'5047',name:'Overhalla'},{id:'5436',name:'Porsanger'},{id:'3806',name:'Porsgrunn'},{id:'3016',name:'Rakkestad'},{id:'1833',name:'Rana'},{id:'1127',name:'Randaberg'},{id:'1539',name:'Rauma'},{id:'3424',name:'Rendalen'},{id:'5022',name:'Rennebu'},{id:'5061',name:'Rindal'},{id:'3439',name:'Ringebu'},{id:'3007',name:'Ringerike'},{id:'3411',name:'Ringsaker'},{id:'4201',name:'Risør'},{id:'3051',name:'Rollag'},{id:'3017',name:'Råde'},{id:'3027',name:'Rælingen'},{id:'1836',name:'Rødøy'},{id:'5025',name:'Røros'},{id:'1856',name:'Røst'},{id:'5043',name:'Røyrvik'},{id:'5417',name:'Salangen'},{id:'1840',name:'Saltdal'},{id:'4623',name:'Samnanger'},{id:'1514',name:'Sande'},{id:'3804',name:'Sandefjord'},{id:'1108',name:'Sandnes'},{id:'3003',name:'Sarpsborg'},{id:'1135',name:'Sauda'},{id:'3437',name:'Sel'},{id:'5032',name:'Selbu'},{id:'3820',name:'Seljord'},{id:'5421',name:'Senja'},{id:'3045',name:'Sigdal'},{id:'3812',name:'Siljan'},{id:'4228',name:'Sirdal'},{id:'5029',name:'Skaun'},{id:'3807',name:'Skien'},{id:'3015',name:'Skiptvet'},{id:'5427',name:'Skjervøy'},{id:'3433',name:'Skjåk'},{id:'1573',name:'Smøla'},{id:'5041',name:'Snåsa'},{id:'4640',name:'Sogndal'},{id:'1111',name:'Sokndal'},{id:'1124',name:'Sola'},{id:'4636',name:'Solund'},{id:'1870',name:'Sortland'},{id:'4649',name:'Stad'},{id:'3413',name:'Stange'},{id:'1103',name:'Stavanger'},{id:'1848',name:'Steigen'},{id:'5006',name:'Steinkjer'},{id:'5035',name:'Stjørdal'},{id:'3423',name:'Stor-Elvdal'},{id:'4614',name:'Stord'},{id:'5425',name:'Storfjord'},{id:'1130',name:'Strand'},{id:'1525',name:'Stranda'},{id:'4651',name:'Stryn'},{id:'1531',name:'Sula'},{id:'1134',name:'Suldal'},{id:'1563',name:'Sunndal'},{id:'4647',name:'Sunnfjord'},{id:'1566',name:'Surnadal'},{id:'4612',name:'Sveio'},{id:'1528',name:'Sykkylven'},{id:'1812',name:'Sømna'},{id:'3447',name:'Søndre Land'},{id:'3449',name:'Sør-Aurdal'},{id:'3438',name:'Sør-Fron'},{id:'3415',name:'Sør-Odal'},{id:'5444',name:'Sør-Varanger'},{id:'1845',name:'Sørfold'},{id:'5419',name:'Sørreisa'},{id:'5441',name:'Tana'},{id:'1121',name:'Time'},{id:'1560',name:'Tingvoll'},{id:'3818',name:'Tinn'},{id:'5412',name:'Tjeldsund'},{id:'3824',name:'Tokke'},{id:'3426',name:'Tolga'},{id:'5401',name:'Tromsø'},{id:'5001',name:'Trondheim'},{id:'3421',name:'Trysil'},{id:'1835',name:'Træna'},{id:'4213',name:'Tvedestrand'},{id:'5033',name:'Tydal'},{id:'3427',name:'Tynset'},{id:'4616',name:'Tysnes'},{id:'1146',name:'Tysvær'},{id:'3803',name:'Tønsberg'},{id:'3033',name:'Ullensaker'},{id:'4618',name:'Ullensvang'},{id:'1516',name:'Ulstein'},{id:'4620',name:'Ulvik'},{id:'1151',name:'Utsira'},{id:'5405',name:'Vadsø'},{id:'4628',name:'Vaksdal'},{id:'4221',name:'Valle'},{id:'3454',name:'Vang'},{id:'1511',name:'Vanylven'},{id:'5404',name:'Vardø'},{id:'1824',name:'Vefsn'},{id:'1815',name:'Vega'},{id:'4212',name:'Vegårshei'},{id:'4223',name:'Vennesla'},{id:'5038',name:'Verdal'},{id:'3019',name:'Vestby'},{id:'1535',name:'Vestnes'},{id:'3452',name:'Vestre Slidre'},{id:'3443',name:'Vestre Toten'},{id:'1860',name:'Vestvågøy'},{id:'1816',name:'Vevelstad'},{id:'4639',name:'Vik'},{id:'1160',name:'Vindafjord'},{id:'3825',name:'Vinje'},{id:'1577',name:'Volda'},{id:'4621',name:'Voss'},{id:'1865',name:'Vågan'},{id:'3435',name:'Vågå'},{id:'3419',name:'Våler (Innlandet)'},{id:'3018',name:'Våler (Viken)'},{id:'1857',name:'Værøy'},{id:'5058',name:'Åfjord'},{id:'3043',name:'Ål'},{id:'1507',name:'Ålesund'},{id:'4217',name:'Åmli'},{id:'3422',name:'Åmot'},{id:'4643',name:'Årdal'},{id:'3021',name:'Ås'},{id:'4224',name:'Åseral'},{id:'3418',name:'Åsnes'},{id:'1868',name:'Øksnes'},{id:'5057',name:'Ørland'},{id:'1520',name:'Ørsta'},{id:'3442',name:'Østre Toten'},{id:'3048',name:'Øvre Eiker'},{id:'3440',name:'Øyer'},{id:'4626',name:'Øygarden'},{id:'3453',name:'Øystre Slidre'}];
const ages = Object.freeze([...Array(106)].map((o, i) => i === 105 ? '105+' : String(i).padStart(3, '0')));
const groups = Object.freeze({'All':0, '18+':0, '0-15':0, '16-17':0, '18-24':0, '25-39':0, '40-44':0, '45-54':0, '55-64':0, '65-74':0, '75-84':0, '85+': 0});
const sum = arr => arr.reduce((a, b) => a + b, 0);
const state = {};

function getWeekNumberIn2021(date) {
    if (date.getFullYear() !== 2021) return 0;
    const start = new Date(date.getFullYear(), 0, 4);
    return Math.floor(((date - start) / 86400000) / 7) + 1;
}

function addElement(parent, type, attributes={}) {
    const element = document.createElement(type);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    parent.appendChild(element);
    return element;
}

function jsonp(url) {
    return new Promise((resolve, reject) => {
        const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
        window[callbackName] = function(data) {
            delete window[callbackName];
            document.body.removeChild(script);
            resolve(data);
        };

        const proxyUrl = 'https://script.google.com/macros/s/AKfycbxMNL5NawxflbOQA1jLaasPVab7YAQomEWGfLIcVnXBY7kn6wI/exec' +
                         `?callback=${callbackName}&url=${encodeURIComponent(url)}`;
        const script = document.createElement('script');
        script.src = proxyUrl;
        document.body.appendChild(script);
    });
}

async function onKommuneChange(kommuneId) {
    const barChart = document.getElementById('bar-chart');
    while (barChart.hasChildNodes()) barChart.removeChild(barChart.lastChild);
    const colorGrid = document.getElementsByClassName('color-grid')[0];
    while (colorGrid.hasChildNodes()) colorGrid.removeChild(colorGrid.lastChild);

    await Promise.all([getPopulationByAgeGroups(kommuneId), getVaccinationByAgeGroups(kommuneId)])
        .then(([populations, vaccinations]) => Object.assign(state, {populations, vaccinations}))
        .catch(console.error);
    const { populations, vaccinations } = state;

    for (const group of Object.keys(groups)) {
        const population = populations[group];
        const dose1Num = vaccinations[group][1].total, dose1Pct = (100 * dose1Num / population).toFixed(2);
        const dose2Num = vaccinations[group][2].total, dose2Pct = (100 * dose2Num / population).toFixed(2);

        const description = `Age: ${group} | Population: ${population} | Dose 1: ${dose1Num} (${dose1Pct}%) | Dose 2: ${dose2Num} (${dose2Pct}%)`;
        const dataGroup = addElement(barChart, 'div', {'data-group': description});
        addElement(dataGroup, 'div', {class: 'bar dose1', style: `width:${dose1Pct}%;`, 'data-percent': dose1Pct});
        addElement(dataGroup, 'div', {class: 'bar dose2', style: `width:${dose2Pct}%;`, 'data-percent': dose2Pct});
    }
    filter();
}

function getPopulationByAgeGroups(kommuneId) {
    const request = {
      query: [
        {
          code: 'Alder',
          selection: {
            filter: 'vs:AlleAldre00B',
            values: ages
          }
        },
        {
          code: 'Tid',
          selection: {
            filter: 'item',
            values: [ '2021' ]
          }
        }
      ],
      response: { format: 'json-stat2' }
    }
    if (kommuneId !== all)
        request.query.push({
          code: 'Region',
          selection: {
            filter: 'agg:KommSummer',
            values: [ `K-${kommuneId}` ]
          }
        });

    return fetch('https://data.ssb.no/api/v0/no/table/07459/', {
        method: 'POST',
        body: JSON.stringify(request),
    })
        .then(response => response.json())
        .then(response => {
            const result = {...groups};
            response.value.forEach((count, age) => {
                if (age < 16) result['0-15'] += count;
                else if (age < 18) result['16-17'] += count;
                else if (age < 25) result['18-24'] += count;
                else if (age < 40) result['25-39'] += count;
                else if (age < 45) result['40-44'] += count;
                else if (age < 55) result['45-54'] += count;
                else if (age < 65) result['55-64'] += count;
                else if (age < 75) result['65-74'] += count;
                else if (age < 85) result['75-84'] += count;
                else result['85+'] += count;
            });
            result['All'] = sum(Object.values(result));
            result['18+'] = result['All'] - result['0-15'] - result['16-17'];
            return result;
        });
}

function getVaccinationByAgeGroups(kommuneId) {
    const today = new Date().toISOString().split('T')[0];
    let url = 'https://statistikk.fhi.no/api/Sysvak/gruppering?diagnoseKodeListe=COVID_19&tabell=diagnose' +
                '&doseKodeListe=01,02&aldersgruppeKodeListe=1,2,3,4,5,6,7,8,9,10' +
                '&fraDag=2020-12-15&tilDag=' + today;
    if (kommuneId !== all) url += '&kommuneKodeListe=' + kommuneId;

    return Promise.all([jsonp(url + '&fordeling=aar'), jsonp(url + '&fordeling=dag')])
        .then(([total, weekly]) => {
            const textRegex = /^Covid-19, Dose ([1-2]), ([0-9-+]+) år(|, .+)$/;
            const thisWeekNo = getWeekNumberIn2021(new Date());
            const doses = ['sum', 1, 2];
            const data = Object.fromEntries(Object.keys(groups)
                .map(group => [group, Object.fromEntries(
                    doses.map(k => [k, {total: 0, weekly: Array(thisWeekNo + 1).fill(0)}]))
                ]));

            for (const { tekst, antall } of total) {
                const match = tekst.replace('85 og over', '85+ år').match(textRegex);
                if (!match) throw new Error(`Text '${tekst}' does not match regex '${textRegex}'`);
                data[match[2]][match[1]].total = antall;
                data[match[2]].sum.total += antall;
            }

            for (const { tekst, antall, fordeltPaa } of weekly) {
                const match = tekst.replace('85 og over', '85+ år').match(textRegex);
                if (!match) throw new Error(`Text '${tekst}' does not match regex '${textRegex}'`);

                const weekNo = getWeekNumberIn2021(new Date(fordeltPaa.split('.').reverse().join('/')));
                data[match[2]][match[1]].weekly[weekNo] += antall;
                data[match[2]].sum.weekly[weekNo] += antall;
            }

            for (const dose of doses) {
                data['All'][dose].total = sum(Object.keys(groups).map(group => data[group][dose].total));
                data['18+'][dose].total = data['All'][dose].total - data['0-15'][dose].total - data['16-17'][dose].total;
                for (let i = 0; i <= thisWeekNo; i++) {
                    data['All'][dose].weekly[i] = sum(Object.keys(groups).map(group => data[group][dose].weekly[i]));
                    data['18+'][dose].weekly[i] = data['All'][dose].weekly[i] - data['0-15'][dose].weekly[i] - data['16-17'][dose].weekly[i];
                }
            }

            return data;
        });
}

function filter() {
    const { populations, vaccinations } = state;
    const doses = document.querySelector('input[name="doses"]:checked').value;
    const per100 = document.getElementById('per100').checked;
    const cumulative = document.getElementById('cumulative').checked;

    const colorGrid = document.getElementsByClassName('color-grid')[0];
    while (colorGrid.hasChildNodes()) colorGrid.removeChild(colorGrid.lastChild);
    const colorGridFirstCol = addElement(colorGrid, 'div', {class: 'color-grid-first-col'});
    const colorGridRows = addElement(addElement(colorGrid, 'div', {class: 'color-grid-rows-container'}), 'div', {class: 'color-grid-rows'});

    for (const group of Object.keys(groups)) {
        const data = [...vaccinations[group][doses].weekly];
        if (cumulative) for (let i = 1; i < data.length; i++) data[i] += data[i - 1];
        for (let i = 0; i < data.length; i++) {
            const valuePer100 = 100 * data[i] / populations[group];
            data[i] = {value: per100 ? valuePer100 : data[i], percent: valuePer100 / (doses === 'sum' ? 2 : 1)};
        }

        addElement(addElement(colorGridFirstCol, 'div', {class: 'color-grid-row value'}), 'div', {class: 'color-grid-value'}).innerHTML = group;
        const row = addElement(colorGridRows, 'div', {class: 'color-grid-row value'});
        data.forEach(({ value, percent }) => {
            const style = `background-color: hsl(120, 75%, ${90 - 0.8 * percent}%); color: #${percent > 50 ? 'fff' : '000'}`;
            addElement(row, 'div', {class: 'color-grid-value', style }).innerHTML = value.toFixed(per100 ? 1 : 0);
        });
    }

    addElement(addElement(colorGridFirstCol, 'div', {class: 'color-grid-row value'}), 'div', {class: 'color-grid-value'}).innerHTML = 'Week';
    const footer = addElement(addElement(colorGridRows, 'div', {class: 'color-grid-footer'}), 'div', {class: 'color-grid-row'});
    vaccinations.All.sum.weekly.forEach((v, i) => addElement(footer, 'div', {class: 'color-grid-value'}).innerHTML = i);
    colorGridRows.parentElement.scrollLeft = colorGridRows.parentElement.scrollWidth;
}

document.addEventListener('DOMContentLoaded', function(event) {
    const select = document.getElementById('kommune-select');
    select.onchange = ({ target }) => onKommuneChange(target.value);

    const defaultOption = document.createElement('option');
    defaultOption.innerHTML = 'Select kommune';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    for (const {id, name} of Object.values(kommunes)){
        const opt = document.createElement('option');
        opt.value = id;
        opt.innerHTML = name;
        select.appendChild(opt);
    }

    onKommuneChange(5001);
});
