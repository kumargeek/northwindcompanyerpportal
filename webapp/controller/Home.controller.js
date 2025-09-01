sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("northwinderpportal.controller.Home", {
    onInit() {},

    onTilePress: function(oEvent) {
      const sTarget = oEvent.getSource().data("target");
      if (sTarget) {
        this.getOwnerComponent().getRouter().navTo(sTarget);
      }
    }
  });
});
