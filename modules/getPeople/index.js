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
  console.log('pathParameters');
  console.log('event', event);

  try{
    const list = await peopleModel.scan().exec();
    
    // TODO implement
    const response = {
      statusCode: 200,
      body: JSON.stringify(list),
    };
    return response;
  } catch(e) {
    console.log(e);
  }
};
