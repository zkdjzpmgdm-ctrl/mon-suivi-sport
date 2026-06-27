import { useState } from "react";

const FAVORITES = [
  "Blanc de poulet", "Escalope de dinde", "Steak haché 5 %", "Saumon", "Thon au naturel",
  "Œufs", "Jambon blanc supérieur", "Fromage blanc 0%", "Yaourt grec", "Lait d'amande",
  "Lait demi-écrémé", "Riz basmati", "Pommes de terre", "Flocons d'avoine", "Galettes de riz",
  "Bananes", "Courgettes", "Haricots verts", "Carottes", "Concombres",
  "Huile d'olive vierge extra", "Purée d'amandes", "Noix de cajou", "Feta",
  "Whey isolate", "Créatine", "Compotes sans sucres ajoutés"
];

const CATALOG = {
  "🥩 Protéines": {
    "Viandes": [
      "Blanc de poulet", "Escalope de dinde", "Steak haché 5 %", "Bœuf à griller",
      "Rôti de bœuf froid", "Filet mignon de porc", "Veau", "Jambon blanc supérieur",
      "Bresaola", "Viande des Grisons"
    ],
    "Poissons & fruits de mer": [
      "Saumon", "Saumon fumé", "Truite", "Cabillaud", "Colin", "Merlu", "Lieu noir",
      "Thon au naturel", "Maquereau", "Sardines", "Crevettes"
    ],
    "Œufs": ["Œufs", "Œufs durs", "Blancs d'œufs liquides"],
    "Alternatives": ["Tofu ferme"],
  },
  "🍚 Féculents": {
    "Bases": [
      "Riz basmati", "Riz complet", "Riz micro-ondes", "Semoule fine",
      "Pâtes", "Gnocchis", "Quinoa"
    ],
    "Pommes de terre": [
      "Pommes de terre", "Pommes de terre grenaille", "Pommes de terre vapeur",
      "Pommes de terre surgelées", "Patates douces"
    ],
    "Boulangerie": ["Pain au levain", "Pain de campagne"],
    "Wraps": ["Tortillas de blé", "Tortillas complètes"],
    "Petit-déjeuner": ["Flocons d'avoine"],
    "Collations": ["Galettes de riz", "Crackers type Wasa"],
  },
  "🥒 Légumes": {
    "Très digestes": ["Concombres", "Courgettes", "Carottes", "Épinards", "Haricots verts"],
    "À alterner": [
      "Salade verte", "Mâche", "Roquette", "Tomates", "Aubergines",
      "Champignons de Paris", "Betteraves cuites", "Fenouil", "Poivrons grillés"
    ],
  },
  "🍉 Fruits": {
    "Quotidien": ["Bananes", "Compotes sans sucres ajoutés"],
    "Été": ["Pastèque", "Melon", "Pêches", "Nectarines", "Raisins"],
    "Toute l'année": ["Pommes", "Poires", "Oranges", "Clémentines", "Mandarines", "Kiwi", "Myrtilles"],
  },
  "🧊 Surgelés": {
    "Fruits": ["Fruits rouges", "Fraises", "Myrtilles", "Mangue", "Ananas", "Billes de melon"],
    "Légumes": [
      "Épinards", "Haricots verts", "Ratatouille", "Mélange de légumes grillés",
      "Poêlée de légumes", "Brocolis", "Courgettes", "Champignons émincés"
    ],
    "Protéines": ["Filets de saumon", "Filets de cabillaud", "Crevettes décortiquées"],
  },
  "🧀 Produits frais": {
    "Fromages": ["Feta", "Emmental", "Comté", "Parmesan", "Mozzarella", "Burrata", "Ricotta"],
    "Laitiers": [
      "Fromage blanc 0%", "Yaourt grec", "Lait demi-écrémé", "Lait d'amande",
      "Skyr sans lactose", "Yaourt grec sans lactose", "Cottage cheese sans lactose",
      "Yaourts végétaux nature"
    ],
  },
  "🥜 Matières grasses": {
    "Huiles & purées": ["Huile d'olive vierge extra", "Purée d'amandes", "Beurre de cacahuète 100 %"],
    "Fruits à coque": ["Amandes", "Noix", "Noix de cajou", "Pistaches", "Noisettes"],
    "Divers": ["Avocats", "Olives vertes", "Olives noires"],
  },
  "🫙 Condiments & épices": {
    "Condiments": [
      "Moutarde", "Sauce soja légère", "Pesto vert", "Coulis de tomate",
      "Sauce tomate nature", "Concentré de tomate", "Vinaigre balsamique blanc",
      "Vinaigre de cidre", "Vinaigre de riz", "Citrons", "Citrons verts",
      "Miel", "Sirop d'érable"
    ],
    "Épices": [
      "Paprika fumé", "Curry doux", "Curcuma", "Cumin", "Cannelle",
      "Muscade", "Gingembre moulu", "Piment d'Espelette", "Ail semoule",
      "Oignon semoule", "Poivre noir"
    ],
    "Herbes sèches": ["Herbes de Provence", "Origan", "Thym", "Romarin"],
    "Mélanges": ["Mélange italien", "Mélange cajun", "Ras-el-hanout"],
    "Petits plus": [
      "Cornichons", "Câpres", "Tomates séchées", "Pignons de pin",
      "Graines de courge", "Ail frais", "Oignons rouges", "Échalotes"
    ],
  },
  "🌿 Herbes fraîches": {
    "Herbes": ["Basilic", "Menthe", "Persil plat", "Ciboulette", "Aneth", "Coriandre", "Estragon"],
  },
  "⚡ Dépannage": {
    "Rapide": [
      "Thon au naturel", "Sardines", "Maquereau", "Blanc de poulet déjà cuit",
      "Riz micro-ondes", "Pommes de terre vapeur", "Gnocchis",
      "Légumes vapeur micro-ondes", "Ratatouille surgelée", "Soupe de légumes de qualité"
    ],
  },
  "🥣 Petit-déj & divers": {
    "Petit-déjeuner": ["Flocons d'avoine", "Lait d'amande", "Purée d'amandes", "Bananes"],
    "Pour varier": ["Cacao non sucré", "Cannelle", "Vanille liquide", "Noix de coco râpée", "Pépites de chocolat noir"],
    "Desserts": ["Gélatine", "Agar-agar"],
    "Épicerie": ["Farine", "Maïzena", "Levure chimique"],
  },
  "🍫 Plaisirs": {
    "Glaces": ["Sorbet citron", "Sorbet mangue", "Sorbet framboise", "Glaces à l'eau"],
    "Gourmandises": ["Chocolat noir 85 %", "Pop-corn nature"],
    "Occasionnel": ["Mochis glacés", "Yaourt glacé"],
  },
  "🥤 Boissons": {
    "Quotidien": ["Eau plate", "Eau gazeuse"],
    "Thé & infusions": ["Thé vert", "Thé noir", "Rooibos", "Infusions"],
    "Autres": ["Jus de citron", "Jus de citron vert", "Électrolytes peu sucrés"],
  },
  "💊 Compléments": {
    "Compléments": ["Whey isolate", "Créatine", "Collagène", "Glutamine"],
  },
};

const STORAGE_KEY = "shopping_list_v1";

function useStorage(key, def) {
  const [val, setVal] = useState(() => {
    try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : def; } catch { return def; }
  });
  const save = (v) => {
    setVal(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  };
  return [val, save];
}

export default function ShoppingTab() {
  const [checked, setChecked] = useStorage(STORAGE_KEY, {});
  const [customItems, setCustomItems] = useStorage("shopping_custom_v1", []);
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState("");
  const [showCart, setShowCart] = useState(false);

  const toBuy = [
    ...Object.keys(checked).filter(k => checked[k] && !customItems.includes(k)),
    ...customItems.filter(k => checked[k])
  ];

  function toggle(item) {
    setChecked({ ...checked, [item]: !checked[item] });
  }

  function addCustom() {
    if (!newItem.trim()) return;
    const item = newItem.trim();
    if (!customItems.includes(item)) {
      setCustomItems([...customItems, item]);
    }
    setChecked({ ...checked, [item]: true });
    setNewItem("");
  }

  function removeCustom(item) {
    setCustomItems(customItems.filter(i => i !== item));
    const c = { ...checked };
    delete c[item];
    setChecked(c);
  }

  function clearCart() {
    const c = { ...checked };
    toBuy.forEach(k => { c[k] = false; });
    setChecked(c);
  }

  const allItems = [
    ...Object.values(CATALOG).flatMap(cat => Object.values(cat).flat()),
    ...customItems
  ];

  const searchResults = search.length > 1
    ? allItems.filter(i => i.toLowerCase().includes(search.toLowerCase()))
    : [];

  const C = {
    page: { fontFamily: "-apple-system,'Helvetica Neue',Helvetica,Arial,sans-serif", background: "#f4f4f6", minHeight: "100vh", paddingBottom: 20 },
    section: { padding: "14px 14px 0" },
    sectionLabel: { fontSize: 11, fontWeight: 700, color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, paddingLeft: 2 },
    card: { background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
    cartBanner: { background: "#1a6b3c", borderRadius: 12, padding: "14px 16px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" },
    cartCount: { fontSize: 14, fontWeight: 800, color: "#fff" },
    cartSub: { fontSize: 11, color: "rgba(255,255,255,0.7)" },
    searchInput: { width: "100%", border: "1.5px solid #e0e0e0", borderRadius: 10, padding: "10px 14px", fontSize: 14, outline: "none", color: "#1a1a2e", boxSizing: "border-box", marginBottom: 10 },
    favItem: { display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #f5f5f5" },
    itemCheck: (checked) => ({
      width: 22, height: 22, borderRadius: 6, border: checked ? "none" : "2px solid #ddd",
      background: checked ? "#1a6b3c" : "transparent", display: "flex", alignItems: "center",
      justifyContent: "center", cursor: "pointer", flexShrink: 0, fontSize: 12, color: "#fff"
    }),
    itemName: (checked) => ({ fontSize: 13, color: checked ? "#888" : "#1a1a2e", fontWeight: checked ? 400 : 500, textDecoration: checked ? "line-through" : "none", flex: 1 }),
    catBtn: (active) => ({
      background: active ? "#1a1a2e" : "#fff", border: active ? "none" : "1.5px solid #e8e8e8",
      borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 700,
      color: active ? "#fff" : "#555", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0
    }),
    subLabel: { fontSize: 11, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: 0.5, margin: "12px 0 6px" },
    addRow: { display: "flex", gap: 8, marginTop: 8 },
    addInput: { flex: 1, border: "1.5px solid #e0e0e0", borderRadius: 10, padding: "10px 12px", fontSize: 13, outline: "none" },
    addBtn: { background: "#1a1a2e", border: "none", borderRadius: 10, padding: "0 16px", color: "#fff", fontSize: 18, cursor: "pointer", fontWeight: 700 },
    clearBtn: { background: "transparent", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 8, padding: "6px 12px", color: "#fff", fontSize: 11, cursor: "pointer", fontWeight: 700 },
  };

  if (showCart) {
    const grouped = {};
    toBuy.forEach(item => {
      let found = "✏️ Ajouts personnels";
      if (customItems.includes(item)) { found = "✏️ Ajouts personnels"; }
      else {
        for (const [cat, subs] of Object.entries(CATALOG)) {
          for (const items of Object.values(subs)) {
            if (items.includes(item)) { found = cat; break; }
          }
          if (found !== "✏️ Ajouts personnels") break;
        }
      }
      if (!grouped[found]) grouped[found] = [];
      grouped[found].push(item);
    });

    return (
      <div style={C.page}>
        <div style={{ background: "#1a6b3c", padding: "20px 16px 16px" }}>
          <button style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 20, padding: "6px 14px", color: "#fff", fontSize: 13, cursor: "pointer", marginBottom: 10, fontWeight: 600 }} onClick={() => setShowCart(false)}>← Retour</button>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>🛒 Liste de courses</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{toBuy.length} article{toBuy.length > 1 ? "s" : ""}</div>
        </div>
        <div style={C.section}>
          {toBuy.length === 0 && <div style={{ textAlign: "center", color: "#aaa", padding: "40px 0", fontSize: 14 }}>Aucun article sélectionné</div>}
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} style={C.card}>
              <div style={C.subLabel}>{cat}</div>
              {items.map(item => (
                <div key={item} style={C.favItem}>
                  <div style={C.itemCheck(false)} onClick={() => { toggle(item); if (toBuy.length <= 1) setShowCart(false); }}>✓</div>
                  <span style={{ fontSize: 13, color: "#1a1a2e", fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
          {toBuy.length > 0 && (
            <button style={{ width: "100%", background: "#c0392b", border: "none", borderRadius: 12, padding: "14px", fontSize: 13, color: "#fff", cursor: "pointer", fontWeight: 700, marginTop: 8 }} onClick={() => { clearCart(); setShowCart(false); }}>
              🗑️ Vider la liste
            </button>
          )}
          <div style={{ height: 32 }} />
        </div>
      </div>
    );
  }

  return (
    <div style={C.page}>
      <div style={C.section}>

        {/* CART BANNER */}
        <div style={C.cartBanner} onClick={() => setShowCart(true)}>
          <div>
            <div style={C.cartCount}>🛒 {toBuy.length} article{toBuy.length !== 1 ? "s" : ""} à acheter</div>
            <div style={C.cartSub}>Appuie pour voir la liste</div>
          </div>
          {toBuy.length > 0 && <button style={C.clearBtn} onClick={(e) => { e.stopPropagation(); clearCart(); }}>Vider</button>}
        </div>

        {/* SEARCH */}
        <input
          style={C.searchInput}
          placeholder="🔍 Rechercher dans le catalogue..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {search.length > 1 && (
          <div style={C.card}>
            <div style={C.sectionLabel}>Résultats ({searchResults.length})</div>
            {searchResults.length === 0 && <div style={{ fontSize: 13, color: "#aaa", fontStyle: "italic" }}>Aucun résultat</div>}
            {searchResults.map(item => (
              <div key={item} style={C.favItem}>
                <div style={C.itemCheck(!!checked[item])} onClick={() => toggle(item)}>{checked[item] ? "✓" : ""}</div>
                <span style={C.itemName(!!checked[item])}>{item}</span>
              </div>
            ))}
          </div>
        )}

        {!search && (
          <>
            {/* FAVORIS */}
            <div style={C.sectionLabel}>⭐ Indispensables</div>
            <div style={C.card}>
              {FAVORITES.map(item => (
                <div key={item} style={C.favItem}>
                  <div style={C.itemCheck(!!checked[item])} onClick={() => toggle(item)}>{checked[item] ? "✓" : ""}</div>
                  <span style={C.itemName(!!checked[item])}>{item}</span>
                </div>
              ))}
            </div>

            {/* CUSTOM ITEMS */}
            {customItems.length > 0 && (
              <>
                <div style={C.sectionLabel}>✏️ Mes ajouts</div>
                <div style={C.card}>
                  {customItems.map(item => (
                    <div key={item} style={C.favItem}>
                      <div style={C.itemCheck(!!checked[item])} onClick={() => toggle(item)}>{checked[item] ? "✓" : ""}</div>
                      <span style={C.itemName(!!checked[item])}>{item}</span>
                      <button style={{ background: "none", border: "none", color: "#ddd", fontSize: 14, cursor: "pointer" }} onClick={() => removeCustom(item)}>✕</button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ADD CUSTOM */}
            <div style={C.card}>
              <div style={C.sectionLabel}>+ Ajouter un article</div>
              <div style={C.addRow}>
                <input
                  style={C.addInput}
                  placeholder="Ex: Edamame, Skyr..."
                  value={newItem}
                  onChange={e => setNewItem(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addCustom()}
                />
                <button style={C.addBtn} onClick={addCustom}>+</button>
              </div>
            </div>

            {/* CATALOGUE PAR CATÉGORIE */}
            <div style={C.sectionLabel}>Catalogue complet</div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 10, marginBottom: 4 }}>
              <button style={C.catBtn(!activeCategory)} onClick={() => setActiveCategory(null)}>Tout</button>
              {Object.keys(CATALOG).map(cat => (
                <button key={cat} style={C.catBtn(activeCategory === cat)} onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}>{cat}</button>
              ))}
            </div>

            {Object.entries(CATALOG)
              .filter(([cat]) => !activeCategory || activeCategory === cat)
              .map(([cat, subs]) => (
                <div key={cat} style={C.card}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a2e", marginBottom: 8 }}>{cat}</div>
                  {Object.entries(subs).map(([sub, items]) => (
                    <div key={sub}>
                      <div style={C.subLabel}>{sub}</div>
                      {items.map(item => (
                        <div key={item} style={C.favItem}>
                          <div style={C.itemCheck(!!checked[item])} onClick={() => toggle(item)}>{checked[item] ? "✓" : ""}</div>
                          <span style={C.itemName(!!checked[item])}>{item}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
          </>
        )}
        <div style={{ height: 32 }} />
      </div>
    </div>
  );
}
