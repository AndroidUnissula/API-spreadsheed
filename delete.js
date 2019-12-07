function doPost(e) {
  
  //Buat variable untuk menentukan speadsheet (ss) mana yang akan di pakai
  var id = "1-qK3TDY_4Xa6fn2BhEouxcJQlTT0johDj4KnURRe7rE";
  var ss = SpreadsheetApp.openById(id);
  
  // tabel : table name (nama tabel)
  var tabel = e.parameter.tabel;
  
  //kolom : kolom yang di pakai dalam database (nama kolom)
  var kolom = ss.getSheetByName(tabel);
  
  var fungsi = e.parameter.fungsi;
  
  switch(fungsi){
    case "delete":
      return deleteData(e,kolom);
      break;
  }
}


function deleteData(kirim, kolom){
  var id_mhs = kirim.parameter.id_mhs;
  var flag=0;
  var lastRow=kolom.getLastRow();
  
  for (var row=2;row<=lastRow;row++){
    var id_server = kolom.getRange(row,1).getValue();
    if(id_server==id_mhs){
      kolom.deleteRow(row);
      flag=1;
    }
  }
  
  if (flag==0){
    var hasil="id tidak di temukan";
  }else{
    var hasil="data berhasi di hapus";
  }
  
  hasil = JSON.stringify({"hasil":hasil});
  

  
  return ContentService.createTextOutput(hasil).setMimeType(ContentService.MimeType.JSON);
}