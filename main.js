
    import Converter from './converter.js';
    import lastQuery from './converter.js';
    import IDBManager from './idbController.js';


    //Create an IDb manager object for Indexdb transactions
    let idbMan = new IDBManager();

    const submitButton = document.getElementById("submit_button");
    const toSelect = document.getElementById("to");
    const fromSelect = document.getElementById("from");
    const amountEntry = document.getElementById('fromAmount');
    const convertedValueEntry = document.getElementById('converted_value_entry');

    //create a converter object
    let converter = new Converter(idbMan);
        
    // fetch conversion rates and cache
    const currencyIds = ["AUD", "USD", "NGN", "EUR", "MUR", "MXN", "XCD"]; // Due to the limit in the free API a few  country ids are cached for 
    currencyIds.forEach(fromCurrency => {                                  // complete offline user experience. 
        currencyIds.forEach(toCurrency => {
            if (fromCurrency !== toCurrency) {
                console.log(`${fromCurrency}_${toCurrency}`);
                converter.convertCurrency(1, fromCurrency, toCurrency, ()=>{});
            }
        });
    });

    // //Convert button event listener
    submitButton.addEventListener("click", () => 
    {
        let amount = amountEntry.value;

        if(amount)
        {        
            let fromCurrencyKey = fromSelect.options[fromSelect.selectedIndex].value;
            let toCurrencyKey = toSelect.options[toSelect.selectedIndex].value;

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
            alert("Please enter Amount to be converted");
        }
    });
