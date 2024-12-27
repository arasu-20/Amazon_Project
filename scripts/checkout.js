import { renderAgain } from "./checkout/orderSummary.js";
import { renderPayment } from "./checkout/paymentSummary.js";
import { loadProductFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';

async function loadPage() { //using async await
    try{
        await loadProductFetch();
        await new Promise((resolve)=>{
            loadCart(()=>{
                resolve();
            });
        });
    }
    catch(error){
        console.log(error);
    }
    renderAgain();
    renderPayment();
}
loadPage();

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
