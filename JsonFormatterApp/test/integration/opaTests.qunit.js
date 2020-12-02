/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ns/HTML5Module1/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
