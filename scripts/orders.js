import { loadProductFetch, productsInCart } from "../data/products.js";
import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import formatCurrency from "./utils/money.js";

async function loadPage(){
    await loadProductFetch();

    let orderHTML = '';

    orders.forEach((order) => {
        const orderTiming = dayjs(order.orderTime).format('MMMM D');
        
        orderHTML += `
        <div class="order-container">
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${orderTiming}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${formatCurrency(order.totalCostCents)}</div>
                    </div>
                </div>
                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                </div>
            </div>
            <div class="order-details-grid">
                ${productsListHTML(order)}
            </div>
        </div>
        `;
    });

    function productsListHTML(order) {
        let productsListHTML = '';

        // Check if order.products is an array, otherwise wrap it in an array
        let products = Array.isArray(order.products) ? order.products : [order.products];

        // Log order and its products for debugging
        console.log("Order:", order);
        console.log("Products:", products);

        products.forEach(productDetails => {
            const product = productsInCart(productDetails.productId);
        
            productsListHTML += `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
                <div class="product-name">
                    ${product.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${
                    dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
                    }
                </div>
                <div class="product-quantity">
                    Quantity: ${productDetails.quantity}
                </div>
                <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>
            <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                    <button class="track-package-button button-secondary">
                        Track package
                    </button>
                </a>
            </div>
            `;
        });

        return productsListHTML;
    }

    document.querySelector('.js-orders-grid').innerHTML = orderHTML;
}

loadPage();
