import { renderAgain } from "./checkout/orderSummary.js";
import { renderPayment } from "./checkout/paymentSummary.js";
import { loadProductFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';


new Promise((resolve)=>{
    loadProductFetch(()=>{
        resolve();
    })
}).then(()=>{
    renderAgain();
    renderPayment();
});

// new Promise((resolve)=>{
//     loadProducts(()=>{
//         resolve(); 
//     })
// }).then(()=>{
//     renderAgain();
//     renderPayment();
// })

// loadProducts(()=>{
//     loadCart(()=>{
//         renderAgain();
//         renderPayment();
//     })
// })
