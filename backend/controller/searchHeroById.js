const { DynamoDBClient, PutCommand, QueryCommand, UpdateCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const region = "ap-southeast-1";
const Token = 1252528515635309

const client = new DynamoDBClient({region});


exports.searchHero = async(event)=>{
    let id = event.id
    const params={
        TableName:"Superhero",
        KeyConditionExpression:'#heroId=:id',
        ExpressionAttributeNames:{
            '#heroId':'id',
        },
        ExpressionAttributeValues:marshall({
            ':id':id,
        })
    }
    try {
        const data = await client.send(new QueryCommand(params))
        const items = data.Items.map(item=>unmarshall(item));

        if (items.length=== 0) {
            const website =`https://superheroapi.com/api/${Token}/${id}`
            const response = await axios.get(website);
            if (!response.data.response || response.data.response === "error") {
                throw new Error("No heroes found");
            }
            return {
              id: response.data.id,
              name: response.data.name,
              powerstats: response.data.powerstats,
              image: response.data.image,
            };
        }
        return {
            id:items.heroId,
            name:items.heroName,
            powerstats:{
                    intelligence: items.intelligence,
                    strength: items.strength,
                    speed: items.speed,
                    durability: items.durability,
                    power: items.power,
                    combat: items.combat
            },
            image: {
                    url: items.imageUrl
            }
            }
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching hero with ID ');
    }
}