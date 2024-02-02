sap.ui.define(['sap/ui/core/mvc/Controller',
                'sap/m/MessageToast',
            'sap/ui/model/json/JSONModel'],
	function(Controller, MessageToast) {
	"use strict";
    var user= 'DEMOUSER';
    var pw = '0000';
	var CController = Controller.extend("pokedex.demo.controller.login", {
        onPress: function (oEvent){
            var oView = this.getView();
            var inputUsername= oView.byId('userInput').getValue();
            var inputPassword = oView.byId('pwInput').getValue();
            var oRouter = this.getOwnerComponent().getRouter();

            if(user === inputUsername && pw === inputPassword){
                MessageToast.show('Erfolgreicher Login!');
                oRouter.navTo("pokedex",null);
            }
            else{
                MessageToast.show('Login Fehlgeschlagen!');
            }
        },
        onSubmit: function (oEvent){
            this.onPress();
        }
	});

	return CController;

});
