const request= require('request');
const yargs= require('yargs');

const geocode=require('./geocode/geocode.js')
const weather=require('./weather/weather.js')

const argv=yargs
.options({
a:{
  demand:true,
  alias:'address',
  describe:"address to fetch weather",
  string:true
}
})
.help()
.alias('help','h')
.argv;

console.log(argv);

geocode.geoaddress(argv.address,(errorMessage,results)=>{
  if(errorMessage)
  {
    console.log(errorMessage);
  }
  else {
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
      }
    });
  }
});
