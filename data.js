/*
 * Phone price data
 * ----------------
 * Prices are in Kenyan Shillings (KSh) for a Grade A+ unit.
 * Lower grades are calculated with GRADE_FACTORS below.
 *
 *   uk  = ex-UK price
 *   usa = ex-USA price
 *
 * To update prices, edit the numbers below and change LAST_UPDATED.
 * To add a brand, add phones with a new `brand` name. The filters update on their own.
 * NOTE: These are sample prices for demonstration only.
 */

const LAST_UPDATED = "2026-11-16";

const CURRENCY = "KSh";

const WHATSAPP_NUMBER = "254743676970";

const GRADES = {
  "A+": { factor: 1.0,  label: "Like new",   desc: "No visible scratches. Looks and works like a new phone." },
  "A":  { factor: 0.92, label: "Excellent",  desc: "Very light signs of use you only notice up close." },
  "B":  { factor: 0.83, label: "Good",       desc: "Visible light scratches or scuffs. Works perfectly." }
};

const PHONES = [
  // ---------- Apple ----------
  { brand: "iPhone", model: "iPhone 11", prices: {
      "64GB":  { uk: 32000, usa: 33000 },
      "128GB": { uk: 37000, usa: 36000 } } },
  { brand: "iPhone", model: "iPhone 12", prices: {
      "64GB":  { uk: 42500, usa: 43500 },
      "128GB": { uk: 48500, usa: 46500 } } },
  { brand: "iPhone", model: "iPhone 12 Pro", prices: {
      "128GB": { uk: 54000, usa: 56000 },
      "256GB": { uk: 61000, usa: 58500 } } },
  { brand: "iPhone", model: "iPhone 13", prices: {
      "128GB": { uk: 60000, usa: 58000 },
      "256GB": { uk: 64000, usa: 65000 } } },
  { brand: "iPhone", model: "iPhone 13 Pro", prices: {
      "128GB": { uk: 76000, usa: 78000 },
      "256GB": { uk: 84000, usa: 81000 } } },
  { brand: "iPhone", model: "iPhone 13 Pro Max", prices: {
      "128GB": { uk: 88000, usa: 85000 },
      "256GB": { uk: 92500, usa: 94000 } } },
  { brand: "iPhone", model: "iPhone 14", prices: {
      "128GB": { uk: 69500, usa: 72000 },
      "256GB": { uk: 78000, usa: 75000 } } },
  { brand: "iPhone", model: "iPhone 14 Pro", prices: {
      "128GB": { uk: 98000, usa: 94000 },
      "256GB": { uk: 103000, usa: 105000 } } },
  { brand: "iPhone", model: "iPhone 14 Pro Max", prices: {
      "128GB": { uk: 110000, usa: 106000 },
      "256GB": { uk: 115000, usa: 118000 } } },
  { brand: "iPhone", model: "iPhone 15", prices: {
      "128GB": { uk: 89000, usa: 92000 },
      "256GB": { uk: 99000, usa: 96000 } } },
  { brand: "iPhone", model: "iPhone 15 Pro", prices: {
      "128GB": { uk: 125000, usa: 120000 },
      "256GB": { uk: 129000, usa: 134000 } } },
  { brand: "iPhone", model: "iPhone 15 Pro Max", prices: {
      "256GB": { uk: 142000, usa: 145000 },
      "512GB": { uk: 158000, usa: 154000 } } },

  // ---------- Samsung ----------
  { brand: "Samsung", model: "Galaxy S20", prices: {
      "128GB": { uk: 26000, usa: 27500 } } },
  { brand: "Samsung", model: "Galaxy S21", prices: {
      "128GB": { uk: 33500, usa: 36000 },
      "256GB": { uk: 37000, usa: 39500 } } },
  { brand: "Samsung", model: "Galaxy S21 Ultra", prices: {
      "128GB": { uk: 48500, usa: 52000 },
      "256GB": { uk: 56000, usa: 52500 } } },
  { brand: "Samsung", model: "Galaxy Note 20 Ultra", prices: {
      "256GB": { uk: 46000, usa: 50000 } } },
  { brand: "Samsung", model: "Galaxy S22", prices: {
      "128GB": { uk: 42000, usa: 45000 },
      "256GB": { uk: 49000, usa: 46000 } } },
  { brand: "Samsung", model: "Galaxy S22 Ultra", prices: {
      "128GB": { uk: 64000, usa: 68000 },
      "256GB": { uk: 68000, usa: 72000 } } },
  { brand: "Samsung", model: "Galaxy S23", prices: {
      "128GB": { uk: 59000, usa: 62000 },
      "256GB": { uk: 67000, usa: 63500 } } },
  { brand: "Samsung", model: "Galaxy S23 Ultra", prices: {
      "256GB": { uk: 90000, usa: 95000 },
      "512GB": { uk: 104000, usa: 98500 } } },
  { brand: "Samsung", model: "Galaxy Z Flip 4", prices: {
      "128GB": { uk: 46000, usa: 49000 } } },
  { brand: "Samsung", model: "Galaxy Z Fold 4", prices: {
      "256GB": { uk: 98000, usa: 95000 } } },

  // ---------- Google ----------
  { brand: "Pixel", model: "Pixel 6", prices: {
      "128GB": { uk: 28000, usa: 26000 } } },
  { brand: "Pixel", model: "Pixel 6 Pro", prices: {
      "128GB": { uk: 36000, usa: 33500 } } },
  { brand: "Pixel", model: "Pixel 7", prices: {
      "128GB": { uk: 35500, usa: 38000 } } },
  { brand: "Pixel", model: "Pixel 7 Pro", prices: {
      "128GB": { uk: 50000, usa: 47000 },
      "256GB": { uk: 54000, usa: 51000 } } },
  { brand: "Pixel", model: "Pixel 8", prices: {
      "128GB": { uk: 52500, usa: 53000 } } },
  { brand: "Pixel", model: "Pixel 8 Pro", prices: {
      "128GB": { uk: 74000, usa: 70000 } } },

  // ---------- OnePlus ----------
  { brand: "OnePlus", model: "OnePlus 9", prices: {
      "128GB": { uk: 27000, usa: 28500 } } },
  { brand: "OnePlus", model: "OnePlus 9 Pro", prices: {
      "256GB": { uk: 36000, usa: 38000 } } },
  { brand: "OnePlus", model: "OnePlus 10 Pro", prices: {
      "128GB": { uk: 45000, usa: 47500 },
      "256GB": { uk: 50000, usa: 49000 } } },
  { brand: "OnePlus", model: "OnePlus 11", prices: {
      "128GB": { uk: 56000, usa: 58000 },
      "256GB": { uk: 62000, usa: 61000 } } },

  // ---------- Motorola ----------
  { brand: "Motorola", model: "Moto G Stylus 5G", prices: {
      "128GB": { uk: 19500, usa: 18000 } } },
  { brand: "Motorola", model: "Moto G Power", prices: {
      "64GB":  { uk: 15000, usa: 13500 } } },
  { brand: "Motorola", model: "Edge 30 Pro", prices: {
      "256GB": { uk: 34000, usa: 35500 } } },
  { brand: "Motorola", model: "Razr 40 Ultra", prices: {
      "256GB": { uk: 62000, usa: 65000 } } },

  // ---------- Sony ----------
  { brand: "Sony", model: "Xperia 5 III", prices: {
      "128GB": { uk: 30000, usa: 32000 } } },
  { brand: "Sony", model: "Xperia 1 III", prices: {
      "256GB": { uk: 40000, usa: 42500 } } },
  { brand: "Sony", model: "Xperia 1 IV", prices: {
      "256GB": { uk: 55000, usa: 58000 } } },

  // ---------- Huawei ----------
  { brand: "Huawei", model: "P30 Pro", prices: {
      "128GB": { uk: 22000, usa: 24000 },
      "256GB": { uk: 25500, usa: 27000 } } },
  { brand: "Huawei", model: "Mate 20 Pro", prices: {
      "128GB": { uk: 18500, usa: 20000 } } },
  { brand: "Huawei", model: "P40 Pro", prices: {
      "256GB": { uk: 38000, usa: 40500 } } },

  // ---------- Infinix ----------
  { brand: "Infinix", model: "Hot 40 Pro", prices: {
      "256GB": { uk: 16500, usa: 17500 } } },
  { brand: "Infinix", model: "Note 30 Pro", prices: {
      "256GB": { uk: 21000, usa: 20000 } } },
  { brand: "Infinix", model: "Note 40 Pro", prices: {
      "256GB": { uk: 26000, usa: 27000 } } },
  { brand: "Infinix", model: "Zero 30 5G", prices: {
      "256GB": { uk: 28500, usa: 27500 } } },
  { brand: "Infinix", model: "GT 20 Pro", prices: {
      "256GB": { uk: 30000, usa: 31500 } } },
  { brand: "Infinix", model: "Zero Ultra", prices: {
      "256GB": { uk: 33000, usa: 32000 } } }
];
