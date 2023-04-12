
exports.fechas = fechas
function fechas (){
const miDate = new Date();
const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
}
return dia = miDate.toLocaleDateString("es-CO",options)
}
exports.XDia = XDia
function XDia (){
    const miDate = new Date();
const options = {
    weekday: 'long',
}
return dia = miDate.toLocaleDateString("es-CO",options)
}