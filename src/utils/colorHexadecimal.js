export function convertirColorHexadecimal(colorHex, opacidad) {
    // Eliminamos el carácter "#" del color hexadecimal
    colorHex = colorHex.replace("#", "");
  
    // Convertimos el color hexadecimal a decimal
    var r = parseInt(colorHex.substring(0, 2), 16);
    var g = parseInt(colorHex.substring(2, 4), 16);
    var b = parseInt(colorHex.substring(4, 6), 16);
  
    // Validamos y ajustamos la opacidad en caso de ser necesario
    if (opacidad < 0) {
      opacidad = 0;
    } else if (opacidad > 1) {
      opacidad = 1;
    }
  
    // Construimos la cadena con el formato RGBA
    var rgba = "rgba(" + r + ", " + g + ", " + b + ", " + opacidad + ")";
  
    // Devolvemos el resultado
    return rgba;
}  