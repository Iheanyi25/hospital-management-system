import  React , {Component} from "react";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

class CountryRegionDropdown extends Component {
  constructor (props) {
    super(props);
    this.state = { country: '', region: '' };
  }

  selectCountry (val) {
    this.setState({ country: val });

  }

  selectRegion (val) {
    this.setState({ region: val });
  }

  render () {
    const { country, State  } = this.state;
    return (
      <div className="row">
        <div className="col-12 col-sm-6">
          <div className="">
          <div className="form-group">
           <label>Country</label>
          <CountryDropdown
            classes="form-control w-100"
            value={country}
            onChange={(val) => this.selectCountry(val)} />
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
            value={State}
            onChange={(val) => this.selectRegion(val)} />
        </div>
        </div>
      </div>
    );
  }
}
export default CountryRegionDropdown;