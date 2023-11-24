import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";

class OrderItem {
  constructor(imageLink, title, price, quantity) {
    this.id = uuidv4();
    this.imageLink = imageLink;
    this.title = title;
    this.price = price; // string
    this.quantity = quantity;
  }
}

export default OrderItem;
