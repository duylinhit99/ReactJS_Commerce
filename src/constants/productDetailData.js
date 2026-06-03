const demoProduct = (image, price = "$56", name = "Easy Polo Black Edition") => ({
  image,
  price,
  name,
});

export const PRODUCT_DETAIL_TABS = [
  { id: "details", label: "Details" },
  { id: "companyprofile", label: "Company Profile" },
  { id: "tag", label: "Tag" },
  { id: "reviews", label: "Reviews" },
];

export const GALLERY_BY_TAB = {
  details: [
    demoProduct("images/home/gallery1.jpg"),
    demoProduct("images/home/gallery2.jpg"),
    demoProduct("images/home/gallery3.jpg"),
    demoProduct("images/home/gallery4.jpg"),
  ],
  companyprofile: [
    demoProduct("images/home/gallery1.jpg"),
    demoProduct("images/home/gallery3.jpg"),
    demoProduct("images/home/gallery2.jpg"),
    demoProduct("images/home/gallery4.jpg"),
  ],
  tag: [
    demoProduct("images/home/gallery1.jpg"),
    demoProduct("images/home/gallery2.jpg"),
    demoProduct("images/home/gallery3.jpg"),
    demoProduct("images/home/gallery4.jpg"),
  ],
};

export const RECOMMENDED_CAROUSEL_SLIDES = [
  {
    id: 1,
    active: true,
    products: [
      demoProduct("images/home/recommend1.jpg"),
      demoProduct("images/home/recommend2.jpg"),
      demoProduct("images/home/recommend3.jpg"),
    ],
  },
  {
    id: 2,
    products: [
      demoProduct("images/home/recommend1.jpg"),
      demoProduct("images/home/recommend2.jpg"),
      demoProduct("images/home/recommend3.jpg"),
    ],
  },
];

export const SAMPLE_REVIEW = {
  author: "EUGEN",
  time: "12:41 PM",
  date: "31 DEC 2014",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};
