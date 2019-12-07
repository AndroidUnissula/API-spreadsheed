function doPost(e) {
  
  //Buat variable untuk menentukan speadsheet (ss) mana yang akan di pakai
  var id = "1AcOsvUgdIezZ8z6WUSrB2afyuPvxt1msQuLYS85YAxk";
  var ss = SpreadsheetApp.openById(id);
  
  // tabel : table name (nama tabel)
  var tabel = e.parameter.tabel;
  
  //kolom : kolom yang di pakai dalam database (nama kolom)
  var kolom = ss.getSheetByName(tabel);
  
  var fungsi = e.parameter.fungsi;
  
  switch(fungsi){
    case "insert":
      return insertData(e,kolom);
      break;
      
    case "update":
      return updateData(e,kolom);
      break;
      
    case "delete":
      return deleteData(e,kolom);
      break;
  }
}

function doGet(e) {
  //Buat variable untuk menentukan speadsheet (ss) mana yang akan di pakai
  var id = "1AcOsvUgdIezZ8z6WUSrB2afyuPvxt1msQuLYS85YAxk";
  var ss = SpreadsheetApp.openById(id);
  
  // tabel : table name (nama tabel/ di dalam spreadsheet adalah halaman yang di buka/lembar kerja)
  var tabel = e.parameter.tabel;
  
  //kolom : kolom yang di pakai dalam database (nama kolom)
  var kolom = ss.getSheetByName(tabel);
  
  var fungsi = e.parameter.fungsi;
  
  switch(fungsi){
    case "read":
      return getData(kolom, tabel);
      break;
  }
}

function insertData(kirim, kolom){
var id_mhs = kirim.parameter.id_mhs;
  var nama = kirim.parameter.nama;
  var nim = kirim.parameter.nim;

  
  kolom.appendRow([id_mhs,nama,nim]);
  
  var hasil = "data telah berhasil di masukkan";
  hasil = JSON.stringify({"hasil": hasil});
  
  return ContentService.createTextOutput(hasil).setMimeType(ContentService.MimeType.JSON);
}

function getData(kolom, tabel){
  var data = {};
  data[tabel] = getObjekData(kolom);
  
  var hasil = JSON.stringify(data);
  return ContentService.createTextOutput(hasil).setMimeType(ContentService.MimeType.JSON);
  
}

function getObjekData(kolom){
  var allData = [];
  var rangeObjek = kolom.getDataRange().getValues();
  
  var jumlahKolom = kolom.getLastColumn();
  
  for (var row=1;row<rangeObjek.length;row++){
    var objek = {};
    for (var colum=0;colum<jumlahKolom;colum++){
    
      objek[rangeObjek[0][colum]] = rangeObjek[row][colum];
    }
    allData.push(objek);
  }
  return allData;
}

function updateData(ambil, kolom){
  var id_mhs = ambil.parameter.id_mhs;
  var namaUpdate = ambil.parameter.nama;
  var nimUpdate = ambil.parameter.nim;
  
  
  var flag = 0;
  var lastRow = kolom.getLastRow();
      
  for (var row=2;row<=lastRow;row++){
    var idServer=kolom.getRange(row, 1).getValue();
    if (idServer == id_mhs){
      kolom.getRange(row, 2).setValue(namaUpdate);
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