import { recordarSesion } from "../validaciones/important_functions.js"

export async function iniciarSesion(Correo, Password) {
    const correo = Correo.value
    const password = Password.value
    
    const response = await fetch('/iniciarSesion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, password })
    })

    const respuesta = await response.json()

    if ( respuesta.Acceso === true) {
        recordarSesion(respuesta.Response)
    } else if ( respuesta.Correo === false ) {
        verificarCorreo(Correo)
    } else {
        verificarContraseña(Password)
    }
}

function verificarContraseña(input) {
    input.setCustomValidity('Contraseña incorrecta');
    input.reportValidity();
}

function verificarCorreo(input) {
    input.setCustomValidity('Correo no registrado')
    input.reportValidity()
}

