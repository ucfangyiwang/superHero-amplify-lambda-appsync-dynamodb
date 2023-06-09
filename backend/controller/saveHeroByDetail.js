const {DynamoDBClient, PutCommand, QueryCommand, UpdateCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const region = "ap-southeast-1";
const client = new DynamoDBClient({ region });

exports.saveHero = async(event)=>{
    let id = event.id
    const search={
        TableName:"Superhero",
        KeyConditionExpression:'#heroId=:heroId',
        ExpressionAttributeNames:{
            '#heroId':'heroId',
        },
        ExpressionAttributeValues:marshall({
            ':heroId':id,
        })
    };
    const create = {
        TableName: "Superhero",
        Item: marshall({
            heroId: event.heroId,
            heroName: event.heroName,
            intelligence: event.intelligence,
            strength: event.strength,
            speed: event.speed,
            durability: event.durability,
            power: event.power,
            combat: event.combat,
            imageUrl: event.imageUrl,
            isSave:true,
        })
    };
    const update={
        TableName:"Superhero",
        Key:marshall({
            "heroId":id
        }),
        UpdateExpression:'SET #isSave=:isSave ',

        ExpressionAttributeValues:marshall ({
            isSave:true
        })
    }
    try{
        const data = await client.send(new QueryCommand(search));
        const items = data.Items.map(item=>unmarshall(item));
        if(items.length===0){
        await client.send(new PutCommand(create))
        return {
            message: 'Hero create successfully'
        };
        }
        else{
        const data = await client.send(new UpdateCommand(update));
        return { message: 'Hero updated successfully' };
        }

    }catch(error){
      console.error(error);
      throw new Error(error);
    }


}
