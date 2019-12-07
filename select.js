function doPost(e) {
  
  //Buat variable untuk menentukan speadsheet (ss) mana yang akan di pakai
  var id = "1-qK3TDY_4Xa6fn2BhEouxcJQlTT0johDj4KnURRe7rE";
  var ss = SpreadsheetApp.openById(id);
  
  //parameter 1 :  tabel : table name (nama tabel) | sheet name pada spreadsheed
  var tabel = e.parameter.tabel;
  
  //kolom : kolom yang di pakai dalam database (nama kolom)
  var kolom = ss.getSheetByName(tabel);
  
  //Paremeter 2 : method/ prosedur/ fungsi yang di gunakan (insert)
  var fungsi = e.parameter.fungsi;
  
  switch(fungsi){
    case "insert":
      return insertData(e,kolom);
      break;
  }
}

function insertData(kirim, kolom){

  var id_mhs = kirim.parameter.id_mhs; // parameter 3 : data yang di masukkan
  var nama = kirim.parameter.nama; // parameter 4 : data yang di masukkan
  var nim = kirim.parameter.nim; // parameter 5 : data yang di masukkan
  var jurusan = kirim.parameter.jurusan; // parameter 6 : data yang di masukkan
  
  kolom.appendRow([id_mhs,nama,nim,jurusan]);
  
  // pesan yang di tampilkan apabila data berjasil di masukkan
  var hasil = "data telah berhasil di masukkan";

  // merubah data yang di masukkan menjadi bentuk JSON
  hasil = JSON.stringify({"hasil": hasil});
  
  // membuat web servise JSON
  return ContentService.createTextOutput(hasil).setMimeType(ContentService.MimeType.JSON);
}