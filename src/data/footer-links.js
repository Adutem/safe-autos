const footerLinks = [
  {
    header: "Tires",
    routePath: "/tires/brands",
    links: [
      {
        name: "Michelin®",
        path: "/Michelin",
      },
      {
        name: "Cooper®",
        path: "/Cooper",
      },
      {
        name: "Goodyear®",
        path: "/Goodyear",
      },
      {
        name: "Firestone®",
        path: "/Firestone",
      },
      {
        name: "Hankook®",
        path: "/Hankook",
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
