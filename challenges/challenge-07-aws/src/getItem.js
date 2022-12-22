// importar sdk AWS
const AWS = require("aws-sdk");

// função assíncrona
// evento vai ter as informações do request

// pegar um item passando o id como queryParams
const getItem = async (event) => {
    // db
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    // pegar id
    const { id } = event.pathParameters;

    let item;

    try {
        // get passando a tabela e o id (chave)
        const results = await dynamoDB.get({
            TableName: "ItemTable",
            Key: { id }
        }).promise()

        item = results.Item;
    } catch (error) {
        console.log(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(item)
    }

}

// exportar função
module.exports = {
    handler: getItem
}
