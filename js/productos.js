// ========================================
// EXAMEN DE JAVASCRIPT - CARRITO DE COMPRAS SIMPLIFICADO
// PÁGINA PRINCIPAL DE PRODUCTOS
// ========================================

// INSTRUCCIONES PARA EL ESTUDIANTE:
// 1. Completa las funciones marcadas con "TODO"
// 2. Lee los comentarios cuidadosamente para entender qué hacer
// 3. Puedes usar console.log() para debuggear
// 4. El HTML y CSS ya están listos - enfócate solo en JavaScript

// ==========================================
// VARIABLES GLOBALES
// ==========================================

// TODO: Estas variables ya están declaradas para ayudarte
let todosLosProductos = []; // Array para guardar todos los productos del JSON
let carrito = []; // Array para el carrito de compras

// TODO: Referencias a elementos del DOM que necesitarás usar
const gridProductos = document.getElementById('productsGrid');
const contadorCarrito = document.getElementById('cartCount');

// ==========================================
// FUNCIÓN 1: CARGAR PRODUCTOS DESDE JSON (10 PUNTOS)
// ==========================================

/**
 * TODO: Completa esta función para cargar productos desde 'data/productos.json'
 * 
 * PASOS A SEGUIR:
 * 1. Usa fetch() para obtener el archivo 'data/productos.json'
 * 2. Convierte la respuesta a JSON
 * 3. Guarda los productos en la variable 'todosLosProductos'
 * 4. Llama a mostrarProductos() para mostrarlos en pantalla
 * 
 * PUNTOS EVALUADOS:
 * - Uso correcto de fetch() (3 pts)
 * - Manejo correcto de .then() o async/await (3 pts)
 * - Conversión correcta a JSON (2 pts)
 * - Llamada a mostrarProductos() (2 pts)
 */
async function cargarProductos() {
  try {
    // TODO: Escribe tu código aquí
    // Ejemplo: const respuesta = await fetch('data/productos.json');
    // Paso 1 : Usa fetch() para obtener el archivo 'data/productos.json' 
    const respuesta = await fetch('../data/productos.json')

    // Paso 2 : Convierte la respuesta a JSON
    const data = await respuesta.json();

    // Paso 3 : Guarda los productos en la variable 'todosLosProductos'
    todosLosProductos = data.productos;
    // console.log(todosLosProductos);

    // Paso 4 : Llama a mostrarProductos() para mostrarlos en pantalla
    mostrarProductos(todosLosProductos);

    // Cuenta los productos encontrados 
    const contador = document.getElementById('productsCount');
    contador.textContent = `${todosLosProductos.length} productos encontrados`
    contador.classList.remove('loading')

    // Elimina el spinner de carga al final de los productos
    const estadoCarga = document.querySelector('#loadingState')
    estadoCarga.style.display = ('none')
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
}

// ==========================================
// FUNCIÓN 2: MOSTRAR PRODUCTOS EN EL DOM (15 PUNTOS)
// ==========================================

/**
 * TODO: Completa esta función para crear las tarjetas de productos
 * 
 * PASOS A SEGUIR:
 * 1. Limpia el contenido anterior del gridProductos
 * 2. Recorre el array 'productos' con forEach o for
 * 3. Para cada producto, crea un div con la información
 * 4. Agrega cada tarjeta al gridProductos
 * 
 * ESTRUCTURA HTML DE CADA TARJETA:
 * <div class="product-card">
 *   <img src="URL_IMAGEN" alt="NOMBRE">
 *   <h3>NOMBRE_PRODUCTO</h3>
 *   <p class="price">$PRECIO</p>
 *   <button onclick="agregarAlCarrito(ID)">Agregar al carrito</button>
 * </div>
 * 
 * PUNTOS EVALUADOS:
 * - Limpieza del grid anterior (2 pts)
 * - Uso correcto de createElement o innerHTML (5 pts)
 * - Mostrar imagen, nombre y precio (4 pts)
 * - Botón con onclick funcionando (4 pts)
 */
function mostrarProductos(productos) {
  // TODO: Escribe tu código aquí
  // Paso 1: Limpiar contenido anterior
  gridProductos.innerHTML = ''

  // Paso 2: Recorrer array de productos
  productos.forEach(producto => {

    // Paso 3: Crear tarjeta para cada producto
    // ============== Con innerHTML ==============
    /*
    gridProductos.innerHTML+= `
    <div class="product-card">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
        <h3 class="product-title">${producto.nombre}</h3>
        <p class="product-price">${formatearPrecio(producto.precio)}</p>
        <div class="shipping-info">
            <i class="fa-solid fa-truck"></i> Envío gratis
        </div>
        <div class="product-rating">
            <span class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </span>
            <span>5.0 (13)</span>
        </div>
        <button class="add-to-cart-btn" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        ${producto.stock > 0 
            ? `<div class="stock-badge">Stock: ${producto.stock}</div>` 
            : `<div class="stock-badge out-of-stock">Sin stock</div>`}
    </div>
    `
    */

    // ============== Con nodos ==============
    // Contenedor tarjeta
    const contenedor = document.createElement('div');
    contenedor.classList.add('product-card');

    // Imagen 
    const imagen = document.createElement('img');
    imagen.setAttribute('src', producto.imagen);
    imagen.setAttribute('alt', producto.nombre);
    imagen.classList.add('product-image');
    contenedor.appendChild(imagen);

    // Nombre 
    const nombre = document.createElement('h3');
    nombre.classList.add('product-title');
    nombre.textContent = producto.nombre;
    contenedor.appendChild(nombre);

    // Precio 
    const precio = document.createElement('p');
    precio.classList.add('product-price');
    precio.textContent = `${formatearPrecio(producto.precio)}`;
    contenedor.appendChild(precio);

    // Envio
    const envioInfo = document.createElement('div');
    envioInfo.classList.add('shipping-info');
    const iconoCamion = document.createElement('i');
    iconoCamion.classList.add('fa-solid', 'fa-truck');
    const textoEnvio = document.createTextNode('Envío gratis');
    envioInfo.appendChild(iconoCamion);
    envioInfo.appendChild(textoEnvio);
    contenedor.appendChild(envioInfo);

    // Estrellas
    const estrellasContenedor = document.createElement('div');
    estrellasContenedor.classList.add('product-rating');
    const estrellasSpan = document.createElement('span');
    estrellasSpan.classList.add('stars', 'product-rating');
    for (let i = 0; i < 5; i++) {
      const estrella = document.createElement('i');
      estrella.classList.add('fa-solid', 'fa-star');
      estrellasSpan.appendChild(estrella);
    }
    estrellasContenedor.appendChild(estrellasSpan);
    const opiniones = document.createElement('span');
    opiniones.classList.add('product-rating');
    opiniones.textContent = '5.0 (13)'
    estrellasContenedor.appendChild(opiniones)
    contenedor.appendChild(estrellasContenedor)

    // Boton añadir al carrito
    const boton = document.createElement('button');
    boton.classList.add('add-to-cart-btn')
    boton.addEventListener('click', () => {
      agregarAlCarrito(producto.id);
    });
    boton.textContent = 'Agregar al carrito';
    contenedor.appendChild(boton);

    // Stock
    const stock = document.createElement('div');
    stock.classList.add('stock-badge');
    if (producto.stock > 0) {
      stock.textContent = `Stock: ${producto.stock}`;
    } else {
      stock.classList.add('out-of-stock');
      stock.textContent = 'Sin stock';
    }
    contenedor.appendChild(stock);


    // Paso 4: Agregar tarjeta al grid
    gridProductos.appendChild(contenedor);
  })
}

// ==========================================
// FUNCIÓN 3: AGREGAR AL CARRITO (20 PUNTOS)
// ==========================================

/**
 * TODO: Completa esta función para agregar productos al carrito
 * 
 * PASOS A SEGUIR:
 * 1. Busca el producto en todosLosProductos usando find()
 * 2. Verifica si el producto ya está en el carrito
 * 3. Si ya está, aumenta la cantidad
 * 4. Si no está, agrégalo con cantidad = 1
 * 5. Guarda el carrito en localStorage como JSON
 * 6. Actualiza el contador del carrito
 * 
 * PUNTOS EVALUADOS:
 * - Uso correcto de find() (3 pts)
 * - Lógica para verificar si ya existe (4 pts)
 * - Manejo correcto de cantidades (4 pts)
 * - Uso de localStorage con JSON (5 pts)
 * - Actualización del contador (4 pts)
 */
function agregarAlCarrito(idProducto) {
  // TODO: Escribe tu código aquí

  // Paso 1: Buscar el producto
  const producto = todosLosProductos.find(p => p.id === idProducto);

  // Paso 2: Obtener carrito actual de localStorage
  const carritoActual = JSON.parse(localStorage.getItem('carrito')) || []
  // console.log('Carrito antes de modificar:', carritoActual)

  // Paso 3: Verificar si el producto ya está en el carrito
  const productoEnCarrito = carritoActual.find(item => item.id === idProducto)

  // Paso 4: Agregar o actualizar cantidad
  if (productoEnCarrito) {
    productoEnCarrito.cantidad += 1;
  } else {
    carritoActual.push({
      ...producto,
      cantidad: 1
    })
  }

  // console.log('Carrito después de modificar:', carritoActual)

  // Paso 5: Guardar en localStorage
  localStorage.setItem('carrito', JSON.stringify(carritoActual));

  // Paso 6: Actualizar contador
  actualizarContadorCarrito();

  // Mensaje de confirmación (opcional)
  // Mostrar y ocultar modal despues de 2 segundos 
  const modalConfirmacion = document.getElementById('modalOverlay');
  const toastNotificacion = document.getElementById('toast')
  modalConfirmacion.style.display = 'flex';
  toastNotificacion.classList.add('show')
  setTimeout(() => {
    modalConfirmacion.style.display = 'none';
    toastNotificacion.classList.remove('show');
  }, 2000)

  // Cierre manual del modal
  const botonSeguirComprando = document.getElementById('continueShoppingBtn');
  botonSeguirComprando.addEventListener('click', () => {
    modalConfirmacion.style.display = 'none';
    toastNotificacion.classList.remove('show');
  })
}

// ==========================================
// FUNCIÓN 4: ACTUALIZAR CONTADOR DEL CARRITO (5 PUNTOS)
// ==========================================

/**
 * TODO: Completa esta función para mostrar la cantidad total de productos
 * 
 * PASOS A SEGUIR:
 * 1. Obtén el carrito de localStorage
 * 2. Calcula el total de productos usando reduce()
 * 3. Muestra el número en el elemento contadorCarrito
 * 
 * PUNTOS EVALUADOS:
 * - Obtener datos de localStorage (2 pts)
 * - Uso correcto de reduce() (2 pts)
 * - Actualizar el DOM correctamente (1 pt)
 */
function actualizarContadorCarrito() {
  // TODO: Escribe tu código aquí

  // Paso 1: Obtener carrito de localStorage
  const carrito = JSON.parse(localStorage.getItem('carrito')) || []

  // Paso 2: Calcular total con reduce()
  const totalProductos = carrito.reduce((total, item) => {
    return total + item.cantidad;
  }, 0)

  // Paso 3: Mostrar en el contador
  contadorCarrito.textContent = totalProductos;
}

// ==========================================
// FUNCIÓN DE FORMATEO (YA ESTÁ LISTA - NO TOCAR)
// ==========================================

/**
 * Función para formatear precios en pesos colombianos
 * ESTA FUNCIÓN YA ESTÁ COMPLETA - PUEDES USARLA DIRECTAMENTE
 */
function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(precio);
}

// ==========================================
// INICIALIZACIÓN (YA ESTÁ LISTA - NO TOCAR)
// ==========================================

/**
 * Esta función se ejecuta cuando se carga la página
 * YA ESTÁ COMPLETA - NO TOCAR
 */
document.addEventListener('DOMContentLoaded', function () {
  console.log('Cargando tienda...');

  // Cargar productos al inicio
  cargarProductos();

  // Actualizar contador del carrito
  actualizarContadorCarrito();

  console.log('Tienda cargada');
});

// ==========================================
// NOTAS IMPORTANTES PARA EL ESTUDIANTE
// ==========================================

/*
CONSEJOS PARA COMPLETAR EL EXAMEN:

1. ORDEN RECOMENDADO:
   - Primero completa cargarProductos()
   - Luego mostrarProductos()
   - Después agregarAlCarrito()
   - Finalmente actualizarContadorCarrito()

2. DEPURACIÓN:
   - Usa console.log() para ver qué datos tienes
   - Abre las DevTools para ver errores
   - Verifica que localStorage se esté guardando

3. ARRAYS Y MÉTODOS IMPORTANTES:
   - find() - para buscar un producto por ID
   - forEach() - para recorrer productos
   - reduce() - para sumar cantidades
   - JSON.parse() - para leer de localStorage
   - JSON.stringify() - para guardar en localStorage

4. ESTRUCTURA DEL CARRITO EN LOCALSTORAGE:
   [
     { id: 1, nombre: "iPhone", precio: 899900, cantidad: 2 },
     { id: 3, nombre: "Camiseta", precio: 89900, cantidad: 1 }
   ]

5. PUNTOS CLAVE:
   - fetch() debe usar la ruta 'data/productos.json'
   - localStorage.setItem() guarda strings, usa JSON.stringify()
   - localStorage.getItem() devuelve strings, usa JSON.parse()
   - El grid tiene id "productsGrid"
   - El contador tiene id "cartCount"

¡RECUERDA LEER LOS COMENTARIOS CUIDADOSAMENTE!
*/