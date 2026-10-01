"use client";

import { useEffect, useState } from "react";

interface ProductoCarrito {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    cantidad: number;
}

export default function PagoPage() {
    const [productos, setProductos] = useState<ProductoCarrito[]>([]);
    const [metodo, setMetodo] = useState("");
    const [procesando, setProcesando] = useState(false);

    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [referencia, setReferencia] = useState("");
    const [entrega, setEntrega] = useState("delivery");

    useEffect(() => {
        const carritoGuardado = localStorage.getItem("carrito");

        if (carritoGuardado) {
            setProductos(JSON.parse(carritoGuardado));
        }
    }, []);

    const total = productos.reduce(
        (suma, producto) =>
            suma + producto.precio * producto.cantidad,
        0
    );

    const cantidad = productos.reduce(
        (suma, producto) =>
            suma + producto.cantidad,
        0
    );

    async function generarPedido() {
        if (!nombre.trim()) {
            alert("Ingresa tu nombre completo.");
            return;
        }

        if (!telefono.trim()) {
            alert("Ingresa tu número de teléfono.");
            return;
        }

        if (!direccion.trim()) {
            alert("Ingresa tu dirección.");
            return;
        }

        if (!ciudad.trim()) {
            alert("Ingresa tu ciudad.");
            return;
        }

        if (!metodo) {
            alert("Selecciona un método de pago.");
            return;
        }

        if (productos.length === 0) {
            alert("El carrito está vacío.");
            return;
        }

        setProcesando(true);

        const numeroPedido =
            "PED-" + Date.now().toString().slice(-8);

        const pedido = {
            numeroPedido,

            nombreCliente: nombre,
            telefono,
            direccion,
            ciudad,
            referencia,

            entrega,

            metodoPago: metodo,

            productos,

            cantidadProductos: cantidad,

            total,

            estado: "Pendiente de pago",
        };

        try {
            const respuesta = await fetch(
                "http://localhost:3000/pedidos",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(pedido),
                }
            );

            if (!respuesta.ok) {
                throw new Error(
                    "No se pudo guardar el pedido."
                );
            }

            const pedidoGuardado = await respuesta.json();

            console.log(
                "Pedido guardado en PostgreSQL:",
                pedidoGuardado
            );

            // Guardamos una copia para la página de confirmación
            localStorage.setItem(
                "pedidoActual",
                JSON.stringify(pedidoGuardado)
            );

            // Limpiamos el carrito
            localStorage.removeItem("carrito");

            alert(
                `Pedido ${numeroPedido} guardado correctamente.`
            );

            window.location.href =
                `/pedido?numero=${numeroPedido}`;

        } catch (error) {
            console.error(
                "Error al guardar pedido:",
                error
            );

            alert(
                "No se pudo guardar el pedido. Verifica que el backend esté funcionando."
            );

            setProcesando(false);
        }
    }

    if (productos.length === 0) {
        return (
            <main
                style={{
                    minHeight: "100vh",
                    background: "#080808",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        background: "#111",
                        padding: "40px",
                        borderRadius: "15px",
                        border: "1px solid #222",
                    }}
                >
                    <h1>🛒 Carrito vacío</h1>

                    <p style={{ color: "#999" }}>
                        Agrega productos antes de continuar.
                    </p>

                    <button
                        onClick={() => {
                            window.location.href = "/";
                        }}
                        style={{
                            marginTop: "20px",
                            padding: "13px 25px",
                            background: "#ff7300",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        Volver a la tienda
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main
            style={{
                minHeight: "100vh",
                background: "#080808",
                color: "#fff",
                padding: "40px 20px",
            }}
        >
            <div
                style={{
                    maxWidth: "1150px",
                    margin: "0 auto",
                }}
            >
                <button
                    onClick={() => {
                        window.location.href = "/carrito";
                    }}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "#ff7300",
                        cursor: "pointer",
                        fontSize: "16px",
                        marginBottom: "25px",
                    }}
                >
                    ← Volver al carrito
                </button>

                <h1 style={{ fontSize: "32px" }}>
                    📦 Finalizar pedido
                </h1>

                <p style={{ color: "#999" }}>
                    Completa tus datos para realizar el pedido.
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 350px",
                        gap: "25px",
                        marginTop: "30px",
                    }}
                >
                    {/* DATOS DEL CLIENTE */}
                    <section
                        style={{
                            background: "#111",
                            border: "1px solid #222",
                            borderRadius: "15px",
                            padding: "25px",
                        }}
                    >
                        <h2>👤 Datos del cliente</h2>

                        <div
                            style={{
                                display: "grid",
                                gap: "15px",
                                marginTop: "20px",
                            }}
                        >
                            <div>
                                <label>Nombre completo</label>

                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={(e) =>
                                        setNombre(e.target.value)
                                    }
                                    placeholder="Ejemplo: Llarinson Huite"
                                    style={inputStyle}
                                />
                            </div>

                            <div>
                                <label>Teléfono</label>

                                <input
                                    type="tel"
                                    value={telefono}
                                    onChange={(e) =>
                                        setTelefono(e.target.value)
                                    }
                                    placeholder="Ejemplo: 999999999"
                                    style={inputStyle}
                                />
                            </div>

                            <div>
                                <label>Dirección</label>

                                <input
                                    type="text"
                                    value={direccion}
                                    onChange={(e) =>
                                        setDireccion(e.target.value)
                                    }
                                    placeholder="Av., Jr., calle, número..."
                                    style={inputStyle}
                                />
                            </div>

                            <div>
                                <label>Ciudad</label>

                                <input
                                    type="text"
                                    value={ciudad}
                                    onChange={(e) =>
                                        setCiudad(e.target.value)
                                    }
                                    placeholder="Ejemplo: Bagua Grande"
                                    style={inputStyle}
                                />
                            </div>

                            <div>
                                <label>Referencia</label>

                                <input
                                    type="text"
                                    value={referencia}
                                    onChange={(e) =>
                                        setReferencia(e.target.value)
                                    }
                                    placeholder="Ejemplo: cerca de la plaza"
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        <h2 style={{ marginTop: "30px" }}>
                            🚚 Método de entrega
                        </h2>

                        <div
                            style={{
                                display: "grid",
                                gap: "12px",
                                marginTop: "15px",
                            }}
                        >
                            <label style={opcionStyle}>
                                <input
                                    type="radio"
                                    name="entrega"
                                    value="delivery"
                                    checked={entrega === "delivery"}
                                    onChange={(e) =>
                                        setEntrega(e.target.value)
                                    }
                                />

                                Delivery a domicilio
                            </label>

                            <label style={opcionStyle}>
                                <input
                                    type="radio"
                                    name="entrega"
                                    value="recojo"
                                    checked={entrega === "recojo"}
                                    onChange={(e) =>
                                        setEntrega(e.target.value)
                                    }
                                />

                                Recojo en tienda
                            </label>
                        </div>

                        <h2 style={{ marginTop: "30px" }}>
                            💳 Método de pago
                        </h2>

                        <div
                            style={{
                                display: "grid",
                                gap: "12px",
                                marginTop: "15px",
                            }}
                        >
                            <button
                                type="button"
                                onClick={() => setMetodo("yape")}
                                style={metodoStyle(metodo === "yape")}
                            >
                                📱 Yape
                            </button>

                            <button
                                type="button"
                                onClick={() => setMetodo("plin")}
                                style={metodoStyle(metodo === "plin")}
                            >
                                📲 Plin
                            </button>



                            <button
                                type="button"
                                className={`btn ${metodo === "tarjeta" ? "seleccionado" : ""}`}
                                onClick={() => setMetodo("tarjeta")}
                            >
                                💳 Tarjeta
                            </button>
                        </div>

                        {metodo === "yape" && (
                            <div style={avisoStyle}>
                                <h3>📱 Yape</h3>

                                <p>
                                    Seleccionaste Yape como método de pago.
                                </p>

                                <p>
                                    La confirmación automática deberá
                                    realizarse mediante una integración
                                    oficial de pagos.
                                </p>
                            </div>
                        )}

                        {metodo === "plin" && (
                            <div style={avisoStyle}>
                                <h3>📲 Plin</h3>

                                <p>
                                    Seleccionaste Plin como método de pago.
                                </p>

                                <p>
                                    La confirmación automática deberá
                                    realizarse mediante una integración
                                    oficial de pagos.
                                </p>
                            </div>
                        )}

                        {metodo === "tarjeta" && (
                            <div style={avisoStyle}>
                                <h3>💳 Tarjeta</h3>

                                <p>
                                    El pago con tarjeta se realizará mediante
                                    una pasarela segura.
                                </p>

                                <p>
                                    No ingreses aquí números de tarjeta,
                                    CVV ni contraseñas.
                                </p>
                            </div>
                        )}
                    </section>

                    {/* RESUMEN */}
                    <aside
                        style={{
                            background: "#111",
                            border: "1px solid #222",
                            borderRadius: "15px",
                            padding: "25px",
                            height: "fit-content",
                        }}
                    >
                        <h2>🧾 Resumen</h2>

                        {productos.map((producto) => (
                            <div
                                key={producto.id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: "10px",
                                    marginTop: "15px",
                                    paddingBottom: "12px",
                                    borderBottom: "1px solid #222",
                                }}
                            >
                                <div>
                                    <strong>{producto.nombre}</strong>

                                    <div
                                        style={{
                                            color: "#888",
                                            fontSize: "13px",
                                        }}
                                    >
                                        Cantidad: {producto.cantidad}
                                    </div>
                                </div>

                                <span>
                                    S/{" "}
                                    {(
                                        producto.precio *
                                        producto.cantidad
                                    ).toFixed(2)}
                                </span>
                            </div>
                        ))}

                        <div
                            style={{
                                marginTop: "20px",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <span>Total productos</span>
                            <strong>{cantidad}</strong>
                        </div>

                        <div
                            style={{
                                marginTop: "15px",
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "22px",
                            }}
                        >
                            <strong>Total</strong>

                            <strong style={{ color: "#ff7300" }}>
                                S/ {total.toFixed(2)}
                            </strong>
                        </div>

                        <button
                            type="button"
                            onClick={generarPedido}
                            disabled={procesando}
                            style={{
                                width: "100%",
                                marginTop: "25px",
                                padding: "15px",
                                background: procesando
                                    ? "#555"
                                    : "#ff7300",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                cursor: procesando
                                    ? "not-allowed"
                                    : "pointer",
                                fontWeight: "bold",
                                fontSize: "16px",
                            }}
                        >
                            {procesando
                                ? "Generando pedido..."
                                : "Generar pedido →"}
                        </button>
                    </aside>
                </div>
            </div>
        </main>
    );
}

const inputStyle = {
    width: "100%",
    marginTop: "7px",
    padding: "13px",
    background: "#0b0b0b",
    color: "#fff",
    border: "1px solid #333",
    borderRadius: "8px",
    boxSizing: "border-box" as const,
};

const opcionStyle = {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    padding: "14px",
    background: "#0d0d0d",
    border: "1px solid #333",
    borderRadius: "8px",
};

function metodoStyle(seleccionado: boolean) {
    return {
        padding: "16px",
        textAlign: "left" as const,
        background: seleccionado
            ? "#1b1b1b"
            : "#0d0d0d",
        color: "#fff",
        border: seleccionado
            ? "2px solid #ff7300"
            : "1px solid #333",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "16px",
    };
}

const avisoStyle = {
    marginTop: "20px",
    padding: "18px",
    background: "#171717",
    borderRadius: "10px",
    color: "#ccc",
};