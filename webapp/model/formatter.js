sap.ui.define([], () => {
	"use strict";

	return {
		formatName: function(name) {
			//const type = this.getOwnerComponent().getModel("pokedex").getProperty("/type");
			//häufig Switch-Statement
            if(name=='Bulbasaur'){
                return name;
            }
            else return name;
		}
	};
});