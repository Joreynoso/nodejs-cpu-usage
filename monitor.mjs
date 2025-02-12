/*
Monitoreo del sistema con OS y EventEmitter

--> Crea una aplicación que monitoree el estado del sistema en tiempo real.
--> Usa el módulo os para obtener información como la carga de la CPU, memoria libre y tiempo de actividad.
--> Usa EventEmitter para emitir eventos cuando ciertos valores superen un umbral (ej. memoria baja).
*/

// --> Importar el módulo OS y EventMitter
import os from 'os';
import { EventEmitter } from 'events';
import { fnGigabytes, fnMinutos } from './utils.mjs'

// --> función que retorna toda la información del sistema
export const fnInformacionSistema = () => {

    // cree un objeto literal
    return {
        memoriaLibre: fnGigabytes(os.freemem()).toFixed(2) + ' GB',
        memoriaTotal: fnGigabytes(os.totalmem()).toFixed(2) + ' GB',
        cargaCPU: os.loadavg()[0],
        tiempoActivo: fnMinutos(os.uptime()).toFixed(2) + ' MIN',
        sistemaOperativo: os.platform()
    }
};

console.log(fnInformacionSistema(os));

// --> creando los eventos con EventMitter
const alertSistema = new EventEmitter();

// --> evento por tiempo de uso
alertSistema.on('alerta-uso', (tiempoUso) => {
    if (tiempoUso > 15) {
        console.log('Llevas mucho tiempo trabajando, tomate un descanso!');

    } else {
        console.log('aún tienes tiempo, trabaja duro!');
    }
});

// --> evento por uso alto de la memoria ram
alertSistema.on('alerta-ram', (memoriaLibre) => {

    if (memoriaLibre < 8) {
        console.log('Por favor, reduce tu consumo de ram, cierra algunas apps');
    } else {
        console.log('Tu consumo de ram está bien, puedes seguir trabajando');
    }
})

// --> Emits de eventos
alertSistema.emit('alerta-ram', fnGigabytes(os.freemem()))
alertSistema.emit('alerta-uso', fnMinutos(os.uptime()));








