sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (Controller, Filter, FilterOperator, JSONModel, MessageToast) => {
    "use strict";

    return Controller.extend("northwinderpportal.controller.Orders", {
        onInit() {
            this.oModel = this.getOwnerComponent().getModel();
            this._loadOrders();
        },

        _loadOrders(aFilters = []) {
            const oView = this.getView();
            oView.setBusy(true);

            this.oModel.read("/Orders", {
                filters: aFilters,
                success: (oData) => {
                    const oJsonModel = new JSONModel(oData.results);
                    oView.byId("orderTable").setModel(oJsonModel, "orders");
                    // Optional: set model to view for filters dropdowns
                    oView.setModel(oJsonModel, "orders");
                    oView.setBusy(false);
                },
                error: () => {
                    MessageToast.show("Failed to load orders.");
                    oView.setBusy(false);
                }
            });
        },

        onFilterOrders() {
            const aFilters = [];
            const oView = this.getView();

            const orderId = oView.byId("orderIdFilter").getSelectedKey();
            if (orderId) {
                aFilters.push(new Filter("OrderID", FilterOperator.EQ, orderId));
            }

            const orderDate = oView.byId("orderDateFilter").getSelectedKey();
            if (orderDate) {
                aFilters.push(new Filter("OrderDate", FilterOperator.EQ, orderDate));
            }

            const shippedDate = oView.byId("shippedDateFilter").getSelectedKey();
            if (shippedDate) {
                aFilters.push(new Filter("ShippedDate", FilterOperator.EQ, shippedDate));
            }

            this._loadOrders(aFilters);
        }
    });
});
