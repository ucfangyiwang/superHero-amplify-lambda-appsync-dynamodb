const { DynamoDBClient, ScanCommand } =require("@aws-sdk/client-dynamodb");

const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");


const region = "ap-southeast-1"
const client = new DynamoDBClient({region})

exports.getAllSavedHero=async(event)=>{
    const search ={
        TableName:"Heroes",
        FilterExpression:"#isSave=:isSave",
        ExpressionAttributeValues:marshall({
            ':isSave':true,
        })  
    }
    try{
        const data = await client.send(new ScanCommand(search));
        const items = data.Items.map(item=>unmarshall(item));
        if (items.length===0){
            return{ message:" not found any hero"}
        }
        else{
            const mappedHeroes = items.map((hero) => {
                return {
                  id: hero.heroId,
                  name: hero.heroName,
                  powerstats: {
                    intelligence: hero.intelligence,
                    strength: hero.strength,
                    speed: hero.speed,
                    durability: hero.durability,
                    power: hero.power,
                    combat: hero.combat,
                  },
                  image: {
                    url: hero.imageUrl,
                  },
                };
              });
              return mappedHeroes;
        }
    }catch(error){
      console.error(error);
      throw new Error(error);
    }
}