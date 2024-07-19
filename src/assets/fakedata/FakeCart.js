export const cart1 = {
    id: 1,
    user: {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        role: "ROLE_CUSTOMER",
        mobile: "1234567890",
        addresses: [
            {
                id: 1,
                firstName: "John",
                lastName: "Doe",
                streetAddress: "123 Sunny Street",
                city: "Sunville",
                state: "CA",
                zipCode: "90001",
                mobile: "1234567890"
            }
        ],
        paymentInformation: []
    },
    cartItems: [
        {
            id: 1,
            product: {
                id: 1,
                title: "Awesome T-Shirt",
                description: "A really awesome t-shirt for all your needs.",
                price: 29.99,
                discountedPrice: 19.99,
                quantity: 50,
                brand: "TeeFantastic",
                color: "Red",
                sizes: ["S", "M", "L"],
                imageUrl: "https://example.com/path/to/tshirt.jpg",
                ratings: [],
                reviews: [],
                numRatings: 0,
                category: {
                    id: 1,
                    name: "T-Shirts",
                    parentCategory: null
                }
            },
            size: "M",
            quantity: 2,
            price: 19.99 * 2,
            discountedPrice: 15.99 * 2,
            userId: 1
        }
    ],
    totalPrice: 39.98,
    totalItem: 1,
    totalDiscountedPrice: 31.98,
    discount: 8
};

