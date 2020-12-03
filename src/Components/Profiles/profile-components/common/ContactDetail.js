import React from 'react'
import edit from '../../../../assets/img/edit.svg';
import ContactDetailList from '../common/ContactDetailList';
import EditInfo from './EditInfo';

export default function ContactDetail(props) {
    console.log(props)
    return (
		<div className="col col-md-12">
			<div className="card border-light p-4">
				<div className="card-body">
					<div className="d-flex justify-content-between border-bottom pb-2">
						<div className="d-flex">
							<h6 className="card-title mt-0 font-weight-bold">Contact Information </h6>
						</div>
						{props.otherDetails&& (
							<img
								src={edit}
								data-toggle="modal"
								data-target="#edit-info"
								alt="reset"
								className="mb-2"
								style={{ cursor: 'pointer' }}
							/>
						)}
					</div>
					<ContactDetailList {...props}  />
					<EditInfo {...props}/>
				</div>
			</div>
		</div>
	);
}

