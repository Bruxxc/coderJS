/*FUNCIONES DE ARMADO DE FIGURAS*/

function parteLado(espacios){
    let fragmento=".";
    for(let i=0;i<espacios;i++){
        fragmento=fragmento + " ";
    }
    fragmento= fragmento + ".";

    return fragmento;
}

function partePiso(puntos){
    let fragmento="";
    for(let i=0;i<puntos;i++){
        fragmento=fragmento + ". ";
    }
    return fragmento;
}

function partePunta(espacios){
    let fragmento="";
    for(let i=0;i<espacios;i++){
        fragmento=fragmento + " ";
    }
    fragmento= fragmento + ".";
    return fragmento;
}

/* CLASES */

class Cuadrado{
    constructor(lado){
        this.lado=Math.abs(Math.round(lado));
    }

    dibujar(){
        let l=this.lado;
        let dibujo="";

        dibujo=partePiso(l+1)+ `\n`;

        for(let i=0;i<(l-1);i++){
            dibujo=dibujo + parteLado(((2*l)-1))+`\n`;
        }

        dibujo= dibujo + partePiso(l+1);

        console.log(dibujo);
        alert(dibujo);
    }

    medidas(){
        alert(`
        Medidas:
        -> lado:${this.lado}`)
    }

    perimetro(){
        alert(this.lado*4);
    }

    area(){
        alert(this.lado*this.lado);
    }
}

class Rectangulo{
    constructor(base,altura){
        this.base=Math.abs(Math.round(base));
        this.altura=Math.abs(Math.round(altura));
    }

    dibujar(){

        let b=this.base;
        let h=this.altura;
        let dibujo="";

        dibujo=partePiso(b+1)+ `\n`;

        for(let i=0;i<(h-1);i++){
            dibujo=dibujo + parteLado(((2*b)-1))+`\n`;
        }

        dibujo= dibujo + partePiso(b+1);

        console.log(dibujo);
        alert(dibujo);
    }

    medidas(){
        alert(`
        Medidas: 
        -> base: ${this.base}
        -> altura: ${this.altura}`);
    }

    perimetro(){
        alert(this.altura*2+this.base*2);
    }

    area(){
        alert(this.altura*this.base);
    }
}

class TrianguloEq{
    constructor(lado){
        this.lado=Math.abs(Math.round(lado));
    }

    dibujar(){
        let l=this.lado;
        let dibujo="";
        let reps=l-1;
        let espaciosOut=l-1;
        let espaciosIn=1;
        

        dibujo=partePunta(l) +`\n`;

        for(let i=0;i<reps;i++){
            let aux="";
            for(let j=0;j<espaciosOut;j++){
                aux=aux+" ";
            }
            espaciosOut=espaciosOut-1;
            aux=aux+parteLado(espaciosIn);
            espaciosIn=espaciosIn+2;
            console.log(aux);
            dibujo=dibujo + aux + `\n`;
        }

        dibujo= dibujo + partePiso(l+1);

        console.log(dibujo);
        alert(dibujo);

    }

    medidas(){
        alert(`
        Medidas:
        -> lado:${this.lado}`);
    }

    perimetro(){
        alert(this.lado*3);
    }

    area(){
        let altura=this.lado * Math.sqrt(3)/2;
        alert((altura*this.lado)/2);
    }
}

class TrianguloRec{
    constructor(base,altura){
        this.base=base;
        this.altura=altura;
        this.hipotenusa=Math.round((Math.sqrt((base*base)+(altura*altura)))*10)/10;
        this.anguloAB=90;
        this.anguloHB=Math.round((Math.atan(altura/base)*57.3)*100)/100;
        this.anguloAH=Math.round((Math.atan(base/altura)*57.3)*100)/100;
    }

    medidas(){
        alert(`
        Medidas:
        -> base: ${this.base}
        -> altura: ${this.altura}
        -> hipotenusa: ${this.hipotenusa}`);
    }

    area(){
        alert(this.altura*this.base/2);
    }

    perimetro(){
        alert(this.base+this.base+this.hipotenusa)
    }

    angulo(){
        let opcion=prompt(`Escoja el ángulo a calcular:
        1-ángulo altura|base
        2-ángulo hipotenusa|base
        3-ángulo altura|hipotenusa`);

        if (opcion=="1"){
            alert(`${this.anguloAB}°`);
        }

        else if(opcion=="2"){
            alert(`${this.anguloHB}°`);
        }

        else if(opcion=="3"){
            alert(`${this.anguloAH}°`);
        }

        else{
            alert("Opción inválida");
        }
    }
}

function elegirOperacion(){
    return prompt(`
   -+-+->|||GEOMETRÍA|||<-+-+-
    
    ELIJA LA OPERACIÓN
    1-Crear Cuadrado
    2-Crear Rectángulo
    3-Crear Triángulo equilátero
    4-Crear Triángulo rectángulo
    x-Salir`);

}

function menuC(figura,tipo){
    if(tipo==1){
    return prompt(`
   -+-+->|||${figura}|||<-+-+- 

    ELIJA LA OPERACIÓN
    1-Medidas
    2-Dibujar ${figura}
    3-Calcular Perímetro
    4-Calcular Área
    x-Salir`);}

    if (tipo==2){
        return prompt(`
        -+-+->|||${figura}|||<-+-+- 
     
         ELIJA LA OPERACIÓN
         1-Medidas
         2-Calcular Ángulos
         3-Calcular Perímetro
         4-Calcular Área
         x-Salir`);
    }

}



///****PROGRAMA PRINCIPAL****///


//**  MENÚ PRINCIPAL  **//

let bucle = true;

while (bucle){
    let opcion=elegirOperacion();
    switch(opcion){
        case "1":{
            let c1 = new Cuadrado(prompt("Medida del lado:"));
            let salir=false;
            
            /* MENU CUADRADO */
            while(!salir){
                let opcion2=menuC("Cuadrado",1);
                switch(opcion2){
                    case "1":{
                        c1.medidas();
                        break;
                    }

                    case "2":{
                        c1.dibujar();
                        break;
                    }
                    
                    case "3":{
                        c1.perimetro();
                        break;
                    }

                    case "4":{
                        c1.area();
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
            break;
        }

        case "2":{
            let r1 = new Rectangulo(prompt("Medida de la base:"),prompt("Medida de la altura:"));
            let salir=false;
            
            /* MENU RECTANGULO */
            while(!salir){
                let opcion2=menuC("Rectángulo",1);
                switch(opcion2){
                    case "1":{
                        r1.medidas();
                        break;
                    }

                    case "2":{
                        r1.dibujar();
                        break;
                    }
                    
                    case "3":{
                        r1.perimetro();
                        break;
                    }

                    case "4":{
                        r1.area();
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
            break;
        }
       case "3":{
            let t1 = new TrianguloEq(prompt("Medida del lado:"));
            let salir=false;
            
            /* MENU TRIÁNGULO EQUILÁTERO */
            while(!salir){
                let opcion2=menuC("Triángulo Equilátero",1);
                switch(opcion2){
                    case "1":{
                        t1.medidas();
                        break;
                    }

                    case "2":{
                        t1.dibujar();
                        break;
                    }
                    
                    case "3":{
                        t1.perimetro();
                        break;
                    }

                    case "4":{
                        t1.area();
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
            break;
        }

        case "4":{
            let t2 = new TrianguloRec(prompt("Medida de la base:"),prompt("Medida de la altura:"));
            let salir=false;
            
            /* MENU TRIÁNGULO RECTÁNGULO*/
            while(!salir){
                let opcion2=menuC("Triángulo Rectángulo",2);
                switch(opcion2){
                    case "1":{
                        t2.medidas();
                        break;
                    }

                    case "2":{
                        t2.angulo();
                        break;
                    }
                    
                    case "3":{
                        t2.perimetro();
                        break;
                    }

                    case "4":{
                        t2.area();
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