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
  const body = JSON.parse(event.body);
  console.log('body', body);
  console.log('event', event);
  let response;

  try{
    const newPerson = await peopleModel.create(body);
    response = {
      statusCode: 201,
      body: JSON.stringify(newPerson),
    };

    return response;
  } catch(e){
    response = {
      statusCode: 500,
      body: JSON.stringify('could not get person information'),
    };
  }

  return response;
};
