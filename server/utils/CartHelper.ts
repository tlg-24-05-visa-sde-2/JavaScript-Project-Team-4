// Generic class, rename this for any purpose you see fit throughout your application

import { CartItem } from "../models/user";

class CartHelper {
    static calculateTotal(cart: CartItem[]): number {
        return cart.reduce((total, item) => {
          return total + (item.product.price * item.quantity);
        }, 0);
      }
}

export default CartHelper;