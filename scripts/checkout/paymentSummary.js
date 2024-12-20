import { cart } from "../../data/cart.js";
import { productsInCart } from "../../data/products.js";
import { getDeliveryOptionID } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
export function renderPayment(){
    let costOfProducts = 0;
    let shippingPrice = 0;
    cart.forEach(cartItem => {
        const product = productsInCart(cartItem.productId);
        costOfProducts += product.priceCents*cartItem.quantity;

       const deliveryOption =  getDeliveryOptionID(cartItem.deliveryOptionId)
       shippingPrice+=deliveryOption.priceCents

    });
    const totalBeforeTax = costOfProducts + shippingPrice;
    const taxPrice = totalBeforeTax*0.12;
    const totalPrice = totalBeforeTax+taxPrice;
    console.log(totalPrice);

    const paymentHTML = `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$
            ${formatCurrency(costOfProducts)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxPrice)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalPrice)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

          document.querySelector(".js-payment-summary").innerHTML=paymentHTML;
}