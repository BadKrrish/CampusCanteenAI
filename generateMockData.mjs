import fs from 'fs';

const categories = [
  { id: 'c1', name: 'Meals', sortOrder: 1 },
  { id: 'c2', name: 'Snacks', sortOrder: 2 },
  { id: 'c3', name: 'Beverages', sortOrder: 3 },
  { id: 'c4', name: 'Desserts', sortOrder: 4 },
  { id: 'c5', name: 'Healthy', sortOrder: 5 },
];

const menuNames = {
  c1: ['Classic Veg Thali', 'Paneer Butter Masala Combo', 'Dal Makhani Rice', 'Chole Bhature', 'Rajma Chawal', 'Veg Biryani', 'Aloo Paratha Plate', 'Palak Paneer Combo', 'Puri Bhaji', 'Kadhi Pakora Rice', 'Mushroom Masala Combo', 'Veg Fried Rice', 'Hakka Noodles', 'Mix Veg Curry', 'Jeera Rice & Dal Fry', 'Mattar Paneer Thali', 'Malai Kofta Combo', 'Veg Pulao', 'Khichdi', 'Navratan Korma Combo'],
  c2: ['Aloo Samosa (2 pcs)', 'French Fries', 'Cheese Grilled Sandwich', 'Veg Puff', 'Vada Pav', 'Pav Bhaji', 'Pani Puri (6 pcs)', 'Bhel Puri', 'Sev Puri', 'Dahi Vada', 'Veg Spring Rolls', 'Paneer Tikka Wrap', 'Aloo Tikki Burger', 'Cheese Corn Balls', 'Nachos with Salsa', 'Masala Peanuts', 'Onion Pakora', 'Veg Cutlet', 'Cheese Garlic Bread', 'Bread Pakora'],
  c3: ['Cold Coffee', 'Fresh Mango Smoothie', 'Masala Chai', 'Filter Coffee', 'Lemon Iced Tea', 'Sweet Lassi', 'Salted Buttermilk', 'Virgin Mojito', 'Fresh Lime Soda', 'Watermelon Juice', 'Orange Juice', 'Pineapple Juice', 'Mosambi Juice', 'Oreo Shake', 'KitKat Shake', 'Strawberry Shake', 'Chocolate Milkshake', 'Badam Milk', 'Green Tea', 'Hot Chocolate'],
  c4: ['Chocolate Brownie', 'Gulab Jamun (2 pcs)', 'Rasgulla (2 pcs)', 'Rasmalai (2 pcs)', 'Gajar Ka Halwa', 'Moong Dal Halwa', 'Vanilla Ice Cream', 'Chocolate Ice Cream', 'Strawberry Ice Cream', 'Butterscotch Ice Cream', 'Fruit Salad', 'Fruit Custard', 'Kaju Katli (4 pcs)', 'Jalebi (100g)', 'Rabri', 'Falooda', 'Chocolate Lava Cake', 'Red Velvet Pastry', 'Black Forest Pastry', 'Pineapple Pastry'],
  c5: ['Oats & Fruit Bowl', 'Sprout Salad', 'Quinoa Salad', 'Roasted Makhana', 'Fruit Bowl', 'Avocado Toast', 'Tofu Salad', 'Boiled Peanut Salad', 'Multigrain Sandwich', 'Ragi Dosa', 'Oats Idli', 'Mixed Nut Trail Mix', 'Cucumber Carrot Sticks', 'Protein Bar', 'Soy Milk', 'Almond Milk', 'Chia Seed Pudding', 'Baked Sweet Potato', 'Roasted Chana', 'Green Smoothie']
};

let menuItems = [];
let idCounter = 1;

categories.forEach(cat => {
  const names = menuNames[cat.id];
  for (let i = 0; i < 20; i++) {
    // If we run out of unique names, append a number
    const name = names[i] || `${cat.name} Item ${i + 1}`;
    
    menuItems.push({
      id: `m${idCounter++}`,
      name: name,
      description: `Delicious vegetarian ${name.toLowerCase()} prepared fresh.`,
      price: Math.floor(Math.random() * 150) + 30, // Random price between 30 and 180
      categoryId: cat.id,
      isVegetarian: true,
      isAvailable: Math.random() > 0.1, // 10% chance of being out of stock
      prepTimeMinutes: Math.floor(Math.random() * 15) + 5, // 5 to 20 mins
    });
  }
});

const slots = [
  { id: 's1', startTime: '12:00', endTime: '12:15', maxCapacity: 20, currentWorkload: 18, isActive: true },
  { id: 's2', startTime: '12:15', endTime: '12:30', maxCapacity: 20, currentWorkload: 5, isActive: true },
  { id: 's3', startTime: '12:30', endTime: '12:45', maxCapacity: 20, currentWorkload: 20, isActive: true },
  { id: 's4', startTime: '12:45', endTime: '13:00', maxCapacity: 20, currentWorkload: 2, isActive: true },
  { id: 's5', startTime: '13:00', endTime: '13:15', maxCapacity: 20, currentWorkload: 0, isActive: true },
];

const orders = [
  {
    id: 'ORD-1023',
    userId: 'user1',
    items: [
      { menuItem: menuItems[0], quantity: 2 },
      { menuItem: menuItems[25], quantity: 1 }
    ],
    subtotal: (menuItems[0].price * 2) + menuItems[25].price,
    total: (menuItems[0].price * 2) + menuItems[25].price,
    status: 'Pending Payment',
    pickupSlotId: 's1',
    paymentStatus: 'Pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'ORD-1024',
    userId: 'user2',
    items: [
      { menuItem: menuItems[42], quantity: 1 },
      { menuItem: menuItems[65], quantity: 2 }
    ],
    subtotal: menuItems[42].price + (menuItems[65].price * 2),
    total: menuItems[42].price + (menuItems[65].price * 2),
    status: 'Confirmed',
    pickupSlotId: 's1',
    paymentStatus: 'Successful',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    queuePosition: 1,
    estimatedReadyTime: '12:05'
  },
  {
    id: 'ORD-1025',
    userId: 'user3',
    items: [
      { menuItem: menuItems[10], quantity: 1 }
    ],
    subtotal: menuItems[10].price,
    total: menuItems[10].price,
    status: 'Preparing',
    pickupSlotId: 's2',
    paymentStatus: 'Successful',
    createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    queuePosition: 2,
    estimatedReadyTime: '12:20'
  }
];

const fileContent = `import { MenuCategory, MenuItem, PickupSlot, Order } from '../types';

export const MOCK_CATEGORIES: MenuCategory[] = ${JSON.stringify(categories, null, 2)};

export const MOCK_MENU: MenuItem[] = ${JSON.stringify(menuItems, null, 2)};

export const MOCK_SLOTS: PickupSlot[] = ${JSON.stringify(slots, null, 2)};

export const MOCK_ORDERS: Order[] = ${JSON.stringify(orders, null, 2)};
`;

fs.writeFileSync('src/data/mockData.ts', fileContent);
console.log('Mock data generated successfully!');
