let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Lógica para agregar al carrito
document.querySelectorAll('.agregar-carrito').forEach(btn => {
  btn.addEventListener('click', () => {
    const nombre = btn.dataset.nombre;
    const precio = parseInt(btn.dataset.precio);
    const numero = btn.getAttribute('data-numero');

    carrito.push({ nombre, precio, numero });
    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarToast(`${nombre} fue agregado al carrito.`);
  });
});


// Lógica del modal
const abrirBtn = document.getElementById('abrirCarrito');
const modal = document.getElementById('carritoModal');
const cerrarBtn = document.getElementById('cerrarCarrito');
const listaCarrito = document.getElementById('listaCarrito');
const totalCarrito = document.getElementById('totalCarrito');
const wppBtn = document.getElementById('wppBtn');
const vaciarBtn = document.getElementById('vaciarCarrito');

abrirBtn.addEventListener('click', () => {
  listaCarrito.innerHTML = '';
  let total = 0;
  let mensaje = 'Hola! Quiero hacer el siguiente pedido:\n';

  // Agrupar productos iguales
  const productosAgrupados = {};

  carrito.forEach((item) => {
    const key = `${item.numero}_${item.nombre}`;
    if (productosAgrupados[key]) {
      productosAgrupados[key].cantidad += 1;
    } else {
      productosAgrupados[key] = {
        nombre: item.nombre,
        precio: item.precio,
        numero: item.numero,
        cantidad: 1
      };
    }
    total += item.precio;
  });

  Object.values(productosAgrupados).forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      x${item.cantidad} u del N°${item.numero} ${item.nombre}
      <button class="eliminar-item" data-index="${index}">❌</button>
    `;
    listaCarrito.appendChild(li);
    mensaje += `x${item.cantidad} u del N°${item.numero} ${item.nombre}\n`;
  });

  totalCarrito.innerText = total;
  wppBtn.href = `https://wa.me/5493875020926?text=${encodeURIComponent(mensaje + `\nTotal: $${total}`)}`;
  modal.style.display = 'flex';

  document.querySelectorAll('.eliminar-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      carrito.splice(index, 1); // Esto eliminará por índice, pero habría que ajustar si agrupamos
      localStorage.setItem('carrito', JSON.stringify(carrito));
      abrirBtn.click();
    });
  });
});


cerrarBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

vaciarBtn.addEventListener('click', () => {
  if (confirm('¿Estás seguro de que querés vaciar el carrito?')) {
    carrito.length = 0;
    localStorage.removeItem('carrito');
    modal.style.display = 'none';
  }
});

function mostrarToast(mensaje) {
  const toast = document.getElementById('toast');
  toast.textContent = mensaje;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000); // se oculta después de 3 segundos
}