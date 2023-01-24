/*DESPLEGAR MENU NAV*/

let menuNav= document.querySelector(".nav_mobile");
let barrita = document.querySelector(".barra_menu");
let mostrando=[false,false];
let operando=false;
let arrOps=["+","-","*","/","%","."];
let arrNums=["0","1","2","3","4","5","6","7","8","9"];

function desplegarMenu(menu,activador,indice){
    
    if (!mostrando[indice]){
        if (indice==1){
            if (mostrando[0]==true){
                desplegarMenu(menuNav,barrita,0);
            }
        }

        else{
            if (mostrando[1]==true){
                desplegarMenu(menuLog,persona,1);
            }
        }
        menu.style.display= "block";
        activador.style.filter= "drop-shadow(0px 0px 3px #D5A021)";
        mostrando[indice]=true;
    }

    else{
        menu.style.display= "none";
        activador.style.filter= "none";
        mostrando[indice]=false;
    }

}

barrita.addEventListener("click",()=>{desplegarMenu(menuNav,barrita,0)});


/******************************************************************/

// /*DESPLEGAR MENU LOG*/

let menuLog= document.querySelector(".log_menu");
let persona = document.querySelector(".header_user");


persona.addEventListener("click",()=>{desplegarMenu(menuLog,persona,1)});


/*CERRAR SESIÓN*/
function logOut(){
    if("u_a" in localStorage){
        localStorage.removeItem("u_a");
        window.location.href="../index.html";}
    else{
        sessionStorage.removeItem("u_a");
        window.location.href="../index.html";
    }
}

/* MOSTRAR NOMBRE DE USUARIO */


if(("u_a" in localStorage)){
   let usuario_actual= JSON.parse(localStorage.getItem("u_a"));
   let menu_user= document.querySelector(".log_menu");
    menu_user.innerHTML=`<li style="color:black; font-size:10px;"> ${usuario_actual.nombre} </li>
    <li class="cerrar_sesion" onclick="logOut();"> CERRAR SESIÓN </li>`;
}

else if ("u_a" in sessionStorage){
    let usuario_actual= JSON.parse(sessionStorage.getItem("u_a"));
    let menu_user= document.querySelector(".log_menu");
    menu_user.innerHTML=`<li style="color:black; font-size:10px;"> ${usuario_actual.nombre} </li>
    <li class="cerrar_sesion" onclick="logOut();"> CERRAR SESIÓN </li>`;
}

/*****CALCULADORA FLOTANTE*****/
///////////////////////////////////////////////////////////////////////

/*MOSTRAR CALCULADORA*/

let iconoCalculadora= document.querySelector(".aux_calc_img");
let calculadora= document.querySelector(".aux_calc_interfaz");
let mostrandoCalculadora=false;
iconoCalculadora.addEventListener("click",()=>{

    if (!mostrandoCalculadora){
        calculadora.style.display="grid";
        mostrandoCalculadora=true;
    }

    else{
        calculadora.style.display="none";
        mostrandoCalculadora=false; 
    }
});


/*****CALCULADORA PROGRAMA*****/
///////////////////////////////////////////////////////////////////////
let pantalla=document.querySelector(".calc_pantalla");
let acumulador=0;
let nulo=true;

let botonesTodos=document.querySelectorAll(".boton_numero");

/*REDONDEAR*/

function redondear(x){
    return (Math.round((x*1000))/1000)
};



/*NUMEROS*/

botonesTodos.forEach(boton => {

    let valor_boton=boton.innerText;
    boton.addEventListener("click",()=>{
        operando=false;
        if (nulo){
            if (boton.innerText=="0"){

            }
            else{
            pantalla.innerText=valor_boton;
            nulo=false;}
        }

        else{
        pantalla.innerText=pantalla.innerText+valor_boton;
        }
    })
    
});

/*BORRAR TODO*/

let boton_reiniciar=document.querySelector(".boton_reiniciar");

boton_reiniciar.addEventListener("click",()=>{
    pantalla.innerText="0";
    nulo=true;
    operando=false;
})


/*BORRAR ULTIMO*/

let boton_borrar=document.querySelector(".boton_borrar");

boton_borrar.addEventListener("click",()=>{
    let enPantalla = pantalla.innerText;
    if(enPantalla.length > 1){
        let nuevo=enPantalla.substring(0,(enPantalla.length-1));
        
        if (arrOps.includes(nuevo[nuevo.length-1])){
            operando=true;
        }
        else{
            operando=false;
        }

        pantalla.innerText=enPantalla.substring(0,(enPantalla.length-1));
    }

    else{
        pantalla.innerText="0";
        nulo=true;
    }
})


/*SEPARAR POR TERMINOS*/

function separarPorTerminos(arr){
    let final=[];
    let separado1=arr.split("+");
    let separado2=separado1.filter(element => element.includes("-"));

    separado2.forEach(element => {
        let aux=element.split("-");

        if(aux[0]==''){
            final.push('0');
            aux.forEach(num => {
                if(num!=""){
                final.push(`-${num}`);}
            });
        }

        else{
            let primero=true;
            aux.forEach(num => {

                if(primero){
                final.push(`${num}`);
                primero=false;
                }

                else{
                    final.push(`-${num}`); 
                }
                });

        }
    });
    
    separado1=separado1.filter(element => !(element.includes("-")));
    separado1.forEach(element => {
        final.push(element);
    });
    console.log(final);
    return final;
};

/*RESOLVER OPERACIONES INTERNAS */

/*ENCERRAR NUMEROS*/

function encerrarNums(arr,char){
    let indice=arr.indexOf(char);
    let i1=indice;
    let i2=indice;
    while(arr[i1-1] in arrNums){
        i1--;
    }
    while(arr[i2+1] in arrNums){
        i2++;
    }
    return [i1,indice-1,indice+1,i2];
};

/*OPERACIONES A FUNCIONES */

function multiplicar(a,b){
    return a*b;
}

function dividir(a,b){
    return a/b;
}

function resto(a,b){
    return a%b;
}

function potencia(a,b){
    return Math.pow(a,b);
}

/*SIMPLIFICAR EXPRESION*/

function resExp(arr,char,funcion){
    let indicesNums=encerrarNums(arr,char);
    let num1=arr.substring(indicesNums[0],indicesNums[1]+1);
    let num2=arr.substring(indicesNums[2],indicesNums[3]+1);
    num1=parseFloat(num1);
    num2=parseFloat(num2);
    if (arr.substring(indicesNums[3]+1)==`${num2}`){
        arr=arr.substring(0,indicesNums[0]) + `${funcion(num1,num2)}`;
    }

    else{
        arr=arr.substring(0,indicesNums[0]) + `${funcion(num1,num2)}`+ arr.substring(indicesNums[3]+1);
    }arr
    return arr;
}

/*RESOLVER OPERACIONES INTERNAS */

function resOps2(arr){
    let resultado=arr;
    while(resultado.includes("^")){
        resultado=resExp(resultado,"^",potencia);
    }

    while(resultado.includes("%")){
        resultado=resExp(resultado,"%",resto);
    }

    while(resultado.includes("x")){
        resultado=resExp(resultado,"x",multiplicar);
    }

    while(resultado.includes("/")){
        resultado=resExp(resultado,"/",dividir);
    }

    return resultado;
}

/*IGUAL*/

let boton_igual= document.querySelector(".boton_igual");
function resEnPantalla(){
    let total=0;
    let enPantalla=pantalla.innerText;
    enPantalla=separarPorTerminos(enPantalla);
    console.log(enPantalla);
    enPantalla.forEach(element => {
        console.log(element);
        element=resOps2(element);
        console.log(element);
        total=total + parseFloat(element);
    });
    pantalla.innerText=`${total}`;
}

boton_igual.addEventListener("click",()=>{
    resEnPantalla();
})


/****OPERACIONES****/



function agregarOperacion(boton,caracter){
    boton.addEventListener(("click"),()=>{
        let enPantalla=pantalla.innerText;
        if(!operando){
        pantalla.innerText=enPantalla + `${caracter}`;
        operando=true;}

        if (nulo){
            nulo=false;
        }
    });
};

/*SUMAR*/

let boton_sumar=document.querySelector(".boton_sumar");
agregarOperacion(boton_sumar,"+");



/*RESTAR*/

let boton_restar=document.querySelector(".boton_restar");
agregarOperacion(boton_restar,"-");


/*MULTIPLICAR*/

let boton_multiplicar = document.querySelector(".boton_multiplicar");
agregarOperacion(boton_multiplicar,"x");

/*DIVIDIR*/

let boton_dividir = document.querySelector(".boton_dividir");
agregarOperacion(boton_dividir,"/");


/*MÓDULO*/

let boton_modulo = document.querySelector(".boton_modulo");
agregarOperacion(boton_modulo,"%");


/*PUNTO*/

let boton_punto = document.querySelector(".boton_punto");
agregarOperacion(boton_punto,".");

/*ELEVAR*/

let boton_elevar = document.querySelector(".boton_elevar");
agregarOperacion(boton_elevar,"^");

/*SQRT*/

let boton_sqrt= document.querySelector(".boton_sqrt");
boton_sqrt.addEventListener("click",()=>{
    resEnPantalla();
    let enPantalla=pantalla.innerText;
    enPantalla=parseFloat(enPantalla);
    pantalla.innerText=Math.sqrt(enPantalla);
})

/*SQR*/

let boton_sqr= document.querySelector(".boton_sqr");
boton_sqr.addEventListener("click",()=>{
    resEnPantalla();
    let enPantalla=pantalla.innerText;
    enPantalla=parseFloat(enPantalla);
    pantalla.innerText=Math.pow(enPantalla,2);
})

/**TRIGONOMETRIA**/

/*SENO*/

let boton_sin= document.querySelector(".boton_sin");
boton_sin.addEventListener("click",()=>{
    resEnPantalla();
    let enPantalla=pantalla.innerText;
    enPantalla=parseFloat(enPantalla);
    enPantalla=enPantalla*(Math.PI/180);
    pantalla.innerText=Math.round( Math.sin(enPantalla)*100000)/100000;
});

/*COSENO*/

let boton_cos= document.querySelector(".boton_cos");
boton_cos.addEventListener("click",()=>{
    resEnPantalla();
    let enPantalla=pantalla.innerText;
    enPantalla=parseFloat(enPantalla);
    enPantalla=enPantalla*(Math.PI/180);
    pantalla.innerText =Math.round( Math.cos(enPantalla)*100000)/100000;
});

/*TANGENTE*/

let boton_tan= document.querySelector(".boton_tan");
boton_tan.addEventListener("click",()=>{
    resEnPantalla();
    let enPantalla=pantalla.innerText;
    enPantalla=parseFloat(enPantalla);
    if (enPantalla==90){
        pantalla.innerText= "Math ERROR";
    }
    else{
    enPantalla=enPantalla*(Math.PI/180);
    pantalla.innerText= Math.round( Math.tan(enPantalla)*100000)/100000;
    }
});


/*ARCOSENO*/

let boton_asin= document.querySelector(".boton_asin");
boton_asin.addEventListener("click",()=>{
    resEnPantalla();
    let enPantalla=pantalla.innerText;
    enPantalla=parseFloat(enPantalla);
    enPantalla=Math.asin(enPantalla);
    pantalla.innerText= Math.round(enPantalla*(180/Math.PI)*1000)/1000;
});

/*ARCOCOSENO*/

let boton_acos= document.querySelector(".boton_acos");
boton_acos.addEventListener("click",()=>{
    resEnPantalla();
    let enPantalla=pantalla.innerText;
    enPantalla=parseFloat(enPantalla);
    enPantalla=Math.acos(enPantalla);
    pantalla.innerText= Math.round(enPantalla*(180/Math.PI)*1000)/1000;
});

/*ARCOTANGENTE*/

let boton_atan= document.querySelector(".boton_atan");
boton_atan.addEventListener("click",()=>{
    resEnPantalla();
    let enPantalla=pantalla.innerText;
    enPantalla=parseFloat(enPantalla);
    enPantalla=Math.atan(enPantalla);
    pantalla.innerText= Math.round(enPantalla*(180/Math.PI)*1000)/1000;
});


/*DESCOMPONER EN PRIMOS*/

//**ES PRIMO**//

function esPrimo(a){
    const fin= Math.floor(Math.sqrt(a));
    let primo=true;
    let i=2;
    while((i<=fin) && (primo)){
        if((a%i) != 0){
            i++;
        }
        else{
            primo=false;
        }
    }

    return primo;
}

/*ENCONTRAR EL PRIMER DIVISOR DE UN NÚMERO*/

function encontrarDivisor(n){ 
    const fin= Math.floor(Math.sqrt(n));
    let i=2;
    let encontrado=false;
    let primerDivisor=-1;
    while((i<=fin) && (!encontrado)){
        if((n%i) == 0){
            primerDivisor=i;
            encontrado=true;
        }
        else{
            i++;
        }
    }
    return primerDivisor;
}


/**DESCOMPONER EN PRIMOS**/

function expresarEnPrimos(n){
    let factores=[];
    let aux=n;
    let i=0;
    while(!esPrimo(aux)){
        let div=encontrarDivisor(aux);
        factores[i]=div;
        aux=(aux)/div;
        i++;
    }
    factores[i]=aux;
    return factores;
}

let boton_primos= document.querySelector(".calc_primo");
boton_primos.addEventListener("click",()=>{
    resEnPantalla();
    let enPantalla=parseInt(pantalla.innerText);
    factores=expresarEnPrimos(enPantalla);
    let aMostrar=``;
    factores.forEach(element => {
        aMostrar=aMostrar+`${element}x`;
    });
    aMostrar=aMostrar.substring(0,(aMostrar.length)-1);
    pantalla.innerText=aMostrar;
})

/*CALCULAR RAICES*/


function raices(a,b,c){

    if ((a==0) && (b!=0)){
       return(`X=${redondear(((-c)/b))}`);
    }

    else if ((a==0) && (b==0)){
        return("No tiene raices");
    }

    else{
        const determinante=((b*b)-(4*a*c));
        if (determinante>0){
            return(`X1=${redondear(((-b)+Math.sqrt(determinante))/(2*a))} y X2=${redondear(((-b)-Math.sqrt(determinante))/(2*a))}`);
        }
        else if(determinante==0){
           return(`raiz doble: X=${redondear((-b)/(2*a))}` );

        }
        else{
            return(`No tiene raices reales`);
        }
    }

}

let raices_boton=document.querySelector(".calc_raices");
let x2=document.querySelector(".x2");
let x1=document.querySelector(".x1");
let x0=document.querySelector(".x0");



raices_boton.addEventListener("click",()=>{
    let rx2=x2.value;
    let rx1=x1.value;
    let rx0=x0.value;
    pantalla.innerText= raices(rx2,rx1,rx0);

});


///***MOSTRAR CALCULADORA***/
//(SOLO CUANDO HAYA UN USUARIO LOGUEADO)

if(("u_a" in localStorage) || ("u_a" in sessionStorage)){
    let aux_calc=document.querySelector(".aux_calc");
    aux_calc.style.display= "flex";
}
