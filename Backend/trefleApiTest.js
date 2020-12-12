// Trefle API test

const fetch = require("node-fetch");

// URL of our API hosted on AWS
const URL = "https://nqna512g0i.execute-api.us-east-2.amazonaws.com/live/plant";
const TOKEN = "aiY4_Pp2_FYiD6dJ4oQJGhnnUn_ASOZZWQVa-f-63J8";

/*
// Update item in table
(async () => {
  let httpOptions = {
    method: "POST",
    body: JSON.stringify({
      data_origin: "dynamo", // Options are 'dynamo' or 'trefle'
      dynamo_function: "update", // Options are 'get', 'update', or 'add'
      params: {
        TableName: "Plants",
        Key: {
          plant_id: "garden_lettuce_00",
        },
        UpdateExpression: "SET height = :height",
        ExpressionAttributeValues: {
          ":height": [
            { x: 5, y: 10 },
            { x: 7, y: 11 },
          ],
        },
        ReturnValues: "NONE",
      },
    }),
  };
  console.dir(httpOptions, { depth: null });
  const response = await fetch(URL, httpOptions);
  if (response.status == 200) {
    console.log("Successfully update dynamodb");
  } else {
    console.log(response.status + " error: " + response.statusText);
  }
})();
*/

/*
// Add item to table
(async () => {
  let httpOptions = {
    method: "POST",
    body: JSON.stringify({
      data_origin: "dynamo", // Options are 'dynamo' or 'trefle'
      dynamo_function: "add", // Options are 'get', 'update', or 'add'
      params: {
        TableName: "Plants",
        Item: {
          plant_id: "garden_lettuce_00",
          plant_name: "garden%20lettuce",
          edible: true,
          diameter: 1,
          height: 1,
          germination_period: "7-10 days",
          days_to_harvest: "45-65 days",
          optimal_soil_ph: "6.1-7.8",
          optimal_ambient_humidity: "50-70%",
          optimal_ambient_temperature: "55-70 degrees",
          min_light: 10,
          max_light: 15,
          pref_light: 13,
          daily_water: 10,
        },
      },
    }),
  };
  console.dir(httpOptions, { depth: null });
  const response = await fetch(URL, httpOptions);
  if (response.status == 200) {
    console.log("Successfully update dynamodb");
  } else {
    console.log(response.status + " error: " + response.statusText);
  }
})();
*/

/*
// Query item from table
(async () => {
  let httpOptions = {
    method: 'POST',
    body: JSON.stringify({
      plant_id: 'garden_lettuce_00', // Accounts for having multiple pods with the same plant
      data_origin: 'dynamo', // Options are 'dynamo' or 'trefle'
      dynamo_function: 'get'
    })
  }
  console.dir(httpOptions, {depth: null});
  const response = await fetch(URL, httpOptions);
  const json = await response.json();
  console.dir(json, {depth: null});
})();
*/

/*
// Update historical data
(async () => {
  let httpOptions = {
    method: "POST",
    body: JSON.stringify({
      plant_id: "garden_lettuce_00", // Accounts for having multiple pods with the same plant
      data_origin: "dynamo", // Options are 'dynamo' or 'trefle'
      dynamo_function: "get",
    }),
  };
  console.dir(httpOptions, { depth: null });
  const response = await fetch(URL, httpOptions);
  const json = await response.json();
  let height = json.height;
  height.push({ x: 69, y: 420 });
  console.log(height);

  let httpOptions2 = {
    method: "POST",
    body: JSON.stringify({
      data_origin: "dynamo", // Options are 'dynamo' or 'trefle'
      dynamo_function: "update", // Options are 'get', 'update', or 'add'
      params: {
        TableName: "Plants",
        Key: {
          plant_id: "garden_lettuce_00",
        },
        UpdateExpression: "SET height = :height",
        ExpressionAttributeValues: {
          ":height": height,
        },
        ReturnValues: "NONE",
      },
    }),
  };
  console.dir(httpOptions2, { depth: null });
  const response2 = await fetch(URL, httpOptions2);
  if (response2.status == 200) {
    console.log("Successfully update dynamodb");
  } else {
    console.log(response2.status + " error: " + response2.statusText);
  }
})();
*/

/*
// Get all items from dynamo table
(async () => {
  let httpOptions = {
    method: 'POST',
    body: JSON.stringify({
      data_origin: 'dynamo',
      dynamo_function: 'get_all'
    })
  };
  console.dir(httpOptions, {depth: null});
  const response = await fetch(URL, httpOptions);
  const plant_ids = await response.json();
  console.dir(plant_ids, {depth: null});
})();
*/

/*
// Query item from Trefle
(async () => {
  let httpOptions = {
    method: "POST",
    body: JSON.stringify({
      plant_name: "garden%20lettuce", // Name of the plant we are looking for
      data_origin: "trefle", // Options are 'dynamo' or 'trefle'
    }),
  };
  console.dir(httpOptions, { depth: null });
  const response = await fetch(URL, httpOptions);
  const json = await response.json();
  console.dir(json, { depth: null });
})();
*/

/*
// Use this to search for plants
(async () => {
  const response = await fetch(
    "https://trefle.io/api/v1/plants/search?token=" + TOKEN + "&q=lettuce"
  );
  const json = await response.json();
  console.log(json);
})();
*/

// /*
// Use this to get images from the S3 bucket
(async () => {
  let httpOptions = {
    method: "POST",
    body: JSON.stringify({
      plant_id: "doesnt_matter", // ID of the image we want to get
      data_origin: "s3", // Options are 'dynamo', 'trefle', or 's3'
    }),
  };
  console.dir(httpOptions, { depth: null });
  const response = await fetch(URL, httpOptions);
  console.dir(response, { depth: null });
  const json = await response.json();
  console.dir(json, { depth: null });
})();
// */
