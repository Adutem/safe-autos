const serviceLocations = [
  {
    shopLocation: "Midas of Warren,\n32601 Van Dyke Ave,\nWarren, MI 48093",
    phoneNumber: "586-981-0793",
    email: "midaswarren@acornauto.org",
    link: "https://www.midas.com/store/mi/warren/32601-van-dyke-48093/tires?shopnum=6550&v=lookup#tire-shop-modes",
    couponLink:
      "https://www.midas.com/store/mi/warren/32601-van-dyke-48093/offers?shopnum=6550",
  },
  {
    shopLocation:
      "Midas of Madison Heights,\n385 W 12 Mile Road,\n Madison Heights, MI 48071",
    phoneNumber: "248-556-2711",
    email: "midasmadisonhts@acornauto.org",
    link: "https://www.midas.com/store/mi/madison-heights/385-w-12-mile-road-48071/tires?shopnum=6627&v=lookup#tire-shop-modes",
    couponLink:
      "https://www.midas.com/store/mi/madison-heights/385-w-12-mile-road-48071/offers?shopnum=6627",
  },
  {
    shopLocation:
      "Midas of Rochester,\n746 S Rochester Road,\nRochester, MI 48307",
    phoneNumber: "248-266-2522",
    email: "midasrochester@acornauto.org",
    link: "https://www.midas.com/store/mi/rochester/746-south-rochester-48307/tires?shopnum=6112&v=lookup#tire-shop-modes&v=lookup#tire-shop-modes",
    couponLink:
      "https://www.midas.com/store/mi/rochester/746-south-rochester-48307/offers?shopnum=6112",
  },
  {
    shopLocation: "Midas of Novi,\n43421 W 12 Mile Road,\nNovi, MI 48377",
    phoneNumber: "248-504-4925",
    email: "midasnovi@acornauto.org",
    link: "https://www.midas.com/store/mi/novi/43421-west-twelve-mile-road-48377/tires?shopnum=6952&v=lookup#tire-shop-modes",
    couponLink:
      "https://www.midas.com/store/mi/novi/43421-west-twelve-mile-road-48377/offers?shopnum=6952",
  },
  {
    shopLocation:
      "Midas of Lake Orion,\n591 S Lapeer Road,\nLake Orion, MI 48362",
    phoneNumber: "248-783-6829",
    email: "midaslakeorion@acornauto.org",
    link: "https://www.midas.com/store/mi/lake-orion/591-south-lapeer-road-48362/tires?shopnum=6861&v=lookup#tire-shop-modes",
    couponLink:
      "https://www.midas.com/store/mi/lake-orion/591-south-lapeer-road-48362/offers?shopnum=6861",
  },
  {
    shopLocation:
      "Midas of Grand Rapids,\n3424 Plainfield Ave NE,\nGrand Rapids, MI 49525",
    phoneNumber: "616-827-7036",
    email: "midasgrandrapids@acornauto.org",
    link: "https://www.midas.com/store/mi/grand-rapids/3424-plainfield-ave-ne-49525/tires?shopnum=6516&v=lookup#tire-shop-modes",
    couponLink:
      "https://www.midas.com/store/mi/grand-rapids/3424-plainfield-ave-ne-49525/offers?shopnum=6516",
  },
  {
    shopLocation: "Midas of Kalamazoo,\n6009 Gull Road,\nKalamazoo, MI 49048",
    phoneNumber: "269-220-3372",
    email: "midaskalamazoo@acornauto.org",
    link: "https://www.midas.com/store/mi/kalamazoo/6009-gull-road-49004/tires?shopnum=6271&v=lookup#tire-shop-modes",
    couponLink:
      "https://www.midas.com/store/mi/kalamazoo/6009-gull-road-49004/offers?shopnum=6271",
  },
  {
    shopLocation: "Midas of Portage,\n5112 S Westnedge Ave,\nPortage, MI 49002",
    phoneNumber: "269-220-3382",
    email: "midasportage@acornauto.org",
    link: "https://www.midas.com/store/mi/portage/5112-s-westnedge-49002/tires?shopnum=6265&v=lookup#tire-shop-modes",
    couponLink:
      "https://www.midas.com/store/mi/portage/5112-s-westnedge-49002/offers?shopnum=6265",
  },
  {
    shopLocation: "Midas of Jackson,\n1503 Clinton Ave,\nJackson, MI 49202",
    phoneNumber: "517-879-0565",
    email: "midasjackson@acornauto.org",
    link: "https://www.midas.com/store/mi/jackson/1503-clinton-road-49202/tires?shopnum=6264&v=lookup#tire-shop-modes",
    couponLink:
      "https://www.midas.com/store/mi/jackson/1503-clinton-road-49202/offers?shopnum=6264",
  },
  {
    shopLocation:
      "Midas Grand Rapids,\n2710 28th St. SE,\nGrand Rapids, MI 49512",
    phoneNumber: "616-552-1773",
    email: "midasgrandrapids28@acornauto.org",
    link: "https://www.midas.com/store/mi/grand-rapids/2710-28th-street-se-49512/tires?shopnum=6514&v=lookup#tire-shop-modes",
    couponLink:
      "https://www.midas.com/store/mi/grand-rapids/2710-28th-street-se-49512/offers?shopnum=6514",
  },
  {
    shopLocation: "Midas Roseville,\n25525 Gratiot Ave,\nRoseville, MI 48066",
    phoneNumber: "586-221-0190",
    email: "midasroseville@acornauto.org",
    link: "https://www.midas.com/store/mi/ann-arbor/2395-jackson-48103/tires?shopnum=6142&v=lookup#tire-shop-modes",
    couponLink:
      "https://www.midas.com/store/mi/ann-arbor/2395-jackson-48103/offers?shopnum=6142",
  },
  {
    shopLocation: "Midas Alpine,\n2360 Alpine Ave NW,\nGrand Rapids, MI 49544",
    phoneNumber: "616-426-8124",
    email: "midasalpine@acornauto.org",
    link: "https://www.midas.com/store/mi/grand-rapids/2360-alpine-avenue-northwest-49544/tires?shopnum=6885&v=lookup#tire-shop-modes",
    couponLink:
      "https://www.midas.com/store/mi/grand-rapids/2360-alpine-avenue-northwest-49544/offers?shopnum=6885",
  },
];

export default serviceLocations;
