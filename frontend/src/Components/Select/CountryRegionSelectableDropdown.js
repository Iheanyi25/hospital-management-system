import React, { Component } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

class CountryRegionDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { country: "", region: "" };
  }

  componentDidMount() {
    this.setState({ country: this.props.country, region: this.props.state });
    console.log(99999, this.props);
  }

  selectCountry(val) {
    this.setState({ country: val });
    console.log("country", val);
    this.props.setLocation("country", val);
  }

  selectRegion(val) {
    console.log("region", val);
    this.setState({ region: val });
    this.props.setLocation("state", val);
  }

  render() {
    const { country, region } = this.state;
    return (
      <div className="row">
        <div className="col-12 col-sm-6">
          <div className="">
            <div className="form-group">
              <label>Country</label>
              <CountryDropdown
                classes="form-control w-100"
                value={country}
                onChange={(val) => this.selectCountry(val)}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6">
          <div className="form-group">
            <label>State of Origin</label>
            <RegionDropdown
              blankOptionLabel="State"
              defaultOptionLabel="State"
              classes="form-control"
              country={country}
              value={region}
              onChange={(val) => this.selectRegion(val)}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default CountryRegionDropdown;
