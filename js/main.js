// function convertCurrency() { 
//     var from = document.getElementById("from").value;
//     var to = document.getElementById("to").value;
//     var xmlhttp = new XMLHttpRequest();
//     var query = from+"_"+to;
//    // var url = "http://data.fixer.io/api/latest?access_key=e3b74b1747252c33af0d3c9544febeb3&symbols="+ from + "," + to;
//     let url = "https://free.currencyconverterapi.com/api/v5/convert?q="+query+"&compact=y";
//     xmlhttp.open("GET", url, true);
//     xmlhttp.send();
//     xmlhttp.onreadystatechange = function(){
//         if(xmlhttp.readyState == 4 && xmlhttp.status== 200){
          
//             var result = xmlhttp.responseText;
//             //alert(result);
//             var jsResult = JSON.parse(result); 
//             // {"USD_NGN":{"val":358.000186}}
//             // var to_from =from+"_"+to; 
//            // "rates":{"USD":1.166997,"NGN":417.784962}
          
//             //var oneUnit = jsResult.rates[to]/jsResult.rates[from];
//            // console.log(jsResult)
//            var oneUnit =  jsResult[query]["val"];
//            console.log(oneUnit);
//             var amt = document.getElementById("fromAmount").value;
//            // document.getElementById("toAmount").value = (convertedRate).toFixed(2);
//            document.getElementById("toAmount").value = (oneUnit*amt).toFixed(2);
//         }
//     }

// }.........................................................


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

//Get all the currencies, then add them to the Drop downs on the index.html page
// converter.getAllCurrencies( (error, response) => 
//         { 
//             if(response)
//             {
                
//                 response.json().then((jsonData) => {
//                     let data = jsonData.results;
//                     let set = {data};

//                     const currencyIds = [];
                
//                     Object.keys(jsonData.results).forEach((key,index) => {
                    
//                        let currency = jsonData.results[key];
//                       let option1 = document.createElement("option");
//                         let option2 = document.createElement("option");

//                         //format the string which will be displayed in each
//                         //drop down's options.
//                         if(!currency.currencySymbol)
//                         {    
//                             option1.text = `(${currency.id}) ${currency.currencyName}`;
//                             option2.text = `(${currency.id}) ${currency.currencyName}`;
//                         }
                    
//                         else
//                         {
//                             option1.text = `(${currency.id}) ${currency.currencyName} ${currency.currencySymbol}`;
//                             option2.text = `(${currency.id}) ${currency.currencyName} ${currency.currencySymbol}`;
//                         }

//                         //Add currencies to both drop downs
//                         option1.value = currency.id;
//                         option2.value = currency.id;
//                         toSelect.add(option1, null);
//                         fromSelect.add(option2, null);

//                         currencyIds.push(currency.id);
//                     });

//                     for (let f = 0; f < currencyIds.length - 1; f++) {
//                         for (let t = f + 1; t < currencyIds.length; t++) {
//                             const fromCurrency = currencyIds[f];
//                             const toCurrency = currencyIds[t];
//                             console.log(`${fromCurrency}_${toCurrency}`);
//                             converter.convertCurrency(1, fromCurrency, toCurrency, ()=>{});
//                         }
//                     }
//                 });
//             }
//             else if(error)
//             {
//                 alert(`An error occured while fetching the currencies. 
//                        It could be the limit to the API calls
//                        Please try again`);
//             }
//         });
    
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