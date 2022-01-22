import React from 'react'
import { Fragment, useEffect, useState } from "react";
import { Link,   useNavigate } from "react-router-dom"//
import { Button, CircularProgress } from "@material-ui/core"//


function Countries() {
    const navigate = useNavigate();


    const [countryD, setCountry] = useState({
        data: {},
        loading: false,
        loaded: false,
    });
    
    

    async function getCountry() {
        setCountry(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {
            const response = await fetch("http://localhost:8070/api/sequelize/countries");
            const data = await response.json();
            setCountry({ data: data, loading: false, loaded: true });
        } catch (err) {
            setCountry(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });

            console.error(err);
        }

    }

   
    useEffect(function insideEffect() {
        if (!countryD.loaded) {
            getCountry();
        }
    }, [countryD.loaded]);
    return (
        <Fragment>

            <div  style={{
        position: 'absolute', left: '50%', top: '24%',
        transform: 'translate(-50%, -50%)'
    }}
            >List of countries that have been added!</div>
            <div className="lists">
              
                {countryD.loading && <CircularProgress />}
                {countryD.loaded && countryD.data.map(function
                    rCandidates(cand) {
                    return (

                        <h4 key={cand.CountryId}>
                            Id:{cand.CountryId}, 
                         Country: {cand.CountryName}, 
                         City: {cand.CityDestination},     
                        Message:  {cand.Message}
                            <Link to={`/countries/${cand.CountryId}`}
                                state={{
                                    CountryId: cand.CountryId,
                                    CountryName: cand.CountryName,
                                    CityDestination: cand.CityDestination,
                                    Message: cand.Message,
                                }}

                                > </Link>
                            
                        </h4>

                    );
                })}

            </div>

            <Button

                style={{ color: "black", background: "green" }}
                color="secondary"
                onClick={function onClick() {
                    navigate("/addcountries");
                }} >
                Add Countries
            </Button>

            
        </Fragment >
    );
}

export default Countries;
