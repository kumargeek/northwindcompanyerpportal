sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"], (Controller, JSONModel) => {
  "use strict";

  return Controller.extend("northwinderpportal.controller.Home", {
    onInit() {
      const oViewModel = new JSONModel({
        productsCount: 0,
        customersCount: 0,
        employeesCount: 0,
        ordersCount: 0,
        invoicesCount: 0,
        suppliersCount: 0,
      });
      this.getView().setModel(oViewModel, "viewModel");

      const oModel = this.getOwnerComponent().getModel();

      // Fetch counts for entities and update model
      this._fetchCount(oModel, "Products", "productsCount");
      this._fetchCount(oModel, "Customers", "customersCount");
      this._fetchCount(oModel, "Employees", "employeesCount");
      this._fetchCount(oModel, "Orders", "ordersCount");
      this._fetchCount(oModel, "Invoices", "invoicesCount");
      this._fetchCount(oModel, "Suppliers", "suppliersCount");
    },

    _fetchCount(oModel, sEntitySet, sModelProperty) {
      oModel.read(`/${sEntitySet}/$count`, {
        success: (iCount) => {
          this.getView().getModel("viewModel").setProperty(`/${sModelProperty}`, iCount);
        },
        error: () => {
          this.getView().getModel("viewModel").setProperty(`/${sModelProperty}`, 0);
        },
      });
    },

    onTilePress: function (oEvent) {
      const sTarget = oEvent.getSource().data("target");
      console.log("Tile pressed. Navigating to route:", sTarget);
      if (sTarget) {
        this.getOwnerComponent().getRouter().navTo(sTarget);
      } else {
        console.error("Target route not found for tile!");
      }
    },
  });
});
