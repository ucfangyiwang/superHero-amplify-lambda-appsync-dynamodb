const {DynamoDBClient, PutCommand, QueryCommand, UpdateCommad }= require("@aws-sdk/client-dynamodb");
const {marshell ,unmarshell} = require("@aws-sdk/util-dynamodb");

const region = "ap-southeast-1";
const client = new DynamoDBClient({region});

exports.unSaveHero = async(event)=>{
    const {queryName} = event.queryTpye
    if(queryName==="searchSuperHero"){
        return [Hero]
    }
    let id = event.id
    const update={
        TableName:"Superhero",
        Key:marshell({
            "heroId":id
        }),
        UpdateExpression:"SET #isSave =:isSave",

        ExpressionAttributeValues:marshell({
            ":isSave":true
        })

    }
    try{
        const data = await client.send(new UpdateCommand(update))
        return { message: 'save updated successfully'}
    }catch(error){
        console.error(error);
        throw new Error(error)
    }

};