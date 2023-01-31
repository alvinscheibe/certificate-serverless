import { APIGatewayProxyHandler } from 'aws-lambda';
import { document } from '../../utils/dynamodbClient';

export const handler: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;

  const response = await document.query({
    TableName: 'users_certificate',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': id
    }
  }).promise();

  const userCertificateAlreadyExists = response.Items[0];

  if (userCertificateAlreadyExists)
    return {
      statusCode: 201,
      body: JSON.stringify(response.Items[0])
    }
  else
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid certificate!'
      })
    }
}