"use client";

import { useEffect, useState } from "react";

interface Pedido {
    numeroPedido: string;
    cliente: {
        nombre: string;
        telefono: string;
        direccion: string;
        ciudad: string;
        referencia: string;
    };
    entrega: string;
    metodoPago: string;
    total: number;
    cantidadProductos: number;
    fecha: string;
}

export default function PedidoPage() {
    const [pedido, setPedido] =
        useState<Pedido | null>(null);

    useEffect(() => {
        const pedidoGuardado =
            localStorage.getItem("pedidoActual");

        if (pedidoGuardado) {
            setPedido(JSON.parse(pedidoGuardado));
        }
    }, []);

    if (!pedido) {
        return (
            <main
                style={{
                    minHeight: "100vh",
                    background: "#080808",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                Cargando pedido...
            </main>
        );
    }

    return (
        <main
            style={{
                minHeight: "100vh",
                background: "#080808",
                color: "#fff",
                padding: "50px 20px",
            }}
        >
            <div
                style={{
                    maxWidth: "700px",
                    margin: "0 auto",
                    background: "#111",
                    border: "1px solid #222",
                    borderRadius: "15px",
                    padding: "35px",
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        fontSize: "55px",
                    }}
                >
                    ✅
                </div>

                <h1
                    style={{
                        textAlign: "center",
                    }}
                >
                    Pedido generado
                </h1>

                <p
                    style={{
                        textAlign: "center",
                        color: "#999",
                    }}
                >
                    Tu pedido fue registrado correctamente.
                </p>

                <div
                    style={{
                        marginTop: "30px",
                        padding: "20px",
                        background: "#0b0b0b",
                        borderRadius: "10px",
                    }}
                >
                    <p>
                        <strong>Número de pedido:</strong>
                    </p>

                    <h2
                        style={{
                            color: "#ff7300",
                        }}
                    >
                        {pedido.numeroPedido}
                    </h2>

                    <p>
                        <strong>Cliente:</strong>{" "}
                        {pedido.cliente.nombre}
                    </p>

                    <p>
                        <strong>Teléfono:</strong>{" "}
                        {pedido.cliente.telefono}
                    </p>

                    <p>
                        <strong>Dirección:</strong>{" "}
                        {pedido.cliente.direccion}
                    </p>

                    <p>
                        <strong>Ciudad:</strong>{" "}
                        {pedido.cliente.ciudad}
                    </p>

                    {pedido.cliente.referencia && (
                        <p>
                            <strong>Referencia:</strong>{" "}
                            {pedido.cliente.referencia}
                        </p>
                    )}

                    <p>
                        <strong>Entrega:</strong>{" "}
                        {pedido.entrega === "delivery"
                            ? "Delivery"
                            : "Recojo en tienda"}
                    </p>

                    <p>
                        <strong>Método de pago:</strong>{" "}
                        {pedido.metodoPago.toUpperCase()}
                    </p>

                    <hr
                        style={{
                            borderColor: "#333",
                            margin: "20px 0",
                        }}
                    />

                    <p>
                        <strong>Cantidad de productos:</strong>{" "}
                        {pedido.cantidadProductos}
                    </p>

                    <h2>
                        Total:{" "}
                        <span style={{ color: "#ff7300" }}>
                            S/ {pedido.total.toFixed(2)}
                        </span>
                    </h2>

                    <p
                        style={{
                            color: "#ff7300",
                        }}
                    >
                        Estado: Pendiente de pago
                    </p>
                </div>

                <button
                    onClick={() => {
                        window.location.href = "/";
                    }}
                    style={{
                        width: "100%",
                        marginTop: "25px",
                        padding: "15px",
                        background: "#ff7300",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    🛒 Volver a la tienda
                </button>
            </div>
        </main>
    );
}