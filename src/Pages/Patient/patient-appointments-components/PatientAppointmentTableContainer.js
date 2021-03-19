{/* <table
ref={(en) => (this.en = en)}
className="table table-striped"
data-paging="true"
data-info="true"
>
<thead>
  <tr>
    <th></th>
    <th>Title</th>
    <th>Reason for Appointment</th>
    <th>Doctor's Name</th>
    <th>Doctor's Phone Number</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  {pendingAppointments &&
    pendingAppointments.map((appointment) => (
      <tr>
        <td>
          <img
            src={DoctorImage}
            alt="hello"
            width={40}
            height={40}
            className="rounded-500"
          />
        </td>
        <td>{appointment.appointmentTitle}</td>
        <td>{appointment.reasonForAppointment}</td>
        <td>
          {appointment.doctor?.firstName ??
            "None specified yet" +
              " " +
              appointment.doctor?.lastName}
        </td>
        <td>
          {appointment.doctor?.phoneNumber ??
            "None Specified Yet"}
        </td>

        <td>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary btn-sm btn-block dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Action
            </button>
            <div className="dropdown-menu text-left">
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) =>
                  this.cancelAppointments(
                    appointment.id
                  )
                }
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        </td>
      </tr>
    ))}
</tbody>
</table>
</div>
</div>
<div
className="tab-pane fade"
id="pills-completed"
role="tabpanel"
aria-labelledby="pills-accepted-tab"
>
<div className="table-responsive">
<table
ref={(el) => (this.el = el)}
className="table table-striped"
data-paging="true"
data-info="true"
>
<thead>
  <tr>
    <th></th>
    <th>Title</th>
    <th>Reason for Appointment</th>
    <th>Doctor's Name</th>
    <th>Doctor's Phone Number</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  {completedAppointments &&
    completedAppointments.map((appointment) => (
      <tr>
        <td>
          <img
            src={DoctorImage}
            alt="hello"
            width={40}
            height={40}
            className="rounded-500"
          />
        </td>
        <td>{appointment.appointmentTitle}</td>
        <td>{appointment.reasonForAppointment}</td>
        <td>
          {appointment.doctor?.firstName ??
            "None specified yet" +
              " " +
              appointment.doctor?.lastName}
        </td>
        <td>
          {appointment.doctor?.phoneNumber ??
            "None Specified Yet"}
        </td>

        <td>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary btn-sm btn-block dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Action
            </button>
            <div className="dropdown-menu text-left">
              <Link
                type="button"
                className="btn btn-primary"
                to="/PatientClarkingHistory"
              >
                View Clerking History
              </Link>
            </div>
          </div>
        </td>
      </tr>
    ))}
</tbody>
</table> */}