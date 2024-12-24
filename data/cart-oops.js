
function Cart(localStorageKey){
    const cart={
        cartItems : undefined,
        loadFromStorage(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
            if (!this.cartItems) {
                this.cartItems = [
                    {
                        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                        quantity: 2,
                        deliveryOptionId: '1'
                    },
                    {
                        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                        quantity: 1,
                        deliveryOptionId: '2'
                    }];
            }
            },
    
            toLocalStorage() {
                localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
            },
    
            findProduct(productId) {
                return this.cartItems.find(cartItem => cartItem.productId === productId);
            },
    
            addToCart(productId, quantity) {
                let sameProduct = this.findProduct(productId);
                if (sameProduct) {
                    sameProduct.quantity += quantity;
                } else {
                    this.cartItems.push({
                        productId,
                        quantity,
                        deliveryOptionId: '1'
                    });
                }
                this.toLocalStorage();
                this.updateCartQuantity();
            },
    
            removeFromCart(productId) {
                // const newCart = [];
                // cart.forEach((cartItem) => {
                //     if (cartItem.productId != productId) {
                //         newCart.push(cartItem);
                //     }
                // }); 
                this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
                this.updateCartQuantity();
                this.toLocalStorage();
            },
    
            updateDeliveryOption(productId, deliveryOptionId) {
                let sameProduct = findProduct(productId);
                sameProduct.deliveryOptionId = deliveryOptionId;
                this.toLocalStorage();
            },
    
            newQuantityUpdate(productId, newQuantity) {
                let sameProduct = this.findProduct(productId);
                sameProduct.quantity = newQuantity;
                this.updateCartQuantity();
            },
    
            updateCartQuantity() {
                let cartQuantity = 0;
                this.cartItems.forEach((cartItem) => {
                    cartQuantity += cartItem.quantity;
                })
                return cartQuantity;
            }
    }
    cart.loadFromStorage();
    return cart;
}

const cart = Cart('cart-oop');
console.log(cart);
