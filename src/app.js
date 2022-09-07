import axios from 'axios'


//Verwijzingen naar de HTML elementen
const searchForm = document.getElementById("search-form");
const infoBox = document.getElementById("country-result");


//Event listener naar de submit form
searchForm.addEventListener('submit', searchCountry)

//Zoekfunctie waar gebruiker land in typt
function searchCountry(e) {
    e.preventDefault();
    const queryfield = document.getElementById("query-field");

    fetchCountryDetails(queryfield.value);

    queryfield.value = ' ';

}

//De Async functie die de data ophaalt
async function fetchCountryDetails(name) {
    try {
        const result = await axios.get(`https://restcountries.com/v2/name/${name}`);
        const country = result.data[0];
        console.log(result.data[0]);


        infoBox.innerHTML = `
        <div id="nameAndFlag">
        <span> <img id="currentFlag" src="${country.flag}" alt="flag" width="50px" /> </span>
        <h2>${country.name}</h2>
        </div>
        <ul>
        <li>${country.name} is situated in ${country.subregion}.</li>
        <li>It has a population of ${country.population}. ${languageLoader(country.languages)}</li>
        <li> The capital is ${country.capital} ${currencyDescription(country.currencies)}</li>
        </ul> 
        
        `
    } catch (error) {
        console.error(error)

        const errorMessage = document.getElementById("error-message");
        errorMessage.innerHTML = `<p>Dit is geen bestaand land :(</p>`

        }


}

fetchCountryDetails(name);

//Functie die het aantal currencies uit de bijbehorende data haalt
function currencyDescription(currencies) {
    let output = 'and you can pay with ';

    if (currencies.length === 2) {
        return output + `${currencies[0].name} and ${currencies[1].name} `
    }
    return output + `${currencies[0].name}`;
}


//Functie die het aantal talen laadt

function languageLoader(languages) {
    let output = 'They speak ';
    if (languages.length === 3) {
        return output + `${languages[0].name}, ${languages[1].name} and ${languages[2].name}`
    } else if (languages.length === 2) {
        return output + `${languages[0].name} and ${languages[1].name}`
    } else {
        return output + `${languages[0].name}`;
    }
}






