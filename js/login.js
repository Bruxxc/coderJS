
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

// arealog.addEventListener('click',login);
// console.log(arealog);
// let usuario=prompt("Ingrese su usuario");
// let contraseña=prompt("Ingrese su contraseña");
// localStorage.setItem(`${usuario}`,usuario);
// localStorage.setItem(`${contraseña}`,contraseña);
// console.log(`${usuario}` in localStorage);

/* LOGIN */

function login(){
    let usuario=inputUser.value;
    let contraseña=inputPassword.value;

    if (usuario.length==0){
        alert("Ingrese su usuario");
    }

    else if(contraseña.length==0){
        alert("Ingrese su contraseña");
    }

    else{



        if (usuario in localStorage){
            let user=JSON.parse(localStorage.getItem(usuario));
            let contra=user.contraseña;
            console.log(contra);
            if (contraseña == contra){
                let mantenerLog=document.querySelector(".input_npconectado");
                mantenerLog=mantenerLog.checked;
                console.log(mantenerLog);
                if (mantenerLog){
                    localStorage.setItem('u_a',JSON.stringify(user));
                    alert(`Bienvenido ${user.nombre}`);
                    window.location.href="../index.html";
                }

                else{
                    sessionStorage.setItem('u_a',JSON.stringify(user));
                    alert(`Bienvenido ${user.nombre}`);
                    window.location.href="../index.html";
                }
            }

            else{
                alert("Contraseña incorrecta");
            }
        }

        else{
            alert("Ese usuario no ha sido registrado");
        }
    }
}

let boton_login= document.querySelector(".flecha_login");

boton_login.addEventListener("click",(evento)=>{
    evento.preventDefault();
    login();
});
