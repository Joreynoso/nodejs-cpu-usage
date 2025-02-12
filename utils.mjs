// --> Función para convertir los bytes en gigabytes
export const fnGigabytes = (memoria) => {
    return (memoria / (1024 ** 3));
}

// --> Función para convertir los segundos en minutos
export const fnMinutos = (tiempoenSegundos) => {
    return (tiempoenSegundos / 60);
}

