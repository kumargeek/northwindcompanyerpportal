sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("northwinderpportal.controller.Customers", {
        onInit() {
        },
        GetAllTheCustomers:function() {
        let oModel = this.getOwnerComponent().getModel();
        oModel.read("/Customers", {
            success:function(response) {
                debugger;
            },
            error:function(error) {
                debugger;
            }
        })
        }
    });
});