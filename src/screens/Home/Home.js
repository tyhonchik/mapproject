import React, { Component } from 'react';
import Map from "../../components/Map";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <Map />
        {
          // TODO: add Formik || Final-Form
        }
      </div>
    );
  }
}

export default Home;
