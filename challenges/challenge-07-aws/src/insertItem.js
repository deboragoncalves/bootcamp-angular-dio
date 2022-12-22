const {v4} = require("uuid");
const AWS = require("aws-sdk");

// função assíncrona
// evento vai ter as informações do request

const insertItem = async (event) => {
	const { item } = JSON.parse(event.body);
	// data de criação
	const createdAt = new Date().toISOString();
	// id aleatorio
	const id = v4();

	// db
	const dynamoDB = new AWS.DynamoDB.DocumentClient();

	// inserir dados
	const newItem = {
        id, 
        item,
        createdAt,
        itemStatus: false
    }

    // put recebe um objeto
    // tableName igual ao arquivo serverless, como string
    // chaves tableName e item são padrões do dynamoDB
    try {
        await dynamoDB.put({
            TableName: "ItemTable",
            Item: newItem
        }).promise()
    } catch (error) {
        console.log(error)
    }

    // retornar statusCode e item criado
    return {
        statusCode: 200,
        body: JSON.stringify(newItem)
    }
}

// exportar função
module.exports = {
	handler: insertItem
}
