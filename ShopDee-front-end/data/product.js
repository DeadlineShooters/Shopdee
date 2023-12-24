import mongoose, { mongo } from "mongoose";
export const shop = {
  _id: {
    $oid: "6579412001a6e7d1a58a8df1",
  },
  image: "/image/path",
  name: "Shop",
  phone: "0909",
  address: "tphcm",
  description: "Day la mo ta",
  user: {
    $oid: "65701eca56192c1c414ed11d",
  },
};

export const product = {
  name: "Giày thể thao thông dụng",
  image: [
    {
      url: "https://cdn.discordapp.com/attachments/987699517497438218/1176447491177193542/nike-red.png?ex=656ee71b&is=655c721b&hm=762dc70ed9d73fa64eb157260b7686e3e0c77a205e637286944f75fddc2eadf6&",
      public_id: "alo",
    },
    {
      url: "https://s3-alpha-sig.figma.com/img/5c73/7e2c/9a82f54116ae04171c97b2acdac77fd2?Expires=1701648000&Signature=oUeD46F8TkoJIdXXYdoyj9vY1ao9gyytJsls2UDO8GYZ4TJVqkSROk-DdPJAB6l0Z7HwpRKNqHcbIzWN6ojRZTlNpGKYebm9AGCxJPodxuC2d2b9E2CF2ctqT9SX9jEOp5gd8Kxg~x5R6RSQBiEcCTUsfgfAYu~QJD8d2Fov1f9XwALZ3KwGB56yo0f-bZ03pYNDCPY-EuN53g0xAqU7WOnmzINnN5cQDDcGbZ5pE5nZX64unIvxT4K0BpSoTFElkwWnDI6hBizAXE0fxpySS9fdZRjqijk4JtsxfW5OFURXk06~CGstU-9c0FvRQwYMoQqrfwdLFNZTK1OmQ7EkVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
      public_id: "alo",
    },
  ],
  category: {
    _id: new mongoose.Types.ObjectId("65795a2ce52575902f763153"),
    name: "Electronics",
  },
  description:
    'Giày thể thao thông dụng nam Biti\'s Basic BSM000600 được xem là mẫu giày "quốc dân" chưa bao giờ ngừng hot. Mặc dù đã ra mắt từ rất lâu nhưng đây vẫn được xem là sự lựa chọn hàng đầu cho những bạn yêu thích sự đơn giản. Thiết kế giày full đen hoặc trắng sẽ là điểm nhấn làm rung động biết bao nhiêu tín đồ mê phong cách thời trang hiện đại, trẻ trung.',
  price: 650000,
  quantity: 153,
  shop: shop,
};
export const product2 = {
  name: "Áo thun nam mùa hè",
  imgUrl:
    "https://s3-alpha-sig.figma.com/img/5c73/7e2c/9a82f54116ae04171c97b2acdac77fd2?Expires=1701648000&Signature=oUeD46F8TkoJIdXXYdoyj9vY1ao9gyytJsls2UDO8GYZ4TJVqkSROk-DdPJAB6l0Z7HwpRKNqHcbIzWN6ojRZTlNpGKYebm9AGCxJPodxuC2d2b9E2CF2ctqT9SX9jEOp5gd8Kxg~x5R6RSQBiEcCTUsfgfAYu~QJD8d2Fov1f9XwALZ3KwGB56yo0f-bZ03pYNDCPY-EuN53g0xAqU7WOnmzINnN5cQDDcGbZ5pE5nZX64unIvxT4K0BpSoTFElkwWnDI6hBizAXE0fxpySS9fdZRjqijk4JtsxfW5OFURXk06~CGstU-9c0FvRQwYMoQqrfwdLFNZTK1OmQ7EkVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  category: {
    _id: new mongoose.Types.ObjectId("65795a2ce52575902f763153"),
    name: "Electronics",
  },
  description: "Mô tả",
  price: 120000,
  quantity: 20,
  shop: shop,
};
// export const products = [product, product2];
export const products = [
  {
    _id: new mongoose.Types.ObjectId("6587fcbf79d86fb956bcd38e"),
    name: "xmas",
    image: [],
    description: "s",
    price: 52000,
    quantity: 52,
    category: {
      _id: new mongoose.Types.ObjectId("65795609e52575902f763152"),
      name: "Fashion",
    },
    shop: {
      $oid: "6579412001a6e7d1a58a8df1",
    },
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId("6587ff5879d86fb956bcd393"),
    name: "xmas",
    image: [
      {
        public_id: "ftzjvhn72rih32xmaxfa",
        url: "https://res.cloudinary.com/dqxtf297o/image/upload/v1703411541/ftzjvhn72rih32xmaxfa.jpg",
        _id: {
          $oid: "6587ff5879d86fb956bcd394",
        },
      },
      {
        public_id: "frtqf5c9lz7dhuiq2uqc",
        url: "https://res.cloudinary.com/dqxtf297o/image/upload/v1703411539/frtqf5c9lz7dhuiq2uqc.jpg",
        _id: {
          $oid: "6587ff5879d86fb956bcd395",
        },
      },
    ],
    description: "s",
    price: 52000,
    quantity: 52,
    category: {
      _id: new mongoose.Types.ObjectId("65795609e52575902f763152"),

      name: "Electronics",
    },
    shop: {
      $oid: "6579412001a6e7d1a58a8df1",
    },
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId("6587ffe279d86fb956bcd398"),
    name: "xmas",
    image: [
      {
        public_id: "ekta5c6d50hpkibg6zr9",
        url: "https://res.cloudinary.com/dqxtf297o/image/upload/v1703411677/ekta5c6d50hpkibg6zr9.jpg",
        _id: {
          $oid: "6587ffe279d86fb956bcd399",
        },
      },
      {
        public_id: "d2ebhjgsb6gkevbpgwoc",
        url: "https://res.cloudinary.com/dqxtf297o/image/upload/v1703411680/d2ebhjgsb6gkevbpgwoc.jpg",
        _id: {
          $oid: "6587ffe279d86fb956bcd39a",
        },
      },
    ],
    description: "s",
    price: 52000,
    quantity: 52,
    category: {
      _id: new mongoose.Types.ObjectId("65795a2ce52575902f763153"),

      name: "Fashion",
    },
    shop: {
      $oid: "6579412001a6e7d1a58a8df1",
    },
    __v: 0,
  },
];

export const order = {};
