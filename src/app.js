import axios from 'axios'
const searchForm = document.getElementById("search-form");
const infoBox = document.getElementById("country-result");


searchForm.addEventListener('submit', searchCountry)

function searchCountry(e) {
    e.preventDefault();
    const queryfield = document.getElementById("query-field");

    fetchCountryDetails(queryfield.value);

    queryfield.value = '';

}

// Keys uit het object: capital | currencies[] | flag | languages[] | name | subregion

async function fetchCountryDetails (name) {
    try {
        const result = await axios.get(` https://restcountries.com/v2/name/${name} `);
        const country = result.data[0];
        console.log(result.data[0]);


        infoBox.innerHTML = `
<span> <img src="${country.flag}" alt="flag" width="50px" />
<h2>${country.name}</h2>
</span>

<p>${country.name} is situated in ${country.subregion}.</p>
<p>It has a population of ${country.population}.</p>
 <p>The capital is ${country.capital} ${currencyDescription(country.currencies)}</p>

    `

    } catch (error) {
        console.error(error)
    }

}

    const container = document.getElementById("container");

    container.innerHTML = `<p>${result.data[0].name} is situated in ${result.data[0].subregion}. It has a population of ${result.data[0].population} people.</p>


    `


fetchCountryDetails(name);


function currencyDescription(currencies) {
    let output = 'and you can pay with ';

    if(currencies.length === 2) {
        return output + `${currencies[0].name} and ${currencies[1].name}`
    }
    return output + `${currencies[0].name}`;
}




