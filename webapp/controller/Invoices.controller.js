sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (Controller, Filter, FilterOperator, JSONModel, MessageToast) => {
    "use strict";

    return Controller.extend("northwinderpportal.controller.Invoices", {
        onInit() {
            this.oModel = this.getOwnerComponent().getModel();
            this._loadInvoices();
        },

        _loadInvoices(aFilters = []) {
            this.oModel.read("/Invoices", {
                filters: aFilters,
                success: (oData) => {
                    const oJsonModel = new JSONModel(oData.results);
                    this.getView().byId("invoiceTable").setModel(oJsonModel, "invoices");
                    // Also set model on view for ComboBox bindings
                    this.getView().setModel(oJsonModel, "invoices");
                },
                error: () => {
                    MessageToast.show("Failed to load invoices.");
                }
            });
        },

        onFilterInvoices() {
            const aFilters = [];
            const oView = this.getView();

            const shipName = oView.byId("shipNameFilter").getSelectedKey();
            if (shipName) {
                aFilters.push(new Filter("ShipName", FilterOperator.EQ, shipName));
            }

            const shipAddress = oView.byId("shipAddressFilter").getSelectedKey();
            if (shipAddress) {
                aFilters.push(new Filter("ShipAddress", FilterOperator.EQ, shipAddress));
            }

            const shipCountry = oView.byId("shipCountryFilter").getSelectedKey();
            if (shipCountry) {
                aFilters.push(new Filter("ShipCountry", FilterOperator.EQ, shipCountry));
            }

            this._loadInvoices(aFilters);
        }
    });
});
