import {Sequelize} from "sequelize";
import { seqConfigProperties } from "../config.js";
import {seqOperationsApi} from "../sequelize/operations-api.js";

let seqConnection=new Sequelize("proiect", "root", "Cosmin0808", seqConfigProperties);

export const Countries=seqConnection.define("Countries",{
    CountryId:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    CountryName:{
        type:Sequelize.STRING,
    },
    CityDestination:{
        type:Sequelize.STRING,
    },
    Message:{
        type:Sequelize.STRING,
    },
});

export const Transportation=seqConnection.define("Transportations",{
    TransportationId:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    TypeOfTransportation:{
        type:Sequelize.STRING,
    },
    Price:{
        type:Sequelize.DECIMAL(18, 2),
    },
   
});

Countries.hasMany(Transportation,{
    foreignKey: "CountryId",
    onDelete: "CASCADE", 
    foreignKeyConstraint:true,
})

seqOperationsApi.init(seqConnection);

export {seqConnection};