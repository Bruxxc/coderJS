class PreguntaR{
    constructor(pregunta,respuesta){
        this.pregunta=pregunta;
        this.respuesta=respuesta;
    }

    preguntar(){
        return prompt(this.pregunta);
    }
}

class PreguntaMO{
    constructor(pregunta,opcion1,opcion2,opcion3,opcion4,respuesta){
        this.pregunta=pregunta;
        this.opcion1=opcion1;
        this.opcion2=opcion2;
        this.opcion3=opcion3;
        this.opcion4=opcion4;
        this.respuesta=respuesta;
    }

    preguntar(){
        let texto=this.pregunta + `\n a) ${this.opcion1}`+`\n b) ${this.opcion2}` +`\n c) ${this.opcion3}` +`\n d) ${this.opcion4}`;
        let res=prompt(texto);
        let valida=false;

        while(!valida){
        if((res.charCodeAt(0)>= 97) && (res.charCodeAt(0)<=100)){
            valida=true;
        }

        else{
            alert("OPCIÓN INVÁLIDA, INTENTE DE NUEVO");
            res=prompt(texto);
        }

        }
        return res;
    }
}

class Examen{
    constructor(tipo,nivel){
        this.tipo=tipo;
        this.nivel=nivel;
        this.preguntas=[];
    }

    agregarPregunta(pregunta){
        this.preguntas.push(pregunta);
    }

    comenzarExamen(){
        let nota=0;
        this.preguntas.forEach(pregunta => {
           let res=pregunta.preguntar();
            if(res==pregunta.respuesta){
                nota++;
                alert("RESPUESTA CORRECTA");
            }

            else{
                alert("RESPUESTA INCORRECTA")
            }
        });

        alert(`Su nota final es de: ${nota}/${this.preguntas.length}`);
    }

}

function elegirOperacion(){
    return prompt(`
   -+-+->|||EXÁMENES|||<-+-+-
    
    ELIJA UN EXÁMEN
    1- Geometría
    2- Operaciones
    3- Ecuaciones
    x-Salir`);

}


/*CREAR EXÁMENES*/

/*EXÁMEN 1*/

let p1= new PreguntaMO("¿Cuál es el área de un cuadrado de 4 de lado?",12,10,18,16,"d");
let p2= new PreguntaR("Calcule el área de un triángulo equilátero de 6 de lado",9);
let p3= new PreguntaR("Calcule el perímetro de un rectángulo de base=16 y altura=10",160);
let p4= new PreguntaMO("¿Cómo se llama el lado de mayor longitud de un triángulo rectángulo?","lado adyacente","lado opuesto", "hipotenusa", "hipotensia","c");
let p5= new PreguntaMO("En un triángulo rectángulo se conocen la medida de la hipotenusa:5 y de uno de sus lados:3. ¿Cuál es la medida del lado restante?", 2,3,4,5,"c");
let p6= new PreguntaMO("¿Cuál es el área de un círculo de 5.5 de radio?",17.3,16.5,17.9,15.7,"a");
let e1= new Examen("Geometría","Básico");
e1.agregarPregunta(p1);
e1.agregarPregunta(p2);
e1.agregarPregunta(p3);
e1.agregarPregunta(p4);
e1.agregarPregunta(p5);
e1.agregarPregunta(p6);

/*EXÁMEN 2*/

let o1 = new PreguntaR("¿Cuál es el resultado de: (2*3*4*5-4+7)/3?",41);
let o2 = new PreguntaR("¿Cuál es el resultado de ((2^3)^2)/(2^4)?",4);
let o3 = new PreguntaR("De los 45 estudiantes que fueron de excursion, 22 visitaron el Museo de Ciencias, 8 el Museo de Bellas Artes y 12 fueron al Acuario. Si ningún estuiante visitó más de un lugar,¿cuántos estudiantes no visitaron ninguno?",3);
let o4 = new PreguntaR("Las manzanas cuestan $5.9 el kg y las uvas cuestan $8.9 el kg; Si tienes $74.0 y quieres comprar la misma cantidad de kg de cada fruta,¿Cuántos kg de cada fruta puedes comprar como máximo con ese dinero?",5);
let o5 = new PreguntaMO("Supón que cada día un murciélago come el doble de mosquitos que comió el día anterior más 1; Si hoy comió 10 mosquitos. Si hoy es el primer día de la semana,¿Cuántos mosquitos habrá comido en total al finalizar la semana?",1200,1270,1390,1420,"c");
let o6 = new PreguntaMO("Un automovil tarda 8 horas en recorrer una distancia yendo a 90 km/h ¿Cuántas horas tardará en recorrer la misma distancia yendo a 60 km/h?",10,12,6,14,"b");
let e2= new Examen("Operaciones y Razonamiento","Básico");
e2.agregarPregunta(o1);
e2.agregarPregunta(o2);
e2.agregarPregunta(o3);
e2.agregarPregunta(o4);
e2.agregarPregunta(o5);
e2.agregarPregunta(o6);


/*EXÁMEN 3*/

let k1 = new PreguntaR("Considerando la igualdad: 7x+3=9x-3 ;  Hallar el valor de X para el cual la igualdad se cumple ",3);
let k2 = new PreguntaMO("Hallar las raices de la siguiente función: f(x)=x^2-x-2","1 y 2","-1 y 2","1 y -1","-2 y 1","b");
let k3 = new PreguntaMO("Considerando la siguiente función: g(x)=(9x^2 - 1)/(x^2 -x -2) ; Hallar el dominio de g(x)","R","(-inf,-1) U (2,+inf)","(-inf,-1) U (-1,2) U (2,+inf)","(-inf,-1) U (-1,+inf)","c");
let k4 = new PreguntaMO("¿Cuántas raices tiene la siguiente funcion? : x^3 + x^2 - 2 ",0,1,2,3,"b");
let k5 = new PreguntaMO("Un juego de cartas consiste en sacar 10 cartas del mazo. La cantidad de puntos obtenidos depende de la cantidad de cartas del mismo palo, sumando puntos solo por el palo con mayor cantidad de cartas repetidas. Si al sacar 4 cartas repetidas se obtienen 6 puntos; al sacar 5 se obtienen 13 y al sacar 7 se obtienen 33; ¿Cuál de las siguientes funciones es la que mejor se ajusta al cálculo de los puntos?","7x^2-5x+4","13x^2-6x+33","4x+6","x^2-2x-2","d");
let e3 = new Examen("Ecuaciones","Básico");
e3.agregarPregunta(k1);
e3.agregarPregunta(k2);
e3.agregarPregunta(k3);
e3.agregarPregunta(k4);
e3.agregarPregunta(k5);




/*PROGRAMA PRINCIPAL*/

let bucle = true;


//**  MENÚ PRINCIPAL  **//

while (bucle){
    let opcion=elegirOperacion();
    switch(opcion){
        case "1":{
            e1.comenzarExamen();
            break;
        }
        case "2":{
            e2.comenzarExamen();
            break;
        }
        case "3":{
            e3.comenzarExamen();
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







