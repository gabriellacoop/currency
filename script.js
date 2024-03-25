// For selecting different controls
let search = document.querySelector(".searchBox");
let convert = document.querySelector(".convert");
let fromCurrency = document.querySelector("#sel1");
let toCurrency = document.querySelector("#sel2");
let conversionResult = document.querySelector("#conversionResult .finalValue");
let resultFrom;
let resultTo;
let searchValue;

// Event when currency is changed
fromCurrency.addEventListener('change', (event) => {
    resultFrom = event.target.value;
});

// Event when currency is changed
toCurrency.addEventListener('change', (event) => {
    resultTo = event.target.value;
});

search.addEventListener('input', updateValue);

// Function for updating value
function updateValue(e) {
    searchValue = e.target.value;
}

// When user clicks, it calls function getResults
convert.addEventListener("click", getResults);

// Function getResults
async function getResults() {
    const apiKey = "9d76670b60efb5b0f15b8907";
    const responseConversion = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${resultFrom}/${resultTo}/${searchValue}`);
    const responseComparison = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${resultFrom}`);

    const dataConversion = await responseConversion.json();
    const dataComparison = await responseComparison.json();

    displayResults(dataConversion, dataComparison);
}

// Países adicionais para exibir na comparação
const additionalCountries = [
    'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY'
];

// Object mapping country codes to flag URLs
const countryFlags = {
    JPY: "https://www.currencyremitapp.com/wp-content/themes/currencyremitapp/images/countryimages/japan.png",
    GBP: "https://www.currencyremitapp.com/wp-content/themes/currencyremitapp/images/countryimages/unitedkingdom.png",
    AUD: "https://www.currencyremitapp.com/wp-content/themes/currencyremitapp/images/countryimages/australia.png",
    CAD: "https://www.currencyremitapp.com/wp-content/themes/currencyremitapp/images/countryimages/canada.png",
    CHF: "https://www.currencyremitapp.com/wp-content/themes/currencyremitapp/images/countryimages/switzerland.png",
    CNY: "https://www.currencyremitapp.com/wp-content/themes/currencyremitapp/images/countryimages/china.png"
};

// Display results after conversion and comparison
function displayResults(conversionData, comparisonData) {
    const convertedAmount = conversionData.conversion_result;
    const comparisonRate = comparisonData.conversion_rates[resultTo];

    conversionResult.textContent = convertedAmount.toFixed(2);
    const comparisonList = document.querySelector(".comparison-list");
    comparisonList.innerHTML = "";

    const listItem = document.createElement("li");
    listItem.innerHTML = `1 ${resultFrom} = ${comparisonRate.toFixed(4)} ${resultTo}`;
    comparisonList.appendChild(listItem);

    additionalCountries.forEach(country => {
        const countryRate = comparisonData.conversion_rates[country];
        const countryFlag = countryFlags[country];

        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <img src="${countryFlag}" alt="${country} Flag" width="24" height="18">
            1 ${resultFrom} = ${countryRate.toFixed(4)} ${country}
        `;
        comparisonList.appendChild(listItem);
    });
}

// When user click on reset button
function clearVal() {
    window.location.reload();
    document.querySelector(".finalValue").textContent = "";
    document.querySelector(".comparisonValue").textContent = "";
};