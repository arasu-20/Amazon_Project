import { renderAgain } from "./checkout/orderSummary.js";
import { renderPayment } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';

new Promise((resolve)=>{
    loadProducts(()=>{
        resolve(); 
    })
}).then(()=>{
    renderAgain();
    renderPayment();
})

// loadProducts(()=>{
//     loadCart(()=>{
//         renderAgain();
//         renderPayment();
//     })
// })
