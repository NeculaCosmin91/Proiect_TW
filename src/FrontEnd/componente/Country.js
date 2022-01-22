import React, {Component} from 'react'
import { Fragment, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Button } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete";



function Country() {
    const country = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [countrydt, setCountry] = useState({
        data: '',
        loading: false,
        loaded: false,
    });
    const [id, setId] = useState('');
    const [name, setName] = useState('');

    async function fetchCountry() {
        setCountry(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {
            const response = await fetch(`http://localhost:8070/api/sequelize/countries/${country.CountryId}`);

            const data = await response.json();

            setCountry({ data: data, loading: false, loaded: true });
            console.log(data);

        } catch (err) {
            setCountry(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });

            console.error(err);
        }
    }


    async function deleteCountry() {
        await fetch(`http://localhost:8070/api/sequelize/countries/${country.CountryId}`, {

            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            response.json().then((res) => alert(res)).then(_ => {
                navigate("/countries");
            })
        })
    }

    return (<Fragment>
        <h3 src={location?.state} alt={""}>
        </h3>
        {countrydt.loading && <CircularProgress />}
        {countrydt.loaded &&
            <div>
                <h4>
                    {`Country Id: ${countrydt.data.CountryId}`}

                </h4>
                <h4>
                    {`Country Name:        `}
                    <input type="text" defaultValue={countrydt.data.Name}
                        onChange={(ev) => setName(ev.target.value)}></input>
                </h4>

            </div>
        }
    </Fragment >
    );
}

export default Country;
