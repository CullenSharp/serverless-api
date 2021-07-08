'use strict';

const dynamoose = require('dynamoose');

const schema = new dynamoose.Schema({
  'id': String,
  'name': String,
  'phone': String,
});

// tells dynamoose what table to connect with
const peopleModel = dynamoose.model('people', schema);

exports.handler = async (event) => {
  console.log('event', event);
  const {name, phone} = JSON.parse(event.body);
  const id = event.pathParameters.id;

  let response;

  try{
    const newPerson = await peopleModel.update({"id": id, "name": name, "phone": phone});

    response = {
      statusCode: 204,
      body: JSON.stringify(newPerson),
    };

    return response;
  } catch(e){
    response = {
      statusCode: 404,
      body: JSON.stringify('could not get update information'),
    };
  }

  return response;
};
