const product =
{
    id: "0",
    title: "test item",
    description: "test description",
    price: "10.00",
    discountedPrice: "",
    discountPercent: "",
    quantity: "1",
    brand: "nike",
    color: "black",
    sizes: "sizes",

}
const cartItems =
    [
        {
            id: "0",
            cart: "",
            product: product,
            size: "size",
            quantity: "0",
            price: "0.00",
            discountedPrice: "0.00",
            userID: "0",
        },
        {
            id: "0",
            cart: "",
            product: product,
            size: "size",
            quantity: "0",
            price: "0.00",
            discountedPrice: "0.00",
            userID: "0",
        }
    ]
    

export const cart1 =
{
    id: "0",
    user: "user",
    cartItems: cartItems,
    totalPrice: "0.00",
    totalItem: "0",
    totalDiscountedPrice: "0.00",
    discount: "0"
}


const orderItemData = [
    {
        id: "0",
        product: product,
        size: "M",
        quantity: "2",
        price: "2.00",
        discountedPrice: "0",
        userId: "userId",
        deliveryDate: "01/01/2000"

    },
    {
        id: "1",
        product: product,
        size: "L",
        quantity: "4",
        price: "4.00",
        discountedPrice: "0",
        userId: "userId",
        deliveryDate: "01/01/2000"

    },
]

export const fakeOrderData = [
    {
        orderItems: orderItemData,
        orderDate: "01/01/2000",
        deliveryDate: "01/01/2000",
        shippingAddress: "1234 Test Ave.",
        totalPrice: "0.00",
        discountedPrice: "0",
        totalItem: "Uknown",
        createdAt: "12/12/1999"


    },
    {
        orderItems: orderItemData,
        orderDate: "01/01/2000",
        deliveryDate: "01/01/2000",
        shippingAddress: "1234 Test Ave.",
        totalPrice: "0.00",
        discountedPrice: "0",
        totalItem: "userId",
        createdAt: "12/12/1999"


    },
]

