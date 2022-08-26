import axios from 'axios'
import {isUndefined} from "../dist/index.d56a3cb1";

//Verwijzingen naar de HTML elementen
const searchForm = document.getElementById("search-form");
const infoBox = document.getElementById("country-result");

//Event listener naar de submit form
searchForm.addEventListener('submit', searchCountry)

//Zoekfunctie waar gebruiker het land in typt
function searchCountry(e) {
    e.preventDefault();
    const queryfield = document.getElementById("query-field");

    fetchCountryDetails(queryfield.value);

    queryfield.value = '';

}

// Keys uit het object: capital | currencies[] | flag | languages[] | name | subregion


// De Async functie die de data ophaalt
async function fetchCountryDetails (name) {
    try {
        const result = await axios.get(` https://restcountries.com/v2/name/${name} `);
        const country = result.data[0];
        console.log(result.data[0]);


        infoBox.innerHTML = `
<div id="nameAndFlag">
<span> <img id="currentFlag" src="${country.flag}" alt="flag" width="50px" /> </span>
<h2>${country.name}</h2>
</div>

<p>${country.name} is situated in ${country.subregion}.</p>
<p>It has a population of ${country.population}.</p>
 <p>The capital is ${country.capital} ${currencyDescription(country.currencies)}</p>

    `

    } catch (error) {
        if (fetchCountryDetails(name) === undefined) {
            document.getElementById("search-form");
            searchForm.innerHTML = "Dit land bestaat niet"
        }
        console.error(error)

    }

}





fetchCountryDetails(name);



//Functie die het aantal currencies uit de bijbehorende data haalt

function currencyDescription(currencies) {
    let output = 'and you can pay with ';

    if(currencies.length === 2) {
        return output + `${currencies[0].name} and ${currencies[1].name}`
    }
    return output + `${currencies[0].name}`;
}




