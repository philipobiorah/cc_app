

import Converter from './converter.js';
import lastQuery from './converter.js';
//import ServiceWorker from './serviceWorker.js';
import IDBManager from './idbManager.js';


//Let's register the service worker.
// let sw = new ServiceWorker();
// sw.registerServiceWorker('./sw.js');

//Create an IDb manager object for index db transactions
let idbMan = new IDBManager();
//idbMan.saveQueryInDatabase('DB', 500);
//idbMan.getQueryValueByID('DB', (error, v) => {console.log(v['value']); console.log(v)});

const submitButton = document.getElementById("submit_button");
const toSelect = document.getElementById("to");
const fromSelect = document.getElementById("from");
const amountEntry = document.getElementById('fromAmount');
const convertedValueEntry = document.getElementById('converted_value_entry');

//create a converter object
let converter = new Converter(idbMan);


    
// fetch conversion rates and cache
const currencyIds = ["AUD", "USD", "NGN", "EUR", "MUR", "MXN", "XCD"];
currencyIds.forEach(fromCurrency => {
    currencyIds.forEach(toCurrency => {
        if (fromCurrency !== toCurrency) {
            console.log(`${fromCurrency}_${toCurrency}`);
            converter.convertCurrency(1, fromCurrency, toCurrency, ()=>{});
        }
    });
});

// //Listen to when the submit button is clicked
submitButton.addEventListener("click", () => 
{
    let amount = amountEntry.value;

    if(amount)
    {        
        let fromCurrencyKey = fromSelect.options[fromSelect.selectedIndex].value;
        let toCurrencyKey = toSelect.options[toSelect.selectedIndex].value;

        // let regExp = /\(([^)]+)\)/;
        // let fromCurrencyKey = regExp.exec(fromCurrency)[1];
        // let toCurrencyKey = regExp.exec(toCurrency)[1];

        if(fromCurrencyKey == toCurrencyKey)
        {
            convertedValueEntry.value = amount;
        }
        else
        {
            converter.convertCurrency(amount, fromCurrencyKey, toCurrencyKey, (error, result) => 
            {
                convertedValueEntry.value = result || "0";
                if(error)
                {
                    alert("Please check your internt connection | Error:"+error);
                }
            });
        }
    }
    else
    {
        alert("please enter the amount which you wish to convert");
    }
});



function convertCurrency(){
    submitButton.addEventListener("click", () => 
{
    let amount = amountEntry.value;

    if(amount)
    {        
        let fromCurrencyKey = fromSelect.options[fromSelect.selectedIndex].value;
        let toCurrencyKey = toSelect.options[toSelect.selectedIndex].value;

        // let regExp = /\(([^)]+)\)/;
        // let fromCurrencyKey = regExp.exec(fromCurrency)[1];
        // let toCurrencyKey = regExp.exec(toCurrency)[1];

        if(fromCurrencyKey == toCurrencyKey)
        {
            convertedValueEntry.value = amount;
        }
        else
        {
            converter.convertCurrency(amount, fromCurrencyKey, toCurrencyKey, (error, result) => 
            {
                convertedValueEntry.value = result || "0";
                if(error)
                {
                    alert("Please check your internt connection | Error:"+error);
                }
            });
        }
    }
    else
    {
        alert("please enter the amount which you wish to convert");
    }
});

}