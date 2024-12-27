import { cart, updateCartQuantity } from "../../data/cart.js";
import { productsInCart } from "../../data/products.js";
import { getDeliveryOptionID } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";
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
    const paymentHTML = `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${updateCartQuantity()}):</div>
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

          <button class="place-order-button js-place-order button-primary">
            Place your order
          </button>`;

          document.querySelector(".js-payment-summary").innerHTML=paymentHTML;

          document.querySelector('.js-place-order').addEventListener('click',async ()=>{
            try{
              const response = await fetch('https://supersimple.dev/orders',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  cart: cart
                })
              });
              const order = await response.json();
              addOrder(order);
            }
            catch(error){
              console.log(error, 'Try again later');
            }
            window.location.href = 'orders.html';
          })
}