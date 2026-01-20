sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"./formatter"
], function (MessageToast, Controller, JSONModel, Formatter) {
	"use strict";

	return Controller.extend("com.winslow.yve.Secondary_Resources.Card", {
		Formatter: Formatter,
		onInit: function () {
			var oModel = new JSONModel({});
			this.getView().setModel(oModel, "cardModel");

			this.getView().setBusy(true);
			this.getView().attachModelContextChange(this._onModelArrival, this);
			this._onModelArrival();
		},

		_onModelArrival: function () {
			debugger;
			// Get the model from the Component
			var oODataModel = this.getOwnerComponent().getModel();

			// Check if the model is defined yet
			if (oODataModel) {
				// 3. Success! Stop listening so this doesn't run again
				this.getView().detachModelContextChange(this._onModelArrival, this);

				// 4. Wait for metadata to be ready before calling .read()
				oODataModel.metadataLoaded().then(function () {
					this._loadData();
				}.bind(this));
			}
		},

		_loadData: function () {
			debugger;

			var url = window.location.href;
			var id = url.split("workpage_tabs/")[1].split("?")[0];

			const oView = this.getView();
			oView.setBusy(true);

			this.getOwnerComponent().getModel("JAM").read(`/NavTabs('${id}')`, {
				success: function (oNavData) {
					this.getOwnerComponent().getModel().read("/SearchOTFiles", {
						urlParameters: {
							sKey: oNavData.Title
						},
						success: function (oFilesData) {
							debugger;
							var oModel = new JSONModel({ cards: oFilesData.results, Title: oNavData.Title });
							this.getView().setModel(oModel, "cardModel");
							oView.setBusy(false);
						}.bind(this),
						error: function (oError) {
							debugger;
							sap.m.MessageToast.show("Error fetching OT files. Check console logs.");
							oView.setBusy(false);
						}
					});
				}.bind(this),
				error: function (oError) {
					debugger;
					sap.m.MessageToast.show(
						"Error fetching NavTabs. Check console logs."
					);
					oView.setBusy(false);
				}
			});
		},
		handleFilePress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oContext = oItem.getBindingContext("cardModel");

			if (!oContext) return;

			var sUrl = oContext.getProperty("url");

			if (sUrl) {
				window.open(sUrl, "_blank");
			} else {
				sap.m.MessageToast.show("Document not available");
			}
		}


	});
});