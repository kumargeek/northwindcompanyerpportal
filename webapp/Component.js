sap.ui.define([
    "sap/ui/core/UIComponent",
    "northwinderpportal/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("northwinderpportal.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {

            

            // calls the base component's init function
            UIComponent.prototype.init.apply(this, arguments);


            // sets the device model
            this.setModel(models.createDeviceModel(), "device");

            // here the routing is enabled
            this.getRouter().initialize();
        }
    });
});