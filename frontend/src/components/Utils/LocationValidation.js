const searchOptionsCities = {
	language: 'en',
	types: ['(cities)'],
	componentRestrictions: { country: 'us' },
	country: ['us', 'pr', 'vi', 'gu', 'mp'],
};

const searchOptionsAddress = {
	language: 'en',
	types: ['address'],
	componentRestrictions: { country: 'us' },
	country: ['us', 'pr', 'vi', 'gu', 'mp'],
};

const searchOptionsState = {
	language: 'en',
	types: ['administrative_area_level_1'],
	componentRestrictions: { country: 'us' },
	country: ['us', 'pr', 'vi', 'gu', 'mp'],
};

const searchOptionsZip = {
	language: 'en',
	types: ['postal_code', 'postal_code_prefix', 'postal_code_suffix'],
	componentRestrictions: { country: 'us' },
	country: ['us', 'pr', 'vi', 'gu', 'mp'],
};

const zipRegex = /\b\d{5}(?:-\d{4})?\b/;
const cityRegex = /(?:[A-Z][a-z.-]+[ ]?)+/;
const stateRegex =
	/Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New[ ]Hampshire|New[ ]Jersey|New[ ]Mexico|New[ ]York|North[ ]Carolina|North[ ]Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode[ ]Island|South[ ]Carolina|South[ ]Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West[ ]Virginia|Wisconsin|Wyoming/;
const stateAbvRegex =
	/AL|AK|AS|AZ|AR|CA|CO|CT|DE|DC|FM|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MH|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|MP|OH|OK|OR|PW|PA|PR|RI|SC|SD|TN|TX|UT|VT|VI|VA|WA|WV|WI|WY/;
const streetRegex =
	/\d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Dr|Rd|Blvd|Ln|St)\.?/;

// Determine type of input
export const searchOptions = (input) => {
	if (zipRegex.test(input)) return searchOptionsZip;
	else if (cityRegex.test(input)) return searchOptionsCities;
	else if (stateRegex.test(input) || stateAbvRegex.test(input))
		return searchOptionsState;
	else if (streetRegex.test(input)) return searchOptionsAddress;
	else return;
};

// In case google changes type output order
const a = 0;
const b = 1;
const c = 2;

// Return autocomplete suggestions if out is an Address, City, State or Zip
export const validateSuggestions = (suggestions) => {
  const valid = [];
  suggestions.forEach(suggestion => {
    const type = suggestion.types;

    if (type.length === 2) {

      if ((type[a] === 'street_address' || type[a] === 'premise' || type[a] === 'postal_code') && (type[b] === 'geocode')) {
        valid.push(suggestion)
      }

    } else if (type.length === 3) {

      if ((type[a] === 'locality' || type[a] === 'administrative_area_level_1' || type[a] === 'administrative_area_level_2') && (type[b] === 'political') && (type[c] === 'geocode')) {
        valid.push(suggestion);
      }

    }
  });

  return valid;
};

// Return autocomplete suggestion if out is an Address, City, State or Zip
export const validateOneSuggestion = (suggestion) => {
  const type = suggestion.types;
  const terms = suggestion.terms;
  const term  = terms[terms.length -1].value;

  if (term === 'USA') {

    if (type.length === 2) {

      if ((type[a] === 'street_address' || type[a] === 'premise' || type[a] === 'postal_code') && (type[b] === 'geocode')) {
        return suggestion;
      }

    } else if (type.length === 3) {

      if ((type[a] === 'locality' || type[a] === 'administrative_area_level_1' || type[a] === 'administrative_area_level_2') && (type[b] === 'political') && (type[c] === 'geocode')) {
        return suggestion;
      }

    }
    
  }

}




const states = {
	Alabama: 'AL',
	Alaska: 'AK',
	Arizona: 'AZ',
	Arkansas: 'AR',
	California: 'CA',
	Colorado: 'CO',
	Connecticut: 'CT',
	Delaware: 'DE',
	Florida: 'FL',
	Georgia: 'GA',
	Hawaii: 'HI',
	Idaho: 'ID',
	Illinois: 'IL',
	Indiana: 'IN',
	Iowa: 'IA',
	Kansas: 'KS',
	Kentucky: 'KY',
	Louisiana: 'LA',
	Maine: 'ME',
	Maryland: 'MD',
	Massachusetts: 'MA',
	Michigan: 'MI',
	Minnesota: 'MN',
	Mississippi: 'MS',
	Missouri: 'MO',
	Montana: 'MT',
	Nebraska: 'NE',
	Nevada: 'NV',
	'New Hampshire': 'NH',
	'New Jersey': 'NJ',
	'New Mexico': 'NM',
	'New York': 'NY',
	'North Carolina': 'NC',
	'North Dakota': 'ND',
	Ohio: 'OH',
	Oklahoma: 'OK',
	Oregon: 'OR',
	Pennsylvania: 'PA',
	'Rhode Island': 'RI',
	'South Carolina': 'SC',
	'South Dakota': 'SD',
	Tennessee: 'TN',
	Texas: 'TX',
	Utah: 'UT',
	Vermont: 'VT',
	Virginia: 'VA',
	Washington: 'WA',
	'West Virginia': 'WV',
	Wisconsin: 'WI',
	Wyoming: 'WY',
};

export const abbreviateState = (state) => {
	return states[state];
};
