sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("northwinderpportal.controller.Suppliers", {
        onInit() {
        },
        GetAllTheSuppliers:function() {
        let oModel = this.getOwnerComponent().getModel();
        oModel.read("/Suppliers", {
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