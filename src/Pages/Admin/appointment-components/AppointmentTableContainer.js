import React, { useState } from "react";
import { Table } from "../../../Components";
import { ReAssign } from "../../../Components/Modals/ReAssignModal";
import { fetchWrapper } from "../../../api/fetcher";
import { deleteAppointmentUrl } from "../../../api/URLs";
import { fetchConfig } from "../../../api/fetchConfig";
import {
  AcceptedAppointmentTableAction,
  CompletedAppointmentTableAction,
  PendingAppointmentTableAction,
} from "./AppointmentTableActions";
import { notification } from "../../../utils/notification";

export default function AppointmentTableContainer({
  appointments,
  category,
  mutate,
}) {
  let tableData = [];
  if (appointments) {
    tableData = appointments.map((appointment, index) => {
      return {
        "#": ++index,
        Title: appointment?.appointmentTitle,
        "Reason for appointment": appointment?.reasonForAppointment,
        Doctor: `${appointment.doctor?.lastName} ${appointment.doctor?.firstName}`,
        Patient: `${appointment.patient?.lastName} ${appointment.patient?.firstName}`,
        "Appointment Date": new Date(
          appointment?.appointmentDate
        ).toLocaleDateString(),
        "Appointment Time": new Date(
          appointment?.appointmentDate
        ).toLocaleTimeString(),
        Actions: (
          <AppointmentTableActionsContainer
            appointment={appointment}
            category={category}
            mutate={mutate}
          />
        ),
      };
    });
  }

  return (
    <div>
      <Table
        content={tableData}
        tableID={category + appointments.length}
        key={category + appointments.length}
      />
    </div>
  );
}

const AppointmentTableActionsContainer = ({
  appointment,
  category,
  mutate,
}) => {

  const deleteAppointment = async (id) => {
    try {
      const deleteAppointment = deleteAppointmentUrl();
      const deleteAppointmentConfig = fetchConfig({
        url: deleteAppointment,
        data: JSON.stringify({ appointmentId: id }),
        method: "post",
      });
      const res = await fetchWrapper(deleteAppointmentConfig);
      await mutate();
      notification.success({ message: res.data.message });
    } catch (error) {
      notification.error({ message:  error?.response?.data?.message });
    }
  };

  const categories = {
    accepted: (
      <AcceptedAppointmentTableAction
        appointment={appointment}
        deleteAppointment={deleteAppointment}
      />
    ),
    completed: <CompletedAppointmentTableAction appointment={appointment} />,
    pending: (
      <PendingAppointmentTableAction
        appointment={appointment}
        deleteAppointment={deleteAppointment}
      />
    ),
  };

  return (
    <div>
      {categories[category] || "No action"}
      {categories[category] !== "completed" && (
        <ReAssign
        idType={"appointmentId"}
          route={"ReassignAppointment"}
          reRun={mutate}
          id={appointment.id}
        />
      )}
    </div>
  );
};
