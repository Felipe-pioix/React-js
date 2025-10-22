import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CarritoCompras from "./Carrito";
import { useAppContext } from "../context/AppContext";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
 
  // Contexto para el carrito
  const { agregarAlCarrito } = useAppContext();

useEffect(() => {
    fetch("https://68d482a8214be68f8c696a02.mockapi.io/Productos")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProductos(datos);
        setCargando(false);
      })
      .catch((error) => {
        {console.error("Error!,", error)}
        setError("Hubo un problema al cargar los productos.");
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;
  console.log(productos,cargando,error);
  return (
    <>
      <ul id="lista-productos">
        {productos.map((producto) => (
          <li key={producto.id}>
            <h2>{producto.nombre}</h2>
            <br />
            Descripción: {producto.descripcion}
            <br />
            Precio: ${producto.precio}
            <br />
            <img src={producto.avatar} alt={producto.nombre} width="80%" />
            <Link to={`/productos/${producto.categoria || 'sin-categoria'}/${producto.id}`} state={{producto}}>
              <button>Más detalles</button>
            </Link>
            <button onClick={() => agregarAlCarrito(producto)}>Comprar</button>
          </li>
        ))}
      </ul>
      <CarritoCompras />
    </>
  );
}