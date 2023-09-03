const footerLinks = [
  {
    header: "Tires & Wheels",
    routePath: "/tires/brands",
    links: [
      {
        name: "Michelin®",
        path: "/Michelin",
      },
      {
        name: "BFGoodrich®",
        path: "/BFGoodrich",
      },
      {
        name: "Uniroyal®",
        path: "/Uniroyal",
      },
      {
        name: "Bridgestone",
        path: "/Bridgestone",
      },
      {
        name: "Firestone",
        path: "/Firestone",
      },
    ],
  },
  {
    header: "Services",
    routePath: "/services",
    links: [
      {
        path: "/oil-changes",
        name: "Oil Changes",
      },
      {
        path: "/brake-repair",
        name: "Brake Repair",
      },
      {
        path: "/wheel-alignments",
        name: "Wheel Alignments",
      },
      {
        path: "/differential-repair",
        name: "Differential Repair",
      },
      {
        path: "/tune-up",
        name: "Tune Ups",
      },
      {
        type: "root",
        path: "/",
        name: "All Services",
      },
    ],
  },
  {
    header: "About",
    routePath: "/",
    links: [
      {
        path: "",
        name: "Home",
      },
      {
        path: "tires",
        name: "Tires",
      },
      {
        path: "services",
        name: "Automotive Services",
      },
      {
        path: "coupons",
        name: "Coupons",
      },
      // {
      //   path: "financing",
      //   name: "Financing",
      // },
      {
        path: "about",
        name: "About",
      },
      {
        path: "find-us",
        name: "Find Us",
      },
    ],
  },
];

export default footerLinks;
