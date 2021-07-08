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
  let response;
  try{
    const id = event.pathParameters.id;
    await peopleModel.delete(id);

    response = {
      statusCode: 203,
      body: JSON.stringify('Person was successfully deleted'),
    };

    return response;
  } catch(e) {
    response = {
      statusCode: 500,
      body: JSON.stringify('Unable to delete person'),
    };
    
    console.log(e);
  }

  return response;
};
