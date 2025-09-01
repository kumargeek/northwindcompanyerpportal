sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("northwinderpportal.controller.Employees", {
        onInit() {
        },
        GetAllTheEmployees:function() {
        let oModel = this.getOwnerComponent().getModel();
        oModel.read("/Employees", {
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