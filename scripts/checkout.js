import { renderAgain } from "./checkout/orderSummary.js";
import { renderPayment } from "./checkout/paymentSummary.js";
import { loadProductFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
// import '../data/cart-class.js';

async function loadPage() { //using async await
    try{
        await Promise.all([
        loadProductFetch(),
        loadCartFetch()
        ]);
    }
    catch(error){
        console.log("Processing in Backend");
    }
    renderAgain();
    renderPayment();
}
loadPage();

/*
new Promise((resolve)=>{ //using promises
    loadProductFetch(()=>{
        resolve();
    })
}).then(()=>{
    renderAgain();
    renderPayment();
});


loadProducts(()=>{  //callback method
    loadCart(()=>{
        renderAgain();
        renderPayment();
    })
})
    */
