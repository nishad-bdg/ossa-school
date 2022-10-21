// See: https://en.wikipedia.org/wiki/ISO_4217
// See: https://stripe.com/docs/currencies
export const subUnitDivisors = {
  AUD: 100,
  CAD: 100,
  CHF: 100,
  CNY: 100,
  DKK: 100,
  EUR: 100,
  GBP: 100,
  HKD: 100,
  INR: 100,
  JPY: 1,
  MXN: 100,
  NOK: 100,
  NZD: 100,
  SEK: 100,
  SGD: 100,
  USD: 100,
};

// Currency formatting options.
// See: https://github.com/yahoo/react-intl/wiki/API#formatnumber
export const currencyConfiguration = currency => {
  if (!subUnitDivisors[currency]) {
    const currencies = Object.keys(subUnitDivisors);
    throw new Error(
      `Configuration missing for currency: ${currency}. Supported currencies: ${currencies.join(
        ', '
      )}.`
    );
  }

  return subUnitDivisors[currency] === 1
    ? {
        style: 'currency',
        currency,
        currencyDisplay: 'symbol',
        useGrouping: true,
        // If the currency is not using subunits (like JPY), remove fractions.
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }
    : {
        style: 'currency',
        currency,
        currencyDisplay: 'symbol',
        useGrouping: true,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };
};


export const conversionRateStore = (currency, API_KEY) => {
	let separator = '-';
	let newDate = new Date()
	let date = newDate.getDate();
	let month = newDate.getMonth() + 1;
	let year = newDate.getFullYear();
    let current_date = `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`;
	var fs = require('browserify-fs');
	fs.readFile('conversion_rate.json', 'utf-8', function(err, data) {
		
		let prev_date = '';
		if(typeof data != 'undefined'){
			let prev_date_obj = Object.keys(JSON.parse(data));
			if(typeof prev_date_obj[0] != 'undefined' && prev_date_obj[0]){
		        prev_date = prev_date_obj[0];
			}
		}
		
		if(!prev_date || (current_date > prev_date)){
			fetch(
			"https://v6.exchangerate-api.com/v6/"+API_KEY+"/pair/"+currency+"/JPY")
			.then((res) => res.json())
			.then((json) => {
				var dict = {current_date:json.conversion_rate};
	            var dictstring = JSON.stringify(dict);
				fs.writeFile("conversion_rate.json", dictstring, function(err) {
					if(err) {
						console.log(err);
					}
				});
			}).catch((err) => {
			   console.log(err.message);
			});
		}
	});
}