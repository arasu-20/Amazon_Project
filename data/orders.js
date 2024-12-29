export const orders = JSON.parse(localStorage.getItem('orders')) || [
    {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        orderTime: "2024-12-29T10:00:00Z", // Example Order Time 1
        totalCostCents: 1090, // Price of one product
        products: [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1, // Quantity of the product
                estimatedDeliveryTime: "2025-01-05T00:00:00Z" // Delivery time for this order
            }
        ]
    }
];

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders))
}