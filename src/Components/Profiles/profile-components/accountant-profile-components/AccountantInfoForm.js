import React from 'react';

export default function AccountantInfoForm({details, handleChange, handleSubmit }) {
    const { email, phoneNumber, zipCode, city, state, dateOfBirth, gender, country, address } = details;
	return (
		<form className="p-5" onSubmit={handleSubmit}>
			<div className="form-group">
				<label>Phone Number</label>
				<input
					name="phoneNumber"
					className="form-control"
					type="number"
					onChange={handleChange}
					placeholder="Phone Number"
					value={phoneNumber}
				/>
			</div>
			<div className="form-group">
				<label>Email</label>
				<input
					id="name"
					name="email"
					className="form-control"
					type="text"
					placeholder="Phone Number"
					value={email}
					max="11"
					disabled
				/>
			</div>
			<div className="form-group">
				<label>Date of Birth</label>
				<input
					name="dateOfBirth"
					className="form-control"
					type="date"
					onChange={handleChange}
					placeholder="date of birth"
					value={dateOfBirth}
				/>
			</div>
			<div className="form-group">
				<label>Gender</label>
				<select className="form-control" name="gender" onChange={handleChange}>
					<option value={gender} disabled >
						Select a day
					</option>
					<option value="male">M</option>
					<option value="female">F</option>
				</select>
			</div>
			<div className="form-group">
				<label>Address</label>
				<input
					name="address"
					className="form-control"
					type="text"
					onChange={handleChange}
					placeholder="address"
					value={address}
				/>
			</div>
			<div className="form-group">
				<label>Zip Code</label>
				<input
					name="zipCode"
					className="form-control"
					type="number"
					onChange={handleChange}
					placeholder="zipCode"
					value={zipCode}
				/>
			</div>
			<div className="form-group">
				<label>City</label>
				<input
					name="city"
					className="form-control"
					type="text"
					onChange={handleChange}
					placeholder="City"
					value={city}
				/>
			</div>
			<div className="form-group">
				<label>State</label>
				<input
					name="state"
					className="form-control"
					type="text"
					onChange={handleChange}
					placeholder="State"
					value={state}
				/>
			</div>
			<div className="form-group">
				<label>Country</label>
				<input
					name="country"
					className="form-control"
					type="text"
					onChange={handleChange}
					placeholder="Country"
					value={country}
				/>
			</div>
			<div className="col" />
			<div className="col text-right">
				<button className="btn btn-outline-danger mr-3" data-dismiss="modal">
					Close
				</button>
				<button type="submit" className="btn btn-primary">
					Save
				</button>
			</div>
		</form>
	);
}
