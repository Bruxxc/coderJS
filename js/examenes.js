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
    constructor(pregunta,respuesta,num,tipo){
        this.pregunta=pregunta;
        this.respuesta=respuesta;
        this.num=num;
        this.tipo=tipo;
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
    constructor(pregunta,opcion1,opcion2,opcion3,opcion4,respuesta,num,tipo){
        this.pregunta=pregunta;
        this.opcion1=opcion1;
        this.opcion2=opcion2;
        this.opcion3=opcion3;
        this.opcion4=opcion4;
        this.respuesta=respuesta;
        this.num=num;
        this.tipo=tipo;
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
    constructor(pregunta,respuesta,num,tipo){
        this.pregunta=pregunta;
        this.respuesta=respuesta;
        this.num=num;
        this.tipo=tipo;
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
fetch("../local.json")
    .then(res => res.json())
    .then(data => { data.forEach(exam => {
        
            let newExam= new Examen(exam.nombre,exam.tipo,exam.num);
            exam.preguntas.forEach(preg=>{
                switch(preg.tipo){
                    case "MO":
                        let nuevaPreguntaMO= new PreguntaMO(preg.pregunta,preg.opcion1,preg.opcion2,preg.opcion3,preg.opcion4,preg.respuesta,preg.num,preg.tipo);
                        newExam.agregarPregunta(nuevaPreguntaMO);
                        break;
                    case "R":
                        let nuevaPreguntaR= new PreguntaR(preg.pregunta,preg.respuesta,preg.num,preg.tipo);
                        newExam.agregarPregunta(nuevaPreguntaR);
                        break;
                    case "VoF":
                        let nuevaPreguntaVOF= new PreguntaVOF(preg.pregunta,preg.respuesta,preg.num,preg.tipo);
                        newExam.agregarPregunta(nuevaPreguntaVOF);
                        break;
                }
            })
            console.log(newExam);
            agregarExamen(newExam);
            
        })
        actualizarNotas();})




