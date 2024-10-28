document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    const cartItems = {}; // Objeto para almacenar los productos del carrito

    // Función para agregar productos al carrito
    function addToCart(name, price, quantity) {
        if (cartItems[name]) {
            cartItems[name].quantity += quantity;
            cartItems[name].price += price * quantity;
        } else {
            cartItems[name] = { quantity: quantity, price: price * quantity };
        }

        renderCartItems();
        updateCartTotal();
        updateCartCount();

        // Mostrar el carrito después de añadir el producto
        const offcanvasCart = new bootstrap.Offcanvas(document.getElementById('offcanvasCart'));
        offcanvasCart.show();
    }

    // Renderiza los productos en el carrito
    function renderCartItems() {
        cartItemsContainer.innerHTML = "";
        for (const name in cartItems) {
            const { quantity, price } = cartItems[name];
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-sm");
            listItem.innerHTML = `
                <div>
                    <h6 class="my-0">${name} (x${quantity})</h6>
                </div>
                <div class="d-flex align-items-center">
                    <span class="text-body-secondary">$${price.toFixed(2)}</span>
                    <button class="btn btn-danger btn-sm ms-2" onclick="removeFromCart('${name}')">Eliminar</button>
                </div>
            `;
            cartItemsContainer.appendChild(listItem);
        }

        // Mostrar el total al final de la lista
        const totalItem = document.createElement("li");
        totalItem.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-sm", "fw-bold");
        totalItem.innerHTML = `
            <span>Total</span>
            <strong id="cart-total">$${getCartTotal().toFixed(2)}</strong>
        `;
        cartItemsContainer.appendChild(totalItem);
    }

    // Función para eliminar productos del carrito
    window.removeFromCart = function(name) {
        delete cartItems[name]; // Elimina el producto del objeto cartItems
        renderCartItems(); // Vuelve a renderizar el carrito
        updateCartTotal(); // Actualiza el total
        updateCartCount(); // Actualiza el conteo de productos
    };

    // Calcula el total
    function getCartTotal() {
        return Object.values(cartItems).reduce((total, item) => total + item.price, 0);
    }

    // Actualiza el total en pantalla
    function updateCartTotal() {
        cartTotal.textContent = `$${getCartTotal().toFixed(2)}`;
    }

    // Actualiza el conteo de artículos
    function updateCartCount() {
        const itemCount = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = itemCount;
    }

    // Detecta clicks en "Añadir al carrito"
    document.querySelectorAll(".nav-link").forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const productItem = event.target.closest(".product-item");
            const productName = productItem.querySelector("h3").textContent;
            const productPrice = parseFloat(productItem.querySelector(".price").textContent.replace("$", ""));
            const quantity = parseInt(productItem.querySelector("#quantity").value);
            addToCart(productName, productPrice, quantity);
        });
    });
});
