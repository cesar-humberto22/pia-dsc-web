export function isDate(fechaString) {
  // Expresión regular para validar el formato de fecha
  const regexFecha = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

  // Comprobamos si el string cumple con el formato de fecha
  if (!regexFecha.test(fechaString)) {
    return false;
  }

  // Verificamos si la fecha es válida utilizando el objeto Date de JavaScript
  const fecha = new Date(fechaString);
  const isValid = !isNaN(fecha.getTime());

  return isValid;
}