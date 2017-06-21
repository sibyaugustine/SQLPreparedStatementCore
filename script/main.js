(function(){
  
/*window.onload = function() {
  document.querySelector('#greeting').innerText =
    'Hello, World! It is ' + new Date();
};*/

$( document ).ready(function() {
    console.log( "ready!" );
    $('#btn_pertify_copy').click(onBtnPertifyClick);
    $('#btn_pertify').click(onBtnPertifyClick);
    var clipboard = new Clipboard('.btn');
});

function onBtnPertifyClick(){
  var sInput = $('#textAreaInpScript').val();
  sInput = _removeLineBreaks(sInput);
  var sSqlPrep = _extractPrepQueryFromInput(sInput);
  var aColPorperties = _extractArrayOfDataFromInput(sInput);
  
  $('#textAreaOupScript').val(_prepareQuery(sSqlPrep,aColPorperties));
}

function _extractArrayOfDataFromInput(sInput){
  var sData_Values = sInput.substring(sInput.indexOf('[')+1,sInput.indexOf(']'));
  var aData_Arr_values = sData_Values.split(',');
  console.log('Parameters '+aData_Arr_values);
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
     return "'"+aQueryArgs[count].trim()+"'";
   });
   console.log("Final Query "+final_query);
   return final_query;
}

function _removeLineBreaks(sInput){
  return sInput.replace(/(\r\n|\n|\r)/gm,"");
}
})(window);