import Image from "./Image";

interface Product {
    name: string,
    price: number,
    stock: number,
    content:string,
    images: Image[],
    new: boolean,
    offer: boolean,
    quantity: number,
}

export default Product