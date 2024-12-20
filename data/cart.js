export let cart =JSON.parse(localStorage.getItem('cart')) 
if(!cart) {
    cart=[
    {productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2,
    deliveryOptionId: '1'
},
    {
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1,
    deliveryOptionId:'2'
    }];
}
function toLocalStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
    let sameProduct;
        cart.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                sameProduct = cartItem;
            }
        });
        if(sameProduct){
            sameProduct.quantity +=1;
        }else{
            cart.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId:'1'
            });
        }
        toLocalStorage();
}
export function removeFromCart(productId){
    const newCart=[];
    cart.forEach((cartItem)=>{
        if(cartItem.productId!=productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    updateCartQuantity();
    toLocalStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let sameProduct;
        cart.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                sameProduct = cartItem;
            }
        });
        sameProduct.deliveryOptionId = deliveryOptionId;
        toLocalStorage();
}

export function newQuantityUpdate(productId, newQuantity){
    let sameProduct;

    cart.forEach((cartItem)=>{
        if(productId===cartItem.productId){
            sameProduct = cartItem;
        }
    });
    sameProduct.quantity=newQuantity;
    updateCartQuantity();
}

export function updateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((cartItem)=>{
        cartQuantity+=cartItem.quantity;
    })
    return cartQuantity;
}