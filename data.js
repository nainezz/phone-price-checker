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
      "64GB":  { uk: 32000, usa: 32500 },
      "128GB": { uk: 38000, usa: 36000 } } },
  { brand: "iPhone", model: "iPhone 12", prices: {
      "64GB":  { uk: 44000, usa: 42000 },
      "128GB": { uk: 48500, usa: 46500 } } },
  { brand: "iPhone", model: "iPhone 12 Pro", prices: {
      "128GB": { uk: 56000, usa: 54000 },
      "256GB": { uk: 61000, usa: 58500 } } },
  { brand: "iPhone", model: "iPhone 13", prices: {
      "128GB": { uk: 60000, usa: 58000 },
      "256GB": { uk: 65500, usa: 63000 } } },
  { brand: "iPhone", model: "iPhone 13 Pro", prices: {
      "128GB": { uk: 78000, usa: 75000 },
      "256GB": { uk: 84000, usa: 81000 } } },
  { brand: "iPhone", model: "iPhone 13 Pro Max", prices: {
      "128GB": { uk: 88000, usa: 85000 },
      "256GB": { uk: 94000, usa: 90500 } } },
  { brand: "iPhone", model: "iPhone 14", prices: {
      "128GB": { uk: 72000, usa: 69000 },
      "256GB": { uk: 78000, usa: 75000 } } },
  { brand: "iPhone", model: "iPhone 14 Pro", prices: {
      "128GB": { uk: 98000, usa: 94000 },
      "256GB": { uk: 105000, usa: 101000 } } },
  { brand: "iPhone", model: "iPhone 14 Pro Max", prices: {
      "128GB": { uk: 110000, usa: 106000 },
      "256GB": { uk: 118000, usa: 113500 } } },
  { brand: "iPhone", model: "iPhone 15", prices: {
      "128GB": { uk: 92000, usa: 89000 },
      "256GB": { uk: 99000, usa: 96000 } } },
  { brand: "iPhone", model: "iPhone 15 Pro", prices: {
      "128GB": { uk: 125000, usa: 120000 },
      "256GB": { uk: 134000, usa: 129000 } } },

  // ---------- Samsung ----------
  { brand: "Samsung", model: "Galaxy S21", prices: {
      "128GB": { uk: 36000, usa: 33500 },
      "256GB": { uk: 39500, usa: 37000 } } },
  { brand: "Samsung", model: "Galaxy S21 Ultra", prices: {
      "128GB": { uk: 52000, usa: 48500 },
      "256GB": { uk: 56000, usa: 52500 } } },
  { brand: "Samsung", model: "Galaxy Note 20 Ultra", prices: {
      "256GB": { uk: 50000, usa: 46000 } } },
  { brand: "Samsung", model: "Galaxy S22", prices: {
      "128GB": { uk: 45000, usa: 42000 },
      "256GB": { uk: 49000, usa: 46000 } } },
  { brand: "Samsung", model: "Galaxy S22 Ultra", prices: {
      "128GB": { uk: 68000, usa: 64000 },
      "256GB": { uk: 72000, usa: 68000 } } },
  { brand: "Samsung", model: "Galaxy S23", prices: {
      "128GB": { uk: 62000, usa: 59000 },
      "256GB": { uk: 67000, usa: 63500 } } },
  { brand: "Samsung", model: "Galaxy S23 Ultra", prices: {
      "256GB": { uk: 95000, usa: 90000 },
      "512GB": { uk: 104000, usa: 98500 } } },

  // ---------- Google ----------
  { brand: "Pixel", model: "Pixel 6", prices: {
      "128GB": { uk: 28000, usa: 26000 } } },
  { brand: "Pixel", model: "Pixel 6 Pro", prices: {
      "128GB": { uk: 36000, usa: 33500 } } },
  { brand: "Pixel", model: "Pixel 7", prices: {
      "128GB": { uk: 38000, usa: 35500 } } },
  { brand: "Pixel", model: "Pixel 7 Pro", prices: {
      "128GB": { uk: 50000, usa: 47000 },
      "256GB": { uk: 54000, usa: 51000 } } },
  { brand: "Pixel", model: "Pixel 8", prices: {
      "128GB": { uk: 52500, usa: 53000 } } },
  { brand: "Pixel", model: "Pixel 8 Pro", prices: {
      "128GB": { uk: 74000, usa: 70000 } } }
];
