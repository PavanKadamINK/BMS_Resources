sap.ui.define([], function () {
    "use strict";

    return {
        linkText: function (sDescription, sName) {
            return sDescription ? sDescription : sName;
        },
        doctypeicon: function (mime) {
            if (!mime) return "";
            if (mime === "application/pdf") {
                return "sap-icon://pdf-attachment";
            }
            else if (mime === "image/png" || mime === "image/jpeg" || mime === "image/webp") {
                return "sap-icon://attachment-photo";
            }
            else if (mime === "text/plain") {
                return "sap-icon://document-text";
            }
            else if (mime === "video/mp4") {
                return "sap-icon://attachment-video";
            }
            else if (mime === "Workpage URL") {
                return "sap-icon://chain-link";
            }
            else if (mime === "application/msword" || mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                return "sap-icon://document-text";
            }
            else if (mime === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || mime === "application/vnd.ms-excel") {
                return "sap-icon://excel-attachment";
            }
            else {
                return "sap-icon://document";
            }
        },

        expiryOnly: function (expiryDate) {
            if (!expiryDate) {
                return "";
            }

            var oDate = new Date(expiryDate);

            if (isNaN(oDate)) {
                return "";
            }

            var day = String(oDate.getDate()).padStart(2, "0");
            var month = String(oDate.getMonth() + 1).padStart(2, "0");
            var year = oDate.getFullYear();

            return "Expiry Date: " + day + "/" + month + "/" + year;
        },

        descriptionOrPreview: function (desc) {
            return desc ? desc : "Preview";
        }

    };
});
