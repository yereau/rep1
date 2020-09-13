

function validacion() {

var email=document.getElementById("email").value
var pass=document.getElementById("pass").value

    if (email=="") {

      alert('[ERROR] Debe introducir un email');
      return false;
    }
    else if (pass=="") {
      
      alert('[ERROR] Debe introducir una contraseña');
      return false;
    }
  else{

    window.sessionStorage.setItem("logueado","si")
    window.sessionStorage.setItem("user",email)

    return true;
  }
    // Si el script ha llegado a este punto, todas las condiciones
    // se han cumplido, por lo que se devuelve el valor true
    
  }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

  
});