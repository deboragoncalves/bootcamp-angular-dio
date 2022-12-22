// importar sdk AWS
const AWS = require("aws-sdk");

// função assíncrona
// evento vai ter as informações do request

const getItems = async (event) => {
    // db
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    let items;

    try {
        // scan pra fazer a leitura de toda a tabela
        const results = await dynamoDB.scan({
            TableName: "ItemTable"
        }).promise()

        items = results.Items;
    } catch (error) {
        console.log(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(items)
    }

}

// exportar função
module.exports = {
    handler: getItems
}
