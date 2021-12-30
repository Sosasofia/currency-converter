const currencyOneEl = document.getElementById("currency-one");
const currencyTwoEl = document.getElementById("currency-two");
const amountOneEl = document.getElementById("amount-one");
const amountTwoEl = document.getElementById("amount-two");

const BASE_URL = "https://api.exchangerate.host";

function getCurrencies() {
    return fetch(`${BASE_URL}/latest`)
        .then((res) => res.json())
        .then((res) => displayCurrencies(res.rates))
}

function displayCurrencies(data) {
    const select = document.querySelectorAll(".select");
    let html = '<option value="">Select currency</option>';
    const currencies = Object.entries(data);

    currencies.forEach(currency => {
        let currencyName = currency[0];
        html += `<option value="${currencyName}">${currencyName}</option>`;
    });

    select[0].innerHTML = html;
    select[1].innerHTML = html;
};


function convert() {
    let currencyOne = currencyOneEl.value;
    let currencyTwo = currencyTwoEl.value;
    let amount = amountOneEl.value;

    fetch(`${BASE_URL}/convert?amount=${amount}&from=${currencyOne}&to=${currencyTwo}&places=2`)
    .then(resp => resp.json())
    .then((data) => {
        amountTwoEl.value = data.result
    });
}


const btn = document.getElementById("btn-convert");
btn.addEventListener("click", convert);


window.onload = function() {
    getCurrencies();
};
