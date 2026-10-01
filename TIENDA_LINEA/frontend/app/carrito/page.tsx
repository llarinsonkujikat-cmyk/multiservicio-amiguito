"use client";

import { useEffect, useState } from "react";

interface ProductoCarrito {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    cantidad: number;
}

export default function CarritoPage() {
    const [productos, setProductos] = useState<ProductoCarrito[]>([]);

    useEffect(() => {
        const carritoGuardado = localStorage.getItem("carrito");

        if (carritoGuardado) {
            setProductos(JSON.parse(carritoGuardado));
        }
    }, []);

    function guardarCarrito(nuevoCarrito: ProductoCarrito[]) {
        setProductos(nuevoCarrito);

        localStorage.setItem(
            "carrito",
            JSON.stringify(nuevoCarrito)
        );
    }

    function aumentar(id: number) {
        const nuevoCarrito = productos.map((producto) =>
            producto.id === id
                ? {
                    ...producto,
                    cantidad: producto.cantidad + 1,
                }
                : producto
        );

        guardarCarrito(nuevoCarrito);
    }

    function disminuir(id: number) {
        const nuevoCarrito = productos
            .map((producto) =>
                producto.id === id
                    ? {
                        ...producto,
                        cantidad: producto.cantidad - 1,
                    }
                    : producto
            )
            .filter((producto) => producto.cantidad > 0);

        guardarCarrito(nuevoCarrito);
    }

    function eliminar(id: number) {
        const nuevoCarrito = productos.filter(
            (producto) => producto.id !== id
        );

        guardarCarrito(nuevoCarrito);
    }

    const subtotal = productos.reduce(
        (total, producto) =>
            total + producto.precio * producto.cantidad,
        0
    );

    const cantidadProductos = productos.reduce(
        (total, producto) =>
            total + producto.cantidad,
        0
    );

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
                    maxWidth: "1100px",
                    margin: "0 auto",
                }}
            >

                {/* ENCABEZADO */}

                <button
                    onClick={() => {
                        window.location.href = "/";
                    }}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "#ff7300",
                        cursor: "pointer",
                        fontSize: "15px",
                        marginBottom: "25px",
                    }}
                >
                    ← Volver a la tienda
                </button>

                <h1>
                    🛒 Mi carrito
                </h1>

                <p
                    style={{
                        color: "#999",
                    }}
                >
                    {cantidadProductos} producto(s) en tu carrito
                </p>

                {productos.length === 0 ? (

                    <div
                        style={{
                            background: "#111",
                            border: "1px solid #292929",
                            borderRadius: "15px",
                            padding: "50px",
                            textAlign: "center",
                            marginTop: "30px",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "50px",
                            }}
                        >
                            🛒
                        </div>

                        <h2>
                            Tu carrito está vacío
                        </h2>

                        <p
                            style={{
                                color: "#888",
                            }}
                        >
                            Agrega productos para continuar.
                        </p>

                        <button
                            onClick={() => {
                                window.location.href = "/";
                            }}
                            style={{
                                background: "#ff7300",
                                color: "#fff",
                                border: "none",
                                padding: "13px 25px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "bold",
                            }}
                        >
                            Comprar productos
                        </button>
                    </div>

                ) : (

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "1fr 330px",
                            gap: "25px",
                            marginTop: "30px",
                        }}
                    >

                        {/* PRODUCTOS */}

                        <div>

                            {productos.map((producto) => (

                                <div
                                    key={producto.id}
                                    style={{
                                        display: "flex",
                                        gap: "20px",
                                        alignItems: "center",
                                        background: "#111",
                                        border: "1px solid #292929",
                                        borderRadius: "14px",
                                        padding: "15px",
                                        marginBottom: "15px",
                                    }}
                                >

                                    <img
                                        src={producto.imagen}
                                        alt={producto.nombre}
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                            borderRadius: "10px",
                                        }}
                                    />

                                    <div
                                        style={{
                                            flex: 1,
                                        }}
                                    >

                                        <h3>
                                            {producto.nombre}
                                        </h3>

                                        <p
                                            style={{
                                                color: "#ff7300",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            S/ {producto.precio.toFixed(2)}
                                        </p>

                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                            }}
                                        >

                                            <button
                                                onClick={() =>
                                                    disminuir(producto.id)
                                                }
                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                −
                                            </button>

                                            <strong>
                                                {producto.cantidad}
                                            </strong>

                                            <button
                                                onClick={() =>
                                                    aumentar(producto.id)
                                                }
                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                +
                                            </button>

                                        </div>

                                    </div>

                                    <button
                                        onClick={() =>
                                            eliminar(producto.id)
                                        }
                                        style={{
                                            background: "transparent",
                                            border: "none",
                                            color: "#ff4d4d",
                                            cursor: "pointer",
                                            fontSize: "20px",
                                        }}
                                    >
                                        🗑️
                                    </button>

                                </div>

                            ))}

                        </div>

                        {/* RESUMEN */}

                        <div
                            style={{
                                background: "#111",
                                border: "1px solid #292929",
                                borderRadius: "15px",
                                padding: "25px",
                                height: "fit-content",
                            }}
                        >

                            <h2>
                                Resumen
                            </h2>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "20px",
                                }}
                            >
                                <span>
                                    Productos
                                </span>

                                <span>
                                    {cantidadProductos}
                                </span>
                            </div>

                            <hr
                                style={{
                                    borderColor: "#292929",
                                    margin: "20px 0",
                                }}
                            />

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                }}
                            >

                                <span>
                                    Total
                                </span>

                                <span
                                    style={{
                                        color: "#ff7300",
                                    }}
                                >
                                    S/ {subtotal.toFixed(2)}
                                </span>

                            </div>

                            <button
                                onClick={() => {
                                    window.location.href =
                                        "/pago";
                                }}
                                style={{
                                    width: "100%",
                                    marginTop: "25px",
                                    background: "#ff7300",
                                    color: "#fff",
                                    border: "none",
                                    padding: "15px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                }}
                            >
                                Continuar con el pago
                            </button>

                        </div>

                    </div>

                )}

            </div>
        </main>
    );
}