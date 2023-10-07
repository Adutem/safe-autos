const routes = [
  {
    type: "normal",
    path: "/",
    name: "Home",
    icon: <i className="fi fi-sr-home"></i>,
  },
  {
    type: "composed",
    routePath: "/tires",
    name: "Tires",
    icon: <i className="fi fi-sr-tire-rugged"></i>,
    subRoutes: [
      {
        path: "/",
        name: "Car, Truck & SUV Tires",
        icon: <i className="fi fi-sr-tire-rugged"></i>,
      },
      {
        path: "/tire-care-tips",
        name: "Tire Care Tips",
        icon: <i className="fi fi-sr-bulb"></i>,
      },
    ],
  },
  {
    type: "composed",
    routePath: "/services",
    name: "Automotive Services",
    icon: <i className="fi fi-sr-gears"></i>,
    subRoutes: [
      {
        path: "/",
        name: "Our Services",
        icon: <i className="fi fi-sr-gears"></i>,
      },
      {
        path: "/schedule-service",
        name: "Schedule My Service",
        icon: <i className="fi fi-sr-calendar-lines"></i>,
      },
      {
        path: "/car-care-tips",
        name: "Car Care Tips",
        icon: <i className="fi fi-sr-car-mechanic"></i>,
      },
    ],
  },
  {
    type: "normal",
    path: "/coupons",
    name: "Coupons",
    icon: <i className="fi fi-sr-ticket"></i>,
  },
  {
    type: "normal",
    path: "/financing",
    name: "Financing",
    icon: <i className="fi fi-rr-credit-card"></i>,
  },
  {
    type: "composed",
    routePath: "/about",
    name: "About",
    icon: <i className="fi fi-sr-info"></i>,
    subRoutes: [
      {
        path: "/",
        name: "Our Story",
        icon: <i className="fi fi-sr-flag"></i>,
      },
      {
        path: "/news",
        name: "News",
        icon: <i className="fi fi-sr-book-alt"></i>,
      },
      {
        path: "/reviews",
        name: "Reviews",
        icon: <i className="fi fi-sr-circle-star"></i>,
      },
    ],
  },
  {
    type: "composed",
    routePath: "/find-us",
    name: "Find Us",
    icon: <i className="fi fi-sr-map-marker"></i>,
    subRoutes: [
      {
        path: "/",
        name: "Find Us",
        icon: <i className="fi fi-sr-map-marker"></i>,
      },
      {
        path: "/contact",
        name: "Contact",
        icon: <i className="fi fi-sr-envelope"></i>,
      },
      {
        path: "/join-our-team",
        name: "Join our team",
        icon: <i className="fi fi-sr-briefcase"></i>,
      },
    ],
  },
];

export default routes;
