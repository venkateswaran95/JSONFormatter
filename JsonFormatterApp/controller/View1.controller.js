sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageBox"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller,MessageBox) {
        "use strict";
        var inputCode;
        var outputCode;
        var oEditor;
        var oFilterKey;
        var oIconTabBar;

		return Controller.extend("ns.HTML5Module1.controller.View1", {
			onInit: function () {

                // @ts-ignore
                oEditor = this.byId("idCodeEditor");
                oIconTabBar = this.byId("idIconTabBar");
            },
            onProceed: function() {
                try{
                    inputCode = oEditor.getValue();
                    var inputObj = JSON.parse(inputCode);
                    outputCode = JSON.stringify(inputObj,null,4);
                    oEditor.setValue(outputCode);
                    oIconTabBar.setSelectedKey("B");
                    this.byId("idOutputButton").setVisible();
                }
                catch(err){
                    var numberPattern = /\d+/g;
                    var index = err.message.match(numberPattern).join('');
                    MessageBox.error("Parsing Error",{
                        title: "Error while parsing Input JSON data",
                        details: err.message+" => "+inputCode.slice(index-5,index+1)
                    });
                    
                }
                
                
            },
            onSelectTab: function(oEvent){
                
                oFilterKey = oEvent.getParameter("selectedKey");
                switch(oFilterKey){
                    case "A":
                        oEditor.setValue(inputCode);
                        break;
                    case "B":
                        oEditor.setValue(outputCode);
                        break;
                    default:
                        oEditor.setValue();
                        break;
                }
            },
            onDownload: function(){
                sap.ui.core.BusyIndicator.show(0);
                var text = outputCode;
                var name = "output.txt";
                const a = document.createElement('a');
                const type = name.split(".").pop();
                a.href = URL.createObjectURL( new Blob([text], { type:`text/${type === "txt" ? "plain" : type}` }) );
                a.download = name;
                sap.ui.core.BusyIndicator.hide();
                a.click();
            }
		});
	});
