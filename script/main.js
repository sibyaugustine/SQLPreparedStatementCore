(function(){
  
/*window.onload = function() {
  document.querySelector('#greeting').innerText =
    'Hello, World! It is ' + new Date();
};*/

//Private Variabe for storing input
var _sInputTextArea="";
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

  var sPritifiedQuery = _prepareQuery(sSqlPrep,aColPorperties);
  sPritifiedQuery = _wordWrap(sPritifiedQuery,80);
  $('#textAreaInpScript').val(sPritifiedQuery);

  var aColumnNames = _extractColoumnsFromInput(sInput);
  var aKeyValueColumnValues = _extarctColumValuesFromInput(aColumnNames,aColPorperties);
  _oDataSQLTableRef.insetIntoTable(aKeyValueColumnValues);
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
  var sData_Values ="";
  if(sInput.indexOf('INSERT')>-1)
  {
    sData_Values = sInput.substring(sInput.indexOf('(')+1,sInput.indexOf(')'));
  }
  else
  {
    var firstColomnIndex = sInput.indexOf("?");
    while(sInput.charAt(firstColomnIndex)!=" "){
	    firstColomnIndex--;
    }
    var sColumnNames = sInput.substring(firstColomnIndex,sInput.lastIndexOf("?")+1);
    var sRemovedSplChars = sColumnNames.replace(/ /g,'').replace(/\?/g,'').replace(/=/g,'');
    sData_Values = sRemovedSplChars.replace(/(AND|WHERE|OR)/g,",");
  }
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

function _extarctColumValuesFromInput(aColumnNames,aColPorperties){
  var _aDataValues = [];
  for(var i=0;i<aColumnNames.length;i++)
  {
    var oDataValues = {};
    oDataValues.id = aColumnNames[i].trim();
    oDataValues.desc = aColPorperties[i].trim();
    _aDataValues.push(oDataValues);
  }
  return _aDataValues;
}

function _wordWrap(str, maxWidth) {
    var newLineStr = "\n"; done = false; res = '';
    do {                    
        found = false;
        // Inserts new line at first whitespace of the line
        for (i = maxWidth - 1; i >= 0; i--) {
            if (testWhite(str.charAt(i))) {
                res = res + [str.slice(0, i), newLineStr].join('');
                str = str.slice(i + 1);
                found = true;
                break;
            }
        }
        // Inserts new line at maxWidth position, the word is too long to wrap
        if (!found) {
            res += [str.slice(0, maxWidth), newLineStr].join('');
            str = str.slice(maxWidth);
        }

        if (str.length < maxWidth)
            done = true;
    } while (!done);

    return res + str;
}

function testWhite(x) {
    var white = new RegExp(/^\s$/);
    return white.test(x.charAt(0));
};
})(window);