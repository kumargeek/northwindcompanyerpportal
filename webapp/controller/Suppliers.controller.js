sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
], (Controller, Filter, FilterOperator, JSONModel) => {
    "use strict";

    return Controller.extend("northwinderpportal.controller.Suppliers", {
        onInit() {
            this._oModel = this.getOwnerComponent().getModel();
            this._loadSuppliers();
        },

        _loadSuppliers(aFilters) {
            aFilters = aFilters || [];

            this._oModel.read("/Suppliers", {
                filters: aFilters,
                success: (oData) => {
                    const oJSONModel = new JSONModel(oData.results);
                    this.getView().byId("SupplierTable").setModel(oJSONModel, "suppliers");
                    this.getView().setModel(oJSONModel, "/Suppliers");  // For filters dropdown
                },
                error: (err) => {
                    sap.m.MessageToast.show("Failed to fetch suppliers.");
                    console.error(err);
                }
            });
        },

        onFilterSuppliers() {
            const supplierId = this.byId("supplierIdFilter").getSelectedKey();
            const contactName = this.byId("contactNameFilter").getSelectedKey();
            const companyName = this.byId("companyNameFilter").getSelectedKey();

            const aFilters = [];

            if (supplierId) {
                aFilters.push(new Filter("SupplierID", FilterOperator.EQ, supplierId));
            }
            if (contactName) {
                aFilters.push(new Filter("ContactName", FilterOperator.EQ, contactName));
            }
            if (companyName) {
                aFilters.push(new Filter("CompanyName", FilterOperator.EQ, companyName));
            }

            this._loadSuppliers(aFilters);
        }
    });
});
