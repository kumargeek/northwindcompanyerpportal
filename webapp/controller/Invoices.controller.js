sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("northwinderpportal.controller.Invoices", {
        onInit() {
        },
        GetAllTheInvoices:function() {
        let oModel = this.getOwnerComponent().getModel();
        oModel.read("/Invoices", {
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