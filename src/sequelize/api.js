import "./sync.js";
import {router} from "../Aplication.js";
import { seqOperationsApi } from "./operations-api.js";

router.route("/sequelize/countries").get(async function getSeqCountries(_,response){
    const result= await seqOperationsApi.getCountries();
    response.status(200).json(result);
});

router.route("/sequelize/countries").post(async function createCountry({body},response){
   try {
    await seqOperationsApi.createCountry(body);
    response.status(200).json("Succes");
   } catch (err) {
       console.error(`Error calling API: ${err}`);
   }
});

router.route("/sequelize/countries/:CountryId").delete(async function deleteCountry({params:{CountryId},}, response){
    try {
        await seqOperationsApi.deleteCountry(+CountryId);
        response.status(200).json("Succes");
       } catch (err) {
           console.error(`Error calling API: ${err}`);
       }
});

router.route("/sequelize/countries/:CountryId").put(async function updateCountry({params:{CountryId},body}, response){
    try {
        await seqOperationsApi.updateCountry(+CountryId, body);
        response.status(200).json("Succes");
       } catch (err) {
           console.error(`Error updating data: ${err}`);
       }
});
