// Handles requests to the Trefle API
const fetch = require("node-fetch");
const aws = require("aws-sdk");

const TOKEN = "aiY4_Pp2_FYiD6dJ4oQJGhnnUn_ASOZZWQVa-f-63J8";

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  switch (body.data_origin) {
    case "trefle":
      return await getTrefleData(body.plant_name);
    case "dynamo":
      switch (body.dynamo_function) {
        case "add":
          return await dynamoAdd(body.params);
        case "get":
          return await dynamoGet(body.plant_id);
        case "get_all":
          return await dynamoGetAll();
        case "update":
          return await dynamoUpdate(body.params);
      }
    case "s3":
      return await imageGet();
    default:
      break;
  }
};

async function getTrefleData(plant_name) {
  console.log("Getting trefle data");
  let search_params = "&filter[common_name]=" + plant_name;
  let url = "https://trefle.io/api/v1/plants?token=" + TOKEN + search_params;

  console.log(url);

  const fetchResponse = await fetch(url);
  const json = await fetchResponse.json();
  let response = {
    statusCode: 200,
    body: JSON.stringify(json),
  };
  return response;
}

async function dynamoAdd(putParams) {
  let docClient = new aws.DynamoDB.DocumentClient();
  let response = {};

  await docClient
    .put(putParams, function (err, data) {
      if (err) {
        console.dir(err, { depth: null });
        response = {
          error: err,
        };
      } else {
        console.log("Data: ");
        console.dir(data, { depth: null });
        response = {
          statusCode: 200,
        };
        return response;
      }
    })
    .promise();
  return response;
}

async function dynamoGet(plant_id) {
  console.log("Getting dynamo data");
  let docClient = new aws.DynamoDB.DocumentClient();
  let queryParams = {
    TableName: "Plants",
    KeyConditionExpression: "plant_id = :plant_id",
    // ProjectionExpression:
    //   "plant_id, height, curr_humidity, curr_temperature, daily_water, " +
    //   "days_to_harvest, diameter, edible, germination_period, humidity, max_light, " +
    //   "min_light, optimal_ambient_humidity, optimal_ambient_temperature, " +
    //   "optimal_soil_ph, plant_name, pref_light",
    ExpressionAttributeValues: {
      ":plant_id": plant_id,
    },
  };
  let response = {};

  await docClient
    .query(queryParams, function (err, data) {
      if (err) {
        console.dir(err, { depth: null });
        response = {
          error: err,
        };
      } else {
        console.log("Data: ");
        console.dir(data, { depth: null });
        response = {
          statusCode: 200,
          body: JSON.stringify(data.Items[0]),
        };
        return response;
      }
    })
    .promise();
  return response;
}

async function dynamoGetAll() {
  let docClient = new aws.DynamoDB.DocumentClient();
  const params = {
    TableName: "Plants",
  };

  let scanResults = [];
  let items = await docClient.scan(params).promise();
  console.dir(items, { depth: null });
  items.Items.forEach((item) => scanResults.push(item.plant_id));

  return {
    statusCode: 200,
    body: JSON.stringify(scanResults),
  };
}

async function dynamoUpdate(updateParams) {
  let docClient = new aws.DynamoDB.DocumentClient();
  let response = {};

  await docClient
    .update(updateParams, function (err, data) {
      if (err) {
        console.dir(err, { depth: null });
        response = {
          error: err,
        };
      } else {
        console.log("Data: ");
        console.dir(data, { depth: null });
        response = {
          statusCode: 200,
        };
        return response;
      }
    })
    .promise();
  return response;
}

async function imageGet() {
  let s3 = new aws.S3();
  let image_key;

  let list_params = {
    Bucket: "jadepod-images",
    Prefix: "test-pod/",
  };

  await s3
    .listObjects(list_params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.dir(data, { depth: null });
        image_key = data.Contents[data.Contents.length - 1].Key;
      }
    })
    .promise();

  let get_params = {
    Bucket: "jadepod-images",
    Key: image_key,
  };

  let response = {
    statusCode: 200,
    body: null,
  };

  await s3
    .getObject(get_params, function (err, data) {
      if (err) {
        console.log(err);
        response.statusCode = 404;
        response.body = err;
      } else {
        response.body = JSON.stringify(data.Body.toString("base64"));
        console.dir(response, { depth: null });
      }
    })
    .promise();
  return response;
}
