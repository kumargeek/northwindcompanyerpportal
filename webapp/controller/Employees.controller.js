sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
], (Controller, Filter, FilterOperator, JSONModel) => {
    "use strict";

    return Controller.extend("northwinderpportal.controller.Employees", {
        onInit() {
            this._oModel = this.getOwnerComponent().getModel();
            this._loadEmployees();
        },

        _loadEmployees(aFilters) {
            aFilters = aFilters || [];

            this._oModel.read("/Employees", {
                filters: aFilters,
                success: (oData) => {
                    const oJSONModel = new JSONModel(oData.results);
                    this.getView().byId("EmployeeTable").setModel(oJSONModel, "employees");
                    // Also set model for filters dropdowns
                    this.getView().setModel(oJSONModel, "/Employees");
                },
                error: (err) => {
                    sap.m.MessageToast.show("Failed to fetch employees.");
                    console.error(err);
                }
            });
        },

        onFilterEmployees() {
            const employeeId = this.byId("employeeIdFilter").getSelectedKey();
            const firstName = this.byId("firstNameFilter").getSelectedKey();
            const lastName = this.byId("lastNameFilter").getSelectedKey();
            const title = this.byId("titleFilter").getSelectedKey();

            const aFilters = [];

            if (employeeId) {
                aFilters.push(new Filter("EmployeeID", FilterOperator.EQ, employeeId));
            }
            if (firstName) {
                aFilters.push(new Filter("FirstName", FilterOperator.EQ, firstName));
            }
            if (lastName) {
                aFilters.push(new Filter("LastName", FilterOperator.EQ, lastName));
            }
            if (title) {
                aFilters.push(new Filter("Title", FilterOperator.EQ, title));
            }

            this._loadEmployees(aFilters);
        }
    });
});
