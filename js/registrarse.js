
class Usuario{
    constructor(nombre,contraseña,email){
        this.nombre=nombre;
        this.contraseña=contraseña;
        this.calificaciones=[];
        this.email=email;
    }

    agregarCalificacion(nueva){
        this.calificaciones.push(nueva);
    }

    cambiarContraseña(nueva){
        this.contraseña=nueva;
    }

}



let inputEmail= document.querySelector(".input_email");
let inputUser= document.querySelector(".input_usuario");
let inputPassword=document.querySelector(".input_contraseña");
let inputPasswordRep=document.querySelector(".input_contraseña_rep");

/*REGISTRARSE*/


function validarEmail(mail) {

    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return(emailRegex.test(mail));
};



function registrarse(){

    let email =inputEmail.value;
    let usuario = inputUser.value;
    let contraseña = inputPassword.value;
    let repcontraseña = inputPasswordRep.value;
    
    if(validarEmail(email)){

        if (usuario.length==0){
            alert("Ingrese su nombre de usuario");
        }

        else if(usuario.length < 5){
                alert("Su usuario debe tener por lo menos 5 caracteres");
        
        }
        
        else{

            if(contraseña.length < 8){
                alert("su contraseña debe tener al menos 8 caracteres");
            }

            else{

                if(contraseña == repcontraseña){

                    if (usuario in localStorage){
                        alert('Nombre de usuario no disponible');
                    }
                    
                    else{
                        let user=new Usuario(usuario,contraseña,email);
                        let guardar=JSON.stringify(user);
                        localStorage.setItem(`${usuario}`,guardar);
                        alert('Usuario registrado con éxito');
                        window.location.href="./login.html";
                    }
            
                    }
            
                else{
                    alert("las contraseñas no coinciden");
                }
            }

        }
    }

    else{
        alert("Introduzca una dirección email válida");
    }


}

let boton_registrarse=document.querySelector(".flecha_registrarse");

boton_registrarse.addEventListener("click",()=>{
    console.log("1");
    registrarse();
});
