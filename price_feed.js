const priceServiceUrl = 'http://localhost:3005/api/price';

document.getElementById("price-form").addEventListener("submit", submitHandler);


function submitHandler(event) {
    console.log("submit-handler");
    // stops the form submitting itself we want to send the data to a REST API
    event.preventDefault();
    let form = event.target;

    // done with a promise using await / async syntax
    getLivePrice(form.ticker.value, form.numdays.value).then(createTable);
}


async function getLivePrice(ticker, numDays) {
    if(typeof(numDays) == 'undefined') {
        numDays = 1;
    }

    console.log(`Making API request to: ${priceServiceUrl}?ticker=${ticker}&num_days=${numDays}`);

    const response = await fetch(priceServiceUrl + '?ticker=' + ticker + "&num_days=" + numDays);
    return response.json();
}


function createTable(priceData){
    console.log("****** about to write data")
    console.log(priceData); 

    let htmlString = "<table class='table table-striped'><thead><tr>";
    htmlString += "<th>Date</th><th>Ticker</th><th>Close Price</th>";
    htmlString += "</tr></thead>";

    priceData.price_data.map((entry) => {
        htmlString+="<tr>";
        htmlString+="<td>"+ entry[0] + "</td>";
        htmlString+="<td>"+ priceData.ticker + "</td>";
        htmlString+="<td>"+ entry[1] + "</td>";
    });
    htmlString += "</table>";

    document.querySelector('#price-div').innerHTML = htmlString;
}


