
const { searchHeroByname } =require('../controller/hero.js')
const {searchHero}=require('../controller/searchHeroById.js')
const { editHero }=require('../controller/editHeros.js')
const { saveHero }=require('../controller/saveHeroByDetail.js')
const  { unsaveHero }=require ('../controller/hero.js')
const  { getSavedHeroes }=require ('../controller/hero.js')
const resolvers ={
    Query:{
        searchHerobyName:async(_root,{name})=>{
            const heroes = await searchHeroByname(name)
            return heroes
        },
        searchHerobyId:async(_root,{id})=>{
            const heroes = await searchHero(id)
            return heroes
        },
        // getSaveHeros:async()=>{
        //   const heros= await getSavedHeroes()
        //   return heros
        // }
    },
    Mutation:{
        editHero:async(_root,{input:{id,name, powerstats,image}})=>{
            const eidthero = await editHero(id,name, powerstats,image)
            return eidthero
        },
        saveHero:async(_root,{input:{id,name,powerstats,image}})=>{
            const savehero = await saveHero(id,name,powerstats,image)
            return savehero
        },
        // deledteHerofromSave:async(_root,{id})=>unsaveHero(id),
    }
}
module.exports ={
    resolvers
}