import { renderAgain } from "./checkout/orderSummary.js";
import { renderPayment } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
// import '../data/cart-class.js';
loadProducts(()=>{
    renderAgain();
    renderPayment();
});