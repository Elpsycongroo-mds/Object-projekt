var foglalasok = {};
 
var kovetkezoId = 1;
var szerkesztett = 0;
 

function foglaltE(szoba, erkezes, tavozas, id) {
  for (var kulcs in foglalasok) {
    var f = foglalasok[kulcs];
    if (kulcs == id) {
      continue;
    }
    if (f.szoba == szoba && erkezes < f.tavozas && tavozas > f.erkezes) {
      return true;
    }
  }
  return false;
}
 
function kiir() {
  var html = "";
  for (var id in foglalasok) {
    var f = foglalasok[id];
    html += `
      <tr>
        <td>${f.nev}</td>
        <td>${f.szoba}</td>
        <td>${f.erkezes}</td>
        <td>${f.tavozas}</td>
        <td>
          <button onclick="modositas(${id})">Módosít</button>
          <button class="torles" onclick="torles(${id})">Töröl</button>
        </td>
      </tr>`;

  }
  document.getElementById("lista").innerHTML = html;
}
 
function urlapUrites() {
  document.getElementById("nev").value = "";
  document.getElementById("erkezes").value = "";
  document.getElementById("tavozas").value = "";
  document.getElementById("cim").innerHTML = "Új foglalás";
  document.getElementById("mentes").innerHTML = "Mentés";
  szerkesztett = 0;
}
 
function mentes() {
  var nev = document.getElementById("nev").value;
  var szoba = document.getElementById("szoba").value;
  var erkezes = document.getElementById("erkezes").value;
  var tavozas = document.getElementById("tavozas").value;
 

  if (nev == "" || erkezes == "" || tavozas == "") {
    alert("Tölts ki minden mezőt!");
    return;
  }
  if (tavozas <= erkezes) {
    alert("A távozásnak az érkezés után kell lennie!");
    return;
  }
  if (foglaltE(szoba, erkezes, tavozas, szerkesztett)) {
    alert("Ez a szoba ebben az időszakban már foglalt!");
    return;
  }
 
  var foglalas = { nev: nev, szoba: szoba, erkezes: erkezes, tavozas: tavozas };
 
  if (szerkesztett == 0) {

    foglalasok[kovetkezoId] = foglalas;
    kovetkezoId++;
  } else {

    foglalasok[szerkesztett] = foglalas;
  }
 
  urlapUrites();
  kiir();
}
 
function modositas(id) {
  var f = foglalasok[id];
  document.getElementById("nev").value = f.nev;
  document.getElementById("szoba").value = f.szoba;
  document.getElementById("erkezes").value = f.erkezes;
  document.getElementById("tavozas").value = f.tavozas;
  document.getElementById("cim").innerHTML = "Foglalás módosítása";
  document.getElementById("mentes").innerHTML = "Módosítás mentése";
  szerkesztett = id;
}
 
function torles(id) {
  if (confirm("Biztos törlöd a foglalást?")) {
    delete foglalasok[id];
    if (szerkesztett == id) {
      urlapUrites();
    }
    kiir();
  }
}
 
kiir();