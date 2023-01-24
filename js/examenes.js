let hoja_examenes= document.querySelector(".hoja_preguntas");
let examen_actual="";


//****MOSTRAR HOJA DE EXAMENES****//

let container_blur=document.querySelector(".container_blur");
let examenes_section=document.querySelector(".examenes_section");

function mostrarHojaExamenes(){
    container_blur.style.display= "grid";
    examenes_section.style.filter= "blur(5px)";
}

/*OCULTAR HOJA DE EXAMENES*/
function ocultarHojaExamenes(){
    container_blur.style.display= "none";
    examenes_section.style.filter= "";
}

///*****CLASES*****///


/**PREGUNTAS**/

class PreguntaR{
    constructor(pregunta,respuesta,num){
        this.pregunta=pregunta;
        this.respuesta=respuesta;
        this.num=num;
    }

    mostrarEnHoja(){
        let aMostrar=document.createElement("div");
        aMostrar.classList.add("preguntaR");
        aMostrar.classList.add("preguntaGEN");
        let pregunta_texto=document.createElement("p");
        pregunta_texto.classList.add("pregunta_texto");
        pregunta_texto.innerText=this.pregunta;
        aMostrar.appendChild(pregunta_texto);
        let pregunta_responder=document.createElement("div");
        pregunta_responder.classList.add("pregunta_respuesta_texto");
        pregunta_responder.innerHTML=`<input type="number" class="p${this.num}">`;
        aMostrar.appendChild(pregunta_responder);
        hoja_examenes.appendChild(aMostrar);
    }

    corregirPregunta(){
        let res=document.querySelector(`.p${this.num}`);
        res=res.value;
        return(res==this.respuesta);
    }
}

class PreguntaMO{
    constructor(pregunta,opcion1,opcion2,opcion3,opcion4,respuesta,num){
        this.pregunta=pregunta;
        this.opcion1=opcion1;
        this.opcion2=opcion2;
        this.opcion3=opcion3;
        this.opcion4=opcion4;
        this.respuesta=respuesta;
        this.num=num;
    }

    mostrarEnHoja(){
        let aMostrar=document.createElement("div");
        aMostrar.classList.add("preguntaMO");
        aMostrar.classList.add("preguntaGEN");
        let pregunta_texto=document.createElement("p");
        pregunta_texto.classList.add("pregunta_texto");
        pregunta_texto.innerText=this.pregunta;
        aMostrar.appendChild(pregunta_texto);
        let pregunta_responder=document.createElement("div");
        pregunta_responder.classList.add("pregunta_respuesta_MO");
        pregunta_responder.innerHTML=`
        <input type="radio" class="p${this.num}" name="p${this.num}" value="a">${this.opcion1}
        <input type="radio" class="p${this.num}" name="p${this.num}" value="b">${this.opcion2}
        <input type="radio" class="p${this.num}" name="p${this.num}" value="c">${this.opcion3}
        <input type="radio" class="p${this.num}" name="p${this.num}" value="d">${this.opcion4}`;
        aMostrar.appendChild(pregunta_responder);
        hoja_examenes.appendChild(aMostrar);
    }

    corregirPregunta(){
        let res=document.querySelectorAll(`.p${this.num}`);
        let correcta=false;
        res.forEach(opcion=>{
            if(opcion.checked==true){
                if(this.respuesta==opcion.value){
                    correcta=true;
                }
            }
        });
        return correcta;
    }
}

class PreguntaVOF{
    constructor(pregunta,respuesta,num){
        this.pregunta=pregunta;
        this.respuesta=respuesta;
        this.num=num;
    }

    mostrarEnHoja(){
        let aMostrar=document.createElement("div");
        aMostrar.classList.add("preguntaVOF");
        aMostrar.classList.add("preguntaGEN");
        let pregunta_texto=document.createElement("p");
        pregunta_texto.classList.add("pregunta_texto");
        pregunta_texto.innerText=this.pregunta;
        aMostrar.appendChild(pregunta_texto);
        let pregunta_responder=document.createElement("div");
        pregunta_responder.classList.add("pregunta_respuesta_MO");
        pregunta_responder.innerHTML=`
        <input type="radio" class="p${this.num}" name="p${this.num}" value="V">V
        <input type="radio" class="p${this.num}" name="p${this.num}" value="F">F`
        aMostrar.appendChild(pregunta_responder);
        hoja_examenes.appendChild(aMostrar);
    }

    corregirPregunta(){
        let res=document.querySelectorAll(`.p${this.num}`);
        let correcta=false;
        res.forEach(opcion=>{
            if(opcion.checked==true){
                if(this.respuesta==opcion.value){
                    correcta=true;
                }
            }
        });
        return correcta;
    }

}


function agregarNotaAUsuario(examen,nota){
    let u_actual="u_a";

    if ("u_a" in localStorage){
        u_actual=localStorage.getItem("u_a");
    }

    else if ("u_a" in sessionStorage){
        u_actual=sessionStorage.getItem("u_a");
    }

    u_actual=JSON.parse(u_actual);
    let nota_examen=[examen,nota];
    let nombre_usuario=u_actual.nombre;
    let examen_realizado=false;

    u_actual.calificaciones.forEach(exam=>{
        if(exam[0]==examen){
            examen_realizado=true;
        }
    })

    if(!examen_realizado){
        u_actual.calificaciones.push(nota_examen);
        u_actual=JSON.stringify(u_actual);
        localStorage.setItem(`${nombre_usuario}`,u_actual);
    
        if ("u_a" in localStorage){
            localStorage.setItem("u_a",u_actual);
        }
    
        else if ("u_a" in sessionStorage){
            sessionStorage.setItem("u_a",u_actual);
        }
    }



}

function actualizarNotas(){
    let u_actual="u_a";

    if ("u_a" in localStorage){
        u_actual=localStorage.getItem("u_a");
    }

    else if ("u_a" in sessionStorage){
        u_actual=sessionStorage.getItem("u_a");
    }

    u_actual=JSON.parse(u_actual);
    
    u_actual.calificaciones.forEach(exam=>{
        console.log(`.n_${exam[0]}`);
        let container_nota=document.querySelector(`.n_${exam[0]}`);
        console.log(container_nota);
        container_nota.innerText=`${exam[1]}`;
    })
    

}

class Examen{
    constructor(nombre,tipo,num){
        this.nombre=nombre;
        this.tipo=tipo;
        this.num=num;
        this.preguntas=[];
    }

    agregarPregunta(pregunta){
        this.preguntas.push(pregunta);
    }

    comenzarExamen(){
        this.preguntas.forEach(pregunta => {
            pregunta.mostrarEnHoja();
        });
    }

    corregirExamen(){
        let nota=0;
        this.preguntas.forEach(pregunta=>{
            if(pregunta.corregirPregunta()){
                nota++;
            };
        });
        agregarNotaAUsuario(this.num,`${nota}/${this.preguntas.length}`);
        Swal.fire(`Tu califiación es: ${nota}/${this.preguntas.length}`);
        ocultarHojaExamenes();
        let preguntas_en_hoja=document.querySelectorAll(".preguntaGEN");
        preguntas_en_hoja.forEach(pregunta => {
            pregunta.remove();
        });
    }

}



// /*CREAR EXÁMENES*/



let boton_cerrar=document.querySelector(".examen_cerrar");
boton_cerrar.addEventListener("click",()=>{
    ocultarHojaExamenes();
    let preguntas_en_hoja=document.querySelectorAll(".preguntaGEN");
    preguntas_en_hoja.forEach(pregunta => {
        pregunta.remove();
    });
})

//**AGREGAR EXÁMEN A INTERFAZ**/
let examenes_geometria=document.querySelector(".examenes_geometria");
let examenes_operaciones=document.querySelector(".examenes_operaciones");
let examenes_ecuaciones=document.querySelector(".examenes_ecuaciones");

function agregarExamen(examen){

    /*EXAMEN*/
    let nuevoExamen=document.createElement("div");
    nuevoExamen.classList.add("examen");

    //NOMBRE//
    let nombre_examen=document.createElement("p");
    nombre_examen.innerText=`${examen.nombre}`;
    nuevoExamen.appendChild(nombre_examen);

    //NOTA//
    let nota_examen=document.createElement("p");
    nota_examen.classList.add("nota_examen");
    nota_examen.classList.add(`n_${examen.num}`)
    nuevoExamen.appendChild(nota_examen);

    //FLECHA_INICIAR-EXAMEN//
    let boton_iniciar=document.createElement("img");
    boton_iniciar.src="../assets/img/flecha_examen.png";
    boton_iniciar.classList.add("boton_iniciar");

    boton_iniciar.addEventListener("click",()=>{
        examen_actual=examen;
        examen.comenzarExamen();
        mostrarHojaExamenes();
    });

    nuevoExamen.appendChild(boton_iniciar);

    switch(examen.tipo){
        case "Geometría":
            examenes_geometria.appendChild(nuevoExamen);
            break;
        
        case "Operaciones":
            examenes_operaciones.appendChild(nuevoExamen);
            break;
        
        case "Ecuaciones":
            examenes_ecuaciones.appendChild(nuevoExamen);
            break;  
    }
}

/**ENTREGAR EXAMEN**/
let boton_entregar=document.querySelector(".examen_entregar");
boton_entregar.addEventListener("click",()=>{
    let repetido=false;
    let u_actual="u_a";

    if ("u_a" in localStorage){
        u_actual=localStorage.getItem("u_a");
    }

    else if ("u_a" in sessionStorage){
        u_actual=sessionStorage.getItem("u_a");
    }

    u_actual=JSON.parse(u_actual);
    
    u_actual.calificaciones.forEach(exam=>{
        if(exam[0]==examen_actual.num){
            repetido=true;
        }
    })

    if(!repetido){
        Swal.fire({
            title: '¿Seguro que quieres entregar? Podrás volver a realizar el examen, pero la nota no cambiará.',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText:`Aún no`,
            confirmButtonText: 'Si',
        }).then((result) => {
            if (result.isConfirmed) {
                examen_actual.corregirExamen();
                actualizarNotas();
            } 
            
        })
    }

    else{
        examen_actual.corregirExamen();
    }

});


/**PROGRAMA PRINCIPAL**/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// /*EXÁMEN 1*/

let p1= new PreguntaMO("¿Cuál es el área de un cuadrado de 4 de lado?",12,10,18,16,"d",1);
let p2= new PreguntaR("Calcule el área de un triángulo equilátero de 6 de lado",15.6,2);
let p3= new PreguntaR("Calcule el perímetro de un rectángulo de base=16 y altura=10",52,3);
let p4= new PreguntaMO("¿Cómo se llama el lado de mayor longitud de un triángulo rectángulo?","lado adyacente","lado opuesto", "hipotenusa", "hipotensia","c",4);
let p5= new PreguntaMO("En un triángulo rectángulo se conocen la medida de la hipotenusa:5 y de uno de sus lados:3. ¿Cuál es la medida del lado restante?", 2,3,4,5,"c",5);
let p6= new PreguntaMO("¿Cuál es el área de un círculo de 5.5 de radio?",17.3,16.5,17.9,15.7,"a",6);
let p7= new PreguntaVOF("¿DOU?","V",7);
let e1= new Examen("GEO 1","Geometría",1);

e1.agregarPregunta(p1);
e1.agregarPregunta(p2);
e1.agregarPregunta(p3);
e1.agregarPregunta(p4);
e1.agregarPregunta(p5);
e1.agregarPregunta(p6);
e1.agregarPregunta(p7);

/*EXÁMEN 2*/

let o1 = new PreguntaR("¿Cuál es el resultado de: (2*3*4*5-4+7)/3?",41,1);
let o2 = new PreguntaR("¿Cuál es el resultado de ((2^3)^2)/(2^4)?",4,2);
let o3 = new PreguntaR("De los 45 estudiantes que fueron de excursion, 22 visitaron el Museo de Ciencias, 8 el Museo de Bellas Artes y 12 fueron al Acuario. Si ningún estuiante visitó más de un lugar,¿cuántos estudiantes no visitaron ninguno?",3,3);
let o4 = new PreguntaR("Las manzanas cuestan $5.9 el kg y las uvas cuestan $8.9 el kg; Si tienes $74.0 y quieres comprar la misma cantidad de kg de cada fruta,¿Cuántos kg de cada fruta puedes comprar como máximo con ese dinero?",5,4);
let o5 = new PreguntaMO("Supón que cada día un murciélago come el doble de mosquitos que comió el día anterior más 1; Si hoy comió 10 mosquitos. Si hoy es el primer día de la semana,¿Cuántos mosquitos habrá comido en total al finalizar la semana?",1200,1270,1390,1420,"c",5);
let o6 = new PreguntaMO("Un automovil tarda 8 horas en recorrer una distancia yendo a 90 km/h ¿Cuántas horas tardará en recorrer la misma distancia yendo a 60 km/h?",10,12,6,14,"b",6);
let e2= new Examen("Operaciones y Razonamiento","Operaciones",2);
e2.agregarPregunta(o1);
e2.agregarPregunta(o2);
e2.agregarPregunta(o3);
e2.agregarPregunta(o4);
e2.agregarPregunta(o5);
e2.agregarPregunta(o6);


/*EXÁMEN 3*/

let k1 = new PreguntaR("Considerando la igualdad: 7x+3=9x-3 ;  Hallar el valor de X para el cual la igualdad se cumple ",3,1);
let k2 = new PreguntaMO("Hallar las raices de la siguiente función: f(x)=x^2-x-2","1 y 2","-1 y 2","1 y -1","-2 y 1","b",2);
let k3 = new PreguntaMO("Considerando la siguiente función: g(x)=(9x^2 - 1)/(x^2 -x -2) ; Hallar el dominio de g(x)","R","(-inf,-1) U (2,+inf)","(-inf,-1) U (-1,2) U (2,+inf)","(-inf,-1) U (-1,+inf)","c",3);
let k4 = new PreguntaMO("¿Cuántas raices tiene la siguiente funcion? : x^3 + x^2 - 2 ",0,1,2,3,"b",4);
let k5 = new PreguntaMO("Un juego de cartas consiste en sacar 10 cartas del mazo. La cantidad de puntos obtenidos depende de la cantidad de cartas del mismo palo, sumando puntos solo por el palo con mayor cantidad de cartas repetidas. Si al sacar 4 cartas repetidas se obtienen 6 puntos; al sacar 5 se obtienen 13 y al sacar 7 se obtienen 33; ¿Cuál de las siguientes funciones es la que mejor se ajusta al cálculo de los puntos?","7x^2-5x+4","13x^2-6x+33","4x+6","x^2-2x-2","d",5);
let e3 = new Examen("EC1","Ecuaciones",3);
e3.agregarPregunta(k1);
e3.agregarPregunta(k2);
e3.agregarPregunta(k3);
e3.agregarPregunta(k4);
e3.agregarPregunta(k5);

agregarExamen(e1);
agregarExamen(e2);
agregarExamen(e3);

actualizarNotas();