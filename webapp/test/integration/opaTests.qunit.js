/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["northwinderpportal/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
