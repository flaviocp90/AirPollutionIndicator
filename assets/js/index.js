let lat = document.querySelector('.latiInp');
let lon = document.querySelector('.longInp');
let search = document.querySelector('.btn-search');
let geo = document.querySelector('.btn-geo');
let city = document.querySelector('.city-name');
let AQI = document.querySelector('.air-quality-index');
let componentsEle = document.querySelectorAll(".component-value");
let output = document.querySelector('.output');
let healthImplications = document.querySelector('.description');

function success(pos) {
    var crd = pos.coords;
    lat.value = crd.latitude.toFixed(5);
    lon.value = crd.longitude.toFixed(5);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

const userPosition = () => {
    navigator.geolocation.getCurrentPosition(success, error);
}


let token = '94aed882eaa590e5a4004eb4f387992b4c280fcf';
const getData = (lat, lon) => {
    fetch('https://api.waqi.info/feed/geo:' + lat + ';' + lon + '/?token=' + token).then(response => {
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status)
        } else {
            return response.json();
        }
    }).then(function (dataJson) {

        city.innerText = dataJson.data.city.name;

        AQI.innerText = parseInt(dataJson.data.aqi);

        if (AQI.innerText <= 50) {
            airStat = 'Good';
            color = '#009966';
            desc = 'Air quality is considered satisfactory, and air pollution poses little or no risk'

        } else if (AQI.innerText > 50 && number <= 100) {
            airStat = 'Moderate';
            color = '#FFDE33';
            desc = 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.';

        } else if (AQI.innerText > 100 && number <= 150) {
            airStat = 'Unhealthy for Sensitive Groups';
            color = '#FF9933';
            desc = 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
       
        } else if (AQI.innerText > 150 && number <= 200) {
            airStat = 'Unhealthy';
            color = '#CC0033';
            desc = 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects';

        } else if (AQI.innerText > 200 && number <= 300) {
            airStat = 'Very Unhealthy';
            color = '#660099';
            desc = 'Health warnings of emergency conditions. The entire population is more likely to be affected.';

        } else if (AQI.innerText > 300) {
            airStat = 'Hazardous';
            color = '#660099';
            desc = 'Health alert: everyone may experience more serious health effects';
        }

        AQI.style.backgroundColor = color
        output.innerText = airStat;
        output.style.color = color;
        healthImplications.innerText = desc;

        let comp = dataJson.data.iaqi;

        console.log(comp);
        
        componentsEle.forEach(ele => {
            const attr = ele.getAttribute('data-comp');
            try {
                ele.innerText = comp[attr].v;
            }
            catch (err) {
                console.log(err.message);
            }
        })

    })
}

search.addEventListener('click', () => {
    getData(lat.value, lon.value);
})

geo.addEventListener('click', () => {
    userPosition();
})

