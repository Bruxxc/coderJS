
/*FUNCIONES*/

/*VALIDAR SI ES UN NÚMERO*/

function validarNumero(entrada){
    let largo= entrada.length;
    console.log(largo);
    let i=0;
    let valida=true;
    console.log("prueba:----");
    while ((i<largo)&&(valida)){
        console.log(entrada.charCodeAt(i));
        if ((entrada.charCodeAt(i)>57) || (entrada.charCodeAt(i)<48)){
            valida=false;
        }
        i++;
    }

    return valida;
}

/*ELEGIR OPERACION DEL MENÚ*/

function elegirOperacion(){
    return prompt(`
   -+-+->|||MATH-FAST|||<-+-+-
    
    ELIJA LA OPERACIÓN
    1-Suma
    2-Resta
    3-Multiplicación
    4-División y Resto 
    5-Encontrar raices 
    6-Verificar si es número primo
    7-Primos entre dos numeros
    8-Descomponer en primos
    9-Modo Calculadora
    x-Salir`);

}

/*SUMAR*/

function sumar(){
    const a=parseInt(prompt("Ingrese el primer número"));
    const b=parseInt(prompt("Ingrese el segundo número"));
    alert(`El resultado es: ${a+b}`);
}
/*RESTAR*/

function restar(){
    const a=parseInt(prompt("Ingrese el primer número"));
    const b=parseInt(prompt("Ingrese el número a restar"));
    alert(`El resultado es: ${a-b}`);
}

/*MULTIPLICAR*/

function multiplicar(){
    const a=parseInt(prompt("Ingrese el primer número"));
    const b=parseInt(prompt("Ingrese el segundo número"));
    alert(`El resultado es: ${a*b}`);
}

/*DIVIDIR*/

function dividir(){
    const a=parseInt(prompt("Ingrese el numerador"));
    const b=parseInt(prompt("Ingrese el denominador"));
    alert(`El resultado es: ${a/b} y el resto es: ${a%b}`);
}


//**POTENCIAR**/

function potenciar(b,e){
    let resultado=1;
    
    if (e>=0){
    for(let i=1;i<=e;i++){
        resultado=resultado*b;
    }
    }
    else{
        let exp=e*-1;
        for(let i=1;i<=exp;i++){
            resultado=resultado/b;
        }
    }
    return resultado;
}


//**CALCULAR RAICES**//

function raices(){
    const a=parseInt(prompt("Ingresa el coeficiente de x^2"));
    const b=parseInt(prompt("Ingresa el coeficiente de x"));
    const c=parseInt(prompt("Ingresa el término independiente"));

    if (a==0){
        alert(`La raíz es ${((-c)/b)}`);
    }
    else if ((a==0) && (b==0)){
        alert("No tiene raices");
    }
    else{
        const determinante=((b*b)-(4*a*c));
        if (determinante>0){
            alert(`Las raices son: ${((-b)+Math.sqrt(determinante))/(2*a)} y ${((-b)-Math.sqrt(determinante))/(2*a)}`);
        }
        else if(determinante==0){
            alert(`${(-b)/(2*a)} es raiz doble`);

        }
        else{
            alert(`No tiene raices reales`);
        }
    }
}

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

/*PRIMOS ENTRE DOS NÚMEROS*/

function primosEntre(a,b){
    let nums=`Los primos entre ${a} y ${b} son:
    `
    let cantidad=0;
    for(let i=a;i<=b;i++){
        if(esPrimo(i)){
            nums= nums + ` ${i};`;
            cantidad++;
        }
    }
    return [cantidad,nums];
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


//** MENÚ CALCULADORA **//

function calculadoraInterfaz(res){
    
    return a=prompt(`
    -->${res}<--
    ELJA LA OPERACIÓN:
    1-Suma
    2-Resta
    3-Multiplicación
    4-División
    5-Potenciar
    r-Reiniciar
    x-Volver al menú
    `);
}



//** CALCULADORA **//

function calculadora(){
    let salir=false;
    let resultado=0;
    while (!salir){
        operacion=calculadoraInterfaz(resultado);
        switch(operacion){
            case "1":{
                resultado=resultado+parseInt(prompt("Ingrese el número a sumar"));
                break;
            }
            case "2":{
                resultado=resultado-parseInt(prompt("Ingrese el número a restar"));
                break;
            }
            case "3":{
                resultado=resultado*parseInt(prompt("Ingrese el número a multiplicar"));
                break;
            }
            case "4":{
                resultado=resultado/parseInt(prompt("Ingrese el denominador"));
                break;
            }
            case "5":{
                let exponente=prompt("ingrese el exponente");
                resultado=potenciar(resultado,exponente);
                break;
            }

            case "r":{
                resultado=0;
                break;
            }
            case "x":{
                salir=true;
                break;
            }
            default:{
                alert("Introduzca una opción valida");
                break;
            }
    }
}
}


//** ----->>> PROGRAMA PRINCIPAL <<<----- **/
// var salir = false;

//**INGRESAR**//


// while(!salir){

    // let usuario=prompt("Ingrese su usuario");
    // let constraseña=prompt("Ingrese su constraseña");
    // alert(`BIENVENIDO ${usuario}`);

    let bucle = true;


    //**  MENÚ PRINCIPAL  **//

    while (bucle){
        let opcion=elegirOperacion();
        switch(opcion){
            case "1":{
                sumar();
                break;
            }
            case "2":{
                restar();
                break;
            }
            case "3":{
                multiplicar();
                break;
            }
            case "4":{+
                dividir();
                break;
            }
            case "5":{
                raices();
                break;
            }
            case "6":{
                num=parseInt(prompt("Ingrese el número a comprobar"));
                if (esPrimo(num)){
                    alert(`${num} es primo`);
                }
                else{
                    alert(`${num} NO es primo`);
                }
                break;
            }

            case "7":{
                inicio=parseInt(prompt("Ingresa el número de inicio"));
                fin=parseInt(prompt("Ingresa el número final"));
                primos=primosEntre(inicio,fin);
                if (primos[0]>0){
                    alert(primos[1]);
                }
                else{
                    alert(`No existen números primos entre ${inicio} y ${fin}`);
                }
                break;
            }

            case "8":{
                let n=parseInt(prompt("ingrese el número a factorizar"));
                let factores=expresarEnPrimos(n);
                let alerta=`${n} se descompone como: `
                factores.forEach(element => {
                    alerta=alerta+`${element} * `;
                });
                alerta=alerta.substring(0,(alerta.length)-2);
                alert(alerta);
                break;
            }

            case "9":{
                calculadora();
                break;
            }


            case "x":{
                bucle=false;
                break;
            }

            default:{
                alert("Introduzca una opción valida");
                break;
            }
        }
    }


// }

