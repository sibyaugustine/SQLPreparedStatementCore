(function(){

var sql_values_table = function(){
    
};

sql_values_table.prototype.createtable = function(sDivName,oColumns){
    if($("#sDivName")){
       var sTbleDivName = sDivName+"_sql_data_vales_tbl";
       $("#"+sDivName).append("<div class='section_tbl_valus'><table id='"+sTbleDivName+"' class ='table table-condensed table-hover table-striped'></table><div>");
       var oTable = $("#"+sTbleDivName);
       oTable.append("<thead><tr></tr></thead>");
       for(var i=0;i<oColumns.length;i++){
             $("#"+sTbleDivName+">thead>tr").append("<th data-column-id='"+oColumns[i].id+"'>"+oColumns[i].desc+"</th>");
       }
       this._table_sql_data_values = $("#"+sTbleDivName); 
    }
}

sql_values_table.prototype.getTableSqlDataValues = function(){
    return  this._table_sql_data_values;
}

sql_values_table.prototype.insetIntoTable = function(aData){
    this.clearDataTable();
    this._table_sql_data_values.bootgrid("append",aData);
}

sql_values_table.prototype.clearDataTable = function(){
    this._table_sql_data_values.bootgrid("clear");
}

window.sql_prepared_statement = {
    sql_values_table : sql_values_table
}
})(jQuery)