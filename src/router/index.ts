import express from "express";
import PatientRoutes from "./patient.routes";
export default (app: express.Router) => {
  PatientRoutes(app);
};
