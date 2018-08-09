const request= require('request');
geoaddress=(address,callback)=>{
  var encodedValue=encodeURIComponent(address);
  console.log(encodedValue);
  request({
    url:`http://maps.googleapis.com/maps/api/geocode/json?address=${encodedValue}`,
    json:true
  },
  (error,response,body)=>{

  if(error)
  {
    callback('unable to connect to google server');
  //  console.log('unable to connect to google server');
  }
  else if(body.status==="ZERO_RESULTS")
    {
      callback('unable to find the address');
    //  console.log('unable to find the address');
    }
  else if(body.status==="OK") {

    callback(undefined,{
      address:body.results[0].formatted_address,
      latitude:body.results[0].geometry.location.lat,
      longitude:body.results[0].geometry.location.lng
    });
      //printing formatted address
    //  console.log(`Address: ${body.results[0].formatted_address}`);

      //printing  lalitude
      //console.log(`latitude :${body.results[0].geometry.location.lat}`);

      //printing  longitude
      //console.log(`longitude :${body.results[0].geometry.location.lng}`);
         //console.log(JSON.stringify(body,undefined,2));
  }

  });

}

module.exports={
  geoaddress
}
