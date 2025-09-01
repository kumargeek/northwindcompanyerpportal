sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("northwinderpportal.controller.Products", {
        onInit() {
        },
        GetAllTheProducts:function() {
        let oModel = this.getOwnerComponent().getModel();
        oModel.read("/Products", {
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