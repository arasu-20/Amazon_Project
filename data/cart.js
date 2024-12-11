export const cart =[
    
];
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
                quantity: 1
             });
         }
}