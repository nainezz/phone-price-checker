# 📱 Phone Price Checker

Compare **ex-UK** and **ex-USA** smartphone prices in Kenya by model, storage and grade, across 8 brands: iPhone, Samsung, Google Pixel, OnePlus, Motorola, Sony, Huawei and Infinix.

**🔗 Live demo:** https://nainezz.github.io/phone-price-checker/

Buyers in Kenya often choose between phones imported from the UK and from the USA, in different cosmetic grades. This app puts the prices side by side so you can see straight away which option is cheaper and by how much.

## Features

- **Side-by-side compare.** Pick a brand, model, storage and grade to see ex-UK vs ex-USA prices. The cheaper option is highlighted along with the saving.
- **Budget finder.** Slide to your budget and see every phone you can afford, with both ex-UK and ex-USA prices. The cheaper one is highlighted and any over budget is crossed out.
- **Full price table.** Search, filter by brand and sort by any column. Click a row to load it into the comparer.
- **Grade guide.** A short explanation of what Grade A+, A and B mean.
- **WhatsApp enquiry.** One tap sends a pre-filled message about the selected phone.
- **Mobile first.** Works on phones, tablets and desktop.
- **No dependencies.** Plain HTML, CSS and JavaScript, with no build step and no framework.

## Tech stack

| Part | Choice |
|---|---|
| Markup | HTML5 |
| Styling | CSS (custom properties, grid, flexbox) |
| Logic | Vanilla JavaScript (ES6+) |
| Hosting | GitHub Pages |

## Project structure

```
phone-price-checker/
├── index.html   # Page layout
├── style.css    # Styles (dark theme)
├── app.js       # Compare, budget finder and table logic
├── data.js      # Phone prices: edit this to update prices
└── README.md
```

## Running locally

No install needed. Clone the repo and open `index.html` in your browser:

```bash
git clone https://github.com/nainezz/phone-price-checker.git
cd phone-price-checker
# then open index.html, or serve it:
python3 -m http.server 8000
```

## Updating prices

All prices live in **`data.js`**. Each entry holds the **Grade A+** price for ex-UK and ex-USA:

```js
{ brand: "iPhone", model: "iPhone 13", prices: {
    "128GB": { uk: 60000, usa: 58000 },
    "256GB": { uk: 65500, usa: 63000 } } },
```

Grade A and B prices are worked out from `GRADES` (A = 92%, B = 83% of A+, rounded to the nearest KSh 500). After editing, change `LAST_UPDATED` to today's date.

## How it works

1. `data.js` stores one A+ price per model, storage and origin.
2. `priceFor()` applies the grade factor to get the A and B prices.
3. The comparer, budget finder and table all read from the same data, so one edit updates the whole app.
4. The budget finder checks every model, storage, grade and origin combination against your budget. With "best option per model" on, it keeps the highest storage, then the best grade, then the lowest price.

## Disclaimer

The prices in this repo are **sample data for demonstration**. Real prices change often, so always confirm with the seller.

## Author

**Nainezz**, a software engineer in Nairobi, Kenya
GitHub: [@nainezz](https://github.com/nainezz) · Instagram: [@nainezz17](https://instagram.com/nainezz17)

## License

[MIT](LICENSE)
