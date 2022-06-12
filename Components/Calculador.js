app.component('calculador', {
    template:
    /*html*/
    `<h2>Determine su ganancia al invirtir en un plazo fijo compuesto en una de nuestras sucursales</h2>
    <div id="formulario">
        <label>Nombre y Apellido: </label><input type="textbox" id="txtNombre" v-model="nombre"><br>
        <label>Monto a invertir: </label><input type="number" id="monto" v-model="montoInicial"><br>
        <label>Cantidad de dias: </label><input type="number" id="dias" v-model="dias"><br>
        <button @click="calcular" id="btnCalcular">Calcular</button>
    </div>

    <img src="https://assets.iprofesional.com/cdn-cgi/image/w=880,f=webp/https://assets.iprofesional.com/assets/jpg/2020/06/498740.jpg"
    id="imagen-pf" alt="Imagen ilustrativa plazo fijo">
    
    <div id="resultado" v-if="mostrarMensaje" v-for="mensaje in mensajes">
    Nombre y Apellido: {{ mensaje.persona }} <br>
    Monto invertido: {{ mensaje.inicial }} <br>
    Plazo de tiempo: {{ mensaje.tiempo }} <br>
    Monto final: {{ mensaje.final }} <br>
    </div>

    <errores :errores="errores" :mostrarError="mostrarError"></errores>
    
    <reinvertir @ciclos="ciclos" @cambiar-mostrar-tabla="cambiarMostradorTabla" @calcular-monto-final="calcularMontoFinal"
    :acceso="acceso" :inversiones="inversiones" :montoInicial="montoInicial" :montoFinal="montoFinal" 
    :dias="dias" :porcentaje="porcentaje" :periodo="periodo" :mostrarTabla="mostrarTabla">
    </reinvertir>`,

    data() {
        return{
            mensajes: [
                {persona: "", inicial: "", tiempo: "", final: ""}
            ],
            nombre: "",
            dias: "",
            montoFinal: "",
            montoInicial: "",
            controlador: true,
            porcentaje: null,
            errores: [
                {error1: "", error2: "", error3: ""}
            ],
            inversiones:[
                {periodo: "", inicial: "", final: ""}
            ],
            periodo: 0,
            error1: "",
            error2: "",
            error3: "",
            mostrarMensaje: false,
            mostrarError: false,
            mostrarTabla: false,
            acceso: false
        }
    },
    
    methods: {
        calcular() {
            this.periodo = 0;
            this.inversiones.length = 0;

            this.mostrarTabla = false;

            this.mensajes.length="";
            this.mostrarMensaje = false;
        
            this.errores.length="";
            this.error1="";
            this.error2="";
            this.error3="";
            this.mostrarError = false;

            this.controlador = true;
            
            this.controlador = this.chequear(this.nombre, this.montoInicial, this.dias);

            if(this.controlador == true){
                
                this.determinarPorcentaje(this.dias)
                
                this.calcularMontoFinal(this.montoInicial);

                this.resultado();

                this.acceso = true;
            }
            else{
                this.mostrarError = true;
                this.acceso = false;
            }
        },
        determinarPorcentaje(dias){
            if(dias<=60) this.porcentaje = 0.40;
            if(dias>60 && dias<=120) this.porcentaje  = 0.45;
            if(dias>120 && dias<=360) this.porcentaje  = 0.50;
            if(dias>360) this.porcentaje = 0.65;
        },

        calcularMontoFinal(monto) {
            this.montoFinal = parseFloat((monto + monto * this.dias/360 * this.porcentaje).toFixed(2));
            this.ciclos();
            this.push(this.periodo, monto, this.montoFinal)
            return this.montoFinal
        },

        push(tiempo, inicial, final){
            this.inversiones.push({periodo: tiempo, inicial: inicial, final: final})
        },

        chequear(nombre, monto, dias) {
            this.errorNombre(nombre);

            this.errorMonto(monto);

            this.errorDias(dias);
            
            this.errores.push({error1: this.error1, error2: this.error2, error3: this.error3});
            return this.controlador
        },

        errorNombre(nombre) {
            if(nombre=="") {
                this.error1="Debe ingresa su nombre y apellido";
                this.controlador = false;
            }
        },

        errorMonto(monto) {
            if(monto=="") {
                this.error2= "Debe ingresar un monto a invertir";
                this.controlador = false;
            }
            else{
                if(monto<1000){
                    this.error2= "El importe debe ser igual o mayor a $1.000";
                    this.controlador = false;
                }
            }
        },

        errorDias(dias) {
            if(dias=="") {
                this.error3= "Debe ingresar un plazo de dias a invertir";
                this.controlador = false;
            }
            else{
                if(dias<30){
                    this.error3= "El plazo de días debe ser igual o mayor a 30";
                    this.controlador = false;
                }
            }
        },

        resultado() {
            this.mensajes.push({persona: this.nombre, inicial: this.montoInicial, tiempo: this.dias, final: this.montoFinal});
            this.mostrarMensaje = true;
        },

        cambiarMostradorTabla() {
            this.mostrarTabla = true;
        },

        ciclos() {
            this.periodo++;
        }
    }
})