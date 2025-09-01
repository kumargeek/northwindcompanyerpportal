sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("northwinderpportal.controller.Orders", {
        onInit() {
        },
        GetAllTheOrders:function() {
        let oModel = this.getOwnerComponent().getModel();
        oModel.read("/Orders", {
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