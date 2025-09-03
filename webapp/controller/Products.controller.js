sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/json/JSONModel"
], (Controller, Filter, FilterOperator, JSONModel) => {
  "use strict";

  return Controller.extend("northwinderpportal.controller.Products", {
    onInit() {
      this._oModel = this.getOwnerComponent().getModel();
      this._loadProducts(); // Load all products initially
    },

    _loadProducts(aFilters) {
      aFilters = aFilters || [];

      this._oModel.read("/Products", {
        filters: aFilters,
        success: (oData) => {
          const oJSONModel = new JSONModel(oData.results);
          this.getView().byId("ProductTable").setModel(oJSONModel, "products");
          // Also set the filters dropdown model so ComboBoxes have data
          this.getView().setModel(oJSONModel, "/Products");
        },
        error: (err) => {
          sap.m.MessageToast.show("Failed to fetch products.");
          console.error(err);
        }
      });
    },

    onFilterProducts() {
      const productId = this.byId("productIdFilter").getSelectedKey();
      const productName = this.byId("productNameFilter").getSelectedKey();
      const category = this.byId("categoryFilter").getSelectedKey();
      const unitPrice = this.byId("unitPriceFilter").getSelectedKey();
      const stock = this.byId("stockFilter").getSelectedKey();

      const aFilters = [];

      if (productId) {
        aFilters.push(new Filter("ProductID", FilterOperator.EQ, productId));
      }
      if (productName) {
        aFilters.push(new Filter("ProductName", FilterOperator.EQ, productName));
      }
      if (category) {
        aFilters.push(new Filter("CategoryID", FilterOperator.EQ, category));
      }
      if (unitPrice) {
        aFilters.push(new Filter("UnitPrice", FilterOperator.EQ, unitPrice));
      }
      if (stock) {
        aFilters.push(new Filter("UnitsInStock", FilterOperator.EQ, stock));
      }

      this._loadProducts(aFilters);
    }
  });
});
