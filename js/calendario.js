// calendario.js

var objWindowPadre;
objWindowPadre = window.parent;
var intActivo = 0;
var anchoTD = 15;
var anchoTD1 = 18;
var colorHead = "red";
var colorTabla = "white";
var colorBorde = "#112233";

var time = new Date();
var anno = time.getFullYear();
var mes = time.getMonth() + 1;
var dia = time.getDate();
var aDias = new Array(0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

function padl(n, w, c) {
    n = String(n);
    while (n.length < w)
        n = c + n;
    return n;
}

function iniciar() {
    if (anoBisiesto(anno)) {
        aDias[2] = 29;
    } else {
        aDias[2] = 28;
    }
    escribeTablaMes(dia, mes, anno);
}

function pinchar(evento) {
    var oTR = null;
    if (window.event)
        oTR = window.event.srcElement;
    else
        oTR = evento.currentTarget;
    var sFechaSel = oTR.id.substring(2);
    var urlEnd = document.URL.indexOf('?');
    var values = new Array();
    var names;
    if (urlEnd != -1) {
        var params = document.URL.substring(urlEnd + 1, document.URL.length).split('&');
        for (i = 0; i < params.length; i++) {
            names = params[i].split('=');
            values[names[0]] = names[1];
        }
    }
    var name = unescape(values["textBox"]);
    window.opener.setFecha(sFechaSel);
    if (window.opener.document.forms[0] != null) {}
    top.window.close();
}

function getNombreMes(iMes) {
    var sMes = ""
    switch (iMes) {
        case 1:
            sMes = "Enero";
            break;
        case 2:
            sMes = "Febrero";
            break;
        case 3:
            sMes = "Marzo";
            break;
        case 4:
            sMes = "Abril";
            break;
        case 5:
            sMes = "Mayo";
            break;
        case 6:
            sMes = "Junio";
            break;
        case 7:
            sMes = "Julio";
            break;
        case 8:
            sMes = "Agosto";
            break;
        case 9:
            sMes = "Septiembre";
            break;
        case 10:
            sMes = "Octubre";
            break;
        case 11:
            sMes = "Noviembre";
            break;
        case 12:
            sMes = "Diciembre";
            break;
        default:
            sMes = "";
    }
    return sMes;
}

function anoBisiesto(sAno) {
    var iAno = parseInt(sAno);
    if (iAno % 4 != 0)
        return false;
    else {
        if (iAno % 400 == 0)
            return true;
        else
            if (iAno % 100 == 0)
                return false;
            else
                return true;
    }
}

function getDayNumber(dia, mes, anno) {
    var day1 = new Date(anno, mes - 1, dia);
    var nDay = day1.getDay();
    if (nDay == 0) nDay = 7;
    return nDay;
}

function cambiarFondo(evento) {
    if (window.event) {
        var objTR = window.event.srcElement;
        if (objTR.style.backgroundColor != '#cbdced') {
            objTR.style.backgroundColor = '#cbdced';
        } else {
            objTR.style.backgroundColor = '#ffffff';
        }
        if (objTR.style.cursor != 'hand') {
            objTR.style.cursor = 'hand';
        } else {
            objTR.style.cursor = 'default';
        }
    }
}

function escribeTablaMes(dia, mes, anno) {
    var clasedia = "";
    var icDia = 1;
    var iIniSemana = 1;
    var iDay = getDayNumber(1, mes, anno);
    var j = 0;
    while (j <= intActivo) {
        document.getElementById("tablacalendario").deleteRow(0);
        j++;
    }
    intActivo = -1;
    while ((icDia - iDay + 1) <= aDias[mes]) {
        var sNameTD = "";
        intActivo++;
        objTR = document.getElementById("tablacalendario").insertRow(intActivo);
        objTR.id = intActivo;
        objTR.align = 'center';
        for (; icDia < iIniSemana + 7; icDia++) {
            sNameTD = "TD" + padl((icDia - iDay + 1), 2, "0") + "/" + padl(mes, 2, "0") + "/" + anno;
            if ((icDia >= iDay) && ((icDia - iDay + 1) <= aDias[mes])) {
                if (icDia < iIniSemana + 5) {
                    clasedia = "textocalendario";
                } else {
                    clasedia = "textofestivo";
                }
                objTD = objTR.insertCell(objTR.cells.length);
                objTD.id = sNameTD;
                objTD.style.backgroundColor = '#ffffff';
                objTD.style.width = anchoTD;
                objTD.className = clasedia;
                objTD.onclick = pinchar;
                objTD.onmouseover = cambiarFondo;
                objTD.onmouseout = cambiarFondo;
                objTD.innerHTML = (icDia - iDay + 1);
            } else {
                objTD = objTR.insertCell(objTR.cells.length);
                objTD.id = sNameTD;
                objTD.style.width = anchoTD;
                objTD.innerHTML = ' ';
            }
        }
        iIniSemana = icDia;
    }
    document.forms[0].cbMes.focus();
}

function cambiaCalendario() {
    if (anoBisiesto(document.forms[0].cbAnno[document.forms[0].cbAnno.selectedIndex].value)) {
        aDias[2] = 29;
    } else {
        aDias[2] = 28;
    }
    escribeTablaMes(1, document.forms[0].cbMes[document.forms[0].cbMes.selectedIndex].value, document.forms[0].cbAnno[document.forms[0].cbAnno.selectedIndex].value);
}
