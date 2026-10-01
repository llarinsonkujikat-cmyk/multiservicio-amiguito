"use client";

import { useEffect, useMemo, useState } from "react";
import "./styles.css";

type Product = {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  imagen: string;
  descripcion: string;
  stock: number;
};

type CartItem = Product & {
  cantidad: number;
};

type Pedido = {
  id: string;
  fecha: string;
  productos: CartItem[];
  total: number;
  estado: string;
  direccion: string;
  telefono: string;
  metodoPago: string;
};

const productosIniciales: Product[] = [
  // =====================================================
  // PLASTIQUERÍA
  // =====================================================
  {
    id: 1,
    nombre: "Tina Grande",
    categoria: "Plastiquería",
    precio: 35,
    imagen:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Tina plástica grande, resistente y práctica para el hogar.",
    stock: 25,
  },
  {
    id: 2,
    nombre: "Balde Plástico",
    categoria: "Plastiquería",
    precio: 18,
    imagen:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Balde plástico resistente para limpieza y uso doméstico.",
    stock: 40,
  },
  {
    id: 3,
    nombre: "Canasta Plástica",
    categoria: "Plastiquería",
    precio: 25,
    imagen:
      "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Canasta multiuso para organizar y transportar productos.",
    stock: 30,
  },
  {
    id: 4,
    nombre: "Lavador Plástico Grande",
    categoria: "Plastiquería",
    precio: 28,
    imagen:
      "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Lavador plástico resistente para diferentes usos del hogar.",
    stock: 28,
  },
  {
    id: 5,
    nombre: "Jarra Plástica",
    categoria: "Plastiquería",
    precio: 12,
    imagen:
      "https://images.unsplash.com/photo-1601056639638-7d3f4f7f1c4b?auto=format&fit=crop&w=700&q=80",
    descripcion: "Jarra plástica práctica para servir bebidas.",
    stock: 45,
  },
  {
    id: 6,
    nombre: "Tacho de Basura",
    categoria: "Plastiquería",
    precio: 30,
    imagen:
      "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=700&q=80",
    descripcion: "Tacho plástico resistente para residuos.",
    stock: 20,
  },
  {
    id: 7,
    nombre: "Organizador Plástico",
    categoria: "Plastiquería",
    precio: 28,
    imagen:
      "https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Organizador plástico para mantener todo ordenado.",
    stock: 25,
  },
  {
    id: 8,
    nombre: "Caja Organizadora",
    categoria: "Plastiquería",
    precio: 32,
    imagen:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Caja plástica con espacio para organizar objetos.",
    stock: 22,
  },
  {
    id: 9,
    nombre: "Colador Plástico",
    categoria: "Plastiquería",
    precio: 9,
    imagen:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Colador plástico práctico para la cocina.",
    stock: 35,
  },
  {
    id: 10,
    nombre: "Recipiente con Tapa",
    categoria: "Plastiquería",
    precio: 15,
    imagen:
      "https://images.unsplash.com/photo-1601056639638-7d3f4f7f1c4b?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Recipiente plástico para conservar alimentos.",
    stock: 40,
  },

  // =====================================================
  // LIMPIEZA
  // =====================================================
  {
    id: 11,
    nombre: "Escoba",
    categoria: "Limpieza",
    precio: 15,
    imagen:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Escoba resistente para limpieza del hogar.",
    stock: 35,
  },
  {
    id: 12,
    nombre: "Recogedor",
    categoria: "Limpieza",
    precio: 8,
    imagen:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Recogedor plástico práctico y resistente.",
    stock: 50,
  },
  {
    id: 13,
    nombre: "Escobilla",
    categoria: "Limpieza",
    precio: 10,
    imagen:
      "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Escobilla para limpieza de diferentes superficies.",
    stock: 40,
  },
  {
    id: 14,
    nombre: "Trapeador",
    categoria: "Limpieza",
    precio: 18,
    imagen:
      "https://images.unsplash.com/photo-1581579185169-8b2a1a4e4c8f?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Trapeador absorbente para limpieza de pisos.",
    stock: 30,
  },
  {
    id: 15,
    nombre: "Secador de Piso",
    categoria: "Limpieza",
    precio: 16,
    imagen:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Secador de piso resistente y fácil de utilizar.",
    stock: 35,
  },
  {
    id: 16,
    nombre: "Cepillo para Ropa",
    categoria: "Limpieza",
    precio: 7,
    imagen:
      "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Cepillo resistente para lavar ropa.",
    stock: 45,
  },
  {
    id: 17,
    nombre: "Guantes de Limpieza",
    categoria: "Limpieza",
    precio: 9,
    imagen:
      "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Guantes para proteger las manos durante la limpieza.",
    stock: 60,
  },
  {
    id: 18,
    nombre: "Escobillón",
    categoria: "Limpieza",
    precio: 20,
    imagen:
      "https://images.unsplash.com/photo-1581579185169-8b2a1a4e4c8f?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Escobillón para limpiar patios y superficies.",
    stock: 25,
  },

  // =====================================================
  // ROPA
  // =====================================================
  {
    id: 19,
    nombre: "Polo Deportivo",
    categoria: "Ropa",
    precio: 45,
    imagen:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Polo deportivo cómodo para uso diario.",
    stock: 30,
  },
  {
    id: 20,
    nombre: "Polo Nike",
    categoria: "Ropa",
    precio: 79,
    imagen:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Polo deportivo cómodo y moderno.",
    stock: 20,
  },
  {
    id: 21,
    nombre: "Pantalón Jeans",
    categoria: "Ropa",
    precio: 119,
    imagen:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Pantalón jeans de excelente calidad.",
    stock: 15,
  },
  {
    id: 22,
    nombre: "Short Deportivo",
    categoria: "Ropa",
    precio: 39,
    imagen:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Short cómodo para deporte y uso diario.",
    stock: 25,
  },
  {
    id: 23,
    nombre: "Casaca",
    categoria: "Ropa",
    precio: 129,
    imagen:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Casaca moderna para días fríos.",
    stock: 18,
  },
  {
    id: 24,
    nombre: "Buzo Deportivo",
    categoria: "Ropa",
    precio: 89,
    imagen:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Buzo deportivo cómodo y moderno.",
    stock: 22,
  },

  // =====================================================
  // ZAPATOS
  // =====================================================
  {
    id: 25,
    nombre: "Zapatillas Deportivas",
    categoria: "Zapatos",
    precio: 149,
    imagen:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Zapatillas cómodas para uso diario.",
    stock: 18,
  },
  {
    id: 26,
    nombre: "Zapatillas Urbanas",
    categoria: "Zapatos",
    precio: 129,
    imagen:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Zapatillas urbanas para combinar con diferentes prendas.",
    stock: 20,
  },
  {
    id: 27,
    nombre: "Sandalias",
    categoria: "Zapatos",
    precio: 55,
    imagen:
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Sandalias cómodas para uso diario.",
    stock: 25,
  },
  {
    id: 28,
    nombre: "Botines",
    categoria: "Zapatos",
    precio: 159,
    imagen:
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Botines resistentes y modernos.",
    stock: 12,
  },

  // =====================================================
  // ELECTRÓNICA
  // =====================================================
  {
    id: 29,
    nombre: "Audífonos Bluetooth",
    categoria: "Electrónica",
    precio: 129,
    imagen:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Audífonos inalámbricos con excelente sonido.",
    stock: 25,
  },
  {
    id: 30,
    nombre: "Parlante Bluetooth",
    categoria: "Electrónica",
    precio: 99,
    imagen:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Parlante portátil con conexión Bluetooth.",
    stock: 20,
  },
  {
    id: 31,
    nombre: "Cargador USB",
    categoria: "Electrónica",
    precio: 25,
    imagen:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Cargador USB para celulares y dispositivos.",
    stock: 50,
  },
  {
    id: 32,
    nombre: "Cable USB Tipo C",
    categoria: "Electrónica",
    precio: 18,
    imagen:
      "https://images.unsplash.com/photo-1591290619762-c5887a7f6a4e?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Cable USB Tipo C resistente.",
    stock: 60,
  },
  {
    id: 33,
    nombre: "Power Bank",
    categoria: "Electrónica",
    precio: 79,
    imagen:
      "https://images.unsplash.com/photo-1609592424629-1d2f0f9c6b2e?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Batería portátil para cargar tus dispositivos.",
    stock: 20,
  },
  {
    id: 34,
    nombre: "Mouse Inalámbrico",
    categoria: "Electrónica",
    precio: 45,
    imagen:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Mouse inalámbrico para computadora.",
    stock: 30,
  },

  // =====================================================
  // ACCESORIOS
  // =====================================================
  {
    id: 35,
    nombre: "Mochila",
    categoria: "Accesorios",
    precio: 99,
    imagen:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Mochila resistente para estudios y trabajo.",
    stock: 22,
  },
  {
    id: 36,
    nombre: "Gorra Negra",
    categoria: "Accesorios",
    precio: 49,
    imagen:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Gorra casual de color negro.",
    stock: 30,
  },
  {
    id: 37,
    nombre: "Billetera",
    categoria: "Accesorios",
    precio: 35,
    imagen:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Billetera compacta para uso diario.",
    stock: 25,
  },
  {
    id: 38,
    nombre: "Cartera",
    categoria: "Accesorios",
    precio: 85,
    imagen:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Cartera moderna y práctica.",
    stock: 15,
  },
  {
    id: 39,
    nombre: "Lentes de Sol",
    categoria: "Accesorios",
    precio: 39,
    imagen:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Lentes de sol para uso diario.",
    stock: 35,
  },

  // =====================================================
  // COCINA
  // =====================================================
  {
    id: 40,
    nombre: "Sartén Antiadherente",
    categoria: "Cocina",
    precio: 65,
    imagen:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Sartén antiadherente para preparar tus comidas.",
    stock: 20,
  },
  {
    id: 41,
    nombre: "Olla de Cocina",
    categoria: "Cocina",
    precio: 89,
    imagen:
      "https://images.unsplash.com/photo-1584990347449-ae9c6c6c4c3c?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Olla resistente para cocina diaria.",
    stock: 18,
  },
  {
    id: 42,
    nombre: "Juego de Cucharones",
    categoria: "Cocina",
    precio: 35,
    imagen:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Juego de utensilios para cocina.",
    stock: 30,
  },
  {
    id: 43,
    nombre: "Tabla para Picar",
    categoria: "Cocina",
    precio: 22,
    imagen:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Tabla práctica para preparar alimentos.",
    stock: 35,
  },
  {
    id: 44,
    nombre: "Tazas de Cocina",
    categoria: "Cocina",
    precio: 30,
    imagen:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Juego de tazas para bebidas calientes y frías.",
    stock: 25,
  },

  // =====================================================
  // HOGAR
  // =====================================================
  {
    id: 45,
    nombre: "Almohada",
    categoria: "Hogar",
    precio: 35,
    imagen:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Almohada cómoda para descansar.",
    stock: 30,
  },
  {
    id: 46,
    nombre: "Manta",
    categoria: "Hogar",
    precio: 65,
    imagen:
      "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Manta suave y cómoda para el hogar.",
    stock: 20,
  },
  {
    id: 47,
    nombre: "Lámpara de Mesa",
    categoria: "Hogar",
    precio: 55,
    imagen:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Lámpara decorativa para dormitorio o escritorio.",
    stock: 18,
  },
  {
    id: 48,
    nombre: "Reloj de Pared",
    categoria: "Hogar",
    precio: 45,
    imagen:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Reloj de pared para decorar tu hogar.",
    stock: 25,
  },

  // =====================================================
  // NIÑOS
  // =====================================================
  {
    id: 49,
    nombre: "Pelota Infantil",
    categoria: "Niños",
    precio: 25,
    imagen:
      "https://images.unsplash.com/photo-1515524738708-327f6b0037a7?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Pelota para juegos infantiles.",
    stock: 30,
  },
  {
    id: 50,
    nombre: "Mochila Infantil",
    categoria: "Niños",
    precio: 59,
    imagen:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Mochila infantil para colegio y paseos.",
    stock: 20,
  },
  {
    id: 51,
    nombre: "Juguete Educativo",
    categoria: "Niños",
    precio: 45,
    imagen:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Juguete educativo para niños.",
    stock: 25,
  },

  // =====================================================
  // HERRAMIENTAS
  // =====================================================
  {
    id: 52,
    nombre: "Martillo",
    categoria: "Herramientas",
    precio: 35,
    imagen:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Martillo resistente para trabajos del hogar.",
    stock: 20,
  },
  {
    id: 53,
    nombre: "Destornillador",
    categoria: "Herramientas",
    precio: 15,
    imagen:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Destornillador práctico para trabajos domésticos.",
    stock: 35,
  },
  {
    id: 54,
    nombre: "Juego de Herramientas",
    categoria: "Herramientas",
    precio: 99,
    imagen:
      "https://images.unsplash.com/photo-1581147036324-c17ac41a5a22?auto=format&fit=crop&w=700&q=80",
    descripcion:
      "Juego de herramientas para diferentes trabajos.",
    stock: 15,
  },
];

const categorias = [
  "Todos",
  "Plastiquería",
  "Limpieza",
  "Ropa",
  "Zapatos",
  "Electrónica",
  "Accesorios",
  "Cocina",
  "Hogar",
  "Niños",
  "Herramientas",
];

export default function Home() {
  const [pantalla, setPantalla] = useState<
    "registro" | "login" | "tienda"
  >("registro");

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [usuario, setUsuario] = useState("");

  const [categoria, setCategoria] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const [carrito, setCarrito] = useState<CartItem[]>([]);
  const [compras, setCompras] = useState<Pedido[]>([]);

  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Product | null>(null);

  const [vista, setVista] = useState<
    "inicio" | "productos" | "carrito" | "compras" | "checkout"
  >("inicio");

  const [cantidadProducto, setCantidadProducto] = useState(1);

  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [metodoPago, setMetodoPago] = useState("Yape");

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem(
      "amiguito_usuario"
    );

    const carritoGuardado = localStorage.getItem(
      "amiguito_carrito"
    );

    const comprasGuardadas = localStorage.getItem(
      "amiguito_compras"
    );

    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
      setCorreo(usuarioGuardado);
      setPantalla("login");
    }

    if (carritoGuardado) {
      try {
        setCarrito(JSON.parse(carritoGuardado));
      } catch {
        setCarrito([]);
      }
    }

    if (comprasGuardadas) {
      try {
        setCompras(JSON.parse(comprasGuardadas));
      } catch {
        setCompras([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "amiguito_carrito",
      JSON.stringify(carrito)
    );
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem(
      "amiguito_compras",
      JSON.stringify(compras)
    );
  }, [compras]);

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();

    return productosIniciales.filter((producto) => {
      const coincideCategoria =
        categoria === "Todos" ||
        producto.categoria === categoria;

      const coincideBusqueda =
        producto.nombre.toLowerCase().includes(texto) ||
        producto.categoria.toLowerCase().includes(texto) ||
        producto.descripcion.toLowerCase().includes(texto);

      return coincideCategoria && coincideBusqueda;
    });
  }, [categoria, busqueda]);

  const totalCarrito = carrito.reduce(
    (total, producto) =>
      total + producto.precio * producto.cantidad,
    0
  );

  const cantidadCarrito = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  function registrarUsuario(e: React.FormEvent) {
    e.preventDefault();

    if (!correo || !password) {
      setMensaje("Completa tu correo y contraseña.");
      return;
    }

    if (!correo.includes("@")) {
      setMensaje("Ingresa un correo válido.");
      return;
    }

    localStorage.setItem("amiguito_usuario", correo);

    setUsuario(correo);
    setMensaje("");
    setPantalla("login");
  }

  function iniciarSesion(e: React.FormEvent) {
    e.preventDefault();

    if (!correo || !password) {
      setMensaje("Ingresa tu correo y contraseña.");
      return;
    }

    setUsuario(correo);
    setPantalla("tienda");
    setVista("inicio");
    setMensaje("");
  }

  function continuarConGoogle() {
    setMensaje(
      "El acceso real con Google requiere configurar Google OAuth o Auth.js."
    );
  }

  function agregarCarrito(
    producto: Product,
    cantidad = 1
  ) {
    setCarrito((carritoAnterior) => {
      const productoExiste = carritoAnterior.find(
        (item) => item.id === producto.id
      );

      if (productoExiste) {
        return carritoAnterior.map((item) =>
          item.id === producto.id
            ? {
              ...item,
              cantidad: Math.min(
                item.cantidad + cantidad,
                producto.stock
              ),
            }
            : item
        );
      }

      return [
        ...carritoAnterior,
        {
          ...producto,
          cantidad: Math.min(cantidad, producto.stock),
        },
      ];
    });

    setMensaje("Producto agregado al carrito.");

    setTimeout(() => {
      setMensaje("");
    }, 2000);
  }

  function cambiarCantidad(
    id: number,
    nuevaCantidad: number
  ) {
    if (nuevaCantidad < 1) {
      eliminarDelCarrito(id);
      return;
    }

    setCarrito((carritoAnterior) =>
      carritoAnterior.map((item) =>
        item.id === id
          ? {
            ...item,
            cantidad: Math.min(
              nuevaCantidad,
              item.stock
            ),
          }
          : item
      )
    );
  }

  function eliminarDelCarrito(id: number) {
    setCarrito((carritoAnterior) =>
      carritoAnterior.filter((item) => item.id !== id)
    );
  }

  function abrirProducto(producto: Product) {
    setProductoSeleccionado(producto);
    setCantidadProducto(1);
  }

  function comprar() {
    if (!direccion.trim()) {
      setMensaje("Completa tu dirección.");
      return;
    }

    if (!telefono.trim()) {
      setMensaje("Completa tu teléfono.");
      return;
    }

    if (carrito.length === 0) {
      setMensaje("Tu carrito está vacío.");
      return;
    }

    const nuevoPedido: Pedido = {
      id:
        "HU-" +
        Date.now().toString().slice(-8),

      fecha: new Date().toLocaleString("es-PE"),

      productos: carrito,

      total: totalCarrito,

      estado: "Pedido recibido",

      direccion: direccion,

      telefono: telefono,

      metodoPago: metodoPago,
    };

    setCompras((comprasAnteriores) => [
      nuevoPedido,
      ...comprasAnteriores,
    ]);

    const detalleProductos = carrito
      .map(
        (producto) =>
          `• ${producto.nombre} x${producto.cantidad} = S/ ${(
            producto.precio * producto.cantidad
          ).toFixed(2)}`
      )
      .join("\n");

    const mensajeWhatsApp =
      `🛒 *NUEVO PEDIDO - MULTISERVICIO EL AMIGUITO A & B*\n\n` +
      `📦 *Pedido:* ${nuevoPedido.id}\n\n` +
      `👤 *Cliente:* ${usuario || correo}\n\n` +
      `📍 *Dirección:* ${direccion}\n\n` +
      `📱 *Teléfono:* ${telefono}\n\n` +
      `💳 *Método de pago:* ${metodoPago}\n\n` +
      `🛍️ *Productos:*\n${detalleProductos}\n\n` +
      `💰 *TOTAL: S/ ${totalCarrito.toFixed(2)}*\n\n` +
      `✅ Pedido realizado desde la tienda online.`;

    const numeroWhatsApp = "51976702719";

    const urlWhatsApp =
      `https://wa.me/${numeroWhatsApp}` +
      `?text=${encodeURIComponent(mensajeWhatsApp)}`;

    setCarrito([]);

    setVista("compras");

    setMensaje(
      "¡Pedido realizado correctamente! Abriendo WhatsApp..."
    );

    setTimeout(() => {
      window.open(urlWhatsApp, "_blank");
    }, 500);
  }

  function enviarPedidoWhatsApp(pedido: Pedido) {
    const detalleProductos = pedido.productos
      .map(
        (producto) =>
          `• ${producto.nombre} x${producto.cantidad} = S/ ${(
            producto.precio * producto.cantidad
          ).toFixed(2)}`
      )
      .join("\n");

    const mensajeWhatsApp =
      `🛒 *PEDIDO - MULTISERVICIO EL AMIGUITO A & B*\n\n` +
      `📦 *Pedido:* ${pedido.id}\n\n` +
      `👤 *Cliente:* ${usuario || correo}\n\n` +
      `📍 *Dirección:* ${pedido.direccion}\n\n` +
      `📱 *Teléfono:* ${pedido.telefono}\n\n` +
      `💳 *Método de pago:* ${pedido.metodoPago}\n\n` +
      `🛍️ *Productos:*\n${detalleProductos}\n\n` +
      `💰 *TOTAL: S/ ${pedido.total.toFixed(2)}*\n\n` +
      `Hola, deseo confirmar mi pedido.`;

    const numeroWhatsApp = "51976702719";

    const urlWhatsApp =
      `https://wa.me/${numeroWhatsApp}` +
      `?text=${encodeURIComponent(mensajeWhatsApp)}`;

    window.open(urlWhatsApp, "_blank");
  }

  function cerrarSesion() {
    setPantalla("login");
    setVista("inicio");
    setMensaje("");
  }

  if (pantalla === "registro") {
    return (
      <main className="auth-page">
        <div className="auth-card">
          <div className="logo-auth">
            <span>🛒</span>
            multiservicio el amiguito a & b
          </div>

          <p className="slogan">
            Tu tienda, siempre en línea
          </p>

          <h1>Crea tu cuenta</h1>

          <button
            className="google-button"
            onClick={continuarConGoogle}
          >
            <span>G</span>
            Registrarse con Google
          </button>

          <div className="separator">
            <span>o</span>
          </div>

          <form onSubmit={registrarUsuario}>
            <label>Correo electrónico</label>

            <div className="input-box">
              <span>✉</span>

              <input
                type="email"
                placeholder="usuario@gmail.com"
                value={correo}
                onChange={(e) =>
                  setCorreo(e.target.value)
                }
              />
            </div>

            <label>Contraseña</label>

            <div className="input-box">
              <span>🔒</span>

              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            {mensaje && (
              <p className="error-message">
                {mensaje}
              </p>
            )}

            <button
              className="primary-button"
              type="submit"
            >
              Crear cuenta
            </button>
          </form>

          <p className="auth-bottom">
            ¿Ya tienes una cuenta?{" "}
            <button
              onClick={() => {
                setPantalla("login");
                setMensaje("");
              }}
            >
              Iniciar sesión
            </button>
          </p>
        </div>
      </main>
    );
  }

  if (pantalla === "login") {
    return (
      <main className="auth-page">
        <div className="auth-card">
          <div className="logo-auth">
            <span>🛒</span>
            multiservicio el amiguito a & b
          </div>

          <p className="slogan">
            Tu tienda, siempre en línea
          </p>

          <h1>Iniciar sesión</h1>

          <button
            className="google-button"
            onClick={continuarConGoogle}
          >
            <span>G</span>
            Continuar con Google
          </button>

          <div className="separator">
            <span>o</span>
          </div>

          <form onSubmit={iniciarSesion}>
            <label>Correo electrónico</label>

            <div className="input-box">
              <span>✉</span>

              <input
                type="email"
                placeholder="usuario@gmail.com"
                value={correo}
                onChange={(e) =>
                  setCorreo(e.target.value)
                }
              />
            </div>

            <label>Contraseña</label>

            <div className="input-box">
              <span>🔒</span>

              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            {mensaje && (
              <p className="error-message">
                {mensaje}
              </p>
            )}

            <button
              className="primary-button"
              type="submit"
            >
              Ingresar
            </button>
          </form>

          <p className="auth-bottom">
            ¿No tienes una cuenta?{" "}
            <button
              onClick={() => {
                setPantalla("registro");
                setMensaje("");
              }}
            >
              Registrarse
            </button>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="store-page">
      <header className="top-header">
        <div
          className="brand"
          onClick={() => setVista("inicio")}
        >
          <span>🛒</span>

          <strong>
            multiservicio el amiguito a & b
          </strong>
        </div>

        <div className="search">
          <input
            placeholder="Buscar tinas, baldes, escobas..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setVista("productos");
            }}
          />

          <span>⌕</span>
        </div>

        <div className="header-actions">
          <button
            className="cart-header"
            onClick={() => setVista("carrito")}
          >
            🛒

            {cantidadCarrito > 0 && (
              <span>{cantidadCarrito}</span>
            )}
          </button>

          <button
            onClick={() => setVista("compras")}
          >
            👤 Mi cuenta
          </button>
        </div>
      </header>

      <div className="store-layout">
        <aside className="sidebar">
          <button
            className={
              vista === "inicio"
                ? "menu-active"
                : ""
            }
            onClick={() => setVista("inicio")}
          >
            🏠 Inicio
          </button>

          <button
            className={
              vista === "productos"
                ? "menu-active"
                : ""
            }
            onClick={() => {
              setCategoria("Todos");
              setVista("productos");
            }}
          >
            🛍️ Todos los productos
          </button>

          <h3>Categorías</h3>

          {categorias.slice(1).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategoria(cat);
                setBusqueda("");
                setVista("productos");
              }}
            >
              {cat === "Plastiquería" && "🪣 "}
              {cat === "Limpieza" && "🧹 "}
              {cat === "Ropa" && "👕 "}
              {cat === "Zapatos" && "👟 "}
              {cat === "Electrónica" && "💻 "}
              {cat === "Accesorios" && "🎒 "}
              {cat === "Cocina" && "🍳 "}
              {cat === "Hogar" && "🏠 "}
              {cat === "Niños" && "🧸 "}
              {cat === "Herramientas" && "🔨 "}

              {cat}
            </button>
          ))}

          <div className="sidebar-bottom">
            <button
              onClick={() => setVista("carrito")}
            >
              🛒 Carrito

              {cantidadCarrito > 0 && (
                <b>{cantidadCarrito}</b>
              )}
            </button>

            <button
              onClick={() => setVista("compras")}
            >
              📦 Mis pedidos
            </button>

            <button onClick={cerrarSesion}>
              🚪 Cerrar sesión
            </button>
          </div>
        </aside>

        <section className="content">
          {mensaje && (
            <div className="success-message">
              {mensaje}
            </div>
          )}

          {vista === "inicio" && (
            <>
              <section className="hero">
                <div>
                  <p className="hero-small">
                    MULTISERVICIO EL AMIGUITO A & B
                  </p>

                  <h1>
                    Plastiquería, limpieza y mucho más
                  </h1>

                  <p>
                    Tinas, baldes, canastas, escobas,
                    recogedores, ropa, zapatos,
                    electrónica y productos para tu
                    hogar.
                  </p>

                  <button
                    onClick={() => {
                      setVista("productos");
                      setCategoria("Todos");
                    }}
                  >
                    Comprar ahora
                  </button>
                </div>

                <div className="hero-products">
                  <span>🪣</span>
                  <span>🧺</span>
                  <span>🧹</span>
                  <span>👕</span>
                  <span>👟</span>
                </div>
              </section>

              <div className="section-title">
                <div>
                  <h2>Productos destacados</h2>

                  <p>
                    Encuentra productos para tu hogar,
                    familia y uso diario.
                  </p>
                </div>
              </div>

              <div className="product-grid">
                {productosIniciales
                  .slice(0, 12)
                  .map((producto) => (
                    <ProductCard
                      key={producto.id}
                      producto={producto}
                      onOpen={abrirProducto}
                      onAdd={agregarCarrito}
                    />
                  ))}
              </div>
            </>
          )}

          {vista === "productos" && (
            <>
              <div className="products-header">
                <div>
                  <h1>
                    {categoria === "Todos"
                      ? "Todos los productos"
                      : categoria}
                  </h1>

                  <p>
                    {productosFiltrados.length}{" "}
                    productos disponibles
                  </p>
                </div>

                <select
                  value={categoria}
                  onChange={(e) =>
                    setCategoria(e.target.value)
                  }
                >
                  {categorias.map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                    >
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {productosFiltrados.length === 0 ? (
                <div className="empty-box">
                  <span>🔎</span>

                  <h2>
                    No encontramos productos
                  </h2>

                  <p>
                    Prueba buscando otro producto.
                  </p>
                </div>
              ) : (
                <div className="product-grid">
                  {productosFiltrados.map(
                    (producto) => (
                      <ProductCard
                        key={producto.id}
                        producto={producto}
                        onOpen={abrirProducto}
                        onAdd={agregarCarrito}
                      />
                    )
                  )}
                </div>
              )}
            </>
          )}

          {vista === "carrito" && (
            <CartView
              carrito={carrito}
              total={totalCarrito}
              onChange={cambiarCantidad}
              onDelete={eliminarDelCarrito}
              onContinue={() =>
                setVista("productos")
              }
              onCheckout={() =>
                setVista("checkout")
              }
            />
          )}

          {vista === "checkout" && (
            <CheckoutView
              direccion={direccion}
              telefono={telefono}
              metodoPago={metodoPago}
              setDireccion={setDireccion}
              setTelefono={setTelefono}
              setMetodoPago={setMetodoPago}
              total={totalCarrito}
              onBack={() => setVista("carrito")}
              onBuy={comprar}
            />
          )}

          {vista === "compras" && (
            <PurchasesView
              compras={compras}
              onWhatsApp={enviarPedidoWhatsApp}
            />
          )}
        </section>
      </div>

      {productoSeleccionado && (
        <div
          className="modal-background"
          onClick={() =>
            setProductoSeleccionado(null)
          }
        >
          <div
            className="product-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="close-modal"
              onClick={() =>
                setProductoSeleccionado(null)
              }
            >
              ×
            </button>

            <div className="modal-image">
              <img
                src={productoSeleccionado.imagen}
                alt={productoSeleccionado.nombre}
              />
            </div>

            <div className="modal-info">
              <p className="category-label">
                {productoSeleccionado.categoria}
              </p>

              <h1>
                {productoSeleccionado.nombre}
              </h1>

              <div className="stars">
                ★★★★★
              </div>

              <p className="modal-description">
                {productoSeleccionado.descripcion}
              </p>

              <div className="modal-price">
                S/{" "}
                {productoSeleccionado.precio.toFixed(
                  2
                )}
              </div>

              <p>
                Stock disponible:{" "}
                <strong>
                  {productoSeleccionado.stock}
                </strong>
              </p>

              <div className="quantity-selector">
                <button
                  onClick={() =>
                    setCantidadProducto(
                      Math.max(
                        1,
                        cantidadProducto - 1
                      )
                    )
                  }
                >
                  −
                </button>

                <span>
                  {cantidadProducto}
                </span>

                <button
                  onClick={() =>
                    setCantidadProducto(
                      Math.min(
                        productoSeleccionado.stock,
                        cantidadProducto + 1
                      )
                    )
                  }
                >
                  +
                </button>
              </div>

              <button
                className="primary-button"
                onClick={() => {
                  agregarCarrito(
                    productoSeleccionado,
                    cantidadProducto
                  );

                  setProductoSeleccionado(null);
                }}
              >
                🛒 Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      )}

      <footer>
        <div>
          <strong>
            🛒 multiservicio el amiguito a & b
          </strong>

          <p>
            Tu tienda, siempre en línea
          </p>
        </div>

        <div>
          <strong>🚚 Envíos</strong>

          <p>
            En Cenepa Amazonas
          </p>
        </div>

        <div>
          <strong>💳 Pagos</strong>

          <p>
            Yape, Plin y efectivo
          </p>
        </div>

        <div>
          <strong>📱 Pedidos</strong>

          <p>
            WhatsApp: 976 702 719
          </p>
        </div>
      </footer>
    </main>
  );
}

function ProductCard({
  producto,
  onOpen,
  onAdd,
}: {
  producto: Product;
  onOpen: (producto: Product) => void;
  onAdd: (producto: Product) => void;
}) {
  return (
    <article className="product-card">
      <div
        className="product-image"
        onClick={() => onOpen(producto)}
      >
        <img
          src={producto.imagen}
          alt={producto.nombre}
        />
      </div>

      <div className="product-info">
        <span>{producto.categoria}</span>

        <h3>{producto.nombre}</h3>

        <div className="price">
          S/ {producto.precio.toFixed(2)}
        </div>

        <p>
          Stock: {producto.stock}
        </p>

        <button
          onClick={() => onAdd(producto)}
        >
          Agregar al carrito
        </button>

        <button
          className="details-button"
          onClick={() => onOpen(producto)}
        >
          Ver producto
        </button>
      </div>
    </article>
  );
}

function CartView({
  carrito,
  total,
  onChange,
  onDelete,
  onContinue,
  onCheckout,
}: {
  carrito: CartItem[];
  total: number;
  onChange: (
    id: number,
    cantidad: number
  ) => void;
  onDelete: (id: number) => void;
  onContinue: () => void;
  onCheckout: () => void;
}) {
  if (carrito.length === 0) {
    return (
      <div className="empty-box large">
        <span>🛒</span>

        <h1>
          Tu carrito está vacío
        </h1>

        <p>
          Agrega productos para realizar un pedido.
        </p>

        <button
          className="primary-button"
          onClick={onContinue}
        >
          Ver productos
        </button>
      </div>
    );
  }

  return (
    <section className="cart-section">
      <div className="products-header">
        <div>
          <h1>Mi carrito</h1>

          <p>
            {carrito.length} productos diferentes
          </p>
        </div>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {carrito.map((item) => (
            <div
              className="cart-item"
              key={item.id}
            >
              <img
                src={item.imagen}
                alt={item.nombre}
              />

              <div className="cart-item-info">
                <span>
                  {item.categoria}
                </span>

                <h3>
                  {item.nombre}
                </h3>

                <p>
                  S/ {item.precio.toFixed(2)}
                </p>
              </div>

              <div className="cart-quantity">
                <button
                  onClick={() =>
                    onChange(
                      item.id,
                      item.cantidad - 1
                    )
                  }
                >
                  −
                </button>

                <span>
                  {item.cantidad}
                </span>

                <button
                  onClick={() =>
                    onChange(
                      item.id,
                      item.cantidad + 1
                    )
                  }
                >
                  +
                </button>
              </div>

              <strong>
                S/{" "}
                {(
                  item.precio *
                  item.cantidad
                ).toFixed(2)}
              </strong>

              <button
                className="delete-button"
                onClick={() =>
                  onDelete(item.id)
                }
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        <aside className="summary">
          <h2>
            Resumen de pedido
          </h2>

          <div>
            <span>Subtotal</span>

            <strong>
              S/ {total.toFixed(2)}
            </strong>
          </div>

          <div>
            <span>Envío</span>

            <strong>
              S/ 5 - S/ 20
            </strong>
          </div>

          <hr />

          <div className="summary-total">
            <span>
              Total productos
            </span>

            <strong>
              S/ {total.toFixed(2)}
            </strong>
          </div>

          <button
            className="primary-button"
            onClick={onCheckout}
          >
            Finalizar pedido
          </button>

          <button
            className="secondary-button"
            onClick={onContinue}
          >
            Seguir comprando
          </button>
        </aside>
      </div>
    </section>
  );
}

function CheckoutView({
  direccion,
  telefono,
  metodoPago,
  setDireccion,
  setTelefono,
  setMetodoPago,
  total,
  onBack,
  onBuy,
}: {
  direccion: string;
  telefono: string;
  metodoPago: string;
  setDireccion: (value: string) => void;
  setTelefono: (value: string) => void;
  setMetodoPago: (value: string) => void;
  total: number;
  onBack: () => void;
  onBuy: () => void;
}) {
  return (
    <section>
      <div className="products-header">
        <div>
          <h1>
            Finalizar pedido
          </h1>

          <p>
            Completa tus datos y luego
            enviaremos el pedido por WhatsApp.
          </p>
        </div>
      </div>

      <div className="checkout-layout">
        <div className="checkout-card">
          <div className="checkout-step active">
            <span>1</span>

            <div>
              <h3>
                Datos de entrega
              </h3>

              <p>
                Ingresa dónde deseas recibir
                tu pedido.
              </p>
            </div>
          </div>

          <label>
            Dirección
          </label>

          <input
            className="normal-input"
            placeholder="Ejemplo: Cenepa - Amazonas"
            value={direccion}
            onChange={(e) =>
              setDireccion(e.target.value)
            }
          />

          <label>
            Teléfono
          </label>

          <input
            className="normal-input"
            placeholder="987654321"
            value={telefono}
            onChange={(e) =>
              setTelefono(e.target.value)
            }
          />

          <div className="checkout-step active">
            <span>2</span>

            <div>
              <h3>
                Método de pago
              </h3>

              <p>
                Selecciona cómo deseas pagar.
              </p>
            </div>
          </div>

          <div className="payment-options">
            {[
              "Yape",
              "Plin",
              "Efectivo",
            ].map((metodo) => (
              <button
                key={metodo}
                type="button"
                className={
                  metodoPago === metodo
                    ? "payment-selected"
                    : ""
                }
                onClick={() =>
                  setMetodoPago(metodo)
                }
              >
                <strong>
                  {metodo === "Yape" &&
                    "🟣"}

                  {metodo === "Plin" &&
                    "🔵"}

                  {metodo === "Efectivo" &&
                    "💵"}{" "}

                  {metodo}
                </strong>

                <span>
                  {metodo === "Efectivo"
                    ? "Pago al recibir"
                    : `Pagar con ${metodo}`}
                </span>
              </button>
            ))}
          </div>

          <div className="whatsapp-notice">
            <strong>
              📱 Pedido por WhatsApp
            </strong>

            <p>
              Al confirmar, tu pedido será
              enviado al WhatsApp{" "}
              <strong>
                976 702 719
              </strong>
              .
            </p>
          </div>
        </div>

        <aside className="summary">
          <h2>Resumen</h2>

          <div>
            <span>Método</span>

            <strong>
              {metodoPago}
            </strong>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>

            <strong>
              S/ {total.toFixed(2)}
            </strong>
          </div>

          <button
            className="whatsapp-button"
            onClick={onBuy}
          >
            📱 Confirmar y enviar por WhatsApp
          </button>

          <button
            className="secondary-button"
            onClick={onBack}
          >
            Volver al carrito
          </button>
        </aside>
      </div>
    </section>
  );
}

function PurchasesView({
  compras,
  onWhatsApp,
}: {
  compras: Pedido[];
  onWhatsApp: (pedido: Pedido) => void;
}) {
  return (
    <section>
      <div className="products-header">
        <div>
          <h1>
            Mis pedidos
          </h1>

          <p>
            Consulta los pedidos que realizaste.
          </p>
        </div>
      </div>

      {compras.length === 0 ? (
        <div className="empty-box large">
          <span>📦</span>

          <h2>
            Aún no tienes pedidos
          </h2>

          <p>
            Tus pedidos aparecerán aquí
            después de comprar.
          </p>
        </div>
      ) : (
        <div className="orders">
          {compras.map((pedido) => (
            <article
              className="order-card"
              key={pedido.id}
            >
              <div className="order-header">
                <div>
                  <strong>
                    Pedido #{pedido.id}
                  </strong>

                  <p>
                    {pedido.fecha}
                  </p>
                </div>

                <span>
                  {pedido.estado}
                </span>
              </div>

              <div className="order-info">
                <p>
                  📍{" "}
                  <strong>
                    Dirección:
                  </strong>{" "}
                  {pedido.direccion}
                </p>

                <p>
                  📱{" "}
                  <strong>
                    Teléfono:
                  </strong>{" "}
                  {pedido.telefono}
                </p>

                <p>
                  💳{" "}
                  <strong>
                    Pago:
                  </strong>{" "}
                  {pedido.metodoPago}
                </p>
              </div>

              <div className="order-products">
                {pedido.productos.map(
                  (producto) => (
                    <div
                      key={producto.id}
                    >
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                      />

                      <div>
                        <strong>
                          {producto.nombre}
                        </strong>

                        <p>
                          Cantidad:{" "}
                          {producto.cantidad}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="order-total">
                <span>
                  Total del pedido
                </span>

                <strong>
                  S/{" "}
                  {pedido.total.toFixed(2)}
                </strong>
              </div>

              <button
                className="whatsapp-button"
                onClick={() =>
                  onWhatsApp(pedido)
                }
              >
                📱 Enviar pedido por WhatsApp
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}