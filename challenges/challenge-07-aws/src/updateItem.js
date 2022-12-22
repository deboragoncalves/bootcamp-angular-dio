
// importar sdk AWS
const AWS = require("aws-sdk");

// função assíncrona
// evento vai ter as informações do request

const updateItem = async (event) => {
    // db
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    // pegar id
    const { id } = event.pathParameters;
    // pegar body
    const { itemStatus } = JSON.parse(event.body);

    try {
        // UpdateExpression: SQL para fazer update
        // ReturnValue: retorna itens atualizados
        const results = await dynamoDB.update({
            TableName: "ItemTable",
            Key: {id},
            UpdateExpression: 'set itemStatus = :itemStatus',
            ExpressionAttributeValues: {
              ':itemStatus': itemStatus
            },
            ReturnValues: "ALL_NEW"
        }).promise()

    } catch (error) {
        console.log(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Item updated"
        })
    }

}

// exportar função
module.exports = {
    handler: updateItem
}
