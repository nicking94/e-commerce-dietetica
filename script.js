document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleFilters");
  const filtersList = document.getElementById("filtersList");
  toggleButton.addEventListener("click", function () {
    if (filtersList.classList.contains("hidden")) {
      filtersList.classList.remove("hidden");
    } else {
      filtersList.classList.add("hidden");
    }
  });
});

//menuToggler
function toggleMenu() {
  const menu = document.getElementById("menu");
  const menuToggler = document.querySelector(".menu-toggler");
  const cartIcon = document.getElementById("carrito-icono");

  menu.classList.toggle("hidden", !menu.classList.contains("hidden"));
  const isMenuHidden = menu.classList.contains("hidden");
  const menuImageSrc = isMenuHidden
    ? "Assets/SVG/fi_menu.svg"
    : "Assets/SVG/fi_x.svg";
  menuToggler.src = menuImageSrc;
  cartIcon.style.visibility = isMenuHidden ? "visible" : "hidden";
}

//codigo del carrito
const costoEnvio = 100;
const descuento = 30;
let totalProducts = 0;
let cartItems = [];
let currentProductName = "";

function obtenerGramos(productName) {
  const inputGramos = document.getElementById(`cantidadGramos_${productName}`);
  const cantidadGramos = parseFloat(inputGramos.value) || 0;

  const inputKilos = document.getElementById(`cantidadKilos_${productName}`);
  const cantidadKilos = parseFloat(inputKilos.value) || 0;

  const totalGramos = cantidadKilos * 1000 + cantidadGramos;

  const productIndex = cartItems.findIndex(
    (product) => product.productName === productName
  );

  if (productIndex === -1) {
    console.error("Producto no encontrado en el carrito.");
    return;
  }
  const pricePerGram = cartItems[productIndex].pricePerGram;
  if (isNaN(pricePerGram)) {
    console.error("Precio por gramo inválido.");
    return;
  }
  if (isNaN(totalGramos)) {
    console.error("Cantidad de gramos inválida.");
    return;
  }
  const totalPrice = pricePerGram * totalGramos;
  cartItems[productIndex].productPrice = totalPrice;
  const gramsPriceElement = document.getElementById(
    `gramsPrice_${productName}`
  );
  gramsPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

  sessionStorage.setItem(`cantidadGramos_${productName}`, totalGramos);
  actualizarTotal();
}

function obtenerKilos(productName) {
  const inputKilos = document.getElementById(`cantidadKilos_${productName}`);
  const cantidadKilos = parseFloat(inputKilos.value) || 0;

  const inputGramos = document.getElementById(`cantidadGramos_${productName}`);
  const cantidadGramos = parseFloat(inputGramos.value) || 0;

  const totalGramos = cantidadKilos * 1000 + cantidadGramos;

  const productIndex = cartItems.findIndex(
    (product) => product.productName === productName
  );

  if (productIndex === -1) {
    console.error("Producto no encontrado en el carrito.");
    return;
  }
  const pricePerGram = cartItems[productIndex].pricePerGram;
  if (isNaN(pricePerGram)) {
    console.error("Precio por kilo inválido.");
    return;
  }
  if (isNaN(totalGramos)) {
    console.error("Cantidad de gramos inválida.");
    return;
  }
  const totalPrice = pricePerGram * totalGramos;
  cartItems[productIndex].productPrice = totalPrice;
  const gramsPriceElement = document.getElementById(
    `gramsPrice_${productName}`
  );
  gramsPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

  sessionStorage.setItem(`cantidadKilos_${productName}`, cantidadKilos);
  actualizarTotal();
}

function obtenerInputs() {
  areacodeValue = document.getElementById("areaCode").value;
  neighborhoodValue = document.getElementById("neighborhood").value;
  streetValue = document.getElementById("street").value;
  alturaValue = document.getElementById("altura").value;
  referenceValue = document.getElementById("reference").value;
  emailValue = document.getElementById("email").value;
  nameValue = document.getElementById("name").value;
}
function obtenerInputPhone() {
  deliveryPhoneValue = document.getElementById("delivery-data-phone").value;
  localPhoneValue = document.getElementById("local-data-phone").value;
}

function validarFormularioDataDelivery() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const deliveryDataPhoneInput = document.getElementById("delivery-data-phone");

  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9+\s]+$/;

  if (!nameRegex.test(nameInput.value)) {
    alert("Por favor, ingrese un nombre válido.");
    return false;
  }

  if (!emailRegex.test(emailInput.value)) {
    alert("Por favor, ingrese un correo electrónico válido.");
    return false;
  }

  if (!phoneRegex.test(deliveryDataPhoneInput.value)) {
    alert("Por favor, ingrese un número de teléfono válido.");
    return false;
  }

  openCartModal("delivery-direction-modal");
  return true;
}

function validarFormularioDataLocal() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const localDataPhoneInput = document.getElementById("local-data-phone");

  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9+\s]+$/;

  if (!nameRegex.test(nameInput.value)) {
    alert("Por favor, ingrese un nombre válido.");
    return false;
  }

  if (!emailRegex.test(emailInput.value)) {
    alert("Por favor, ingrese un correo electrónico válido.");
    return false;
  }

  if (!phoneRegex.test(localDataPhoneInput.value)) {
    alert("Por favor, ingrese un número de teléfono válido.");
    return false;
  }

  openCartModal("local-products-modal");
  return true;
}

function validarFormularioDireccion() {
  const neighborhoodInput = document.getElementById("neighborhood");
  const streetInput = document.getElementById("street");
  const alturaInput = document.getElementById("altura");

  if (neighborhoodInput.value.trim() === "") {
    alert("Por favor, ingrese el barrio.");
    return false;
  }

  if (streetInput.value.trim() === "") {
    alert("Por favor, ingrese la calle.");
    return false;
  }

  if (alturaInput.value.trim() === "") {
    alert("Por favor, ingrese la altura.");
    return false;
  }
  openCartModal("delivery-products-modal");

  return true;
}

function actualizarTotal() {
  const totalElement = document.getElementById("costoTotal");
  totalElement.textContent = `$${calcularTotal()}`;
}

function calcularTotal() {
  let total = 0;
  for (const item of cartItems) {
    total += item.productPrice * item.quantity;
  }
  return total.toFixed(2);
}

function incrementQuantity(productName) {
  const productQuantityElement = document.getElementById(
    `cantidadUnidad_${productName}`
  );
  let productQuantity = parseInt(productQuantityElement.textContent);
  productQuantity++;
  productQuantityElement.textContent = productQuantity;

  const productIndex = cartItems.findIndex(
    (product) => product.productName === productName
  );
  if (productIndex !== -1) {
    cartItems[productIndex].quantity = productQuantity;
    const unityPriceElement = document.getElementById(
      `unityPrice_${productName}`
    );
    const unitPrice = parseFloat(unityPriceElement.dataset.price);
    const totalPrice = productQuantity * unitPrice;
    unityPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  }
  actualizarTotal();
}

function decrementQuantity(productName) {
  const productQuantityElement = document.getElementById(
    `cantidadUnidad_${productName}`
  );
  let productQuantity = parseInt(productQuantityElement.textContent);
  if (productQuantity > 1) {
    productQuantity--;
    productQuantityElement.textContent = productQuantity;

    const productIndex = cartItems.findIndex(
      (product) => product.productName === productName
    );
    if (productIndex !== -1) {
      cartItems[productIndex].quantity = productQuantity;
      const unityPriceElement = document.getElementById(
        `unityPrice_${productName}`
      );
      const unitPrice = parseFloat(unityPriceElement.dataset.price);
      const totalPrice = productQuantity * unitPrice;
      unityPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }
  }
  actualizarTotal();
}

function saveCartToSessionStorage() {
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function loadCartFromSessionStorage() {
  const storedCartItems = sessionStorage.getItem("cartItems");
  if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);
    totalProducts = cartItems.reduce((total, item) => total + item.quantity, 0);
    updateCartNotification();
    for (const item of cartItems) {
      const productPriceElement = document.getElementById(
        `productPrice_${item.productName}`
      );
      if (productPriceElement) {
        const productPrice = parseFloat(productPriceElement.dataset.price);
        const newProductPrice = productPrice * item.quantity;
        item.productPrice = productPrice;
        item.price = newProductPrice;
        productPriceElement.textContent = `$${newProductPrice.toFixed(2)}`;
      }
    }
    actualizarTotal();
  }
}

function addToCart(
  productName,
  productPrice = productPrice * productQuantity,
  productImage,
  productClass,
  pricePerGram,
  productQuantity = 1
) {
  const existingProductIndex = cartItems.findIndex(
    (item) => item.productName === productName
  );
  if (existingProductIndex !== -1) {
    cartItems[existingProductIndex].quantity++;
  } else {
    cartItems.push({
      productName,
      productPrice,
      productImage,
      productClass,
      quantity: productQuantity,
      pricePerGram,
    });
  }
  currentProductName = productName;
  totalProducts = cartItems.reduce((total, item) => total + item.quantity, 0);
  updateCartNotification();
  saveCartToSessionStorage();
  actualizarTotal();
}

function closeModal() {
  const modal = document.getElementById("cartModal");
  modal.classList.add("hidden");
}

loadCartFromSessionStorage();

function clearCart() {
  cartItems = [];
  totalProducts = 0;
  updateCartNotification();
  saveCartToSessionStorage();
}

function updateCartNotification() {
  const cartNotification = document.getElementById("cart-notification");
  cartNotification.textContent = `${totalProducts}`;
  cartNotification.style.color = "white";
}

function openCartModal(modalType) {
  const modal = document.getElementById("cartModal");
  const modalContent = document.getElementById("modal-content");
  const titleCart = document.getElementById("tituloModal");
  const allModals = document.querySelectorAll(".modal-content");

  allModals.forEach((modal) => {
    modal.classList.add("hidden");
  });

  if (modalType === "delivery-data-modal") {
    titleCart.textContent = "Tus Datos";
    document.getElementById("ocultarCart").style.display = "none";
    document.getElementById("costoTotalDiv").style.display = "none";
    document.getElementById("articulosTitulo").style.display = "none";
    modalContent.innerHTML = document.getElementById(
      "delivery-data-modal"
    ).innerHTML;
  } else if (modalType === "local-data-modal") {
    titleCart.textContent = "Tus Datos";
    document.getElementById("ocultarCart").style.display = "none";
    document.getElementById("costoTotalDiv").style.display = "none";
    document.getElementById("articulosTitulo").style.display = "none";
    modalContent.innerHTML =
      document.getElementById("local-data-modal").innerHTML;
  } else if (modalType === "delivery-direction-modal") {
    titleCart.textContent = "Dirección";
    document.getElementById("ocultarCart").style.display = "none";
    document.getElementById("costoTotalDiv").style.display = "none";
    document.getElementById("articulosTitulo").style.display = "none";
    modalContent.innerHTML = document.getElementById(
      "delivery-direction-modal"
    ).innerHTML;
  } else if (modalType === "delivery-products-modal") {
    titleCart.textContent = "Tu pedido";
    document.getElementById("ocultarCart").style.display = "none";
    document.getElementById("costoTotalDiv").style.display = "none";
    document.getElementById("articulosTitulo").style.display = "none";
    modalContent.innerHTML = document.getElementById(
      "delivery-products-modal"
    ).innerHTML;
    showCartDeliveryProducts();
  } else if (modalType === "local-products-modal") {
    titleCart.textContent = "Tu pedido";
    document.getElementById("ocultarCart").style.display = "none";
    document.getElementById("costoTotalDiv").style.display = "none";
    document.getElementById("articulosTitulo").style.display = "none";
    modalContent.innerHTML = document.getElementById(
      "local-products-modal"
    ).innerHTML;
    showCartlocalProducts();
  } else if (modalType === "delivery-successful-modal") {
    titleCart.textContent = "Tu pedido";
    document.getElementById("ocultarCart").style.display = "none";
    document.getElementById("costoTotalDiv").style.display = "none";
    document.getElementById("articulosTitulo").style.display = "none";
    modalContent.innerHTML = document.getElementById(
      "delivery-successful-modal"
    ).innerHTML;
    showCartDeliveryProducts();
  } else if (modalType === "local-successful-modal") {
    titleCart.textContent = "Tu pedido";
    document.getElementById("ocultarCart").style.display = "none";
    document.getElementById("costoTotalDiv").style.display = "none";
    document.getElementById("articulosTitulo").style.display = "none";
    modalContent.innerHTML = document.getElementById(
      "local-successful-modal"
    ).innerHTML;
    showCartlocalProducts();
  } else {
    titleCart.textContent = "Mi Carrito";
    modalContent.innerHTML = "";
  }

  modal.classList.remove("hidden");

  if (
    modalType !== "delivery-data-modal" &&
    modalType !== "local-data-modal" &&
    modalType !== "delivery-direction-modal" &&
    modalType !== "delivery-products-modal" &&
    modalType !== "local-products-modal" &&
    modalType !== "delivery-successful-modal" &&
    modalType !== "local-successful-modal"
  ) {
    if (totalProducts === 0) {
      modalContent.innerHTML = `<div class="flex justify-center items-center p-14">
        <p class='text-center text-2xl'>El carro está vacío</p>
      </div>`;
      document.getElementById("ocultarCart").style.display = "none";
      document.getElementById("costoTotalDiv").style.display = "none";
    } else {
      modalContent.innerHTML = "";
      document.getElementById("ocultarCart").style.display = "block";

      for (let i = 0; i < totalProducts; i++) {
        const productName = cartItems[i].productName;
        const productPrice = cartItems[i].productPrice;
        const productImage = cartItems[i].productImage;
        const productClass = cartItems[i].productClass;
        const pricePerGram = cartItems[i].pricePerGram;
        const productQuantity = cartItems[i].quantity || 1;

        const productInfo = document.createElement("div");
        productInfo.classList.add(
          "product-item",
          "flex",
          "items-center",
          "justify-between",
          "mb-4",
          "mt-10",
          "border-b-2",
          "border-gray-300",
          "p-2"
        );
        if (productClass === "unidad") {
          productInfo.innerHTML = `
          <div class="product-details flex w-full">
          <div class="flex flex-col gap-y-[10px] w-1/2 px-[16px]">
            <h3 class="text-start text-[20px] font-semibold text-[#323533]">${productName}</h3>
            <!-- Mostrar la cantidad del producto -->
            <h3 class="text-start text-[20px] font-semibold text-[#323533]"><span id="productQuantity_${productName}" class="hidden">${productQuantity}</span>
            <div class="flex items-center w-[117px] h-[60px]">
            <button onclick="decrementQuantity('${productName}')" class="bg-[#CFCFCF] flex items-center w-[35px] h-[54px] justify-center text-[#323533] text-[40px] rounded-[10px]">-</button>
            <div id="cantidadUnidad_${productName}" class="flex items-center border-2 border-[#CFCFCF] w-[35px] h-[54px] justify-center text-[18px] text-[#323533] leading-[32px] rounded-[10px]">${productQuantity}</div>
            <button onclick="incrementQuantity('${productName}')" class="bg-[#CFCFCF] flex items-center w-[35px] h-[54px] justify-center text-[#323533] text-[40px] rounded-[10px]">+</button>

            </div>
            <h3 id="unityPrice_${productName}" class="text-start text-[24px] font-semibold text-[#415B2C]" data-price="${productPrice}">$${
            productPrice * productQuantity
          }</h3>
          </div>
          <div class="relative w-1/2 pr-10">
            <img src="Assets/SVG/fi_x.svg" alt="close-image" class="closeProduct absolute top-2 right-[50px] w-[30px] bg-white cursor-pointer"/>
            <img src="${productImage}" alt="Imagen del producto" class="w-full h-[25vh] rounded-[20px]"/>
          </div>
        </div>`;
        } else if (productClass === "gramos") {
          productInfo.innerHTML = `
            <div class="product-details flex w-full">
              <div class="flex flex-col gap-y-[10px] w-1/2 px-[16px]">
                <h3 class="text-start text-[20px] font-semibold text-[#323533]">${productName}</h3>
                <div class="flex flex-col">
                  <div class="flex flex-col justify-items-start">
                    <h3 class="text-start text-[20px] font-semibold text-[#323533] pt-4">Cantidad:</h3>
                    <input id="cantidadKilos_${productName}" type="text" placeholder="Kilos" onblur="obtenerKilos('${productName}')" class="w-[131px] h-[40px] border-2 border-[#CFCFCF] rounded-[10px] text-center mb-2 ">
                    <input id="cantidadGramos_${productName}" type="text" placeholder="Gramos" onblur="obtenerGramos('${productName}')" class="w-[131px] h-[40px] border-2 border-[#CFCFCF] rounded-[10px] text-center">
                  </div>
                </div>
                <h3 id="gramsPrice_${productName}" class="text-start text-[24px] font-semibold text-[#415B2C]">$0</h3>
              </div>
              <div class="relative w-1/2 pr-10">
                <img src="Assets/SVG/fi_x.svg" alt="close-image" class="closeProduct absolute top-2 right-[50px] w-[30px] bg-white cursor-pointer"/>
                <img src="${productImage}" alt="Imagen del producto" class="w-full h-[25vh] rounded-[20px]"/>
              </div>
            </div>`;
        }
        articulosTitulo.style.display = "block";
        costoTotalDiv.style.display = "block";

        modalContent.appendChild(productInfo);
        const closeButton = productInfo.querySelector(".closeProduct");
        closeButton.addEventListener("click", function (event) {
          const productItem = event.target.closest(".product-item");
          const indexToRemove = Array.from(
            productItem.parentNode.children
          ).indexOf(productItem);

          cartItems.splice(indexToRemove, 1);
          totalProducts--;
          updateCartNotification();
          saveCartToSessionStorage();
          openCartModal();
          actualizarTotal();
        });

        modalContent.appendChild(productInfo);
      }
    }
  }
}

function showCartDeliveryProducts() {
  const deliveryProductsSelectedDiv = document.querySelector(
    ".delivery-products-selected"
  );
  deliveryProductsSelectedDiv.innerHTML = "";
  const productQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const pedidoDiv = document.createElement("div");
  pedidoDiv.classList.add("w-full", "text-start");
  pedidoDiv.innerHTML = `<h2 class="flex justify-center text-[20px] md:text-[24px] text-[#323533] font-semibold border-b-2 border-[#CFCFCF]">Su pedido: ${productQuantity} productos</h2>`;
  deliveryProductsSelectedDiv.appendChild(pedidoDiv);

  cartItems.forEach((item) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "mb-4",
      "w-2/3"
    );
    const productImage = document.createElement("img");
    productImage.src = item.productImage;
    productImage.classList.add("w-1/3", "h-1/4");

    let productQuantity;
    if (item.productClass === "unidad") {
      productQuantity = item.quantity;
    } else if (item.productClass === "gramos") {
      productQuantity = sessionStorage.getItem(
        `cantidadGramos_${item.productName}`
      );
    }

    const productQuantityText = document.createElement("span");
    if (item.productClass === "unidad") {
      productQuantityText.textContent = `x${productQuantity}`;
    } else if (item.productClass === "gramos") {
      productQuantityText.textContent = `x${productQuantity} grs.`;
    }
    productQuantityText.classList.add(
      "text-[20px]",
      "text-[#323533]",
      "font-semibold"
    );

    let totalPrice;
    if (item.productClass === "unidad") {
      totalPrice = item.productPrice * productQuantity;
    } else if (item.productClass === "gramos") {
      totalPrice = (item.productPrice * productQuantity) / 100;
    }
    const productPrice = document.createElement("span");
    productPrice.textContent = `$${totalPrice.toFixed(0)}`;
    productPrice.classList.add(
      "text-[#415B2C]",
      "text-[20px]",
      "md:text-[24px]",
      "font-semibold"
    );
    productDiv.appendChild(productImage);
    productDiv.appendChild(productQuantityText);
    productDiv.appendChild(productPrice);
    deliveryProductsSelectedDiv.appendChild(productDiv);
  });

  const entregaDiv = document.createElement("div");
  entregaDiv.classList.add("flex", "flex-col", "w-full", "text-start");
  entregaDiv.id = "informacion-entrega";
  entregaDiv.innerHTML = `<h2 class="text-[20px] md:text-[24px] text-[#323533] font-semibold border-t-2 border-[#CFCFCF]">Información de entrega</h2>
  <div class="flex items-center gap-x-[24px] px-[16px] py-[16px]">
    <i class="fa-solid fa-location-dot text-[25px]"></i>
    <p id="direccion" class="text-[18px] leading-[32px]">${
      neighborhoodValue +
      " " +
      streetValue +
      " " +
      alturaValue +
      " " +
      referenceValue
    }</p>
  </div>
  <div class="flex items-center gap-x-[24px] px-[16px] py-[16px]">
    <i class="fa-solid fa-phone text-[25px]"></i>
    <p id="telefono" class="text-[18px] leading-[32px]">${
      "+" + areacodeValue + " " + deliveryPhoneValue
    }</p>
  </div>
  `;
  deliveryProductsSelectedDiv.appendChild(entregaDiv);

  const envioDiv = document.createElement("div");
  envioDiv.classList.add("flex", "flex-col", "w-full", "text-start", "md:p-10");

  const totalSinDescuento = calcularTotal();
  const descuentoAplicado = totalSinDescuento * (descuento / 100);
  const totalConDescuento = totalSinDescuento - descuentoAplicado;
  const totalConEnvio = totalConDescuento + costoEnvio;

  envioDiv.innerHTML = `
  <div class="flex justify-between">
    <h3 class="text-[15px] md:text-[20px] font-semibold">Envíos</h3>
    <p class="text-[#415B2C] text-[20px] md:text-[24px] font-semibold">${costoEnvio}</p>
  </div>
  <div class="flex justify-between border-b-2 border-[#CFCFCF] ">
    <h3 class="text-[15px] md:text-[20px] font-semibold">Descuentos</h3>
    <p class="text-[#939393] text-[20px] md:text-[24px] font-semibold">${descuentoAplicado}</p>
  </div>
  <div class="flex items-center justify-around gap-x-[64px] px-[16px] py-[10px]">
    <h3 class="text-[15px] md:text-[20px] font-semibold">Costo Total:</h3>
    <p class="text-[#415B2C] text-[20px] md:text-[24px] font-semibold">$${totalConEnvio}</p>
  </div>
`;

  deliveryProductsSelectedDiv.appendChild(envioDiv);
}

function showCartlocalProducts() {
  const localProductsSelectedDiv = document.querySelector(
    ".local-products-selected"
  );
  localProductsSelectedDiv.innerHTML = "";

  const productQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const pedidoDiv = document.createElement("div");
  pedidoDiv.classList.add("w-full", "text-start");
  pedidoDiv.innerHTML = `<h2 class="flex justify-center text-[20px] md:text-[24px] text-[#323533] font-semibold border-b-2 border-[#CFCFCF]">Su pedido: ${productQuantity} productos</h2>`;
  localProductsSelectedDiv.appendChild(pedidoDiv);

  cartItems.forEach((item) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "mb-4",
      "w-2/3"
    );
    const productImage = document.createElement("img");
    productImage.src = item.productImage;
    productImage.classList.add("w-1/3", "h-1/4");

    let productQuantity;
    if (item.productClass === "unidad") {
      productQuantity = item.quantity;
    } else if (item.productClass === "gramos") {
      productQuantity = sessionStorage.getItem(
        `cantidadGramos_${item.productName}`
      );
    }

    const productQuantityText = document.createElement("span");
    if (item.productClass === "unidad") {
      productQuantityText.textContent = `x${productQuantity}`;
    } else if (item.productClass === "gramos") {
      productQuantityText.textContent = `x${productQuantity} grs.`;
    }
    productQuantityText.classList.add(
      "text-[20px]",
      "text-[#323533]",
      "font-semibold"
    );

    let totalPrice;
    if (item.productClass === "unidad") {
      totalPrice = item.productPrice * productQuantity;
    } else if (item.productClass === "gramos") {
      totalPrice = (item.productPrice * productQuantity) / 100;
    }
    const productPrice = document.createElement("span");
    productPrice.textContent = `$${totalPrice.toFixed(0)}`;
    productPrice.classList.add(
      "text-[#415B2C]",
      "text-[20px]",
      "md:text-[24px]",
      "font-semibold"
    );
    productDiv.appendChild(productImage);
    productDiv.appendChild(productQuantityText);
    productDiv.appendChild(productPrice);
    localProductsSelectedDiv.appendChild(productDiv);
  });

  const enviolocalDiv = document.createElement("div");
  enviolocalDiv.classList.add(
    "flex",
    "w-full",
    "text-center",
    "justify-center",
    "items-center"
  );
  enviolocalDiv.innerHTML = `<div class="w-full text-start items-center">
<div class=" flex items-center justify-around gap-x-[64px] px-[16px] py-[10px] border-t-2 border-[#CFCFCF]">
<h3 class=" text-[15px] md:text-[20px] font-semibold">Costo Total:</h3>
  <p class="text-[#415B2C] text-[20px] md:text-[24px] font-semibold">${calcularTotal()}</p>
</div>

`;
  localProductsSelectedDiv.appendChild(enviolocalDiv);
}

function goBack(modalType) {
  const modal = document.getElementById("cartModal");
  const titleCart = document.getElementById("tituloModal");
  const modalMapping = {
    "delivery-data-modal": "cartModal",
    "local-data-modal": "cartModal",
    "delivery-direction-modal": "delivery-data-modal",
    "delivery-products-modal": "delivery-direction-modal",
    "local-products-modal": "local-data-modal",
    "delivery-successful-modal": "delivery-products-modal",
    "local-successful-modal": "local-products-modal",
  };
  titleCart.textContent =
    modalType === "delivery-data-modal" || modalType === "local-data-modal"
      ? "Mi Carrito"
      : "Tu pedido";
  openCartModal(modalMapping[modalType]);
}

document
  .getElementById("carrito-icono")
  .addEventListener("click", openCartModal);

//------------------------------------------------------------//
//------------------------------------------------------------//

//swipper
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
});

//jquery
$(document).ready(function () {
  $(".category_item").click(function (event) {
    event.preventDefault();
    let productCategory = $(this).attr("category");

    //ocultar productos
    $(".product-item").css({
      opacity: "0",
      visibility: "hidden",
      transition: "opacity 0.4s ease, visibility 0.4s ease",
    });
    function hideProduct() {
      $(".product-item").hide();
    }
    setTimeout(hideProduct, 400);

    function showProduct() {
      $('.product-item[category="' + productCategory + '"]').show();
      $('.product-item[category="' + productCategory + '"]').css({
        opacity: "1",
        visibility: "visible",
      });
    }
    setTimeout(showProduct, 400);
  });

  $('.category_item[category="todos"]').click(function () {
    function showAll() {
      $(".product-item").show();
      $(".product-item").css({
        opacity: "1",
        visibility: "visible",
      });
    }
    setTimeout(showAll, 400);
  });
});
