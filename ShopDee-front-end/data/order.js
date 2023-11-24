import Order from "../models/Order";
import OrderItem from "../models/OrderItem";

export const ORDER_ITEMS_1 = [
  new OrderItem(
    "https://cdn.discordapp.com/attachments/987699517497438218/1176447490921332747/nike.png?ex=656ee71b&is=655c721b&hm=4015f2b45fd5d96f3ea53c66655eadfae408eeb85af24a2c7eb5e77abab1576a&",
    "Nike Club Max",
    "500,000",
    1
  ),
  new OrderItem(
    "https://cdn.discordapp.com/attachments/987699517497438218/1176447491177193542/nike-red.png?ex=656ee71b&is=655c721b&hm=762dc70ed9d73fa64eb157260b7686e3e0c77a205e637286944f75fddc2eadf6&",
    "Nike Air Max",
    "300,000",
    2
  ),
];
export const ORDER_ITEMS_2 = [
  new OrderItem(
    "https://s3-alpha-sig.figma.com/img/5c73/7e2c/9a82f54116ae04171c97b2acdac77fd2?Expires=1701648000&Signature=oUeD46F8TkoJIdXXYdoyj9vY1ao9gyytJsls2UDO8GYZ4TJVqkSROk-DdPJAB6l0Z7HwpRKNqHcbIzWN6ojRZTlNpGKYebm9AGCxJPodxuC2d2b9E2CF2ctqT9SX9jEOp5gd8Kxg~x5R6RSQBiEcCTUsfgfAYu~QJD8d2Fov1f9XwALZ3KwGB56yo0f-bZ03pYNDCPY-EuN53g0xAqU7WOnmzINnN5cQDDcGbZ5pE5nZX64unIvxT4K0BpSoTFElkwWnDI6hBizAXE0fxpySS9fdZRjqijk4JtsxfW5OFURXk06~CGstU-9c0FvRQwYMoQqrfwdLFNZTK1OmQ7EkVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "Cotton Jacket",
    "1,200,000",
    1
  ),
];
export const ORDER_ITEMS_3 = [
  new OrderItem(
    "https://s3-alpha-sig.figma.com/img/5c73/7e2c/9a82f54116ae04171c97b2acdac77fd2?Expires=1701648000&Signature=oUeD46F8TkoJIdXXYdoyj9vY1ao9gyytJsls2UDO8GYZ4TJVqkSROk-DdPJAB6l0Z7HwpRKNqHcbIzWN6ojRZTlNpGKYebm9AGCxJPodxuC2d2b9E2CF2ctqT9SX9jEOp5gd8Kxg~x5R6RSQBiEcCTUsfgfAYu~QJD8d2Fov1f9XwALZ3KwGB56yo0f-bZ03pYNDCPY-EuN53g0xAqU7WOnmzINnN5cQDDcGbZ5pE5nZX64unIvxT4K0BpSoTFElkwWnDI6hBizAXE0fxpySS9fdZRjqijk4JtsxfW5OFURXk06~CGstU-9c0FvRQwYMoQqrfwdLFNZTK1OmQ7EkVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "Cotton Jacket",
    "1,200,000",
    1
  ),
];
export const ORDER_ITEMS_4 = [
  new OrderItem(
    "https://s3-alpha-sig.figma.com/img/5c73/7e2c/9a82f54116ae04171c97b2acdac77fd2?Expires=1701648000&Signature=oUeD46F8TkoJIdXXYdoyj9vY1ao9gyytJsls2UDO8GYZ4TJVqkSROk-DdPJAB6l0Z7HwpRKNqHcbIzWN6ojRZTlNpGKYebm9AGCxJPodxuC2d2b9E2CF2ctqT9SX9jEOp5gd8Kxg~x5R6RSQBiEcCTUsfgfAYu~QJD8d2Fov1f9XwALZ3KwGB56yo0f-bZ03pYNDCPY-EuN53g0xAqU7WOnmzINnN5cQDDcGbZ5pE5nZX64unIvxT4K0BpSoTFElkwWnDI6hBizAXE0fxpySS9fdZRjqijk4JtsxfW5OFURXk06~CGstU-9c0FvRQwYMoQqrfwdLFNZTK1OmQ7EkVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "Cotton Jacket",
    "1,200,000",
    1
  ),
];

export const ORDER_LIST_TO_CONFIRM = [
  new Order("Mr.A", "BITIS'S OFFICIAL STORE", ORDER_ITEMS_1, "To Confirm"),
  new Order("Mr.B", "AEON MALL OFFICIAL STORE", ORDER_ITEMS_2, "To Confirm"),
  new Order("Mr.C", "BITIS'S OFFICIAL STORE", ORDER_ITEMS_3, "To Confirm"),
  new Order("Mr.D", "BITIS'S OFFICIAL STORE", ORDER_ITEMS_4, "To Confirm"),
];
export const ORDER_LIST_TO_DELIVER = [
  new Order("Mr.A", "BITIS'S OFFICIAL STORE", ORDER_ITEMS_1, "To Deliver"),
  new Order("Mr.B", "AEON MALL OFFICIAL STORE", ORDER_ITEMS_2, "To Deliver"),
  new Order("Mr.C", "BITIS'S OFFICIAL STORE", ORDER_ITEMS_3, "To Deliver"),
  new Order("Mr.D", "BITIS'S OFFICIAL STORE", ORDER_ITEMS_4, "To Deliver"),
];

export const ORDER_LIST_COMPLETED = [
  new Order("Mr.A", "BITIS'S OFFICIAL STORE", ORDER_ITEMS_1, "Completed"),
  new Order("Mr.B", "AEON MALL OFFICIAL STORE", ORDER_ITEMS_2, "Completed"),
  new Order("Mr.C", "BITIS'S OFFICIAL STORE", ORDER_ITEMS_3, "Completed"),
  new Order("Mr.D", "BITIS'S OFFICIAL STORE", ORDER_ITEMS_4, "Completed"),
];
