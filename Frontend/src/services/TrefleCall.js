// Trefle API test

const fetch = require("node-fetch");

// URL of our API hosted on AWS
const URL = "https://nqna512g0i.execute-api.us-east-2.amazonaws.com/live/plant";

// export default async function handler() {
//   let httpOptions = {
//     method: "POST",
//     body: JSON.stringify({
//       data_origin: "dynamo", // Options are 'dynamo' or 'trefle'
//       dynamo_function: "get", // Options are 'get', 'update', or 'add', get_all
//       plant_id: "garden_lettuce_00",
//     })
//   };
//   console.log(httpOptions);
//   const response = await fetch(URL, httpOptions);
//   const json = await response.json();
//   console.log(json);
//   return json
// };

export default class BackendCalls {

   static async fetchPlantPod(plant_id){
    let httpOptions = {
      method: "POST",
      body: JSON.stringify({
        data_origin: "dynamo", // Options are 'dynamo' or 'trefle'
        dynamo_function: "get", // Options are 'get', 'update', or 'add', get_all
        plant_id: plant_id,
      })
    };
    console.log(httpOptions);
    const response = await fetch(URL, httpOptions);
    const json = await response.json();
    console.log(json);
    return json
  }

  static async fetchAllPlantPods(){
    let httpOptions = {
      method: "POST",
      body: JSON.stringify({
        data_origin: "dynamo", // Options are 'dynamo' or 'trefle'
        dynamo_function: "get_all", // Options are 'get', 'update', or 'add', get_all
      })
    };
    console.log(httpOptions);
    const response = await fetch(URL, httpOptions);
    const json = await response.json();
    console.log(json);
    return json
  }
  
}

