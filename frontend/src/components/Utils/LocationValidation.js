const searchOptionsCities = {
  language: 'en',
  types: ['(cities)'],
  country: ["us", "pr", "vi", "gu", "mp"],
};

const searchOptionsAddress = {
  language: 'en',
  types: ['address'],
  country: ["us", "pr", "vi", "gu", "mp"],
}

const searchOptionsRegion = {
  language: 'en',
  types: ['(regions)'],
  country: ["us", "pr", "vi", "gu", "mp"],
}

const zipRegex = /\b\d{5}(?:-\d{4})?\b/;
const cityRegex = /(?:[A-Z][a-z.-]+[ ]?)+/;
const stateRegex = /Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New[ ]Hampshire|New[ ]Jersey|New[ ]Mexico|New[ ]York|North[ ]Carolina|North[ ]Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode[ ]Island|South[ ]Carolina|South[ ]Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West[ ]Virginia|Wisconsin|Wyoming/
const stateAbvRegex = /AL|AK|AS|AZ|AR|CA|CO|CT|DE|DC|FM|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MH|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|MP|OH|OK|OR|PW|PA|PR|RI|SC|SD|TN|TX|UT|VT|VI|VA|WA|WV|WI|WY/;
const streetRegex = /\d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Dr|Rd|Blvd|Ln|St)\.?/;

// Determine type of input
const searchOptions = (input) => {

  if (zipRegex.test(input)) return searchOptionsRegion;
  else if (cityRegex.test(input)) return searchOptionsCities;
  else if (stateRegex.test(input) || stateAbvRegex.test(input)) return searchOptionsRegion;
  else if (streetRegex.test(input)) return searchOptionsAddress;
  else return;

}

export default searchOptions
