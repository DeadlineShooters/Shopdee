import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";

class Order {
  constructor(buyer, shopName, orderItems, status) {
    this.id = uuidv4();
    this.buyer = buyer;
    this.shopName = shopName;
    this.items = orderItems;
    this.totalPayment = Order.calcTotalPayment(orderItems);
    this.status = status;
  }

  static calcTotalPayment(orderItems) {
    // parseInt and replace to remove all commas in price string
    const total = orderItems.reduce((acc, item) => acc + parseInt(item.price.replace(/,/g, "")) * item.quantity, 0);
    return total;
  }

  addOrderItem(newItem) {
    this.items.push(newItem);
    this.totalPayment = Order.calcTotalPayment(this.items);
  }
}

export default Order;
