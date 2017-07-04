(function(){
  
/*window.onload = function() {
  document.querySelector('#greeting').innerText =
    'Hello, World! It is ' + new Date();
};*/

//Private Variabe for storing input
var _sInputTextArea="";
//Private Object Contains key-value pair
var _aDataValues = [];
//Private Variable for datatable
var _oDataSQLTableRef = null;

$( document ).ready(function() {
    console.log( "ready!" );
    $('#btn_pertify_copy').click(onBtnPertifyClick);
    $('#btn_pertify').click(onBtnPertifyClick);

    var oDataSQLTable = new window.sql_prepared_statement.sql_values_table();
    oDataSQLTable.createtable("IpScript",[{"id":"id","desc":"Key"},{"id":"desc","desc":"Value"}]);
    _oDataSQLTableRef = oDataSQLTable;
    var clipboard = new Clipboard('.btn');
});

function onBtnPertifyClick(){
  var sInput = $('#textAreaInpScript').val();
  if(sInput.indexOf("?")==-1)
  {
    return;//Already beautified
  }
  _sInputTextArea = sInput;
  sInput = _removeLineBreaks(sInput);
  var sSqlPrep = _extractPrepQueryFromInput(sInput);
  var aColPorperties = _extractArrayOfDataFromInput(sInput);
  var aColumnNames = _extractColoumnsFromInput(sInput);
  _aDataValues = [];
  for(var i=0;i<aColumnNames.length;i++)
  {
    var oDataValues = {};
    oDataValues.id = aColumnNames[i].trim();
    oDataValues.desc = aColPorperties[i].trim();
    _aDataValues.push(oDataValues);
  }

  _oDataSQLTableRef.insetIntoTable(_aDataValues);
  var sPritifiedQuery = _prepareQuery(sSqlPrep,aColPorperties);
  sPritifiedQuery = _wordWrap(sPritifiedQuery,40);
  $('#textAreaInpScript').val(sPritifiedQuery);
}

function _extractArrayOfDataFromInput(sInput){
  var aData_Arr_values = [];
  var sData_Values = sInput.substring(sInput.indexOf('[')+1,sInput.indexOf(']'));
  if(sData_Values)
  {
    aData_Arr_values = sData_Values.split(',');
  }
  console.log('Parameters '+aData_Arr_values);
  return aData_Arr_values;
}

function _extractColoumnsFromInput(sInput){
  var aData_Arr_values = [];
  var sData_Values = sInput.substring(sInput.indexOf('(')+1,sInput.indexOf(')'));
  if(sData_Values)
  {
    aData_Arr_values = sData_Values.split(',');
  }
  console.log('Column Name '+aData_Arr_values);
  return aData_Arr_values;
}

function _extractPrepQueryFromInput(sInput){
  var sQueryPrep = sInput.substring(0,sInput.indexOf('['));
  console.log('SQL Query '+sQueryPrep);
  return sQueryPrep;
}

function _prepareQuery(sQueryPrep,aQueryArgs){
   var count =-1;
   var regex = new RegExp("\\?", "g");
   var final_query = sQueryPrep.replace(regex,function(s,key){
     count++;
     var sValue = aQueryArgs[count].trim();
     return "'"+sValue+"'";
   });
   console.log("Final Query "+final_query);
   return final_query;
}

function _removeLineBreaks(sInput){
  return sInput.replace(/(\r\n|\n|\r)/gm,"");
}

function _wordWrap(text,width){
    var re = new RegExp("([\\w\\s]{" + (width - 2) + ",}?\\w)\\s?\\b", "g")
    return text.replace(re,"$1\n")
}
})(window);