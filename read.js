function doGet(e) {
  //Buat variable untuk menentukan speadsheet (ss) mana yang akan di pakai
  var id = "1-qK3TDY_4Xa6fn2BhEouxcJQlTT0johDj4KnURRe7rE";
  var ss = SpreadsheetApp.openById(id);
  
  //parameter 1 : tabel : table name (nama tabel/ di dalam spreadsheet adalah halaman yang di buka/lembar kerja)
  var tabel = e.parameter.tabel;
  
  //kolom : kolom yang di pakai dalam database (nama kolom)
  var kolom = ss.getSheetByName(tabel);

  //paremeter 2 : fungsi yang digunakan  
  var fungsi = e.parameter.fungsi;
  
  switch(fungsi){
    case "read":
      return getData(kolom, tabel);
      break;
  }
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