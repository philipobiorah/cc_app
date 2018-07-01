

    import Converter from './converter.js';
    import lastQuery from './converter.js';
    import IDBManager from './idbController.js';


    //Create an IDb manager object for index db transactions
    let idbMan = new IDBManager();

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



    function convertCurrency(){
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
            alert("please enter the amount which you wish to convert");
        }
    });

    }