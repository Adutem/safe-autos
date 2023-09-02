const routes = [
  {
    type: "normal",
    path: "/",
    name: "Home",
  },
  {
    type: "composed",
    routePath: "/tires",
    name: "Tires",
    subRoutes: [
      {
        path: "/",
        name: "Car, Truck & SUV Tires",
      },
      {
        path: "/tire-care-tips",
        name: "Tire Care Tips",
      },
    ],
  },
  {
    type: "composed",
    routePath: "/services",
    name: "Automotive Services",
    subRoutes: [
      {
        path: "/",
        name: "Our Services",
      },
      {
        path: "/schedul-service",
        name: "Schedule My Service",
      },
      {
        path: "/car-care-tips",
        name: "Car Care Tips",
      },
    ],
  },
  {
    type: "normal",
    path: "/coupons",
    name: "Coupons",
  },
  // {
  //   type: "normal",
  //   path: "/financing",
  //   name: "Financing",
  // },
  {
    type: "composed",
    routePath: "/about",
    name: "About",
    subRoutes: [
      {
        path: "/",
        name: "Our Story",
      },
      {
        path: "/news",
        name: "News",
      },
      {
        path: "/reviews",
        name: "Reviews",
      },
    ],
  },
  {
    type: "composed",
    routePath: "/find-us",
    name: "Find Us",
    subRoutes: [
      {
        path: "/contact",
        name: "Contact",
      },
      {
        path: "/jobs",
        name: "Jobs",
      },
    ],
  },
];

export default routes;
