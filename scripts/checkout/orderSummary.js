import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions, getDeliveryOptionID } from "../../data/deliveryOptions.js";
import { productsInCart } from "../../data/products.js";
import { renderPayment } from "./paymentSummary.js";

export function renderAgain(){


let cartHTML = '';

cart.forEach((cartItem)=>{
    const productId=cartItem.productId;

    const sameProduct = productsInCart(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOptionID(deliveryOptionId);
    const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays, 'days'
        );
        const dateString = deliveryDate.format('dddd, MMMM D');

cartHTML +=`
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
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
            Update
            </span>
            <span class="delete-quantity-link js-delete-link link-primary" data-product-id="${sameProduct.id}">
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

function deliveryOptionsHTML(sameProduct, cartItem){
    let html = '';

    deliveryOptions.forEach((deliveryOption)=>{
        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays, 'days'
        );
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = deliveryOption.priceCents === 0?'Free -':`${formatCurrency(deliveryOption.priceCents)} -`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        html+=`
            <div class="delivery-option js-delivery-option" data-product-id="${sameProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked?'checked':''}
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
            </div>`
    });
    return html;
}

document.querySelector('.js-cart-summary').innerHTML = cartHTML;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-${productId}`);
        container.remove();
        renderPayment();
    });
});

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
        const {productId, deliveryOptionId}= element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderAgain();
        renderPayment();
    });
})
}