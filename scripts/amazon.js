import { cart, addToCart, updateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
function renderMain() {
    let productsHTML = '';

    products.forEach((product) => {
        productsHTML += `
            <div class="product-container">
                        <div class="product-image-container">
                            <img
                            class="product-image"
                            src="${product.image}"
                            />
                        </div>
    
                        <div class="product-name limit-text-to-2-lines">
                            ${product.name}
                        </div>
    
                        <div class="product-rating-container">
                            <img
                            class="product-rating-stars"
                            src="${product.getStarsUrl()}"
                            />
                            <div class="product-rating-count link-primary">${product.rating.count}</div>
                        </div>
    
                        <div class="product-price">${product.getPrice()}</div>
    
                        <div class="product-quantity-container">
                            <select class="js-quantity-selector-${product.id}">
                            <option selected value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            </select>
                        </div>
                        ${product.extraInfo()}
                        <div class="product-spacer"></div>

                        <div class="added-to-cart js-added-to-cart-${product.id}">
                            <img src="images/icons/checkmark.png" />
                            Added
                        </div>
    
                        <button class="add-to-cart-button js-add-to-cart button-primary" data-product-id="${product.id}">Add to Cart</button>
                        </div>
        `;
    });

    document.querySelector(".js-products-grid").innerHTML = productsHTML;

    document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();

    const addedMsgTimeout = {}; // Object to track timeouts for each product
    document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        const { productId } = button.dataset;
        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity = Number(quantitySelector.value);
        
        addToCart(productId, quantity);
        updateCartQuantity();
        renderMain();
        const addedMsg = document.querySelector(`.js-added-to-cart-${productId}`);
        
        if (!addedMsg) {
            console.error(`Element .js-added-to-cart-${productId} not found.`);
            return;
        }
        addedMsg.classList.add("added-to-cart-visible");
        const previousTimeoutId = addedMsgTimeout[productId];
        if (previousTimeoutId) {
            clearTimeout(previousTimeoutId);
        }

        const timeoutId = setTimeout(() => {
            addedMsg.classList.remove("added-to-cart-visible");
        }, 2000);

        addedMsgTimeout[productId] = timeoutId;
    });
});
}
renderMain();
