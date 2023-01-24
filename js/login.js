
class Usuario{
    constructor(nombre,contraseña){
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

let arealog= document.querySelector(".header_user");
let inputUser= document.querySelector(".input_usuario");
let inputPassword=document.querySelector(".input_contraseña");
let nopermanecer= document.querySelector(".input_npconectado");
let inputPasswordRep=document.querySelector(".input_contraseña_rep");


/* LOGIN */
let logAdvertencia=document.querySelector(".log_advertencia");

function login(){
    let usuario=inputUser.value;
    let contraseña=inputPassword.value;

    if (usuario.length==0){
        logAdvertencia.innerText="Ingrese su usuario";
    }

    else if(contraseña.length==0){
        logAdvertencia.innerText="Ingrese su contraseña";
    }

    else{



        if (usuario in localStorage){
            let user=JSON.parse(localStorage.getItem(usuario));
            let contra=user.contraseña;
            if (contraseña == contra){
                let mantenerLog=document.querySelector(".input_npconectado");
                mantenerLog=mantenerLog.checked;
                if (mantenerLog){
                    localStorage.setItem('u_a',JSON.stringify(user));
                }
                else{
                    sessionStorage.setItem('u_a',JSON.stringify(user));
                }
                Swal.fire({
                    title: `Bienvenido ${user.nombre}`,
                  }).then(()=>{
                    window.location.href="../index.html";
                  });
            }

            else{
                logAdvertencia.innerText="Contraseña incorrecta";
            }
        }

        else{
            logAdvertencia.innerText="Ese usuario no ha sido registrado";
        }
    }
}

let boton_login = document.querySelector(".flecha_login");

boton_login.addEventListener("click",(evento)=>{
    evento.preventDefault();
    login();
});
