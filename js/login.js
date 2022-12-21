
var logged=false;


function login(){

    if (!logged){
    let usuario=prompt("Ingrese su usuario");
    let contraseña=prompt("Ingrese su contraseña");
    logged=true;
    alert(`Bienvenido ${usuario}`);
    }

    else{
        let opcion=prompt(`¿Cerrar Sesión?
        y-Si
        x-No
        `);
        
        if(opcion == "y"){
            logged=false;
        }

        else if (opcion == "x"){

        }

        else{
            alert(`Ingrese una opción válida`);
        }
    }
}
