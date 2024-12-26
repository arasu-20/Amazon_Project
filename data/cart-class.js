class Cart {
    cartItems;
    localStorageKey;

    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
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
                }
            ];
        }
    }

    toLocalStorage(){
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    findProduct(productId) {
        return this.cartItems?.find(cartItem => cartItem.productId === productId);
    }

    addToCart(productId,quantity){
        let sameProduct = this.findProduct(productId);
        if (sameProduct) {
            sameProduct.quantity += quantity;
        } else {
            this.cartItems?.push({
                productId,
                quantity,
                deliveryOptionId: '1'
            });
        }
        this.toLocalStorage();
        this.updateCartQuantity();
    }

    removeFromCart(productId){
        this.cartItems = this.cartItems?.filter(cartItem => cartItem.productId !== productId);
        this.updateCartQuantity();
        this.toLocalStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId){
        let sameProduct = this.findProduct(productId);
        if (sameProduct) {
            sameProduct.deliveryOptionId = deliveryOptionId;
            this.toLocalStorage();
        }
    }

    newQuantityUpdate(productId, newQuantity){
        let sameProduct = this.findProduct(productId);
        if (sameProduct) {
            sameProduct.quantity = newQuantity;
            this.updateCartQuantity();
        }
    }

    updateCartQuantity(){
        let cartQuantity = 0;
        this.cartItems?.forEach(cartItem => {
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);
