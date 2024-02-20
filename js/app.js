//Crear objetos de clase Ingreso y Egreso

const ingresos = [
    new Ingreso('Venta Carro', 6000),
    new Ingreso('Venta Moto', 3000)
];

//console.log(ingresos);

const egresos = [
    new Egreso('Renta Departamento', 200),
    new Egreso('Semestre Universidad', 300)
];

//console.log(egresos);

//Funcion cargar APP para recargar la pagina automaticamente
let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngreso = 0;

    for(let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

//console.log(totalIngresos());

let totalEgresos = () => {
    //Se debe asignar una variable en vacio para poder almacenar la informacion del for of
    let totalEgreso = 0;

    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}
//console.log(totalEgresos());

// Pasando informacion mediante el DOM JavaScript

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();

    //console.log(`Presupuesto: ${presupuesto}`);
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);

    //console.log(`porcentaje: ${porcentajeEgreso}`);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);

    //console.log(`Ingresos: ${totalIngresos()}`)
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());

    //console.log(`Egresos: ${totalEgresos()}`)
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());

}



const formatoMoneda = (valor)=>{
    //return valor.toLocaleString('en-US',{style:'currency', currency:'CLP', minimumFractionDigits:2});
    //return valor.toLocaleString('es-ES',{style:'currency', currency:'EUR', minimumFractionDigits:2});
    return valor.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2});
}

const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2});
}

// Cargar Ingresos - Pasamos los datos de nuestro objeto personas al index pagina principal
const cargarIngresos = () => {
    let ingresosHTML = '';
    
    for(let ingreso of ingresos) {
        //La variable ingreso le pasamos la infomacion del objeto de ingreso)
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}


//El parametro (ingreso) es la informacion que enviamo de la funcion cargarIngresos
const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
    <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
              <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
              <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                  <ion-icon name="close-circle-outline"
                  onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                </button>
              </div>
            </div>
          </div>
    `;
  return ingresoHTML;
};

//Eliminar datos de Ingresos
const eliminarIngreso = (id) => {
    //El método findIndex() devuelve el índice del primer elemento de un array que cumpla con la función de prueba proporcionada. En caso contrario devuelve -1.
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);

    //El método splice() cambia el contenido de un array eliminando elementos existentes 
    // Entramos a ingresos ya que es donde almacenamos los objetos de Ingreso
    ingresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarIngresos();
}

// Cargar Egresos - Pasamos los datos de nuestro objeto personas al index pagina principal
const cargarEgresos = () => {
    let egresosHTML = '';
    
    for(let egreso of egresos) {
        //La variable ingreso le pasamos la infomacion del objeto de ingreso)
        egresosHTML += crearEgresoHTML(egreso);
    }
    
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

//El parametro (egreso) es la informacion que enviamo de la funcion cargarIngresos
const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
              <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
              <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
              <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                  <ion-icon name="close-circle-outline"
                  onclick="eliminarEgreso(${egreso.id})"></ion-icon>
                </button>
              </div>
            </div>
          </div>
    `;
    return egresoHTML;
}

//Eliminar datos de Egresos
const eliminarEgreso = (id) => {
    //El método findIndex() devuelve el índice del primer elemento de un array que cumpla con la función de prueba proporcionada. En caso contrario devuelve -1.
    let indiceEliminar = egresos.findIndex( egreso => egreso.id === id);

    //El método splice() cambia el contenido de un array eliminando elementos existentes 
    // Entramos a ingresos ya que es donde almacenamos los objetos de Ingreso
    egresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarEgresos();
}

//Creando - Agregando Objeto de tipo de clase Ingreso y Egreso
let agregarDato = () => {
    let formulario = document.getElementById('formulario');
    // el tipo la referencia con la cual llamo al select del formulario
    let tipo = formulario['tipo'];
    let descripcion = formulario['descripcion'];
    let valor = formulario['valor'];

    // Principalmente se valida que los datos sean diferente de vacio
    if(descripcion.value !== '' && valor.value !== ''){
        //Validar desde el select del formulario la seleccion del tipo
        // + -> Ingreso   y   - -> Egreso
        if(tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value, +valor.value) );
            // las siguientes funciones es necesario para recargar la pagina y mostrar los  cambios
            cargarCabecero();
            cargarIngresos();
        }
        else if (tipo.value === 'egreso'){
            egresos.push( new Egreso(descripcion.value, +valor.value) );
            cargarCabecero();
            cargarEgresos();
        }
    }
}