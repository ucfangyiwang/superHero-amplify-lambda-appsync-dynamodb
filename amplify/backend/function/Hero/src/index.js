/* Amplify Params - DO NOT EDIT
	API_SUPERHERO_GRAPHQLAPIIDOUTPUT
	API_SUPERHERO_HEROTABLE_ARN
	API_SUPERHERO_HEROTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const { DynamoDBClient, QueryCommand,ScanCommand ,PutItemCommand,UpdateItemCommand} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");


const axios=require("axios");

const region = "ap-southeast-2";

const client = new DynamoDBClient({region});


exports.handler = async (event)=>{
    console.log(event)
    let result;
    switch(event.fieldName) {
    case "searchHerobyName":
       result = await searchHerobyName(event.arguments);
        break;
    case "searchHerobyId":
       result = await searchHerobyId(event.arguments);
        break;
    case "getSaveHeros":
       result = await getSaveHeros(event.arguments);
        break;
    case "editHero":
       result = await editHero(event.arguments);
        break;
    case "saveHero":
      result = await saveHero(event.arguments);
        break;
    case "deleteHerofromSave":
       result = await deleteHerofromSave(event.arguments);
        break;
    default:
    return("Unhandled event.fieldName");
    }
    return result;
}

const searchHerobyId= async(event)=>{
    console.log(event)
    let id = event.id
    console.log(id)
    const params={
        TableName:process.env.API_SUPERHERO_HEROTABLE_NAME,
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
            const website =`https://superheroapi.com/api/1252528515635309/${id}`
            const response = await axios.get(website);
            console.log(response)
            if (!response.data.response || response.data.response === "error") {
                throw new Error("No heroes found");
            }
            return{
              id:  response.data.id,
              name: response.data.name,
              intelligence: response.data.powerstats.intelligence,
              strength: response.data.powerstats.strength,
              speed: response.data.powerstats.speed,
              durability: response.data.powerstats.durability,
              power: response.data.powerstats.power,
              combat: response.data.powerstats.combat,
              image: response.data.image.url,
            };
        }
        const data1={ id:items[0].id,
            name:items[0].name,
            intelligence:items[0].intelligence,
            strength: items[0].strength,
            speed: items[0].speed,
            durability: items[0].durability,
            power: items[0].power,
            combat: items[0].combat,
            image: items[0].image}
            console.log("94"+JSON.stringify(data1))
        return data1
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching hero with ID '+error.message);
    }
};

const searchHerobyName= async(event)=>{
    const website =`https://superheroapi.com/api/1252528515635309/search/${event.name}`
    
    try {
        
        const response = await axios.get(website);
        if (!response.data.results) {
            throw new Error("No heroes found");
        }
        return response.data.results.map(result => ({
          id: result.id,
          name: result.name,
        }));
      } catch (error) {
        throw new Error(`Failed to fetch heroes: ${error.message}`);
      }
};

const editHero = async(event) => {
    console.log(event)
    let id = event.id;
    
    const create = {
        TableName: process.env.API_SUPERHERO_HEROTABLE_NAME,
        Item: marshall({
            id: event.id,
            name: event.name,
            intelligence: event.intelligence,
            strength: event.strength,
            speed: event.speed,
            durability: event.durability,
            power: event.power,
            combat: event.combat,
            image: event.image,
            isSave:false,
        },{removeUndefinedValues: true})
    };
    const update = {
        TableName: process.env.API_SUPERHERO_HEROTABLE_NAME,
        Key: marshall({
            "id": id
        }),
        UpdateExpression: 'SET #intelligence = :intelligence, #strength = :strength, #speed = :speed, #durability = :durability, #power = :power, #combat = :combat',
        ExpressionAttributeNames: {
        '#intelligence': 'intelligence',
        '#strength': 'strength',
        '#speed': 'speed',
        '#durability': 'durability',
        '#power': 'power',
        '#combat': 'combat',
        },
        ExpressionAttributeValues: marshall({
            ':intelligence': event.intelligence,
            ':strength': event.strength,
            ':speed': event.speed,
            ':durability': event.durability,
            ':power': event.power,
            ':combat': event.combat,
        },{removeUndefinedValues: true}),
    };
    const search = {
        TableName: process.env.API_SUPERHERO_HEROTABLE_NAME,
        KeyConditionExpression: '#heroId=:id',
        ExpressionAttributeNames: {
            '#heroId': 'id',
        },
        ExpressionAttributeValues: marshall({
            ':id': id,
        }),
    };

    try {
         console.log("155")
        const data = await client.send(new QueryCommand(search));
        console.log("157"+JSON.stringify(search))
        const items = data.Items.map(item => unmarshall(item));
        console.log("159"+" "+items)
        if (items.length === 0) {
            console.log("162"+" "+create)
            await client.send(new PutItemCommand(create));
            return {
                message: 'Hero created successfully'
            };
        } else {
             console.log("168"+JSON.stringify(update))
            await client.send(new UpdateItemCommand(update));
            return {
                message: 'Hero updated successfully'
            };
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error editing hero: ' + error.message);
    }
}

const getSaveHeros=async(event)=>{
    const search ={
        TableName:process.env.API_SUPERHERO_HEROTABLE_NAME,
        FilterExpression:"#isSave=:isSave",
        ExpressionAttributeNames:{
            "#isSave":"isSave"
        },
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
                id: hero.id,
                name: hero.name,
                intelligence: hero.intelligence,
                strength: hero.strength,
                speed: hero.speed,
                durability: hero.durability,
                power: hero.power,
                combat: hero.combat,
                image: hero.image
                }
              });
              return mappedHeroes;
        }
    }catch(error){
      console.error(error);
      throw new Error(error);
    }
}

const saveHero = async(event)=>{
    let id = event.id
    const search={
        TableName:process.env.API_SUPERHERO_HEROTABLE_NAME,
        KeyConditionExpression:'#heroId=:id',
        ExpressionAttributeNames:{
            '#heroId':'id',
        },
        ExpressionAttributeValues:marshall({
            ':id':id,
        })
    };
    const create = {
        TableName: process.env.API_SUPERHERO_HEROTABLE_NAME,
        Item: marshall({
            id: event.id,
            name: event.name,
            intelligence: event.intelligence,
            strength: event.strength,
            speed: event.speed,
            durability: event.durability,
            power: event.power,
            combat: event.combat,
            image: event.image,
            isSave:true,
        },{removeUndefinedValues: true})
    };
    const update={
        TableName:process.env.API_SUPERHERO_HEROTABLE_NAME,
        Key:marshall({
            "id":id
        }),
        UpdateExpression:'SET #isSave=:isSave ',
        ExpressionAttributeNames:{
            "#isSave":"isSave"
        },
        ExpressionAttributeValues:marshall ({
            ":isSave":true
        })
    }
    try{
        const data = await client.send(new QueryCommand(search));
        const items = data.Items.map(item=>unmarshall(item));
        if(items.length===0){
        await client.send(new PutItemCommand(create))
        return {
            message: 'Hero create successfully'
        };
        }
        else{
        const data = await client.send(new UpdateItemCommand(update));
        return { message: 'Hero updated successfully' };
        }

    }catch(error){
      console.error(error);
      throw new Error(error);
    }


}

const deleteHerofromSave = async(event)=>{
    let id = event.id
    const update={
        TableName:process.env.API_SUPERHERO_HEROTABLE_NAME,
        Key:marshall({
            "id":id
        }),
        UpdateExpression:"SET #isSave =:isSave",
        ExpressionAttributeNames:{
            "#isSave":"isSave"
        },
        ExpressionAttributeValues:marshall({
            ":isSave":false
        })

    }
    try{
        const data = await client.send(new UpdateItemCommand(update))
        return { message: 'save updated successfully'}
    }catch(error){
        console.error(error);
        throw new Error(error)
    }

};