import {Countries, Transportation} from "./sync.js";

async function seqAuth(seqConnection){
    try {
        await seqConnection.authenticate();
        console.log("Sequelize connection is a succes")
    } catch (err) {
        console.error(`Error on connection using sequelize: ${err}`)
    }
}

async function seqSync(seqConnection){
    try {
        await seqConnection.sync({
            force:true, alter: true
        });
        console.log("Sync OK!")
    } catch (err) {
        console.error(`Error during sequelize sync: ${err}`)
    }
}

async function executeDBInit(){
try{
    await Countries.create({
        CoutryId: "Country from code",
        CountryName: "Romania",
        CityDestination: "Bucuresti",
        Message: "Good trip",
    });
    await Countries.create({
        CoutryId: "Country from code 2",
        CountryName: "Bulgaria",
        CityDestination: "Sofia",
        Message: "Good trip",
    });
    await Transportation.create({
        TransportationId: 1,
        TypeOfTransportation: "Airplane",
        Price: 290,
        CountryId: 2,
    });
}
catch(err){
    console.log(`Error on populating the database`)
}
}


async function seqInit(seqConnection){
    await seqAuth(seqConnection);
    await seqSync(seqConnection);
    await executeDBInit();
}

async function getCountries(){
    try {
        return await Countries.findAll();
    } catch (err) {
        console.log(err);
    }
}
async function getTransportations(){
    try {
        return await Transportation.findAll();
    } catch (err) {
        console.log(err);
    }
}
//
async function createCountry(country){
    try {
      await Countries.create({
          CountryId: country.CountryId,
          CountryName: country.CountryName,
          CityDestination: country.CityDestination,
          Message: country.Message,
      }) ; 
    } catch (err) {
            throw err;
    }
}
async function createTransportation(transportations){
    try {
      await Transportation.create({
          TransportationId: transportations.TransportationId,
          TypeOfTransportation: transportations.TypeOfTransportation,
          Price: transportations.Price,
          CountryId:transportations.CoutryId
      }) ; 
    } catch (err) {
            throw err;
    }
}
function validateBody(sentBody, response, 
    callbackFN=function(){}){
        if(Object.keys(sentBody).length<3) 
        return callbackFN();
        else response.status(500).json("Incorect body! At least 3 characters")
    }

async function deleteCountry(CountryId){
    try {
        const record=await Countries.findByPk(CountryId);
        if(record) await record.destroy();
    } catch (err) {
        throw err;
    }
}
async function deleteTransportation(TransportationId){
    try {
        const record=await Transportation.findByPk(TransportationId);
        if(record) await record.destroy();
    } catch (err) {
        throw err;
    }
}

async function updateCountry(CountryId, country){
    try {
        const record=await Countries.findByPk(CountryId);
        if(record){
            await record.update(
                {
                    CountryName: country.CountryName,
                    CityDestination: country.CityDestination,
                    Message: country.Message,
                }
            );
        }
    } catch (err) {
        throw err;
    }
}
async function updateTransportaion(TransportationId, transportations){
    try {
        const record=await Transportation.findByPk(TransportationId);
        if(record){
            await record.update(
                {
                    TransportationId: transportations.TransportationId,
                    TypeOfTransportation: transportations.TypeOfTransportation,
                     Price: transportations.Price,
                }
            );
        }
    } catch (err) {
        throw err;
    }
}


export const seqOperationsApi={
    init:seqInit,
    getCountries: getCountries,
    createCountry: createCountry,
    deleteCountry: deleteCountry,
    updateCountry: updateCountry,
    validateBody:validateBody,
    getTransportations:getTransportations,
    createTransportation:createTransportation,
    deleteTransportation:deleteTransportation,
    updateTransportaion: updateTransportaion,
};