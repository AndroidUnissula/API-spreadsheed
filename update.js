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
    case "update":
      return updateData(e,kolom);
      break;
  }
}

      
function updateData(ambil, kolom){
  var id_mhs = ambil.parameter.id_mhs;
  var namaUpdate = ambil.parameter.nama;
  var jurusanUpdate = ambil.parameter.jurusan;
  var nimUpdate = ambil.parameter.nim;
  
  
  var flag = 0;
  var lastRow = kolom.getLastRow();
      
  for (var row=2;row<=lastRow;row++){
    var idServer=kolom.getRange(row, 1).getValue();
    if (idServer == id_mhs){
      kolom.getRange(row, 2).setValue(namaUpdate);
      kolom.getRange(row, 4).setValue(jurusanUpdate);
      kolom.getRange(row, 3).setValue(nimUpdate);
      
      flag = 1;
    }
  }
  if (flag==0){
    var hasil = "ID Tidak di ketemukan";
  }else{
    var hasil = "Data berhasi di update";
  }
  hasil = JSON.stringify({"hasil": hasil});
  
  return ContentService.createTextOutput(hasil).setMimeType(ContentService.MimeType.JSON);
}