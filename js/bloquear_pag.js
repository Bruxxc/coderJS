let iniciado=("u_a" in sessionStorage) || ("u_a" in localStorage);
if(!iniciado){
    Swal.fire({
        title: 'Debes iniciar sesión para continuar',
        confirmButtonText: 'OK',
      }).then((result) => {
             window.location.href="./login.html";
      })
}