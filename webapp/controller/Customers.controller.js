sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/json/JSONModel"
], (Controller, Filter, FilterOperator, JSONModel) => {
  "use strict";

  return Controller.extend("northwinderpportal.controller.Customers", {
    onInit() {
      this._oModel = this.getOwnerComponent().getModel();
      this._loadCustomers(); // Load all customers on init
    },

    _loadCustomers(aFilters) {
      aFilters = aFilters || [];

      this._oModel.read("/Customers", {
        filters: aFilters,
        success: (oData) => {
          const oJSONModel = new JSONModel(oData.results);
          this.getView().byId("CustomerTable").setModel(oJSONModel, "customers");
          // Also set model for filters dropdowns
          this.getView().setModel(oJSONModel, "/Customers");
        },
        error: (err) => {
          sap.m.MessageToast.show("Failed to fetch customers.");
          console.error(err);
        }
      });
    },

    onFilterCustomers() {
      const customerName = this.byId("customerNameFilter").getSelectedKey();
      const customerId = this.byId("customerIdFilter").getSelectedKey();
      const city = this.byId("cityFilter").getSelectedKey();

      const aFilters = [];

      if (customerName) {
        aFilters.push(new Filter("CompanyName", FilterOperator.EQ, customerName));
      }
      if (customerId) {
        aFilters.push(new Filter("CustomerID", FilterOperator.EQ, customerId));
      }
      if (city) {
        aFilters.push(new Filter("City", FilterOperator.EQ, city));
      }

      this._loadCustomers(aFilters);
    }
  });
});
