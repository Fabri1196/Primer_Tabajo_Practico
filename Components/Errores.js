app.component('errores', {
    data() {
        return {
            numero: "",
            valor: ""
        }
    },

    template:
    /*html*/
    `<div id="error" v-if="mostrarError" v-for="error in errores">
    {{ error.error1 }} <br>
    {{ error.error2 }} <br>
    {{ error.error3 }} <br>
    </div>`,

    props: {
        errores: {
            type: Array,
            required: true
        },
        mostrarError: {
            type: Boolean,
            required: true
        }
        
    }
})