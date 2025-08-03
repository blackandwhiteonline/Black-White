// Enhanced Product data for Black&White Clothing Store
// All products are black and white clothing items for men and women
// Comprehensive product catalog with all requested categories

export const products = [
  // MEN'S TOPWEAR - T-SHIRTS
  {
    id: 'm-t-shirt-1',
    name: 'Classic Black T-Shirt',
    category: 'mens-topwear',
    subcategory: 't-shirts',
    gender: 'men',
    price: 899,
    originalPrice: 1299,
    rating: 4.5,
    reviews: 128,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&h=600&fit=crop'
    ],
    description: 'Premium cotton classic black t-shirt with perfect fit and comfort.',
    features: ['100% Cotton', 'Breathable', 'Comfortable fit', 'Machine washable'],
    inStock: true,
    createdAt: '2024-01-15'
  },
  {
    id: 'm-t-shirt-2',
    name: 'Slim Fit Black T-Shirt',
    category: 'mens-topwear',
    subcategory: 't-shirts',
    gender: 'men',
    price: 799,
    originalPrice: 1199,
    rating: 4.3,
    reviews: 95,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&h=600&fit=crop'
    ],
    description: 'Slim fit black t-shirt for a modern, stylish look.',
    features: ['Premium cotton', 'Slim fit', 'Modern design', 'Easy care'],
    inStock: true,
    createdAt: '2024-01-20'
  },
  {
    id: 'm-t-shirt-3',
    name: 'Black V-Neck T-Shirt',
    category: 'mens-topwear',
    subcategory: 't-shirts',
    gender: 'men',
    price: 699,
    originalPrice: 999,
    rating: 4.2,
    reviews: 87,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop'
    ],
    description: 'Elegant V-neck black t-shirt for a sophisticated look.',
    features: ['Cotton blend', 'V-neck design', 'Comfortable', 'Versatile'],
    inStock: true,
    createdAt: '2024-01-18'
  },
  {
    id: 'm-t-shirt-4',
    name: 'Black Polo T-Shirt',
    category: 'mens-topwear',
    subcategory: 't-shirts',
    gender: 'men',
    price: 999,
    originalPrice: 1499,
    rating: 4.4,
    reviews: 112,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=600&fit=crop'
    ],
    description: 'Classic black polo t-shirt for casual and semi-formal occasions.',
    features: ['Pique cotton', 'Polo collar', 'Button placket', 'Smart casual'],
    inStock: true,
    createdAt: '2024-01-22'
  },
  {
    id: 'm-t-shirt-5',
    name: 'Black Crew Neck T-Shirt',
    category: 'mens-topwear',
    subcategory: 't-shirts',
    gender: 'men',
    price: 599,
    originalPrice: 899,
    rating: 4.1,
    reviews: 76,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop'
    ],
    description: 'Essential black crew neck t-shirt for everyday wear.',
    features: ['100% Cotton', 'Crew neck', 'Basic design', 'Comfortable'],
    inStock: true,
    createdAt: '2024-01-25'
  },

  // MEN'S TOPWEAR - CASUAL SHIRTS
  {
    id: 'm-casual-shirt-1',
    name: 'Black Casual Shirt',
    category: 'mens-topwear',
    subcategory: 'casual-shirts',
    gender: 'men',
    price: 1499,
    originalPrice: 1999,
    rating: 4.4,
    reviews: 87,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop'
    ],
    description: 'Comfortable black casual shirt perfect for everyday wear.',
    features: ['Cotton blend', 'Casual fit', 'Button-down collar', 'Versatile styling'],
    inStock: true,
    createdAt: '2024-01-10'
  },
  {
    id: 'm-casual-shirt-2',
    name: 'Black Oxford Shirt',
    category: 'mens-topwear',
    subcategory: 'casual-shirts',
    gender: 'men',
    price: 1299,
    originalPrice: 1799,
    rating: 4.3,
    reviews: 94,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop'
    ],
    description: 'Classic black Oxford shirt with textured fabric.',
    features: ['Oxford cotton', 'Textured fabric', 'Button-down collar', 'Casual style'],
    inStock: true,
    createdAt: '2024-01-12'
  },
  {
    id: 'm-casual-shirt-3',
    name: 'Black Linen Shirt',
    category: 'mens-topwear',
    subcategory: 'casual-shirts',
    gender: 'men',
    price: 1699,
    originalPrice: 2299,
    rating: 4.6,
    reviews: 123,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop'
    ],
    description: 'Breathable black linen shirt for summer comfort.',
    features: ['100% Linen', 'Breathable', 'Summer comfort', 'Natural fabric'],
    inStock: true,
    createdAt: '2024-01-15'
  },

  // MEN'S TOPWEAR - FORMAL SHIRTS
  {
    id: 'm-formal-shirt-1',
    name: 'Black Formal Shirt',
    category: 'mens-topwear',
    subcategory: 'formal-shirts',
    gender: 'men',
    price: 1899,
    originalPrice: 2499,
    rating: 4.6,
    reviews: 156,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop'
    ],
    description: 'Professional black formal shirt for office and business meetings.',
    features: ['Premium cotton', 'Formal fit', 'Starched finish', 'Iron-free'],
    inStock: true,
    createdAt: '2024-01-05'
  },
  {
    id: 'm-formal-shirt-2',
    name: 'Black Business Shirt',
    category: 'mens-topwear',
    subcategory: 'formal-shirts',
    gender: 'men',
    price: 2199,
    originalPrice: 2899,
    rating: 4.7,
    reviews: 189,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop'
    ],
    description: 'Premium black business shirt for corporate environments.',
    features: ['Egyptian cotton', 'Business fit', 'Wrinkle-resistant', 'Professional'],
    inStock: true,
    createdAt: '2024-01-08'
  },

  // MEN'S TOPWEAR - SWEATSHIRTS
  {
    id: 'm-sweatshirt-1',
    name: 'Black Hooded Sweatshirt',
    category: 'mens-topwear',
    subcategory: 'sweatshirts',
    gender: 'men',
    price: 1299,
    originalPrice: 1799,
    rating: 4.7,
    reviews: 203,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop'
    ],
    description: 'Comfortable black hooded sweatshirt for casual wear.',
    features: ['Fleece lining', 'Hooded design', 'Kangaroo pocket', 'Comfortable fit'],
    inStock: true,
    createdAt: '2024-01-12'
  },
  {
    id: 'm-sweatshirt-2',
    name: 'Black Crew Neck Sweatshirt',
    category: 'mens-topwear',
    subcategory: 'sweatshirts',
    gender: 'men',
    price: 999,
    originalPrice: 1399,
    rating: 4.4,
    reviews: 167,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    ],
    description: 'Classic black crew neck sweatshirt for everyday comfort.',
    features: ['Cotton blend', 'Crew neck', 'Ribbed cuffs', 'Comfortable'],
    inStock: true,
    createdAt: '2024-01-18'
  },

  // MEN'S TOPWEAR - SWEATERS
  {
    id: 'm-sweater-1',
    name: 'Black V-Neck Sweater',
    category: 'mens-topwear',
    subcategory: 'sweaters',
    gender: 'men',
    price: 1599,
    originalPrice: 2199,
    rating: 4.5,
    reviews: 145,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop'
    ],
    description: 'Elegant black V-neck sweater for sophisticated styling.',
    features: ['Wool blend', 'V-neck design', 'Comfortable fit', 'Versatile'],
    inStock: true,
    createdAt: '2024-01-10'
  },
  {
    id: 'm-sweater-2',
    name: 'Black Crew Neck Sweater',
    category: 'mens-topwear',
    subcategory: 'sweaters',
    gender: 'men',
    price: 1399,
    originalPrice: 1899,
    rating: 4.3,
    reviews: 123,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    ],
    description: 'Classic black crew neck sweater for casual and formal occasions.',
    features: ['Merino wool', 'Crew neck', 'Soft fabric', 'Warm'],
    inStock: true,
    createdAt: '2024-01-15'
  },

  // MEN'S TOPWEAR - JACKETS
  {
    id: 'm-jacket-1',
    name: 'Black Denim Jacket',
    category: 'mens-topwear',
    subcategory: 'jackets',
    gender: 'men',
    price: 2499,
    originalPrice: 3299,
    rating: 4.6,
    reviews: 178,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop'
    ],
    description: 'Classic black denim jacket for a timeless look.',
    features: ['Denim fabric', 'Classic design', 'Multiple pockets', 'Versatile'],
    inStock: true,
    createdAt: '2024-01-08'
  },
  {
    id: 'm-jacket-2',
    name: 'Black Bomber Jacket',
    category: 'mens-topwear',
    subcategory: 'jackets',
    gender: 'men',
    price: 2899,
    originalPrice: 3799,
    rating: 4.7,
    reviews: 234,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    ],
    description: 'Stylish black bomber jacket for a modern, edgy look.',
    features: ['Bomber style', 'Ribbed cuffs', 'Zipper closure', 'Modern design'],
    inStock: true,
    createdAt: '2024-01-12'
  },

  // MEN'S TOPWEAR - BLAZERS & COATS
  {
    id: 'm-blazer-1',
    name: 'Black Formal Blazer',
    category: 'mens-topwear',
    subcategory: 'blazers-coats',
    gender: 'men',
    price: 3999,
    originalPrice: 5299,
    rating: 4.8,
    reviews: 267,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop'
    ],
    description: 'Professional black formal blazer for business and formal occasions.',
    features: ['Wool blend', 'Single breasted', 'Notched lapel', 'Formal fit'],
    inStock: true,
    createdAt: '2024-01-05'
  },
  {
    id: 'm-coat-1',
    name: 'Black Overcoat',
    category: 'mens-topwear',
    subcategory: 'blazers-coats',
    gender: 'men',
    price: 5999,
    originalPrice: 7999,
    rating: 4.9,
    reviews: 189,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    ],
    description: 'Elegant black overcoat for winter sophistication.',
    features: ['Wool blend', 'Long length', 'Warm lining', 'Classic design'],
    inStock: true,
    createdAt: '2024-01-10'
  },

  // MEN'S TOPWEAR - SUITS
  {
    id: 'm-suit-1',
    name: 'Black Business Suit',
    category: 'mens-topwear',
    subcategory: 'suits',
    gender: 'men',
    price: 8999,
    originalPrice: 11999,
    rating: 4.9,
    reviews: 156,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop'
    ],
    description: 'Premium black business suit for professional excellence.',
    features: ['Wool blend', '2-piece suit', 'Formal fit', 'Professional'],
    inStock: true,
    createdAt: '2024-01-15'
  },

  // MEN'S TOPWEAR - RAIN JACKETS
  {
    id: 'm-rain-jacket-1',
    name: 'Black Rain Jacket',
    category: 'mens-topwear',
    subcategory: 'rain-jackets',
    gender: 'men',
    price: 1899,
    originalPrice: 2499,
    rating: 4.4,
    reviews: 98,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    ],
    description: 'Waterproof black rain jacket for monsoon protection.',
    features: ['Waterproof', 'Lightweight', 'Hooded design', 'Practical'],
    inStock: true,
    createdAt: '2024-01-20'
  },

  // MEN'S INDIAN & FESTIVE WEAR - KURTAS & KURTA SETS
  {
    id: 'm-kurta-1',
    name: 'Black Kurta',
    category: 'mens-indian-festive',
    subcategory: 'kurtas-kurta-sets',
    gender: 'men',
    price: 2499,
    originalPrice: 3299,
    rating: 4.6,
    reviews: 234,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop'
    ],
    description: 'Elegant black kurta for traditional Indian occasions.',
    features: ['Cotton blend', 'Traditional design', 'Comfortable fit', 'Festive wear'],
    inStock: true,
    createdAt: '2024-01-10'
  },
  {
    id: 'm-kurta-set-1',
    name: 'Black Kurta Set',
    category: 'mens-indian-festive',
    subcategory: 'kurtas-kurta-sets',
    gender: 'men',
    price: 3999,
    originalPrice: 5299,
    rating: 4.7,
    reviews: 189,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    ],
    description: 'Complete black kurta set with matching pants.',
    features: ['Kurta + Pants', 'Traditional design', 'Festive wear', 'Complete set'],
    inStock: true,
    createdAt: '2024-01-15'
  },

  // MEN'S INDIAN & FESTIVE WEAR - SHERWANIS
  {
    id: 'm-sherwani-1',
    name: 'Black Sherwani',
    category: 'mens-indian-festive',
    subcategory: 'sherwanis',
    gender: 'men',
    price: 8999,
    originalPrice: 11999,
    rating: 4.9,
    reviews: 145,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop'
    ],
    description: 'Royal black sherwani for grand celebrations and weddings.',
    features: ['Premium fabric', 'Embroidered design', 'Wedding wear', 'Royal look'],
    inStock: true,
    createdAt: '2024-01-05'
  },

  // MEN'S INDIAN & FESTIVE WEAR - NEHRU JACKETS
  {
    id: 'm-nehru-jacket-1',
    name: 'Black Nehru Jacket',
    category: 'mens-indian-festive',
    subcategory: 'nehru-jackets',
    gender: 'men',
    price: 3499,
    originalPrice: 4599,
    rating: 4.5,
    reviews: 167,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    ],
    description: 'Classic black Nehru jacket for formal Indian occasions.',
    features: ['Mandarin collar', 'Formal design', 'Traditional style', 'Elegant'],
    inStock: true,
    createdAt: '2024-01-12'
  },

  // MEN'S INDIAN & FESTIVE WEAR - DHOTIS
  {
    id: 'm-dhoti-1',
    name: 'Black Dhoti',
    category: 'mens-indian-festive',
    subcategory: 'dhotis',
    gender: 'men',
    price: 899,
    originalPrice: 1299,
    rating: 4.3,
    reviews: 89,
    colors: ['Black'],
    sizes: ['Free Size'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop'
    ],
    description: 'Traditional black dhoti for religious and cultural ceremonies.',
    features: ['Cotton fabric', 'Traditional wear', 'Cultural ceremonies', 'Comfortable'],
    inStock: true,
    createdAt: '2024-01-18'
  },

  // MEN'S BOTTOMWEAR - JEANS
  {
    id: 'm-jeans-1',
    name: 'Black Slim Fit Jeans',
    category: 'mens-bottomwear',
    subcategory: 'jeans',
    gender: 'men',
    price: 1899,
    originalPrice: 2499,
    rating: 4.6,
    reviews: 234,
    colors: ['Black'],
    sizes: ['30', '32', '34', '36', '38'],
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop'
    ],
    description: 'Stylish black slim fit jeans for a modern look.',
    features: ['Denim fabric', 'Slim fit', '5-pocket design', 'Versatile'],
    inStock: true,
    createdAt: '2024-01-10'
  },
  {
    id: 'm-jeans-2',
    name: 'Black Straight Fit Jeans',
    category: 'mens-bottomwear',
    subcategory: 'jeans',
    gender: 'men',
    price: 1699,
    originalPrice: 2299,
    rating: 4.4,
    reviews: 187,
    colors: ['Black'],
    sizes: ['30', '32', '34', '36', '38'],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop'
    ],
    description: 'Comfortable black straight fit jeans for everyday wear.',
    features: ['Denim fabric', 'Straight fit', 'Comfortable', 'Classic design'],
    inStock: true,
    createdAt: '2024-01-15'
  },

  // MEN'S BOTTOMWEAR - CASUAL TROUSERS
  {
    id: 'm-casual-trousers-1',
    name: 'Black Casual Trousers',
    category: 'mens-bottomwear',
    subcategory: 'casual-trousers',
    gender: 'men',
    price: 1499,
    originalPrice: 1999,
    rating: 4.3,
    reviews: 156,
    colors: ['Black'],
    sizes: ['30', '32', '34', '36', '38'],
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop'
    ],
    description: 'Comfortable black casual trousers for relaxed styling.',
    features: ['Cotton blend', 'Casual fit', 'Elastic waist', 'Comfortable'],
    inStock: true,
    createdAt: '2024-01-12'
  },

  // MEN'S BOTTOMWEAR - FORMAL TROUSERS
  {
    id: 'm-formal-trousers-1',
    name: 'Black Formal Trousers',
    category: 'mens-bottomwear',
    subcategory: 'formal-trousers',
    gender: 'men',
    price: 1899,
    originalPrice: 2499,
    rating: 4.5,
    reviews: 198,
    colors: ['Black'],
    sizes: ['30', '32', '34', '36', '38'],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop'
    ],
    description: 'Professional black formal trousers for office wear.',
    features: ['Wool blend', 'Formal fit', 'Creased design', 'Professional'],
    inStock: true,
    createdAt: '2024-01-08'
  },

  // MEN'S BOTTOMWEAR - SHORTS
  {
    id: 'm-shorts-1',
    name: 'Black Casual Shorts',
    category: 'mens-bottomwear',
    subcategory: 'shorts',
    gender: 'men',
    price: 899,
    originalPrice: 1299,
    rating: 4.2,
    reviews: 134,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop'
    ],
    description: 'Comfortable black casual shorts for summer wear.',
    features: ['Cotton blend', 'Casual fit', 'Side pockets', 'Summer comfort'],
    inStock: true,
    createdAt: '2024-01-20'
  },

  // MEN'S BOTTOMWEAR - TRACK PANTS & JOGGERS
  {
    id: 'm-track-pants-1',
    name: 'Black Track Pants',
    category: 'mens-bottomwear',
    subcategory: 'track-pants-joggers',
    gender: 'men',
    price: 1199,
    originalPrice: 1599,
    rating: 4.4,
    reviews: 167,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop'
    ],
    description: 'Comfortable black track pants for athletic wear.',
    features: ['Polyester blend', 'Elastic waist', 'Side pockets', 'Athletic fit'],
    inStock: true,
    createdAt: '2024-01-12'
  },
  {
    id: 'm-joggers-1',
    name: 'Black Joggers',
    category: 'mens-bottomwear',
    subcategory: 'track-pants-joggers',
    gender: 'men',
    price: 999,
    originalPrice: 1399,
    rating: 4.3,
    reviews: 145,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop'
    ],
    description: 'Stylish black joggers for casual and athletic wear.',
    features: ['Cotton blend', 'Elastic cuffs', 'Side pockets', 'Comfortable'],
    inStock: true,
    createdAt: '2024-01-18'
  },

  // WOMEN'S TOPWEAR - T-SHIRTS
  {
    id: 'w-t-shirt-1',
    name: 'Black Women\'s T-Shirt',
    category: 'womens-topwear',
    subcategory: 't-shirts',
    gender: 'women',
    price: 799,
    originalPrice: 1199,
    rating: 4.4,
    reviews: 145,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    ],
    description: 'Comfortable black t-shirt designed for women.',
    features: ['100% Cotton', 'Women\'s fit', 'Soft fabric', 'Machine washable'],
    inStock: true,
    createdAt: '2024-01-10'
  },
  {
    id: 'w-t-shirt-2',
    name: 'Black V-Neck Women\'s T-Shirt',
    category: 'womens-topwear',
    subcategory: 't-shirts',
    gender: 'women',
    price: 699,
    originalPrice: 999,
    rating: 4.3,
    reviews: 123,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop'
    ],
    description: 'Elegant V-neck black t-shirt for women.',
    features: ['Cotton blend', 'V-neck design', 'Women\'s fit', 'Versatile'],
    inStock: true,
    createdAt: '2024-01-15'
  },
  {
    id: 'w-t-shirt-3',
    name: 'Black Crop Top',
    category: 'womens-topwear',
    subcategory: 't-shirts',
    gender: 'women',
    price: 599,
    originalPrice: 899,
    rating: 4.2,
    reviews: 98,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    ],
    description: 'Stylish black crop top for modern women.',
    features: ['Cotton blend', 'Crop design', 'Modern fit', 'Trendy'],
    inStock: true,
    createdAt: '2024-01-20'
  },

  // WOMEN'S TOPWEAR - CASUAL SHIRTS
  {
    id: 'w-casual-shirt-1',
    name: 'Black Women\'s Casual Shirt',
    category: 'womens-topwear',
    subcategory: 'casual-shirts',
    gender: 'women',
    price: 1299,
    originalPrice: 1799,
    rating: 4.6,
    reviews: 123,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop'
    ],
    description: 'Stylish black casual shirt for women.',
    features: ['Cotton blend', 'Women\'s fit', 'Button-down collar', 'Versatile styling'],
    inStock: true,
    createdAt: '2024-01-08'
  },
  {
    id: 'w-casual-shirt-2',
    name: 'Black Women\'s Oversized Shirt',
    category: 'womens-topwear',
    subcategory: 'casual-shirts',
    gender: 'women',
    price: 1499,
    originalPrice: 1999,
    rating: 4.5,
    reviews: 156,
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    ],
    description: 'Trendy black oversized shirt for women.',
    features: ['Oversized fit', 'Modern design', 'Comfortable', 'Stylish'],
    inStock: true,
    createdAt: '2024-01-12'
  },

  // WOMEN'S TOPWEAR - FORMAL SHIRTS
  {
    id: 'w-formal-shirt-1',
    name: 'Black Women\'s Formal Shirt',
    category: 'womens-topwear',
    subcategory: 'formal-shirts',
    gender: 'women',
    price: 1599,
    originalPrice: 2199,
    rating: 4.7,
    reviews: 167,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    ],
    description: 'Professional black formal shirt for women.',
    features: ['Premium cotton', 'Women\'s fit', 'Formal design', 'Iron-free'],
    inStock: true,
    createdAt: '2024-01-05'
  },

  // WOMEN'S TOPWEAR - SWEATSHIRTS
  {
    id: 'w-sweatshirt-1',
    name: 'Black Women\'s Sweatshirt',
    category: 'womens-topwear',
    subcategory: 'sweatshirts',
    gender: 'women',
    price: 1099,
    originalPrice: 1499,
    rating: 4.5,
    reviews: 134,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop'
    ],
    description: 'Comfortable black sweatshirt for women.',
    features: ['Fleece lining', 'Women\'s fit', 'Kangaroo pocket', 'Comfortable design'],
    inStock: true,
    createdAt: '2024-01-12'
  },
  {
    id: 'w-sweatshirt-2',
    name: 'Black Women\'s Hooded Sweatshirt',
    category: 'womens-topwear',
    subcategory: 'sweatshirts',
    gender: 'women',
    price: 1299,
    originalPrice: 1799,
    rating: 4.6,
    reviews: 145,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    ],
    description: 'Stylish black hooded sweatshirt for women.',
    features: ['Hooded design', 'Women\'s fit', 'Comfortable', 'Casual style'],
    inStock: true,
    createdAt: '2024-01-18'
  },

  // WOMEN'S TOPWEAR - SWEATERS
  {
    id: 'w-sweater-1',
    name: 'Black Women\'s Sweater',
    category: 'womens-topwear',
    subcategory: 'sweaters',
    gender: 'women',
    price: 1399,
    originalPrice: 1899,
    rating: 4.4,
    reviews: 123,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop'
    ],
    description: 'Comfortable black sweater for women.',
    features: ['Wool blend', 'Women\'s fit', 'Soft fabric', 'Warm'],
    inStock: true,
    createdAt: '2024-01-10'
  },
  {
    id: 'w-sweater-2',
    name: 'Black Women\'s V-Neck Sweater',
    category: 'womens-topwear',
    subcategory: 'sweaters',
    gender: 'women',
    price: 1599,
    originalPrice: 2199,
    rating: 4.6,
    reviews: 156,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    ],
    description: 'Elegant black V-neck sweater for women.',
    features: ['V-neck design', 'Women\'s fit', 'Elegant style', 'Versatile'],
    inStock: true,
    createdAt: '2024-01-15'
  },

  // WOMEN'S TOPWEAR - JACKETS
  {
    id: 'w-jacket-1',
    name: 'Black Women\'s Denim Jacket',
    category: 'womens-topwear',
    subcategory: 'jackets',
    gender: 'women',
    price: 2299,
    originalPrice: 2999,
    rating: 4.5,
    reviews: 167,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop'
    ],
    description: 'Classic black denim jacket for women.',
    features: ['Denim fabric', 'Women\'s fit', 'Classic design', 'Versatile'],
    inStock: true,
    createdAt: '2024-01-08'
  },
  {
    id: 'w-jacket-2',
    name: 'Black Women\'s Bomber Jacket',
    category: 'womens-topwear',
    subcategory: 'jackets',
    gender: 'women',
    price: 2699,
    originalPrice: 3499,
    rating: 4.7,
    reviews: 189,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    ],
    description: 'Stylish black bomber jacket for women.',
    features: ['Bomber style', 'Women\'s fit', 'Modern design', 'Edgy look'],
    inStock: true,
    createdAt: '2024-01-12'
  },

  // WOMEN'S TOPWEAR - BLAZERS & COATS
  {
    id: 'w-blazer-1',
    name: 'Black Women\'s Blazer',
    category: 'womens-topwear',
    subcategory: 'blazers-coats',
    gender: 'women',
    price: 3499,
    originalPrice: 4599,
    rating: 4.6,
    reviews: 178,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop'
    ],
    description: 'Professional black blazer for women.',
    features: ['Wool blend', 'Women\'s fit', 'Formal design', 'Professional'],
    inStock: true,
    createdAt: '2024-01-05'
  },
  {
    id: 'w-coat-1',
    name: 'Black Women\'s Overcoat',
    category: 'womens-topwear',
    subcategory: 'blazers-coats',
    gender: 'women',
    price: 5499,
    originalPrice: 7299,
    rating: 4.8,
    reviews: 145,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    ],
    description: 'Elegant black overcoat for women.',
    features: ['Wool blend', 'Women\'s fit', 'Long length', 'Sophisticated'],
    inStock: true,
    createdAt: '2024-01-10'
  },

  // WOMEN'S TOPWEAR - SUITS
  {
    id: 'w-suit-1',
    name: 'Black Women\'s Business Suit',
    category: 'womens-topwear',
    subcategory: 'suits',
    gender: 'women',
    price: 7999,
    originalPrice: 10499,
    rating: 4.8,
    reviews: 134,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop'
    ],
    description: 'Professional black business suit for women.',
    features: ['Wool blend', '2-piece suit', 'Women\'s fit', 'Professional'],
    inStock: true,
    createdAt: '2024-01-15'
  },

  // WOMEN'S TOPWEAR - RAIN JACKETS
  {
    id: 'w-rain-jacket-1',
    name: 'Black Women\'s Rain Jacket',
    category: 'womens-topwear',
    subcategory: 'rain-jackets',
    gender: 'women',
    price: 1699,
    originalPrice: 2299,
    rating: 4.3,
    reviews: 87,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    ],
    description: 'Waterproof black rain jacket for women.',
    features: ['Waterproof', 'Women\'s fit', 'Lightweight', 'Practical'],
    inStock: true,
    createdAt: '2024-01-20'
  },

  // WOMEN'S INDIAN & FESTIVE WEAR - KURTAS & KURTA SETS
  {
    id: 'w-kurta-1',
    name: 'Black Women\'s Kurta',
    category: 'womens-indian-festive',
    subcategory: 'kurtas-kurta-sets',
    gender: 'women',
    price: 2299,
    originalPrice: 2999,
    rating: 4.5,
    reviews: 198,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop'
    ],
    description: 'Elegant black kurta for women.',
    features: ['Cotton blend', 'Women\'s fit', 'Traditional design', 'Festive wear'],
    inStock: true,
    createdAt: '2024-01-10'
  },
  {
    id: 'w-kurta-set-1',
    name: 'Black Women\'s Kurta Set',
    category: 'womens-indian-festive',
    subcategory: 'kurtas-kurta-sets',
    gender: 'women',
    price: 3699,
    originalPrice: 4899,
    rating: 4.6,
    reviews: 167,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    ],
    description: 'Complete black kurta set for women.',
    features: ['Kurta + Pants', 'Women\'s fit', 'Traditional design', 'Complete set'],
    inStock: true,
    createdAt: '2024-01-15'
  },

  // WOMEN'S INDIAN & FESTIVE WEAR - SAREES
  {
    id: 'w-saree-1',
    name: 'Black Silk Saree',
    category: 'womens-indian-festive',
    subcategory: 'sarees',
    gender: 'women',
    price: 5999,
    originalPrice: 7999,
    rating: 4.8,
    reviews: 234,
    colors: ['Black'],
    sizes: ['Free Size'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop'
    ],
    description: 'Elegant black silk saree for special occasions.',
    features: ['Silk fabric', 'Traditional design', 'Festive wear', 'Elegant'],
    inStock: true,
    createdAt: '2024-01-05'
  },

  // WOMEN'S INDIAN & FESTIVE WEAR - SALWAR KAMEEZ
  {
    id: 'w-salwar-kameez-1',
    name: 'Black Salwar Kameez',
    category: 'womens-indian-festive',
    subcategory: 'salwar-kameez',
    gender: 'women',
    price: 4499,
    originalPrice: 5999,
    rating: 4.7,
    reviews: 189,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop'
    ],
    description: 'Beautiful black salwar kameez for traditional occasions.',
    features: ['Cotton blend', 'Traditional design', 'Comfortable fit', 'Festive wear'],
    inStock: true,
    createdAt: '2024-01-12'
  },

  // WOMEN'S INDIAN & FESTIVE WEAR - LEHENGA CHOLIS
  {
    id: 'w-lehenga-choli-1',
    name: 'Black Lehenga Choli',
    category: 'womens-indian-festive',
    subcategory: 'lehenga-cholis',
    gender: 'women',
    price: 8999,
    originalPrice: 11999,
    rating: 4.9,
    reviews: 145,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop'
    ],
    description: 'Stunning black lehenga choli for grand celebrations.',
    features: ['Embroidered design', 'Wedding wear', 'Traditional style', 'Grand look'],
    inStock: true,
    createdAt: '2024-01-08'
  },

  // WOMEN'S BOTTOMWEAR - JEANS
  {
    id: 'w-jeans-1',
    name: 'Black Women\'s Skinny Jeans',
    category: 'womens-bottomwear',
    subcategory: 'jeans',
    gender: 'women',
    price: 1699,
    originalPrice: 2299,
    rating: 4.5,
    reviews: 198,
    colors: ['Black'],
    sizes: ['26', '28', '30', '32', '34'],
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop'
    ],
    description: 'Stylish black skinny jeans for women.',
    features: ['Denim fabric', 'Skinny fit', 'Women\'s design', 'Versatile'],
    inStock: true,
    createdAt: '2024-01-10'
  },
  {
    id: 'w-jeans-2',
    name: 'Black Women\'s Straight Jeans',
    category: 'womens-bottomwear',
    subcategory: 'jeans',
    gender: 'women',
    price: 1499,
    originalPrice: 1999,
    rating: 4.3,
    reviews: 167,
    colors: ['Black'],
    sizes: ['26', '28', '30', '32', '34'],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop'
    ],
    description: 'Comfortable black straight jeans for women.',
    features: ['Denim fabric', 'Straight fit', 'Women\'s design', 'Comfortable'],
    inStock: true,
    createdAt: '2024-01-15'
  },

  // WOMEN'S BOTTOMWEAR - CASUAL TROUSERS
  {
    id: 'w-casual-trousers-1',
    name: 'Black Women\'s Casual Trousers',
    category: 'womens-bottomwear',
    subcategory: 'casual-trousers',
    gender: 'women',
    price: 1299,
    originalPrice: 1799,
    rating: 4.4,
    reviews: 145,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop'
    ],
    description: 'Comfortable black casual trousers for women.',
    features: ['Cotton blend', 'Women\'s fit', 'Casual design', 'Comfortable'],
    inStock: true,
    createdAt: '2024-01-12'
  },

  // WOMEN'S BOTTOMWEAR - FORMAL TROUSERS
  {
    id: 'w-formal-trousers-1',
    name: 'Black Women\'s Formal Trousers',
    category: 'womens-bottomwear',
    subcategory: 'formal-trousers',
    gender: 'women',
    price: 1699,
    originalPrice: 2299,
    rating: 4.6,
    reviews: 178,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop'
    ],
    description: 'Professional black formal trousers for women.',
    features: ['Wool blend', 'Women\'s fit', 'Formal design', 'Professional'],
    inStock: true,
    createdAt: '2024-01-08'
  },

  // WOMEN'S BOTTOMWEAR - SHORTS
  {
    id: 'w-shorts-1',
    name: 'Black Women\'s Shorts',
    category: 'womens-bottomwear',
    subcategory: 'shorts',
    gender: 'women',
    price: 799,
    originalPrice: 1199,
    rating: 4.2,
    reviews: 123,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop'
    ],
    description: 'Comfortable black shorts for women.',
    features: ['Cotton blend', 'Women\'s fit', 'Casual design', 'Summer comfort'],
    inStock: true,
    createdAt: '2024-01-20'
  },

  // WOMEN'S BOTTOMWEAR - TRACK PANTS & JOGGERS
  {
    id: 'w-track-pants-1',
    name: 'Black Women\'s Track Pants',
    category: 'womens-bottomwear',
    subcategory: 'track-pants-joggers',
    gender: 'women',
    price: 1099,
    originalPrice: 1499,
    rating: 4.3,
    reviews: 134,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop'
    ],
    description: 'Comfortable black track pants for women.',
    features: ['Polyester blend', 'Women\'s fit', 'Athletic design', 'Comfortable'],
    inStock: true,
    createdAt: '2024-01-12'
  },
  {
    id: 'w-joggers-1',
    name: 'Black Women\'s Joggers',
    category: 'womens-bottomwear',
    subcategory: 'track-pants-joggers',
    gender: 'women',
    price: 899,
    originalPrice: 1299,
    rating: 4.4,
    reviews: 145,
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop'
    ],
    description: 'Stylish black joggers for women.',
    features: ['Cotton blend', 'Women\'s fit', 'Elastic cuffs', 'Comfortable'],
    inStock: true,
    createdAt: '2024-01-18'
  }
];

// Categories configuration
export const categories = {
  'mens-topwear': {
    name: 'Men\'s Topwear',
    subcategories: {
      't-shirts': 'T-Shirts',
      'casual-shirts': 'Casual Shirts',
      'formal-shirts': 'Formal Shirts',
      'sweatshirts': 'Sweatshirts',
      'sweaters': 'Sweaters',
      'jackets': 'Jackets',
      'blazers-coats': 'Blazers & Coats',
      'suits': 'Suits',
      'rain-jackets': 'Rain Jackets'
    }
  },
  'mens-indian-festive': {
    name: 'Men\'s Indian & Festive Wear',
    subcategories: {
      'kurtas-kurta-sets': 'Kurtas & Kurta Sets',
      'sherwanis': 'Sherwanis',
      'nehru-jackets': 'Nehru Jackets',
      'dhotis': 'Dhotis'
    }
  },
  'mens-bottomwear': {
    name: 'Men\'s Bottomwear',
    subcategories: {
      'jeans': 'Jeans',
      'casual-trousers': 'Casual Trousers',
      'formal-trousers': 'Formal Trousers',
      'shorts': 'Shorts',
      'track-pants-joggers': 'Track Pants & Joggers'
    }
  },
  'womens-topwear': {
    name: 'Women\'s Topwear',
    subcategories: {
      't-shirts': 'T-Shirts',
      'casual-shirts': 'Casual Shirts',
      'formal-shirts': 'Formal Shirts',
      'sweatshirts': 'Sweatshirts',
      'sweaters': 'Sweaters',
      'jackets': 'Jackets',
      'blazers-coats': 'Blazers & Coats',
      'suits': 'Suits',
      'rain-jackets': 'Rain Jackets'
    }
  },
  'womens-indian-festive': {
    name: 'Women\'s Indian & Festive Wear',
    subcategories: {
      'kurtas-kurta-sets': 'Kurtas & Kurta Sets',
      'sarees': 'Sarees',
      'salwar-kameez': 'Salwar Kameez',
      'lehenga-cholis': 'Lehenga Cholis'
    }
  },
  'womens-bottomwear': {
    name: 'Women\'s Bottomwear',
    subcategories: {
      'jeans': 'Jeans',
      'casual-trousers': 'Casual Trousers',
      'formal-trousers': 'Formal Trousers',
      'shorts': 'Shorts',
      'track-pants-joggers': 'Track Pants & Joggers'
    }
  }
};

// Helper functions
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

export const getProductsBySubcategory = (subcategory) => {
  return products.filter(product => product.subcategory === subcategory);
};

export const getProductById = (id) => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.subcategory.toLowerCase().includes(lowercaseQuery)
  );
};

export const getProductsByGender = (gender) => {
  return products.filter(product => product.gender === gender);
};

export const getSimilarProducts = (product, limit = 4) => {
  return products
    .filter(p => 
      p.id !== product.id && 
      (p.category === product.category || p.subcategory === product.subcategory)
    )
    .slice(0, limit);
}; 