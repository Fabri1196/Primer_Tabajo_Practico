window.onload = iniciar;
let periodo = 1;
let porcentaje = 0;
let montoInicial = 0;
let montoFinal = 0;
let monto1 = 0;
let monto2 = 0;

function iniciar(){
    let btnCalcular = document.getElementById("btnCalcular").addEventListener("click", clickBntCalcular);
}

function clickBntCalcular(){
    debugger;
    let resultado = document.getElementById("resultado");
    let error = document.getElementById("error");
    //document.getElementById("tabla").innerHTML = "";
    resultado.innerHTML = "";
    tabla.innerHTML = "";
    error.innerHTML = "";
    let controlador = true;
    periodo = 1;

    let nombre = document.getElementById("txtNombre").value;
    if(nombre=="") {
        error.innerHTML = "Debe ingresa su nombre y apellido<br>" ;
        controlador = false;
    }

    monto = document.getElementById("monto").value;
    montoInicial = parseFloat(monto);
    if(monto=='') {
        error.innerHTML += "Debe ingresar un monto a invertir<br>";
        controlador = false;
    }
    else{
        if(montoInicial<1000){
            error.innerHTML += "El importe debe ser igual o mayor a $1.000<br>";
            controlador = false;
        }
    }

    let dia = document.getElementById("dias").value;
    let dias = parseInt(dia);
    if(dia=="") {
        error.innerHTML += "Debe ingresar un plazo de dias a invertir<br>";
        controlador = false;
    }
    else{
        if(dias<30){
            error.innerHTML += "El plazo de días debe ser igual o mayor a 30<br>";
            controlador = false;
        }
    }
  
    if(controlador){
        if(dias<=60) porcentaje = 0.40;
        if(dias>60 && dias<=120) porcentaje = 0.45;
        if(dias>120 && dias<=360) porcentaje = 0.50;
        if(dias>360) porcentaje = 0.65;
            montoFinal = parseFloat((montoInicial + montoInicial * dias/360 * porcentaje).toFixed(2));

        let html = "Nombre y Apellido: " + nombre + "<br/>" + 
        "Monto invertido: " + montoInicial + "<br/>" + 
        "Plazo de tiempo: " + dias +"<br/>" + 
        "Monto final: " + montoFinal;
        resultado.innerHTML = html;
        //let etiqueta = document.createElement("p");
        //etiqueta.appendChild(document.createTextNode(periodo + "    " + montoInicial + "    " + montoFinal));
        //document.getElementById("tabla").appendChild(etiqueta);
    }

    let btnReinvertir = document.getElementById("btnReinvertir")
    btnReinvertir.onclick = actuar;
    
    function actuar(){
        if(controlador){
            periodo++;
        
            let table = document.createElement("table");
            let thead = document.createElement("thead");
            let tbody = document.createElement("tbody");
    
            table.appendChild(thead);
            table.appendChild(tbody);
    
            document.getElementById("tabla").appendChild(table);

            if(periodo==2) {
                monto1 = montoFinal; 
                monto2 = parseFloat((monto1 + monto1 * dias/360 * porcentaje).toFixed(2));
    
                let row1 = document.createElement("tr");
                let heading1 = document.createElement("th");
                heading1.innerHTML = "Periodo";
                let heading2 = document.createElement("th");
                heading2.innerHTML = "Monto Inicial";
                let heading3 = document.createElement("th");
                heading3.innerHTML = "Monto Final";
    
                row1.appendChild(heading1);
                row1.appendChild(heading2);
                row1.appendChild(heading3);
                thead.appendChild(row1);
    
    
                let row2 = document.createElement("tr");
                let row2_date1 = document.createElement("td");
                row2_date1.innerHTML = periodo-1;
                let row2_date2 = document.createElement("td");
                row2_date2.innerHTML = montoInicial;
                let row2_date3 = document.createElement("td");
                row2_date3.innerHTML = montoFinal;
    
                row2.appendChild(row2_date1);
                row2.appendChild(row2_date2);
                row2.appendChild(row2_date3);
                tbody.appendChild(row2);
    
    
                let row3 = document.createElement("tr");
                let row3_date1 = document.createElement("td");
                row3_date1.innerHTML = periodo;
                let row3_date2 = document.createElement("td");
                row3_date2.innerHTML = monto1;
                let row3_date3 = document.createElement("td");
                row3_date3.innerHTML = monto2;
    
                row3.appendChild(row3_date1);
                row3.appendChild(row3_date2);
                row3.appendChild(row3_date3);
                tbody.appendChild(row3);
            }
            else{
                monto1 = monto2; 
                monto2 = parseFloat((monto1 + monto1 * dias/360 * porcentaje).toFixed(2));
    
                let row = document.createElement("tr");
                let row_date1 = document.createElement("td");
                row_date1.innerHTML = periodo;
                let row_date2 = document.createElement("td");
                row_date2.innerHTML = monto1;
                let row_date3 = document.createElement("td");
                row_date3.innerHTML = monto2;
    
                row.appendChild(row_date1);
                row.appendChild(row_date2);
                row.appendChild(row_date3);
                tbody.appendChild(row);
    
            }
            
        }
    }
}