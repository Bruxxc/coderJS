/*PANTALLA/PIZARRÓN*/
let geoPantalla=document.querySelector(".geo_pantalla");
let colFiguras=[]; //CONTENEDOR DE FIGURAS CREADAS

//***********MOVIMIENTO DE FIGURAS************* */

let triangulo_prueba= document.querySelector(".triang");
let moviendo=false;
let limIzq=5;
let limDer=geoPantalla.offsetWidth+limIzq-10;
let limSup=5;
let limInf=limSup+geoPantalla.offsetHeight-5;


/**CENTRAR FIGURA EN GEOPANTALLA**/

function centrarFigura(fig){
    let alt=fig.offsetHeight;
    let ancho=fig.offsetWidth;

    fig.style.marginLeft=`${(geoPantalla.offsetWidth-ancho)/2}px`;
    fig.style.marginTop=`${(geoPantalla.offsetHeight-alt)/2}px`;
};

function figuraFuera(fig){
    let bordeIzq=fig.offsetLeft-geoPantalla.offsetLeft;
    let bordeDer=fig.offsetWidth+fig.offsetLeft-geoPantalla.offsetLeft;
    let bordeSup=fig.offsetTop-geoPantalla.offsetTop;
    let bordeInf=fig.offsetHeight+bordeSup;

    if((bordeIzq<=0)||(bordeDer>=geoPantalla.offsetWidth)||(bordeInf>=geoPantalla.offsetHeight)||(bordeSup<=0)){
        return true;
    }

    else{
        return false;
    }
};



/**CENTRAR FIGURA EN MOUSE**/

function centrarEnMouse(fig,e,type){
    let coordX= e.pageX-geoPantalla.offsetLeft;
    let coordY= e.pageY-geoPantalla.offsetTop;
    fig.style.marginLeft=`${coordX-(fig.offsetWidth/2)}px`;
    if(type==1){
        fig.style.marginTop=`${coordY-(fig.offsetHeight/2)}px`;
    }

    else if(type==2){
        fig.style.marginTop=`${coordY-(fig.offsetHeight/4)}px`;
    }
    else if (type==3){
        fig.style.marginTop=`${coordY-(fig.offsetHeight/2)}px`;
        fig.style.marginLeft=`${coordX-(fig.offsetWidth/4)}px`;
    }
}



/** ASIGNARLE MOVIMIENTO A FIGURA **/

function asignarMovimiento(fig,type){

    fig.addEventListener("mousedown",(e)=>{
        e.preventDefault();
        fig.style.boxShadow= "0px 0px 7px blue";
        fig.style.cursor= "grabbing";
        moviendo=true;
        centrarEnMouse(fig,e,type);
    });

    fig.addEventListener("mouseup",(e)=>{
        e.preventDefault();
        fig.style.boxShadow= "0px 0px 3px #0D160B";
        fig.style.cursor= "grab";
        moviendo=false;
        if(figuraFuera(fig)){
            centrarFigura(fig);
        }
    });

    fig.addEventListener("mousemove",(e)=>{
        e.preventDefault();
        let coordX= e.pageX-geoPantalla.offsetLeft;
        let coordY= e.pageY-geoPantalla.offsetTop;
        console.log(coordX,coordY);
        if(moviendo){
            let bordeIzq=fig.offsetLeft-geoPantalla.offsetLeft;
            let bordeDer=fig.offsetWidth+fig.offsetLeft-geoPantalla.offsetLeft;
            let bordeSup=fig.offsetTop-geoPantalla.offsetTop;
            let bordeInf=fig.offsetHeight+bordeSup;
            centrarEnMouse(fig,e,type);

            if(bordeIzq<=0){
                   fig.style.marginLeft= `3px`;}
            

            else if(bordeSup<=0){
                fig.style.marginTop= `3px`;
            }

            else if(bordeDer>=geoPantalla.offsetWidth){
                fig.style.marginLeft= `${bordeIzq-20}px`;
            }

            else if(bordeInf>geoPantalla.offsetHeight){
                fig.style.marginTop= `${bordeSup-20}px`;
            }
            
        }
    
    });
}


/**SELECTOR DE FIGURAS**/

let selector_Figuras=document.querySelector(".geo_fig_creadas");

/*ELIMINAR FIGURA DEL SELECTOR DE FIGURAS*/

function selectorEliminarFigura(num){
    let aEliminar=document.querySelector(`.repf${num}`);
    aEliminar.remove();
}

/*ELMINAR FIGURA DE PANTALLA */
function pantallaEliminarFigura(num){
    let aEliminar=document.querySelector(`.f${num}`);
    aEliminar.remove();
}

/*ELMINAR FIGURA*/

function eliminarFigura(num){
    selectorEliminarFigura(num);
    pantallaEliminarFigura(num);
}

/*AÑADIR ELEMENTO AL SELECTOR DE FIGURAS*/

function selectorAgregarFigura(num,type,color){
    let figuraContainer=document.createElement("li");
    figuraContainer.classList.add("repFiguraContainer");

    let segundoContainer=document.createElement("div");
    segundoContainer.classList.add("segundoContainer");

    /**BOTON INFO**/
    let boton_info=document.createElement("p");
    boton_info.innerText="i";
    boton_info.classList.add("boton_info");
    boton_info.addEventListener("click",()=>{
        let indice=0;
        colFiguras.forEach(figura => {
            if(figura.fID==num){
                indice=colFiguras.indexOf(figura);
            };
        });
        colFiguras[indice].mostarInfo();
    })
    figuraContainer.appendChild(boton_info);


    /**BOTON BORRAR**/
    let boton_borrarFig=document.createElement("p");
    boton_borrarFig.classList.add("boton_borrarFig");
    boton_borrarFig.innerText="X";
    boton_borrarFig.addEventListener("click",()=>{
        console.log(`repf${num}`);
        eliminarFigura(num);
        let indice=0;
        colFiguras.forEach(figura => {
            if(figura.fID==num){
                indice=colFiguras.indexOf(figura);
            };
        });
        colFiguras.splice(indice,1);
        console.log(colFiguras);
    });
    figuraContainer.appendChild(boton_borrarFig);

    //**ID FIGURA**/
    let numFigura=document.createElement("p");
    numFigura.innerText=`F${num}`;
    figuraContainer.appendChild(numFigura);
    figuraContainer.classList.add(`repf${num}`);

    //**ICONO FIGURA**/
    let figuraDibujo=document.createElement("div");
    figuraDibujo.style.background=`${color}`;
    figuraDibujo.style.border="solid black 2px";

    switch (type){
        case 1:
            figuraDibujo.style.width="30px";
            figuraDibujo.style.height="30px";
            break;

        case 2:
            figuraDibujo.style.width="40px";
            figuraDibujo.style.height="20px";
            break;

        case 3:
            figuraDibujo.style.width="30px";
            figuraDibujo.style.height="60px";
            figuraDibujo.style.clipPath= `polygon(50% 0%, 100% 50%, 0% 50%)`;
            break;

        case 4:
            figuraDibujo.style.width="30px";
            figuraDibujo.style.height="50px";
            figuraDibujo.style.clipPath= `polygon(50% 0%, 100% 50%, 0% 50%)`;
            break;
        
        case 5:
            figuraDibujo.style.width="30px";
            figuraDibujo.style.height="30px";
            figuraDibujo.style.clipPath= ` polygon(0 0, 100% 100%, 0 100%)`;
            break;
        
        case 6:
            figuraDibujo.style.width="30px";
            figuraDibujo.style.height="30px";
            figuraDibujo.style.borderRadius= "50%";
            break;

    }
    figuraDibujo.style.alignSelf="start";
    segundoContainer.appendChild(figuraDibujo);
    figuraContainer.appendChild(segundoContainer);
    selector_Figuras.appendChild(figuraContainer);
    
}


/** */


/******CLASES******/

let ZINDEX=3; //ZINDEX E ID DE FIGURAS

class Cuadrado{
    constructor(lado,color){
        this.lado=Math.abs(Math.round(lado));
        this.perimetro=lado*4;
        this.area=lado*lado;
        this.color=color;
        this.fID=ZINDEX-2;

    }

    /*DIBUJAR FIGURA EN GEOPANTALLA*/
    dibujar(){
        let nuevoCuadrado=document.createElement("div");
        nuevoCuadrado.style.width= `${(this.lado)*10}px`;
        nuevoCuadrado.style.height= `${(this.lado)*10}px`;
        nuevoCuadrado.style.border= "solid black 2px";
        nuevoCuadrado.style.background= `${this.color}`;
        nuevoCuadrado.style.boxShadow= "0px 0px 3px black";
        nuevoCuadrado.style.cursor="grab";
        nuevoCuadrado.classList.add(`f${ZINDEX-2}`);
        nuevoCuadrado.style.position="absolute";
        nuevoCuadrado.style.zIndex=`${ZINDEX}`;
        ZINDEX++;
        geoPantalla.appendChild(nuevoCuadrado);
        asignarMovimiento(nuevoCuadrado,1);
        centrarFigura(nuevoCuadrado);
        selectorAgregarFigura(this.fID,1,this.color);
    }

    mostarInfo(){
        Swal.fire({
            title: `F${this.fID}: Cuadrado`,
            icon: 'info',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            text:`LADO: ${this.lado} |
            AREA: ${this.area} |
            PERÍMETRO: ${this.perimetro}`,
        })
    }
}

class Rectangulo{
    constructor(base,altura,color){
        this.base=Math.abs(Math.round(base));
        this.altura=Math.abs(Math.round(altura));
        this.perimetro=base*2+altura*2;
        this.area=base*altura;
        this.color=color;
        this.fID=ZINDEX-2;
    }

    dibujar(){
        let nuevoRectangulo=document.createElement("div");
        nuevoRectangulo.style.width= `${(this.base)*10}px`;
        nuevoRectangulo.style.height= `${(this.altura)*10}px`;
        nuevoRectangulo.style.border= "solid black 2px";
        nuevoRectangulo.style.background= `${this.color}`;
        nuevoRectangulo.style.boxShadow= "0px 0px 3px black";
        nuevoRectangulo.classList.add(`f${ZINDEX-2}`);
        nuevoRectangulo.style.position="absolute";
        nuevoRectangulo.style.zIndex=`${ZINDEX}`;
        ZINDEX++;
        geoPantalla.appendChild(nuevoRectangulo);
        asignarMovimiento(nuevoRectangulo,1);
        centrarFigura(nuevoRectangulo);
        selectorAgregarFigura(this.fID,2,this.color);
    }
    mostarInfo(){
        Swal.fire({
            title: `F${this.fID}: Rectángulo`,
            icon: 'info',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            text:`BASE: ${this.base} |
            ALTURA: ${this.altura} |
            PERÍMETRO: ${this.perimetro} |
            ÁREA: ${this.area}`,
        })
    }
}

class TrianguloIs{
    constructor(base,altura,color){
        this.base=base;
        this.altura=altura;
        this.lados=Math.round((Math.sqrt((altura*altura)+(base*base)/4))*100)/100;
        this.area=base*altura/2;
        this.perimetro=Math.round((((this.lados*2)+parseInt(base))*100))/100;
        this.color=color;
        this.fID=ZINDEX-2;
    }

    dibujar(){
        let nuevoTisosceles=document.createElement("div");
        nuevoTisosceles.style.width= `${(this.base)*10}px`;
        nuevoTisosceles.style.height= `${(this.altura)* 10*2}px`;
        nuevoTisosceles.style.border= "solid black 2px";
        nuevoTisosceles.style.background= `${this.color}`;
        nuevoTisosceles.style.boxShadow= "0px 0px 3px black";
        nuevoTisosceles.classList.add(`f${ZINDEX-2}`);
        nuevoTisosceles.style.position="absolute";
        nuevoTisosceles.style.zIndex=`${ZINDEX}`;
        ZINDEX++;
        nuevoTisosceles.style.clipPath= `polygon(50% 0%, 100% 50%, 0% 50%)`;
        geoPantalla.appendChild(nuevoTisosceles);
        asignarMovimiento(nuevoTisosceles,2);
        centrarFigura(nuevoTisosceles);
        selectorAgregarFigura(this.fID,3,this.color);
    }

    mostarInfo(){
        Swal.fire({
            title: `F${this.fID}: Triángulo Isósceles`,
            icon: 'info',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            text:`BASE: ${this.base} |
            ALTURA: ${this.altura} |
            LADOS: ${this.lados} |
            PERÍMETRO: ${this.perimetro} |
            ÁREA: ${this.area}`,
        })
    }
}

class TrianguloEq{
    constructor(lado,color){
        this.lado=Math.abs(Math.round(lado));
        this.color=color;
        this.altura=Math.round((Math.sqrt(3)/2*lado)*100)/100;
        this.area=this.altura*lado/2;
        this.perimetro=lado*3;
        this.fID=ZINDEX-2;
    }

    dibujar(){
        let nuevoTequilatero=document.createElement("div");
        nuevoTequilatero.style.width= `${(this.lado)* 10}px`;
        nuevoTequilatero.style.height= `${(this.lado)* 10 * Math.sqrt((3/4))*2}px`;
        nuevoTequilatero.style.border= "solid black 2px";
        nuevoTequilatero.style.background= `${this.color}`;
        nuevoTequilatero.style.boxShadow= "0px 0px 3px black";
        nuevoTequilatero.classList.add(`f${ZINDEX-2}`);
        nuevoTequilatero.style.position="absolute";
        nuevoTequilatero.style.zIndex=`${ZINDEX}`;
        ZINDEX++;
        nuevoTequilatero.style.clipPath= `polygon(50% 0%, 100% 50%, 0% 50%)`;
        geoPantalla.appendChild(nuevoTequilatero);
        asignarMovimiento(nuevoTequilatero,2);
        centrarFigura(nuevoTequilatero);
        selectorAgregarFigura(this.fID,4,this.color);
    }

    mostarInfo(){
        Swal.fire({
            title: `F${this.fID}: Triángulo Equilátero`,
            icon: 'info',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            text:`LADO: ${this.lado} |
            ALTURA: ${this.altura} |
            PERÍMETRO: ${this.perimetro} |
            ÁREA: ${this.area}`,
        })
    }
}

class TrianguloRec{
    constructor(base,altura,color){
        this.base=base;
        this.altura=altura;
        this.color=color;
        this.hipotenusa=Math.round((Math.sqrt((base*base)+(altura*altura)))*100)/100;
        this.perimetro=this.hipotenusa+parseFloat(base)+parseFloat(altura);
        this.area=base*altura/2;
        this.fID=ZINDEX-2;
    }

    dibujar(){
        let nuevoTrectangulo=document.createElement("div");
        nuevoTrectangulo.style.width= `${(this.base)*10}px`;
        nuevoTrectangulo.style.height= `${(this.altura)*10}px`;
        nuevoTrectangulo.style.border= "solid black 2px";
        nuevoTrectangulo.style.background= `${this.color}`;
        nuevoTrectangulo.style.boxShadow= "0px 0px 3px black";
        nuevoTrectangulo.classList.add(`f${ZINDEX-2}`);
        nuevoTrectangulo.style.position="absolute";
        nuevoTrectangulo.style.zIndex=`${ZINDEX}`;
        ZINDEX++;
        nuevoTrectangulo.style.clipPath= `polygon(0 0, 100% 100%, 0 100%)`;
        geoPantalla.appendChild(nuevoTrectangulo);
        asignarMovimiento(nuevoTrectangulo,3);
        centrarFigura(nuevoTrectangulo);
        selectorAgregarFigura(this.fID,5,this.color);
    }

    mostarInfo(){
        Swal.fire({
            title: `F${this.fID}: Triángulo Rectángulo`,
            icon: 'info',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            text:`BASE: ${this.base} |
            ALTURA: ${this.altura} |
            HIPOTENUSA: ${this.hipotenusa} |
            PERÍMETRO: ${this.perimetro} |
            ÁREA: ${this.area}`,
        })
    }
}

class Circulo{
    constructor(radio,color){
        this.radio=radio;
        this.color=color;
        this.perimetro=Math.round(2*Math.PI*radio*100)/100;
        this.area=Math.round(Math.PI*radio*radio*100)/100;
        this.fID=ZINDEX-2;
    }

    dibujar(){
        let nuevoCirculo=document.createElement("div");
        nuevoCirculo.style.width= `${(this.radio)*20}px`;
        nuevoCirculo.style.height= `${(this.radio)*20}px`;
        nuevoCirculo.style.border= "solid black 2px";
        nuevoCirculo.style.background= `${this.color}`;
        nuevoCirculo.style.borderRadius= "50%";
        nuevoCirculo.style.boxShadow= "0px 0px 3px black";
        nuevoCirculo.classList.add(`f${ZINDEX-2}`);
        nuevoCirculo.style.position="absolute";
        nuevoCirculo.style.zIndex=`${ZINDEX}`;
        ZINDEX++;
        geoPantalla.appendChild(nuevoCirculo);
        asignarMovimiento(nuevoCirculo,1);
        centrarFigura(nuevoCirculo);
        selectorAgregarFigura(this.fID,6,this.color);
    }

    mostarInfo(){
        Swal.fire({
            title: `F${this.fID}: Círculo`,
            icon: 'info',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            text:`RADIO: ${this.radio} |
            PERÍMETRO: ${this.perimetro} |
            ÁREA: ${this.area}`,
        })
    }
}

/*CAMBIAR MENÚ FIGURAS */

let Ocuadrado=document.querySelector(".opcion_cuadrado");
let Orectangulo=document.querySelector(".opcion_rectangulo");
let Otriangulo=document.querySelector(".opcion_triangulo");
let Ocirculo=document.querySelector(".opcion_circulo");

let Mcuadrado=document.querySelector(".geo_submenu_cuadrado");
let Mrectangulo=document.querySelector(".geo_submenu_rectangulo");
let Mtriangulo=document.querySelector(".geo_submenu_triangulo");
let Mcirculo=document.querySelector(".geo_submenu_circulo");

let seleccionador= document.querySelector(".geo_opcion_figura");

seleccionador.addEventListener("change",()=>{
    let figura=seleccionador.value;
    switch(figura){
        case "Cuadrado":
            Mcuadrado.style.display= "grid";
            Mrectangulo.style.display= "none";
            Mtriangulo.style.display= "none";
            Mcirculo.style.display= "none";
            break;

        case "Rectángulo":
            Mrectangulo.style.display= "grid";
            Mcuadrado.style.display= "none";
            Mtriangulo.style.display= "none";
            Mcirculo.style.display= "none";

            break;
        case "Triángulo":
            Mtriangulo.style.display= "grid";
            Mrectangulo.style.display= "none";
            Mcuadrado.style.display= "none";
            Mcirculo.style.display= "none";
            break;

        case "Círculo":
            Mcirculo.style.display= "grid";
            Mrectangulo.style.display= "none";
            Mcuadrado.style.display= "none";
            Mtriangulo.style.display= "none";
            break;
    }

});

/*SUBMENU TRIANGULOS*/

let tSeleccionador=document.querySelector(".triangulos_opciones");

let SMequilatero=document.querySelector(".submenu_tequilatero");
let SMisosceles=document.querySelector(".submenu_tisosceles");
let SMrectangulo=document.querySelector(".submenu_trectangulo");


tSeleccionador.addEventListener("change",()=>{
    let SOtriangulo=tSeleccionador.value;
    switch(SOtriangulo){
        case "Equilátero" :
            SMequilatero.style.display="grid";
            SMisosceles.style.display="none";
            SMrectangulo.style.display="none";
        break;

        case "Isósceles" :
            SMisosceles.style.display="grid";
            SMequilatero.style.display="none";
            SMrectangulo.style.display="none";
        break;

        case "Rectángulo":
            SMrectangulo.style.display="grid";
            SMequilatero.style.display="none";
            SMisosceles.style.display="none";
        break;
    }
})


let botonCrear=document.querySelector(".boton_crear");//BOTON CREAR FIGURA SELECTOR
let colorIn=document.querySelector(".fig_color");//COLOR


/**CREAR FIGURA**/

function crearFigura(){
    let figura=seleccionador.value;
    let color=colorIn.value;
    console.log(color);
    switch(figura){

        case "Cuadrado":
            let lado=document.querySelector(".lado_cuadrado");
            lado=lado.value;
            if (lado>0){
                let fCuadrado=new Cuadrado(lado,color);
                colFiguras.push(fCuadrado);
            }
            break;

        case "Rectángulo":
            let base=document.querySelector(".base_rectangulo");
            base=base.value;
            let altura=document.querySelector(".altura_rectangulo");
            altura=altura.value;
            if ((base > 0)&&(altura > 0)){
                let fRectangulo=new Rectangulo(base,altura,color);
                colFiguras.push(fRectangulo);
            }

            break;

        case "Triángulo":
            let tipo=document.querySelector(".triangulos_opciones");
            tipo=tipo.value;
            console.log(tipo);

            switch(tipo){

               case "Equilátero":
                let lado=document.querySelector(".lado_tequilatero");
                lado=lado.value;
                if(lado>0){
                    let fTequilatero= new TrianguloEq(lado,color);
                    colFiguras.push(fTequilatero);
                }
                break;

               case "Isósceles":
                let baseT=document.querySelector(".base_tisosceles");
                let alturaT=document.querySelector(".altura_tisosceles");
                baseT=baseT.value;
                alturaT=alturaT.value;
                if ((alturaT>0) && (baseT>0)){
                    let fTisosceles= new TrianguloIs(baseT,alturaT,color);
                    colFiguras.push(fTisosceles);
                }
                break;

               case "Rectángulo":
                let base=document.querySelector(".base_trectangulo");
                let altura=document.querySelector(".altura_trectangulo");
                base=base.value;
                altura=altura.value;
                if ((altura>0) && (base>0)){
                    let fTrectangulo= new TrianguloRec(base,altura,color);
                    colFiguras.push(fTrectangulo);
                }
                break;
            }

            break;

        case "Círculo":
            let radio=document.querySelector(".radio_circulo");
            radio=radio.value;
            if (radio>0){
                let fCirculo=new Circulo(radio,color);
                colFiguras.push(fCirculo);
            }
            break;
    }
    console.log(colFiguras);
}

/*BOTON CREAR FIGURA*/
botonCrear.addEventListener("click",()=>{
    let cantFiguras= colFiguras.length;
    crearFigura();
    if (colFiguras.length>cantFiguras){
        let nuevaFig = colFiguras[colFiguras.length-1];
        console.log(nuevaFig);
        nuevaFig.dibujar();
    }
})

let boton_limpiar= document.querySelector(".boton_limpiar");//BOTON LIMPIAR PANTALLA QUERY

/*LIMPIAR FIGURAS */
function limpiarFiguras(){
    console.log(colFiguras);
    colFiguras.forEach(figura => {
        eliminarFigura(figura.fID);
    });
    colFiguras=[];
    ZINDEX=3;
}

/*BOTON LIMPIAR PANTALLA*/
boton_limpiar.addEventListener("click",()=>{
    limpiarFiguras();
});
