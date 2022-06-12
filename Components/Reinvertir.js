app.component('reinvertir', {
    data() {
        return {
            numero: "",
            valor: ""
        }
    },

    template:
        /*html*/
        `<div id="reinvertir">
        ¿Desea reinvertir el capital?<br>
         <button type="sumbit" :disabled="!acceso" id="btnReinvertir" @click="reinvertir">Reinvertir</button>
    </div>

    <div id="tabla" v-if="mostrarTabla">
        <table>
            <thead>
                <tr>
                    <th>Periodo</th>
                    <th>Monto Inicial</th>
                    <th>Monto Final</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="inversion in inversiones">
                    <td>{{inversion.periodo}}</td>
                    <td>{{inversion.inicial}}</td>
                    <td>{{inversion.final}}</td>
                </tr>
            </tbody>
        </table>
    </div>`,

    props: {
        montoInicial:{
            type: Number,
            required: true
        },
        montoFinal:{
            type: Number,
            required: true
        },
        dias:{
            type: Number,
            required: true
        },
        periodo:{
            type: Number,
            required: true
        },
        porcentaje:{
            type: Number,
            required: true
        },
        inversiones: {
            type: Array,
            required: true
        },
        mostrarTabla: {
            type: Boolean,
            required: true
        },
        acceso: {
            type: Boolean,
            required: true
        }
    },

    methods:{
        calcularFinal(monto) {
            this.$emit('calcular-monto-final', monto)
        },

        reinvertir() {
            this.cambiar();
            this.calcularFinal(this.montoFinal)
        },

        cambiar() {
            this.$emit('cambiar-mostrar-tabla')
        },

        ciclos() {
            this.$emit("ciclos");
        }
    }
})