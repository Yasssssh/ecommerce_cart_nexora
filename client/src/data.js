import imagePlate from "./assets/plate.jpg";
import imageSpoon from "./assets/spoon.png";
import imageFork from "./assets/fork.jpg";
import imageKnife from "./assets/knife.jpg";
import imageCup from "./assets/mug.jpg";

const products = [
  {
    id: 1,
    name: "Classic Dinner Plate",
    price: 25,
    rating: "5/5",
    description:
      "A large, durable ceramic dinner plate with a clean white finish, perfect for daily use or formal gatherings. Dishwasher safe and chip resistant.",
    image: imagePlate,
  },
  {
    id: 2,
    name: "Signature Dessert Spoon",
    price: 10,
    rating: "4/5",
    description:
      "Elegant stainless steel spoon with a polished mirror finish. Its deep scoop is ideal for ice cream and rich desserts.",
    image: imageSpoon,
  },
  {
    id: 3,
    name: "Modern Coffee Mug",
    price: 15,
    rating: "4/5",
    description:
      "Insulated stoneware mug with a matte exterior and a comfortable handle. Keeps your coffee warm and your hands cool. 12 oz capacity.",
    image: imageCup,
  },
  {
    id: 4,
    name: "Three-Prong Salad Fork",
    price: 12,
    rating: "3/5",
    description:
      "Lightweight and perfectly sized fork designed for side dishes and salads. Made from 18/8 stainless steel for high resistance to tarnishing.",
    image: imageFork,
  },
  {
    id: 5,
    name: "Steakhouse Knife",
    price: 20,
    rating: "5/5",
    description:
      "High-carbon stainless steel knife with a serrated edge for effortless cutting of meats. Features a riveted ergonomic wooden handle for grip.",
    image: imageKnife,
  },
];

export default products;
