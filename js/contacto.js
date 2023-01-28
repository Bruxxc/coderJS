let email=document.querySelector(".form_email");
let nombre=document.querySelector(".form_nombre");
let asunto=document.querySelector(".form_asunto");
let mensaje=document.querySelector(".form_mensaje");
let enviarBtn=document.querySelector(".boton_enviarmsj");
let form_alerta=document.querySelector(".form_alerta");

function validarEmail(mail) {

    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return(emailRegex.test(mail));
};

function enviarCorreo(){
    let mail=email.value;
    let name=nombre.value;
    let subj=asunto.value;
    let msj=mensaje.value;
    

    if(!validarEmail(mail)){
        form_alerta.innerHTML="Ingrese una dirección de email válida";
    }

    else{
        console.log(2);
        console.log(name);
        if(name==""){
            form_alerta.innerHTML="Ingrese su nombre";
        }

        else{
            if(subj==""){
                form_alerta.innerHTML="Ingrese un asunto";
            }

            else{

                if (msj==""){
                    form_alerta.innerHTML="Ingrese su mensaje";
                }

                else{
                    emailjs.send("service_cd0m0bd","template_bc9e78m",{
                        subject: subj,
                        from_name: name,
                        from_email: mail,
                        message: msj,
                        }).then(
                            Swal.fire({
                                icon: 'success',
                                title: "Su mensaje ha sido enviado, gracias por escribirnos",
                              }).then(()=>{
                                window.location.href="../index.html";
                              })
                        )
                }
            }
        }
    }
    
}

enviarBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    console.log(email.value,nombre.value,asunto.value,mensaje.value);
    enviarCorreo();
})