"use client";

import { useEffect, useState } from "react";

export default function LoginPage() {
    const [modo, setModo] = useState<"login" | "registro">("login");

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const parametros = new URLSearchParams(
            window.location.search
        );

        if (parametros.get("registro") === "true") {
            setModo("registro");
        }
    }, []);

    function enviarFormulario(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (modo === "registro") {
            const usuario = {
                nombre: nombre,
                email: email,
            };

            localStorage.setItem(
                "usuarioRegistrado",
                JSON.stringify(usuario)
            );

            alert("¡Registro completado correctamente!");

            window.location.href = "/";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    }

    return (
        <main className="loginPage">
            <div className="loginCard">

                <div className="loginLogo">
                    🛒
                </div>

                <h1>
                    {modo === "login"
                        ? "Iniciar sesión"
                        : "Crear cuenta"}
                </h1>

                <p>
                    {modo === "login"
                        ? "Ingresa a tu cuenta"
                        : "Regístrate en TIENDA_LINEA"}
                </p>

                <form onSubmit={enviarFormulario}>

                    {modo === "registro" && (
                        <div className="campo">
                            <label>Nombre completo</label>

                            <input
                                type="text"
                                placeholder="Tu nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="campo">
                        <label>Correo electrónico</label>

                        <input
                            type="email"
                            placeholder="correo@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label>Contraseña</label>

                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btnLogin"
                    >
                        {modo === "login"
                            ? "Iniciar sesión"
                            : "Crear cuenta"}
                    </button>

                </form>

                <div className="cambiarModo">

                    {modo === "login" ? (
                        <>
                            ¿No tienes una cuenta?

                            <button
                                type="button"
                                onClick={() => setModo("registro")}
                            >
                                Registrarse
                            </button>
                        </>
                    ) : (
                        <>
                            ¿Ya tienes una cuenta?

                            <button
                                type="button"
                                onClick={() => setModo("login")}
                            >
                                Iniciar sesión
                            </button>
                        </>
                    )}

                </div>

                <button
                    type="button"
                    className="volver"
                    onClick={() => {
                        window.location.href = "/";
                    }}
                >
                    ← Volver a la tienda
                </button>

            </div>

        </main>
    );
}