import "./sync.js";
import {router} from "../Aplication.js";
import { seqOperationsApi } from "./operations-api.js";
import { Transportation } from "./sync.js";

router.route("/sequelize/countries").get(async function getSeqCountries(_,response){
    const result= await seqOperationsApi.getCountries();
    response.status(200).json(result);
});

router.route("/sequelize/transportations").get(async function getSeqTransportation(_,response){
    const result= await seqOperationsApi.getTransportations();
    response.status(200).json(result);
});

router.route("/sequelize/countries")
.post(async function createCountry({body},response){
   try {
    seqOperationsApi.validateBody(body, response, async function handleSuccesfulValidation(){
        if(Object.keys(body).length<3){
            response.status(500).json("Incorect! Please insert at least 3 characters");
        }
        else{
            await seqOperationsApi.createCountry(body);
            response.status(200).json("The country was created!")
        }
    });
    }catch (err) {
       console.error(`Error calling API: ${err}`);
   }
});

router.route("/sequelize/transportations")
.post(async function createTransportation({body},response){
   try {
    seqOperationsApi.validateBody(body, response, async function handleSuccesfulValidation(){
        if(Object.keys(body).length<3){
            response.status(500).json("Incorect! Please insert at least 3 characters");
        }
        else{
            await seqOperationsApi.createTransportation(body);
            response.status(200).json("Way of transportation created")
        }
    });
    }catch (err) {
       console.error(`Error calling API: ${err}`);
   }
});

router.route("/sequelize/countries/:CountryId")
.delete(async function deleteCountry({params:{CountryId},}, response){
    try {
        await seqOperationsApi.deleteCountry(+CountryId);
        response.status(200).json("Succes");
       } catch (err) {
           console.error(`Error calling API: ${err}`);
       }
});

router.route("/sequelize/transportations/:TransportationId")
.delete(async function deleteTransportation({params:{TransportationId},}, response){
    try {
        await seqOperationsApi.deleteTransportation(+TransportationId);
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
router.route("/sequelize/transportations/:TransportationId").put(async function updateTransportaion({params:{TransportationId},body}, response){
    try {
        await seqOperationsApi.updateTransportaion(+TransportationId, body);
        response.status(200).json("Succes");
       } catch (err) {
           console.error(`Error updating data: ${err}`);
       }
});
