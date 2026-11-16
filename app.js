/* Phone Price Checker — app logic (vanilla JS, no build step) */

(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const money = (n) => `${CURRENCY} ${Math.round(n).toLocaleString("en-KE")}`;

  // Round to the nearest 500 so grade prices look like real shop prices
  const round500 = (n) => Math.round(n / 500) * 500;

  /** Price for a phone/storage/grade/origin */
  function priceFor(phone, storage, grade, origin) {
    const base = phone.prices[storage][origin];
    return grade === "A+" ? base : round500(base * GRADES[grade].factor);
  }

  /** Flatten data into one row per model + storage */
  const ROWS = PHONES.flatMap((p) =>
    Object.keys(p.prices).map((storage) => ({
      phone: p,
      brand: p.brand,
      model: p.model,
      storage,
      uk: p.prices[storage].uk,
      usa: p.prices[storage].usa,
    }))
  );

  const storageNum = (s) => parseInt(s, 10);
  const brands = [...new Set(PHONES.map((p) => p.brand))];

  // ---------------------------------------------------------------- state
  const state = {
    brand: brands[0],
    model: null,
    storage: null,
    grade: "A+",
    tableBrand: "All",
    sortKey: "model",
    sortAsc: true,
    search: "",
  };

  // ---------------------------------------------------------------- compare
  function fillSelect(el, options, selected) {
    el.innerHTML = options.map((o) => `<option ${o === selected ? "selected" : ""}>${o}</option>`).join("");
  }

  function currentPhone() {
    return PHONES.find((p) => p.model === state.model);
  }

  function syncSelects() {
    fillSelect($("brand"), brands, state.brand);

    const models = PHONES.filter((p) => p.brand === state.brand).map((p) => p.model);
    if (!models.includes(state.model)) state.model = models[0];
    fillSelect($("model"), models, state.model);

    const storages = Object.keys(currentPhone().prices);
    if (!storages.includes(state.storage)) state.storage = storages[0];
    fillSelect($("storage"), storages, state.storage);

    $("grade").querySelectorAll("button").forEach((b) => {
      const on = b.dataset.g === state.grade;
      b.classList.toggle("on", on);
      b.setAttribute("aria-checked", on);
    });
  }

  function renderCompare() {
    syncSelects();
    const phone = currentPhone();
    const uk = priceFor(phone, state.storage, state.grade, "uk");
    const usa = priceFor(phone, state.storage, state.grade, "usa");
    const diff = Math.abs(uk - usa);

    $("priceUK").textContent = money(uk);
    $("priceUSA").textContent = money(usa);
    $("cardUK").classList.toggle("best", uk < usa);
    $("cardUSA").classList.toggle("best", usa < uk);
    $("tagUK").textContent = uk < usa ? `✓ Cheaper by ${money(diff)}` : "";
    $("tagUSA").textContent = usa < uk ? `✓ Cheaper by ${money(diff)}` : "";

    const name = `${phone.model} ${state.storage}`;
    const grade = `Grade ${state.grade} (${GRADES[state.grade].label.toLowerCase()})`;
    let text;
    if (diff === 0) {
      text = `The <b>${name}</b> costs the same ex-UK and ex-USA in ${grade}.`;
    } else {
      const winner = usa < uk ? "ex-USA" : "ex-UK";
      const pct = ((diff / Math.max(uk, usa)) * 100).toFixed(1);
      text = `For the <b>${name}</b> in ${grade}, <b>${winner}</b> saves you <b>${money(diff)}</b> (${pct}%).`;
    }
    $("summary").innerHTML = text;

    const best = Math.min(uk, usa);
    const msg = `Hi Nainezz, is the ${name} (Grade ${state.grade}) available? I saw it on your price checker for around ${money(best)}.`;
    $("askBtn").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  function loadIntoCompare(model, storage) {
    const phone = PHONES.find((p) => p.model === model);
    state.brand = phone.brand;
    state.model = model;
    state.storage = storage;
    renderCompare();
    $("compare").scrollIntoView({ behavior: "smooth" });
  }

  // ---------------------------------------------------------------- budget
  function renderBudget() {
    const budget = Number($("budgetRange").value);
    const bestOnly = $("budgetBestOnly").checked;
    $("budgetVal").textContent = money(budget);

    // Every model/storage/grade/origin combo within budget
    let options = [];
    ROWS.forEach((r) => {
      Object.keys(GRADES).forEach((g) => {
        ["uk", "usa"].forEach((o) => {
          const price = priceFor(r.phone, r.storage, g, o);
          if (price <= budget) options.push({ ...r, grade: g, origin: o, price });
        });
      });
    });

    if (bestOnly) {
      // Keep the "best" option per model: highest storage, then best grade, then cheapest
      const gradeRank = { "A+": 3, A: 2, B: 1 };
      const byModel = {};
      options.forEach((o) => {
        const cur = byModel[o.model];
        const better =
          !cur ||
          storageNum(o.storage) > storageNum(cur.storage) ||
          (storageNum(o.storage) === storageNum(cur.storage) &&
            (gradeRank[o.grade] > gradeRank[cur.grade] ||
              (gradeRank[o.grade] === gradeRank[cur.grade] && o.price < cur.price)));
        if (better) byModel[o.model] = o;
      });
      options = Object.values(byModel);
    }

    options.sort((a, b) => b.price - a.price);

    $("budgetCount").textContent = options.length
      ? `${options.length} option${options.length === 1 ? "" : "s"} within your budget`
      : "Nothing in this range yet — try a higher budget.";

    $("budgetList").innerHTML = options
      .map(
        (o) => `
      <button class="b-item" data-model="${o.model}" data-storage="${o.storage}" data-grade="${o.grade}">
        <b>${o.model}</b>
        <span>${o.storage} · Grade ${o.grade} · ${o.origin === "uk" ? "🇬🇧 ex-UK" : "🇺🇸 ex-USA"}</span>
        <span class="b-price">${money(o.price)}</span>
      </button>`
      )
      .join("");
  }

  // ---------------------------------------------------------------- table
  function renderTable() {
    const q = state.search.trim().toLowerCase();
    let rows = ROWS.filter(
      (r) =>
        (state.tableBrand === "All" || r.brand === state.tableBrand) &&
        (!q || `${r.model} ${r.storage}`.toLowerCase().includes(q))
    );

    const val = (r) => {
      switch (state.sortKey) {
        case "storage": return storageNum(r.storage);
        case "uk": return r.uk;
        case "usa": return r.usa;
        case "diff": return r.uk - r.usa;
        default: return null;
      }
    };
    rows.sort((a, b) => {
      let cmp;
      if (state.sortKey === "model") {
        // Keep original catalog order (brand, then release), then storage
        cmp = ROWS.indexOf(a) - ROWS.indexOf(b);
      } else {
        cmp = val(a) - val(b);
      }
      return state.sortAsc ? cmp : -cmp;
    });

    $("tableBody").innerHTML = rows
      .map((r) => {
        const d = r.uk - r.usa;
        const cheaper = d > 0 ? "usa" : d < 0 ? "uk" : "";
        const label = d === 0 ? "Same" : `${d > 0 ? "USA" : "UK"} −${money(Math.abs(d))}`;
        return `
        <tr data-model="${r.model}" data-storage="${r.storage}">
          <td>${r.model}</td>
          <td>${r.storage}</td>
          <td class="num ${cheaper === "uk" ? "cheaper" : ""}">${money(r.uk)}</td>
          <td class="num ${cheaper === "usa" ? "cheaper" : ""}">${money(r.usa)}</td>
          <td class="num diff">${label}</td>
        </tr>`;
      })
      .join("");

    $("emptyMsg").hidden = rows.length > 0;

    document.querySelectorAll("th[data-sort]").forEach((th) => {
      const on = th.dataset.sort === state.sortKey;
      th.classList.toggle("sorted", on);
      th.classList.toggle("asc", on && state.sortAsc);
    });
  }

  // ---------------------------------------------------------------- grades
  function renderGrades() {
    $("gradeGrid").innerHTML = Object.entries(GRADES)
      .map(
        ([g, info]) => `
      <div class="grade-card">
        <div class="g">${g}</div>
        <h3>${info.label}</h3>
        <p>${info.desc}</p>
        <small>${info.factor === 1 ? "Full price" : `About ${Math.round((1 - info.factor) * 100)}% cheaper than A+`}</small>
      </div>`
      )
      .join("");
  }

  // ---------------------------------------------------------------- init
  function init() {
    // Grade buttons
    $("grade").innerHTML = Object.keys(GRADES)
      .map((g) => `<button type="button" role="radio" data-g="${g}">${g}</button>`)
      .join("");
    $("grade").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      state.grade = b.dataset.g;
      renderCompare();
    });

    $("brand").addEventListener("change", (e) => { state.brand = e.target.value; state.model = null; renderCompare(); });
    $("model").addEventListener("change", (e) => { state.model = e.target.value; renderCompare(); });
    $("storage").addEventListener("change", (e) => { state.storage = e.target.value; renderCompare(); });

    // Budget
    $("budgetRange").addEventListener("input", renderBudget);
    $("budgetBestOnly").addEventListener("change", renderBudget);
    $("budgetList").addEventListener("click", (e) => {
      const b = e.target.closest(".b-item");
      if (!b) return;
      state.grade = b.dataset.grade;
      loadIntoCompare(b.dataset.model, b.dataset.storage);
    });

    // Table
    $("brandFilter").innerHTML = ["All", ...brands]
      .map((b) => `<button type="button" data-b="${b}" class="${b === "All" ? "on" : ""}">${b}</button>`)
      .join("");
    $("brandFilter").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      state.tableBrand = b.dataset.b;
      $("brandFilter").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
      renderTable();
    });
    $("search").addEventListener("input", (e) => { state.search = e.target.value; renderTable(); });
    document.querySelectorAll("th[data-sort]").forEach((th) =>
      th.addEventListener("click", () => {
        const key = th.dataset.sort;
        state.sortAsc = state.sortKey === key ? !state.sortAsc : key === "model";
        state.sortKey = key;
        renderTable();
      })
    );
    $("tableBody").addEventListener("click", (e) => {
      const tr = e.target.closest("tr");
      if (tr) loadIntoCompare(tr.dataset.model, tr.dataset.storage);
    });

    $("updated").textContent = new Date(LAST_UPDATED).toLocaleDateString("en-KE", {
      day: "numeric", month: "long", year: "numeric",
    });

    // Default selection: a popular phone
    state.brand = "iPhone";
    state.model = "iPhone 13";
    state.storage = "128GB";

    renderCompare();
    renderBudget();
    renderTable();
    renderGrades();
  }

  init();
})();
