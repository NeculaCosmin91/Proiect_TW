import { router } from "../Aplication.js";
import { databaseOperationAPI } from "./operations-api.js";

let connection;

if(!connection) 
databaseOperationAPI.connect().
then((con)=>{
    connection=con
    console.log("Connected to database!")
})
.catch((err)=>console.error(err));

router.route("/check-status").get(function sendResponse(_, response){
    response.status(200).json(`System time: ${new Date()}`)
});

router.route("/get-value-test").get(async function getValueTest(_, response){
    const value=await databaseOperationAPI.getValueTest(connection)
    response.status(200).json(value)
});

router.route("/countries").get(async function getCountry(_, response){
    const countries=await databaseOperationAPI.getCountry(connection)
    response.status(200).json(countries)
});

router.route("/countries/:countryId").get(async function getCountryById(request, response){
    const countryId=+request.params.countryId;
    const countries=await databaseOperationAPI.getCountryId(connection, countryId);
    response.status(200).json(countries)
});

router.route("/countries/:countryId").delete(async function deleteCountry(request, response){
    const countryId=+request.params.countryId;
    await databaseOperationAPI.deleteCountry(connection, countryId);
    response.status(200).json("Deleted")
});

router.route("/countries").post(async function addCountry(request, response){
    const {body:countryId}=request;
    try{
    await databaseOperationAPI.addCountry(connection, countryId);
    response.status(200).json("Created");
    }
    catch(err){
        console.error(err);
        response.status(500).json("Error");
    }
});