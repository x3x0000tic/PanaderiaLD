import { recordarSesion } from "../validaciones/important_functions.js"

export async function procesoRegistro(Nombre, Correo, Password) {
    const disponible = await verificarCorreo(Correo.value)

    if ( disponible === false ) {
        Correo.setCustomValidity('Ya se ha registrado este correo')
        Correo.reportValidity()
        return
    } 

    const permisos = await otorgarPermisos(Password.value)
    
    await registarUsuario(Nombre.value, Correo.value, Password.value, permisos)
}

async function verificarCorreo(correo) {   
    const response = await fetch('/buscarSesionExistente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo })
    })

    const usado = await response.json()

    return usado.correoDisponible
}

export async function otorgarPermisos(password) {
    const response = await fetch('/otorgarPermisos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
    })

    const permisos = await response.json()

    return permisos.permisos
}

export async function registarUsuario(nombre, correo, password, permisos) {
    const response = await fetch('/crearUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, correo, password, permisos }),
    })

    const usuario = await response.json()
    
    recordarSesion(usuario)   
}