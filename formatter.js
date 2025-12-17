sap.ui.define([], function () {
    "use strict";

    return {
        linkText: function (sDescription, sName) {
            return sDescription ? sDescription : sName;
        }
    };
});
