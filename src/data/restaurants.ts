export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock?: boolean;
  isVeg?: boolean;
  isBestseller?: boolean;
  rating?: number;
  ratingCount?: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  description: string;
  offer?: string;
  location?: string;
  categories: string[];
  isAd?: boolean;
  menu: MenuItem[];
}

const img = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=800&q=75`;

export const categoryItems: CategoryItem[] = [
  {
    id: "cat-1",
    name: "Idli",
    slug: "Idli",
    image: "/images/idli.png",
  },
  {
    id: "cat-2",
    name: "Poha",
    slug: "Poha",
    image: "/images/poha.png",
  },
  {
    id: "cat-3",
    name: "Dosa",
    slug: "Dosa",
    image: "/images/dosa.png",
  },
  {
    id: "cat-4",
    name: "Upma",
    slug: "Upma",
    image: "/images/upma.png",
  },
  {
    id: "cat-5",
    name: "Khichdi",
    slug: "Khichdi",
    image: "/images/khichdi.png",
  },
  {
    id: "cat-12",
    name: "Pav Bhaji",
    slug: "Pav Bhaji",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "cat-13",
    name: "Chole Bhature",
    slug: "Chole Bhature",
    image: "/images/poori.png",
  },
  {
    id: "cat-6",
    name: "Cakes",
    slug: "Cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "cat-7",
    name: "Poori",
    slug: "Poori",
    image: "/images/poori.png",
  },
  {
    id: "cat-8",
    name: "Biryani",
    slug: "Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "cat-9",
    name: "Burger",
    slug: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "cat-10",
    name: "Pizza",
    slug: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "cat-11",
    name: "Desserts",
    slug: "Desserts",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80",
  },
];

export const restaurants: Restaurant[] = [
  // --- DOSA & SOUTH INDIAN RESTAURANTS ---
  {
    id: "hotel-new-hanuman",
    name: "Hotel New Hanuman Executive",
    cuisine: "North Indian, South Indian, Biryani, Non-Veg, Idli, Pav Bhaji, Fast Food",
    rating: 4.2,
    deliveryTime: "20-25 mins",
    deliveryFee: 35,
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    offer: "₹50 OFF ABOVE ₹199",
    location: "Vishrambag",
    categories: ["Idli", "Dosa", "South Indian", "North Indian", "Biryani", "Non-Veg", "Poha", "Upma", "Khichdi", "Poori", "Pav Bhaji", "Chole Bhature", "Desserts"],
    isAd: true,
    description: "Famous crisp golden Triangle Masala Dosa, Amul Butter Pav Bhaji, Punjabi Chole Bhature, and authentic Punjabi Delicacies.",
    menu: [
      { id: "hnh-1", name: "Executive Masala Dosa", description: "Crispy rice crepe with potato bhaji and coconut chutney", price: 110, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80", category: "Dosa", isVeg: true, isBestseller: true, rating: 4.4, ratingCount: 28 },
      { id: "hnh-7", name: "Steamed Butter Idli Sambar (2 pcs)", description: "Soft fluffy steamed rice cakes served with hot lentil sambar and coconut chutney", price: 70, image: "/images/idli.png", category: "Idli", isVeg: true, isBestseller: true, rating: 4.8, ratingCount: 52 },
      { id: "hnh-8", name: "Kanchipuram Masala Idli", description: "Soft idlis tempered with mustard seeds, curry leaves and roasted cashew nuts", price: 90, image: "/images/idli.png", category: "Idli", isVeg: true, rating: 4.5, ratingCount: 19 },
      { id: "hnh-13", name: "Special Amul Butter Pav Bhaji", description: "Rich mashed vegetable curry loaded with pure Amul butter, served with 2 soft buttered pavs", price: 140, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80", category: "Pav Bhaji", isVeg: true, isBestseller: true, rating: 4.8, ratingCount: 64 },
      { id: "hnh-14", name: "Punjabi Chole Bhature (2 pcs)", description: "Spicy chickpea gravy served with 2 puffed golden bhatures, pickled onions and green chillies", price: 150, image: "/images/poori.png", category: "Chole Bhature", isVeg: true, isBestseller: true, rating: 4.7, ratingCount: 58 },
      { id: "hnh-9", name: "Desi Ghee Rava Upma", description: "Traditional roasted semolina cooked with vegetables, cashews and desi ghee", price: 65, image: "/images/upma.png", category: "Upma", isVeg: true, rating: 4.3, ratingCount: 22 },
      { id: "hnh-10", name: "Special Dal Khichdi Tadka", description: "Aromatic basmati rice and yellow moong dal tempered with garlic ghee tadka", price: 180, image: "/images/khichdi.png", category: "Khichdi", isVeg: true, isBestseller: true, rating: 4.6, ratingCount: 34 },
      { id: "hnh-11", name: "Poori Bhaji (4 pcs)", description: "Golden fried fluffy pooris served with spiced potato masala curry", price: 95, image: "/images/poori.png", category: "Poori", isVeg: true, rating: 4.4, ratingCount: 29 },
      { id: "hnh-2", name: "Special Butter Chicken (Half)", description: "Tender chicken pieces cooked in rich creamy tomato butter gravy", price: 280, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80", category: "North Indian", isVeg: false, isBestseller: true, rating: 4.6, ratingCount: 42 },
      { id: "hnh-3", name: "Spicy Mutton Kheema Fry", description: "Minced mutton stir-fried with onion garlic and authentic spices", price: 310, image: "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=800&q=80", category: "North Indian", isVeg: false, rating: 4.5, ratingCount: 19 },
      { id: "hnh-4", name: "Special Chicken Dum Biryani", description: "Fragrant basmati rice cooked with marinated chicken and saffron", price: 260, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80", category: "Biryani", isVeg: false, isBestseller: true, rating: 4.7, ratingCount: 54 },
      { id: "hnh-5", name: "Paneer Butter Masala", description: "Cottage cheese cooked in rich creamy tomato gravy", price: 240, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80", category: "North Indian", isVeg: true, rating: 4.3, ratingCount: 14 },
      { id: "hnh-6", name: "Butter Naan (2pcs)", description: "Soft clay oven baked flatbread brushed with fresh butter", price: 60, image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80", category: "North Indian", isVeg: true, rating: 4.1, ratingCount: 8 },
      { id: "hnh-12", name: "Hot Shahi Gulab Jamun (2 pcs)", description: "Soft melt-in-mouth milk solid dumplings dipped in cardamom sugar syrup", price: 60, image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80", category: "Desserts", isVeg: true, isBestseller: true, rating: 4.8, ratingCount: 45 },
      { id: "hnh-15", name: "Kesar Pista Rasmalai (2 pcs)", description: "Soft spongy cottage cheese patties soaked in chilled saffron and pistachio infused milk", price: 90, image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80", category: "Desserts", isVeg: true, isBestseller: true, rating: 4.9, ratingCount: 52 },
    ],
  },
  {
    id: "real-hanuman-dosa",
    name: "Real Hanuman Dosa",
    cuisine: "South Indian, Idli, Fusion Dosa, Pav Bhaji, Non-Veg Dosa, Fast Food",
    rating: 3.9,
    deliveryTime: "30-35 mins",
    deliveryFee: 40,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    offer: "ITEMS AT ₹45",
    location: "Akashwani sangli",
    categories: ["Idli", "Dosa", "South Indian", "Upma", "Poori", "Pav Bhaji", "Pizza"],
    isAd: true,
    description: "Famous Amul Butter Dosa, Cheese Pav Bhaji, Fried Podi Idlis & Spicy Fusion Dosa Pizza.",
    menu: [
      { id: "rhd-1", name: "Amul Butter Special Dosa", description: "Roasting in pure Amul butter with spiced potato stuffing", price: 120, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80", category: "Dosa", isVeg: true, isBestseller: true, rating: 4.3, ratingCount: 31 },
      { id: "rhd-5", name: "Spicy Fried Podi Idli", description: "Crispy idli cubes tossed in gun powder spices, ghee and curry leaves", price: 85, image: "/images/idli.png", category: "Idli", isVeg: true, isBestseller: true, rating: 4.7, ratingCount: 41 },
      { id: "rhd-6", name: "Mini Ghee Idli Sambar (12 pcs)", description: "Bite-sized soft idlis floating in hot sambar with dollop of pure ghee", price: 95, image: "/images/idli.png", category: "Idli", isVeg: true, rating: 4.6, ratingCount: 38 },
      { id: "rhd-10", name: "Special Cheese Butter Pav Bhaji", description: "Spicy bhaji heavily topped with grated Amul cheese and served with 2 extra buttered pavs", price: 160, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80", category: "Pav Bhaji", isVeg: true, isBestseller: true, rating: 4.7, ratingCount: 43 },
      { id: "rhd-7", name: "Tomato Onion Upma", description: "Savory semolina porridge cooked with juicy tomatoes, green chillies and onions", price: 60, image: "/images/upma.png", category: "Upma", isVeg: true, rating: 4.2, ratingCount: 17 },
      { id: "rhd-8", name: "Puri Kurma Combo", description: "Deep fried golden pooris served with South Indian vegetable kurma gravy", price: 90, image: "/images/poori.png", category: "Poori", isVeg: true, rating: 4.3, ratingCount: 21 },
      { id: "rhd-9", name: "South Indian Dosa Pizza", description: "Crispy thin dosa base topped with pizza sauce, mozzarella cheese & capsicum", price: 140, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80", category: "Pizza", isVeg: true, rating: 4.4, ratingCount: 25 },
      { id: "rhd-2", name: "Chicken Kheema Roast Dosa", description: "Crispy dosa stuffed with spicy chicken mince and melted cheese", price: 160, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80", category: "Dosa", isVeg: false, isBestseller: true, rating: 4.6, ratingCount: 22 },
      { id: "rhd-3", name: "Double Egg Cheese Dosa", description: "Dosa coated with beaten eggs, green chillies and shredded cheese", price: 130, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80", category: "Dosa", isVeg: false, rating: 4.4, ratingCount: 16 },
      { id: "rhd-4", name: "Cheese Burst Dosa", description: "Loaded with melted mozzarella and Amul cheese", price: 150, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80", category: "Dosa", isVeg: true, rating: 4.2, ratingCount: 12 },
    ],
  },
  {
    id: "natraj-annex",
    name: "Natraj Annex",
    cuisine: "North Indian, South Indian, Chinese, Idli, Pav Bhaji, Chole Bhature, Desserts",
    rating: 4.3,
    deliveryTime: "10-15 mins",
    deliveryFee: 30,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    offer: "FLAT 20% OFF",
    location: "pushpraj chowk",
    categories: ["Idli", "Dosa", "South Indian", "Chinese", "Poha", "Upma", "Khichdi", "Poori", "Pav Bhaji", "Chole Bhature", "Burger", "Desserts"],
    description: "Delicious South Indian Paper Dosa, Chole Bhature, Amul Pav Bhaji, Soft Idli & Wok-tossed Non-Veg Chinese.",
    menu: [
      { id: "na-1", name: "Paper Roast Dosa", description: "Paper thin golden dosa served with coconut chutney", price: 100, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", category: "Dosa", isVeg: true, rating: 4.1, ratingCount: 18 },
      { id: "na-5", name: "Classic Steam Idli (2 pcs)", description: "Soft steaming hot rice idlis served with spicy red chutney and coconut chutney", price: 60, image: "/images/idli.png", category: "Idli", isVeg: true, isBestseller: true, rating: 4.6, ratingCount: 48 },
      { id: "na-6", name: "Special Rava Idli with Ghee", description: "Semolina idlis packed with carrots, cashews & coriander", price: 75, image: "/images/idli.png", category: "Idli", isVeg: true, rating: 4.4, ratingCount: 15 },
      { id: "na-13", name: "Amul Special Pav Bhaji", description: "Authentic Mumbai style bhaji simmered in butter and aromatic chat masala", price: 130, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80", category: "Pav Bhaji", isVeg: true, isBestseller: true, rating: 4.7, ratingCount: 55 },
      { id: "na-14", name: "Amul Chole Bhature Special", description: "Spicy North Indian chole cooked with tea infusion and served with fluffy bhatures", price: 145, image: "/images/poori.png", category: "Chole Bhature", isVeg: true, isBestseller: true, rating: 4.6, ratingCount: 49 },
      { id: "na-7", name: "Nagpuri Tarri Poha", description: "Flattened rice served with spicy black chickpea curry (Tarri) and sev", price: 55, image: "/images/poha.png", category: "Poha", isVeg: true, rating: 4.5, ratingCount: 23 },
      { id: "na-8", name: "Vegetable Rava Upma", description: "Healthy semolina breakfast dish cooked with peas, carrots and roasted peanuts", price: 60, image: "/images/upma.png", category: "Upma", isVeg: true, rating: 4.3, ratingCount: 19 },
      { id: "na-9", name: "Desi Ghee Masala Khichdi", description: "Comforting rice khichdi blended with garlic, cumin, tomatoes and pure ghee", price: 160, image: "/images/khichdi.png", category: "Khichdi", isVeg: true, isBestseller: true, rating: 4.7, ratingCount: 37 },
      { id: "na-10", name: "Chole Poori Combo (3 Pooris)", description: "Crispy pooris served with spicy Punjabi chole gravy and onion salad", price: 110, image: "/images/poori.png", category: "Poori", isVeg: true, isBestseller: true, rating: 4.5, ratingCount: 30 },
      { id: "na-11", name: "Zesty Chicken Cheese Burger", description: "Juicy fried chicken patty topped with slice of cheese and special sauce", price: 140, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", category: "Burger", isVeg: false, rating: 4.3, ratingCount: 24 },
      { id: "na-2", name: "Chicken Hakka Noodles", description: "Wok-tossed noodles with tender chicken strips, veggies and dark soya", price: 180, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80", category: "Chinese", isVeg: false, isBestseller: true, rating: 4.6, ratingCount: 39 },
      { id: "na-3", name: "Chilli Chicken Dry", description: "Boneless chicken cubes tossed with capsicum, garlic and red chilli sauce", price: 210, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80", category: "Chinese", isVeg: false, isBestseller: true, rating: 4.7, ratingCount: 45 },
      { id: "na-4", name: "Chicken Manchurian Gravy", description: "Crispy chicken balls in spicy soy garlic gravy", price: 195, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80", category: "Chinese", isVeg: false, rating: 4.4, ratingCount: 20 },
      { id: "na-12", name: "Sizzling Chocolate Brownie", description: "Warm chocolate brownie served with vanilla ice cream and hot chocolate fudge", price: 150, image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80", category: "Desserts", isVeg: true, isBestseller: true, rating: 4.8, ratingCount: 56 },
      { id: "na-15", name: "Royal Malai Rasmalai (2 pcs)", description: "Fresh cottage cheese discs immersed in thick saffron cardamom milk", price: 95, image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80", category: "Desserts", isVeg: true, isBestseller: true, rating: 4.9, ratingCount: 41 },
    ],
  },
  {
    id: "hotel-kiran",
    name: "Hotel Kiran",
    cuisine: "South Indian, North Indian, Idli, Pav Bhaji, Thalis, Biryani, Non-Veg",
    rating: 4.2,
    deliveryTime: "40-45 mins",
    deliveryFee: 45,
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80",
    offer: "ITEMS AT ₹99",
    location: "Miraj Station Road",
    categories: ["Idli", "Dosa", "South Indian", "North Indian", "Poha", "Khichdi", "Poori", "Pav Bhaji", "Biryani", "Desserts"],
    description: "Authentic Kolhapuri Chicken Curry Thalis, Kolhapuri Pav Bhaji & Mysore Masala Dosa.",
    menu: [
      { id: "hk-1", name: "Special Non-Veg Chicken Thali", description: "Spicy Chicken Sukka, Rassa Curry, 2 Bhakris, Indrayani Rice & Solkadhi", price: 240, image: "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=800&q=80", category: "Thali", isVeg: false, isBestseller: true, rating: 4.8, ratingCount: 65 },
      { id: "hk-4", name: "Traditional Steam Idli Vada Combo", description: "2 Soft idlis and 1 crispy medu vada served with hot sambar and chutneys", price: 85, image: "/images/idli.png", category: "Idli", isVeg: true, isBestseller: true, rating: 4.6, ratingCount: 43 },
      { id: "hk-9", name: "Kolhapuri Special Pav Bhaji", description: "Spicy and tangy Kolhapuri style vegetable bhaji served with buttered pav", price: 125, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80", category: "Pav Bhaji", isVeg: true, isBestseller: true, rating: 4.7, ratingCount: 38 },
      { id: "hk-5", name: "Maharashtra Dadpe Poha", description: "Fresh uncooked flattened rice soaked in coconut water, peanuts and green chilli seasoning", price: 50, image: "/images/poha.png", category: "Poha", isVeg: true, rating: 4.3, ratingCount: 16 },
      { id: "hk-6", name: "Maharashtrian Sabudana Khichdi", description: "Sago pearls cooked with crushed peanuts, green chillies and potatoes in pure ghee", price: 75, image: "/images/khichdi.png", category: "Khichdi", isVeg: true, isBestseller: true, rating: 4.7, ratingCount: 39 },
      { id: "hk-7", name: "Special Puri Masala Bhaji", description: "Puffed wheat pooris served with traditional onion potato bhaji", price: 85, image: "/images/poori.png", category: "Poori", isVeg: true, rating: 4.4, ratingCount: 22 },
      { id: "hk-8", name: "Kolhapuri Chicken Dum Biryani", description: "Spicy Kolhapuri style chicken layered basmati rice with tandoori spices", price: 220, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80", category: "Biryani", isVeg: false, isBestseller: true, rating: 4.7, ratingCount: 51 },
      { id: "hk-2", name: "Chicken Sukka Kolhapuri", description: "Pan fried chicken coated with toasted coconut and roasted spices", price: 230, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80", category: "North Indian", isVeg: false, rating: 4.5, ratingCount: 29 },
      { id: "hk-3", name: "Mysore Special Dosa", description: "Spicy red garlic chutney spread inside crispy dosa", price: 115, image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80", category: "Dosa", isVeg: true, rating: 4.2, ratingCount: 15 },
      { id: "hk-10", name: "Kesar Rasmalai (2 pcs)", description: "Chilled rasmalai infused with pure saffron and chopped pistachios", price: 85, image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80", category: "Desserts", isVeg: true, rating: 4.8, ratingCount: 30 },
    ],
  },
  {
    id: "hotel-dnyaneshwari",
    name: "Hotel Dnyaneshwari",
    cuisine: "South Indian, Idli, Poha, Pav Bhaji, Fast Food, Street Food, Pizza, Burger",
    rating: 4.4,
    deliveryTime: "25-30 mins",
    deliveryFee: 35,
    image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=800&q=80",
    offer: "60% OFF UPTO ₹120",
    location: "Sangli Miraj Road",
    categories: ["Idli", "Dosa", "South Indian", "Poha", "Street Food", "Pav Bhaji", "Burger", "Pizza"],
    description: "Famous Street Style Chicken Rolls, Amul Butter Pav Bhaji & Crispy Burgers.",
    menu: [
      { id: "hd-1", name: "Special Chicken Egg Roll", description: "Flaky paratha stuffed with spicy fried chicken, omelette & onions", price: 120, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80", category: "Street Food", isVeg: false, isBestseller: true, rating: 4.6, ratingCount: 33 },
      { id: "hd-4", name: "Butter Idli Fry (6 pcs)", description: "Idli slices pan fried in butter with chat masala and curry leaves", price: 80, image: "/images/idli.png", category: "Idli", isVeg: true, isBestseller: true, rating: 4.5, ratingCount: 36 },
      { id: "hd-8", name: "Street Style Amul Pav Bhaji", description: "Classic spicy mash served with toasted butter pavs and chopped onions", price: 120, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80", category: "Pav Bhaji", isVeg: true, isBestseller: true, rating: 4.6, ratingCount: 42 },
      { id: "hd-5", name: "Kanda Batata Poha Combo", description: "Spiced poha topped with onions, fried potatoes, and farsan", price: 45, image: "/images/poha.png", category: "Poha", isVeg: true, rating: 4.4, ratingCount: 20 },
      { id: "hd-6", name: "Crispy Veg Cheese Burger", description: "Golden fried veg patty with cheese slice, mayo and crunchy lettuce", price: 99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", category: "Burger", isVeg: true, rating: 4.3, ratingCount: 18 },
      { id: "hd-7", name: "Cheesy Corn & Capsicum Pizza", description: "Personal 7-inch pizza loaded with sweet corn, green peppers and mozzarella", price: 149, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80", category: "Pizza", isVeg: true, rating: 4.2, ratingCount: 14 },
      { id: "hd-2", name: "Double Egg Cheese Frankie", description: "Egg roll with melted cheese, mint chutney & chat masala", price: 90, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80", category: "Street Food", isVeg: false, rating: 4.4, ratingCount: 19 },
      { id: "hd-3", name: "Rolled Cheese Paneer Dosa", description: "Stuffed with grated cottage cheese and green peppers", price: 140, image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=800&q=80", category: "Dosa", isVeg: true, rating: 4.3, ratingCount: 25 },
    ],
  },

  // --- UPMA, POHA, IDLI, KHICHDI, POORI RESTAURANTS ---
  {
    id: "indori-poha-house",
    name: "Indori Poha House",
    cuisine: "Poha, Idli, Upma, Khichdi, Chole Bhature, Indian Breakfast, Snacks",
    rating: 4.7,
    deliveryTime: "10-15 mins",
    deliveryFee: 25,
    image: "/images/poha.png",
    offer: "ITEMS AT ₹39",
    location: "Vishrambag",
    categories: ["Idli", "Poha", "Upma", "Khichdi", "Chole Bhature", "South Indian", "Desserts"],
    description: "Famous Indori Steamed Poha, Chole Bhature, Hot Idli Sambar & Hot Gulab Jamun.",
    menu: [
      { id: "iph-1", name: "Special Indori Sev Poha", description: "Steamed yellow poha topped with crunchy Ratlami sev and onions", price: 50, image: "/images/poha.png", category: "Poha", isVeg: true, isBestseller: true, rating: 4.7, ratingCount: 40 },
      { id: "iph-3", name: "Indori Steamed Idli Sambar (2 pcs)", description: "Melt in mouth soft idlis served with fragrant spiced sambar", price: 60, image: "/images/idli.png", category: "Idli", isVeg: true, isBestseller: true, rating: 4.8, ratingCount: 50 },
      { id: "iph-6", name: "Special Chole Bhature Combo", description: "Authentic Indori style spicy chickpeas served with 2 crispy fried bhaturas", price: 130, image: "/images/poori.png", category: "Chole Bhature", isVeg: true, isBestseller: true, rating: 4.8, ratingCount: 46 },
      { id: "iph-4", name: "Indori Special Ghee Upma", description: "Semolina upma roasted in pure cow ghee with green chillies & cashews", price: 55, image: "/images/upma.png", category: "Upma", isVeg: true, rating: 4.5, ratingCount: 27 },
      { id: "iph-5", name: "Healthy Moong Dal Khichdi", description: "Light and digestible yellow moong dal khichdi seasoned with ghee and cumin", price: 130, image: "/images/khichdi.png", category: "Khichdi", isVeg: true, rating: 4.6, ratingCount: 21 },
      { id: "iph-2", name: "Egg Masala Poha", description: "Steamed poha tossed with boiled eggs and Indian spices", price: 70, image: "/images/poha.png", category: "Poha", isVeg: false, rating: 4.3, ratingCount: 15 },
      { id: "iph-7", name: "Hot Gulab Jamun (2 pcs)", description: "Warm juicy gulab jamun soaked in sugar syrup", price: 50, image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80", category: "Desserts", isVeg: true, rating: 4.7, ratingCount: 35 },
    ],
  },

  // --- PIZZA, BURGER, BIRYANI, CAKES RESTAURANTS ---
  {
    id: "pizza-hut",
    name: "Pizza Hut",
    cuisine: "Pizzas, Italian, Sides, Cakes, Desserts",
    rating: 4.2,
    deliveryTime: "25-30 mins",
    deliveryFee: 49,
    image: img("photo-1513104890138-7c749659a591"),
    offer: "70% OFF UPTO ₹130",
    location: "Vishrambag",
    categories: ["Pizza", "Cakes", "Desserts"],
    description: "World famous pan pizzas with mouthwatering toppings & signature Choco Lava Cakes.",
    menu: [
      { id: "ph-1", name: "Chicken Supreme Pizza", description: "Loaded with herbed chicken, chicken pepperoni, mushrooms & mozzarella", price: 449, image: img("photo-1513104890138-7c749659a591"), category: "Pizza", isVeg: false, isBestseller: true, rating: 4.7, ratingCount: 52 },
      { id: "ph-2", name: "Chicken Tandoori Tikka Pizza", description: "Spiced chicken tikka, capsicum, red onion with makhani sauce base", price: 399, image: img("photo-1513104890138-7c749659a591"), category: "Pizza", isVeg: false, isBestseller: true, rating: 4.6, ratingCount: 38 },
      { id: "ph-3", name: "Spiced Chicken Wings (6pcs)", description: "Oven baked juicy chicken wings coated in hot buffalo sauce", price: 219, image: img("photo-1563245372-f21724e3856d"), category: "Sides", isVeg: false, rating: 4.5, ratingCount: 27 },
      { id: "ph-4", name: "Veggie Supreme Pizza", description: "Loaded with black olives, green pepper, mushroom, onion, mozzarella", price: 399, image: img("photo-1513104890138-7c749659a591"), category: "Pizza", isVeg: true, rating: 4.3, ratingCount: 20 },
      { id: "ph-5", name: "Warm Choco Lava Cake", description: "Warm molten chocolate gooey cake with crispy outer crust", price: 119, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80", category: "Cakes", isVeg: true, isBestseller: true, rating: 4.9, ratingCount: 68 },
    ],
  },
  {
    id: "mcdonalds-gourmet",
    name: "McDonald's Gourmet Burger",
    cuisine: "Burgers, Fast Food, Shakes, Desserts",
    rating: 4.4,
    deliveryTime: "15-20 mins",
    deliveryFee: 45,
    image: img("photo-1568901346375-23c9450c58cd"),
    offer: "EVERYTHING AT ₹99",
    location: "Sangli Central",
    categories: ["Burger", "Desserts"],
    description: "Juicy McSpicy Chicken burgers, crispy chicken nuggets & hot fudge ice cream sundaes.",
    menu: [
      { id: "mcd-1", name: "McSpicy Chicken Burger", description: "Crispy chicken patty with spicy marinade and mayo", price: 199, image: img("photo-1568901346375-23c9450c58cd"), category: "Burger", isVeg: false, isBestseller: true, rating: 4.8, ratingCount: 88 },
      { id: "mcd-2", name: "Chicken Maharaja Mac", description: "Double flame-grilled chicken patties with habanero sauce & cheddar slice", price: 249, image: img("photo-1568901346375-23c9450c58cd"), category: "Burger", isVeg: false, isBestseller: true, rating: 4.7, ratingCount: 64 },
      { id: "mcd-3", name: "Crispy Chicken Nuggets (6pcs)", description: "Tender white-meat chicken nuggets served with mustard dip", price: 159, image: img("photo-1568901346375-23c9450c58cd"), category: "Burger", isVeg: false, rating: 4.5, ratingCount: 31 },
      { id: "mcd-4", name: "McAloo Tikki Burger", description: "Iconic potato and peas patty topped with sweet tomato mayo", price: 69, image: img("photo-1568901346375-23c9450c58cd"), category: "Burger", isVeg: true, rating: 4.2, ratingCount: 25 },
      { id: "mcd-5", name: "Hot Fudge Chocolate Sundae", description: "Creamy vanilla soft serve drizzled with thick hot chocolate fudge", price: 89, image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80", category: "Desserts", isVeg: true, rating: 4.7, ratingCount: 42 },
    ],
  },
  {
    id: "biryani-by-kilo",
    name: "Biryani By Kilo",
    cuisine: "Biryani, Kebabs, Mughlai, Khichdi, Desserts",
    rating: 4.6,
    deliveryTime: "30-40 mins",
    deliveryFee: 49,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    offer: "₹125 OFF ABOVE ₹299",
    location: "Sangli City",
    categories: ["Biryani", "Khichdi", "Desserts"],
    description: "Authentic handi cooked Hyderabadi Biryani, Royal Mughlai Khichdi & Shahi Desserts.",
    menu: [
      { id: "bbk-1", name: "Hyderabadi Chicken Dum Biryani", description: "Marinated chicken cooked with long grain basmati rice and aromatic spices", price: 299, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80", category: "Biryani", isVeg: false, isBestseller: true, rating: 4.9, ratingCount: 110 },
      { id: "bbk-2", name: "Special Mutton Dum Biryani (Handi)", description: "Slow handi-cooked tender mutton pieces layered with saffron basmati rice", price: 399, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80", category: "Biryani", isVeg: false, isBestseller: true, rating: 4.8, ratingCount: 72 },
      { id: "bbk-5", name: "Royal Mughlai Dum Khichdi", description: "Slow-cooked handi khichdi with roasted nuts, saffron and pure ghee", price: 240, image: "/images/khichdi.png", category: "Khichdi", isVeg: true, rating: 4.7, ratingCount: 19 },
      { id: "bbk-3", name: "Mutton Galouti Kebab (4pcs)", description: "Melt-in-mouth spiced minced mutton kebabs served with mint chutney", price: 320, image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80", category: "Biryani", isVeg: false, rating: 4.6, ratingCount: 28 },
      { id: "bbk-4", name: "Chicken Tikka Kebab (6pcs)", description: "Boneless chicken marinated in yogurt & red spices grilled in tandoor", price: 280, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80", category: "Biryani", isVeg: false, rating: 4.7, ratingCount: 44 },
      { id: "bbk-6", name: "Shahi Matka Phirni / Gulab Jamun", description: "Traditional saffron milk pudding topped with pistachios & almonds", price: 110, image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80", category: "Desserts", isVeg: true, rating: 4.8, ratingCount: 33 },
    ],
  },
  {
    id: "the-cake-express",
    name: "The Cake Express & Bakery",
    cuisine: "Cakes, Bakery, Pastries, Desserts",
    rating: 4.8,
    deliveryTime: "15-20 mins",
    deliveryFee: 25,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    offer: "FLAT 15% OFF",
    location: "Vishrambag, Sangli",
    categories: ["Cakes", "Desserts"],
    description: "Freshly baked artisan Black Forest cakes, Red Velvet cakes, Butterscotch cakes, pastries & celebratory desserts.",
    menu: [
      { id: "tce-2", name: "Fresh Black Forest Cake (500g)", description: "Classic chocolate sponge cake layered with whipped cream frosting, shaved dark chocolate and red cherries", price: 400, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80", category: "Cakes", isVeg: true, isBestseller: true, rating: 4.8, ratingCount: 61 },
      { id: "tce-5", name: "Red Velvet Cheese Cream Cake (500g)", description: "Vibrant red velvet sponge layered with velvety cream cheese frosting and white chocolate curls", price: 480, image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=80", category: "Cakes", isVeg: true, isBestseller: true, rating: 4.9, ratingCount: 54 },
      { id: "tce-6", name: "Crunchy Butterscotch Caramel Cake (500g)", description: "Moist butterscotch sponge layered with praline crunch, butterscotch drizzle and whipped cream", price: 420, image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80", category: "Cakes", isVeg: true, isBestseller: true, rating: 4.8, ratingCount: 48 },
      { id: "tce-1", name: "Dutch Chocolate Truffle Cake (500g)", description: "Rich chocolate sponge layered with smooth dark chocolate ganache", price: 450, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80", category: "Cakes", isVeg: true, isBestseller: true, rating: 4.9, ratingCount: 75 },
      { id: "tce-3", name: "Red Velvet Cream Cheese Pastry", description: "Vibrant red velvet sponge slice filled with velvety cream cheese frosting", price: 110, image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=80", category: "Cakes", isVeg: true, rating: 4.7, ratingCount: 38 },
      { id: "tce-7", name: "Butterscotch Crunch Pastry Slice", description: "Single slice of butterscotch cake packed with golden caramelized cashew praline", price: 95, image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80", category: "Cakes", isVeg: true, rating: 4.6, ratingCount: 33 },
      { id: "tce-4", name: "Fresh Pineapple Delight Pastry", description: "Light vanilla sponge infused with fresh crushed pineapple pieces and cream", price: 90, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80", category: "Cakes", isVeg: true, rating: 4.6, ratingCount: 29 },
    ],
  },
  {
    id: "sweet-treats-desserts",
    name: "Sweet Treats & Ice Creams",
    cuisine: "Desserts, Cakes, Ice Creams, Shakes",
    rating: 4.7,
    deliveryTime: "10-15 mins",
    deliveryFee: 20,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    offer: "ITEMS AT ₹49",
    location: "Sangli Central",
    categories: ["Desserts", "Cakes"],
    description: "Mouthwatering Rasmalai, Hot Gulab Jamun with Rabdi, Ice Cream Sundaes & Belgian Waffle Cakes.",
    menu: [
      { id: "std-4", name: "Special Kesar Pista Rasmalai (2 pcs)", description: "Soft spongy cottage cheese dumplings soaked in aromatic saffron-flavored milk", price: 100, image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80", category: "Desserts", isVeg: true, isBestseller: true, rating: 4.9, ratingCount: 78 },
      { id: "std-3", name: "Gulab Jamun with Ice Cream Combo", description: "Hot gulab jamun served alongside a scoop of rich vanilla ice cream", price: 99, image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80", category: "Desserts", isVeg: true, isBestseller: true, rating: 4.8, ratingCount: 62 },
      { id: "std-5", name: "Black Forest Cake Slice", description: "Slice of soft chocolate cake layered with whipped cream and cherries", price: 95, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80", category: "Cakes", isVeg: true, rating: 4.7, ratingCount: 44 },
      { id: "std-6", name: "Butterscotch Ice Cream Sundae", description: "Two scoops of butterscotch ice cream topped with butterscotch praline and caramel syrup", price: 120, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80", category: "Desserts", isVeg: true, rating: 4.8, ratingCount: 39 },
      { id: "std-1", name: "Belgian Chocolate Waffle Cake", description: "Crispy warm Belgian waffle smothered with dark & milk Belgian chocolate", price: 160, image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80", category: "Cakes", isVeg: true, isBestseller: true, rating: 4.9, ratingCount: 82 },
      { id: "std-2", name: "Royal Dryfruit Rabdi Falooda", description: "Chilled falooda noodles with basil seeds, rabdi, dry fruits and vanilla ice cream", price: 130, image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80", category: "Desserts", isVeg: true, isBestseller: true, rating: 4.8, ratingCount: 53 },
    ],
  },
];

export function getRestaurant(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}