import mariadb from "mariadb";
import { databaseConfig } from "../config.js";

const instance= mariadb.createPool(databaseConfig);

async function connectDatabase()
{
    try{
        let connection=await instance.getConnection();
        return connection;
    }
    catch(err){
        throw err;
    }
}

async function getValueTest(dbConnection){
    try{
        let [result]=await dbConnection.query("Select 1 as val");
        return result;
    }
    catch(err){
        console.error(err);
    }
   
}
async function getCountry(dbConnection){
    try{
        let countries=await dbConnection.query("Select * from Country");
        return countries;
    }
    catch(err){
        console.error(err);
    }
}
async function getCountryId(dbConnection, countryId){
    try{
        let countri=await dbConnection.query("Select * from Country WHERE CountryId=?", [countryId]);
        return countri;
    }
    catch(err){
        console.error(err);
    }
}
async function deleteCountry(dbConnection, countryId){
    try{
       await dbConnection.query("DELETE  FROM Country WHERE CountryId=?", [countryId]);
   
    }
    catch(err){
        console.error(err);
    }
}

async function addCountry(dbConnection, countryId){
    try{
        const {countriId, countryName, cityDestination, message} =countryId;
        await dbConnection.query("Insert INTO country (CountryId, CountryName, CityDestination, Message) values (?,?,?,?)",
            [countriId, countryName, cityDestination, message], function handleError(err){
            throw err;});
    }catch(err){
    throw err;}
}

export const databaseOperationAPI={
    connect : connectDatabase,
    getValueTest: getValueTest,
    getCountry: getCountry,
    getCountryId:getCountryId,
    deleteCountry:deleteCountry,
    addCountry: addCountry,
    
};

