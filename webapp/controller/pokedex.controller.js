sap.ui.define(['sap/ui/core/mvc/Controller',
    '../model/formatter',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
	"sap/ui/model/FilterOperator"
],
    function (Controller, formatter, Fragment, Filter, FilterOperator ) {
        "use strict";
        var CController = Controller.extend("pokedex.demo.controller.pokedex", {
            formatter: formatter,
            onInit: function () {

            },
            filterPokemon: function(oEvent){
                //Eventhandling für liveChange
                let pokeQuery = oEvent.getParameter('newValue');
                let oTable = this.byId('pokedexTable');
                var pokeFilter= [new Filter( 'name/english' , FilterOperator.Contains , pokeQuery)];
                let oBinding = oTable.getBinding('items'); //Aggregation Binding wird aus dem Table-Controller geholt (item-Attribut)
                if (pokeQuery.length > 0) {
                //Filterung durchführen
                var filter = oBinding.filter(pokeFilter);
             }
             else{
                //Filterung löschen 
                oBinding.filter([])
             }
            },
            searchPokemon: function (oEvent) {
                //Eventhandling für search
                //oEvent Parameter 'query' abfragen (Wert vom Suchfeld)
                let pokeQuery = oEvent.getParameter('query');
                if (pokeQuery) {
                   //Filter bauen: Pfad
                   var pokeFilter = [new Filter( 'name/english' , FilterOperator.Contains , pokeQuery)];
                   //Filter anwenden
                   const oTable = this.byId('pokedexTable');
                   //Aggregation Binding wird aus dem Table-Controller geholt (item-Attribut)
                   const oBinding = oTable.getBinding('items');
                   //Filterung durchführen
                   oBinding.filter(pokeFilter);
                }
                else{
                    //MessageToast, gibt es nicht
                }
            },
            onItemPress: function (oEvent) {
                var oView = this.getView();
                //Pfad zum geklickten Element (Lokalisierung in JSON-Datei)s
                var oPath = oEvent.getSource().getBindingContext('pokedex').getPath();
                //var oPath = oEvent.getSource().getBindingContextPath();
                console.log(oPath);
                if (!this.byId('dialog')) {
                    Fragment.load({
                        id: oView.getId(),
                        name: 'pokedex.demo.fragments.pokemon',
                        controller: this
                    }).then(function (oDialog){
                        oView.addDependent(oDialog);
                        oDialog.open();
                        oDialog.bindObject({
                            path: oPath,
                            model: "pokedex"
                        });
            
                    });
                }
                else {
                    this.byId('dialog').open();
                    
                }
                

            },
            closeDialog: function (){
                var oView = this.getView();
                
                //Fehler bei close-Methode -> Daten vom 1. Aufruf wurden wiederverwendet
                //Alternative: destroy()
                oView.byId('dialog').destroy();
                

            }
        });
    }

);
