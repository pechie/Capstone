const fetch = require("node-fetch");
const aws = require("aws-sdk");
const TOKEN = "aiY4_Pp2_FYiD6dJ4oQJGhnnUn_ASOZZWQVa-f-63J8";

export default async function handler(event) {
  console.log("reached here");
  const body = event.body;
  switch (body.data_origin) {
    case "trefle":
      return await getTrefleData(body.plant_name);
    case "dynamo":
      return await getDynamoData(body.plant_id);
    default:
      break;
  }
}

async function getTrefleData(plant_name) {
  console.log("Getting trefle data");
  let search_params = "&filter[common_name]=" + plant_name;
  let url = "https://trefle.io/api/v1/plants?token=" + TOKEN + search_params;
  console.log(url);
  const fetchResponse = await fetch(url);
  const json = await fetchResponse.json();
  let response = {
    statusCode: 200,
    body: JSON.stringify(json)
  };
  return response;
}

async function getDynamoData(plant_id) {
  console.log("Getting dynamo data");
  let docClient = new aws.DynamoDB.DocumentClient();
  let queryParams = {
    TableName: "Plants",
    KeyConditionExpression: "plant_id = :plant_id",
    ExpressionAttributeValues: {
      ":plant_id": plant_id
    }
  };
  let response = {};

  await docClient
    .query(queryParams, function(err, data) {
      if (err) {
        console.dir(err, { depth: null });
        response = {
          error: err
        };
      } else {
        console.log("Data: ");
        console.dir(data, { depth: null });
        response = {
          statusCode: 200,
          body: JSON.stringify(data.Items[0])
        };
        return response;
      }
    })
    .promise();
  return response;
}
