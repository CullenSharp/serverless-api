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
  console.log('id', event.pathParameters.id);
  console.log('event', event);
  
  try{
    const id = event.pathParameters.id;
    const person = await peopleModel.query('id').eq(id).exec();

    const response = {
      statusCode: 200,
      body: JSON.stringify(person),
    };
    return response;
  } catch(e) {
    console.log(e);
  }
};
