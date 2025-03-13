export const blogs = Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    title: `Blog Post ${i + 1}`,
    category: i % 2 === 0 ? "Tires" : "Brakes",
    content: `This is a detailed content section for blog post ${i + 1}. Learn more about automotive maintenance and best practices for your vehicle.`,
    image: `https://assets.tractorjunction.com/truck-junction/assets/images/truck/ape-dx-1672639407-0.webp`,
    date: `2025-03-${String((i % 30) + 1).padStart(2, "0")}`,
  }));
  
  export const mostVisited = [
    { id: 2, title: "How to Choose the Right Tires for Your Car", image: "https://example.com/images/choosing-tires.jpg" },
    { id: 5, title: "5 Tips to Extend the Life of Your Car Battery", image: "https://example.com/images/car-battery.jpg" },
    { id: 8, title: "Why Wheel Alignment Matters for Your Vehicle", image: "https://example.com/images/wheel-alignment.jpg" },
    { id: 12, title: "Essential Maintenance Tips for Your Car's Longevity", image: "https://example.com/images/car-maintenance.jpg" },
    { id: 20, title: "How to Properly Check Your Tire Pressure", image: "https://example.com/images/tire-pressure.jpg" },
    { id: 25, title: "The Best Engine Oils for Your Vehicle", image: "https://example.com/images/engine-oil.jpg" },
    { id: 30, title: "How to Diagnose a Failing Alternator", image: "https://example.com/images/alternator.jpg" },
    { id: 35, title: "When to Replace Your Windshield Wipers", image: "https://example.com/images/windshield-wipers.jpg" },
    { id: 40, title: "Understanding Car Dashboard Warning Lights", image: "https://example.com/images/dashboard-lights.jpg" },
    { id: 45, title: "How to Change a Flat Tire in 5 Easy Steps", image: "https://example.com/images/flat-tire.jpg" },
    { id: 50, title: "Tips for Safe Driving in Rainy Weather", image: "https://example.com/images/rain-driving.jpg" },
    { id: 55, title: "The Benefits of Regular Oil Changes", image: "https://example.com/images/oil-change.jpg" },
    { id: 60, title: "How to Boost Your Car’s Fuel Efficiency", image: "https://example.com/images/fuel-efficiency.jpg" },
    { id: 65, title: "The Importance of Brake Fluid Maintenance", image: "https://example.com/images/brake-fluid.jpg" },
    { id: 70, title: "How to Protect Your Car’s Paint from Sun Damage", image: "https://example.com/images/car-paint.jpg" }
];
