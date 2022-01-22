import axios from "axios";
import React from 'react'



export default class AddCountries extends React.Component {
  state = {
    country:[],
  }

  handleChange = event => {
    this.setState({[event.target.name]:event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();

    const country = {
      CountryName: this.state.CountryName,
      CityDestination: this.state.CityDestination,
      Message: this.state.Message,
    };

    axios.post(`http://localhost:8070/api/sequelize/addcountries`, this.state)
      .then(res => {
        console.log(this.state);
        console.log(res);
        console.log(res.data);
        console.log("ok");
        console.log(country);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Country Name:
            <input type="text" name="CountryName" onChange={this.handleChange} />
          </label>
          <label>
            City Name:
            <input type="text" name="CityDestination" onChange={this.handleChange} />
          </label>
          <label>
            Message :
            <input type="text" name="Message" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}