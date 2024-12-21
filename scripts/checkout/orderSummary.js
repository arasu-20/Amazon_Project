import {
    cart,
    removeFromCart,
    updateDeliveryOption,
    updateCartQuantity,
    newQuantityUpdate,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
    deliveryOptions,
    getDeliveryOptionID,
} from "../../data/deliveryOptions.js";
import { productsInCart } from "../../data/products.js";
import { renderPayment } from "./paymentSummary.js";

export function renderAgain() {
    let cartHTML = "";

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        const sameProduct = productsInCart(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOptionID(deliveryOptionId);
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
        const dateString = deliveryDate.format("dddd, MMMM D");

        cartHTML += `
<div class="cart-item-container js-cart-item-${sameProduct.id}">
    <div class="delivery-date">
        Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image"
        src="${sameProduct.image}">

        <div class="cart-item-details">
        <div class="product-name">
            ${sameProduct.name}
        </div>
        <div class="product-price">
            $${formatCurrency(sameProduct.priceCents)}
        </div>
        <div class="product-quantity">
            <span>
            Quantity: <span class="quantity-label js-quantity-label-${sameProduct.id
            }">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${sameProduct.id
            }">
            Update
            </span>
            <input class="quantity-input js-quantity-input-${sameProduct.id}">
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${sameProduct.id
            }">Save</span>
            <span class="delete-quantity-link js-delete-link link-primary" data-product-id="${sameProduct.id
            }">
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(sameProduct, cartItem)}
        </div>
    </div>
    </div>
    `;
    });

    function deliveryOptionsHTML(sameProduct, cartItem) {
        let html = "";

        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
            const dateString = deliveryDate.format("dddd, MMMM D");
            const priceString =
                deliveryOption.priceCents === 0
                    ? "Free -"
                    : `${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            html += `
            <div class="delivery-option js-delivery-option" data-product-id="${sameProduct.id
                }" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked ? "checked" : ""}
                class="delivery-option-input"
                name="delivery-option-${sameProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>`;
        });
        return html;
    }

    document.querySelector(".js-cart-summary").innerHTML = cartHTML;

    document.querySelectorAll(".js-delete-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-${productId}`);
            container.remove();
            renderPayment();
            updateCartQuantity();
            renderAgain();
        });
    });
    document.querySelectorAll(".js-update-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            const container = document.querySelector(`.js-cart-item-${productId}`);
            container.classList.add("is-editing-quantity");
        });
    });

    document.querySelectorAll(".js-save-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            const container = document.querySelector(`.js-cart-item-${productId}`);
            container.classList.remove("is-editing-quantity");
            const quantityInput = document.querySelector(
                `.js-quantity-input-${productId}`
            );
            const newQuantity = Number(quantityInput.value);
            if (isNaN(newQuantity) || newQuantity <= 0) {
                // Handle invalid or zero quantities (optional)
                alert("Please enter a valid quantity");
                return;
            }
            document.querySelector(`.js-quantity-label-${productId}`).innerText =
                newQuantity;
            newQuantityUpdate(productId, newQuantity);
            updateCartQuantity();
            renderPayment();
            renderAgain();
        });
    });

    document.querySelectorAll(".js-delivery-option").forEach((element) => {
        element.addEventListener("click", () => {
            const { productId, deliveryOptionId } = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderAgain();
            renderPayment();
        });
    });
    document.querySelector(
        ".js-checkout-cart"
    ).innerHTML = `${updateCartQuantity()} items`;
}
