import { useState } from "react";

const RECIPES = {
  "🥣 Petits-déjeuners": [
    "Overnight oats banane", "Overnight oats fruits rouges", "Overnight oats mangue",
    "Overnight oats myrtilles", "Porridge banane", "Porridge chocolat",
    "Porridge pommes-cannelle", "Skyr sans lactose + fruits", "Yaourt végétal + fruits rouges",
    "Yaourt végétal + banane", "Tartines beurre de cacahuète + banane",
    "Tartines purée d'amandes + miel", "Œufs brouillés + pain grillé",
    "Omelette au fromage", "Omelette aux fines herbes",
    "Smoothie banane", "Smoothie mangue-ananas", "Smoothie fruits rouges",
    "Pancakes protéinés",
  ],
  "🍗 Poulet": [
    "Poulet - riz - courgettes", "Poulet - pommes de terre - haricots verts",
    "Poulet - patate douce - carottes", "Poulet - semoule - légumes grillés",
    "Poulet - pâtes - parmesan", "Poulet - ratatouille", "Poulet - salade composée",
    "Poulet - brocolis", "Poulet paprika", "Poulet curry",
    "Bowl poulet froid - concombre - feta - riz",
  ],
  "🦃 Dinde": [
    "Dinde - riz - courgettes", "Dinde - semoule - légumes",
    "Dinde - gnocchis - épinards", "Dinde - haricots verts", "Dinde curry",
    "Curry de dinde",
  ],
  "🥩 Bœuf": [
    "Steak haché - pommes de terre", "Steak haché - riz", "Steak haché - haricots verts",
    "Bœuf grillé - légumes", "Rôti de bœuf - pommes de terre",
    "Bœuf - pâtes - parmesan", "Carpaccio de bœuf",
  ],
  "🐷 Porc": [
    "Filet mignon - pommes de terre", "Filet mignon - riz",
    "Filet mignon - légumes grillés", "Filet mignon moutarde",
  ],
  "🐟 Saumon": [
    "Saumon - riz - courgettes", "Saumon - pommes de terre vapeur",
    "Saumon - épinards", "Saumon - semoule", "Saumon citron",
    "Saumon froid - salade", "Saumon froid - pommes de terre - ciboulette - yaourt grec",
  ],
  "🐠 Poissons blancs": [
    "Cabillaud - riz", "Cabillaud - purée", "Colin - pommes de terre",
    "Merlu - légumes verts", "Cabillaud citron",
  ],
  "🐟 Thon": [
    "Riz - thon - tomates", "Pâtes - thon", "Salade - thon", "Wrap au thon",
  ],
  "🦐 Crevettes": [
    "Riz - crevettes - curry", "Crevettes - légumes grillés", "Salade - crevettes",
  ],
  "🌯 Wraps": [
    "Poulet - feta - concombre - citron", "Poulet - pesto - mozzarella",
    "Poulet - avocat - salade", "Poulet - tomates - feta",
    "Poulet - courgettes grillées", "Dinde - emmental - salade",
    "Thon - concombre", "Saumon fumé - concombre - aneth",
    "Bresaola - parmesan - roquette", "Jambon - emmental",
  ],
  "🥗 Salades": [
    "Riz - poulet - feta - concombre", "Riz - saumon - concombre",
    "Pâtes - poulet - pesto", "Pâtes - mozzarella - tomates",
    "Pommes de terre - saumon fumé", "Pommes de terre - thon",
    "Semoule - poulet - tomates", "Salade César légère",
    "Salade grecque", "Salade niçoise revisitée", "Salade avocat - crevettes",
  ],
  "🥪 Sandwichs": [
    "Jambon - emmental", "Poulet - salade", "Poulet - pesto",
    "Rôti de bœuf - moutarde", "Saumon fumé - fromage frais", "Bresaola - parmesan",
  ],
  "🍝 Pâtes": [
    "Poulet - parmesan", "Poulet - pesto", "Saumon - citron",
    "Thon - tomates", "Bœuf - sauce tomate", "Crevettes - ail",
    "Filet mignon - champignons",
  ],
  "🍚 Bols": [
    "Poulet - riz - avocat", "Saumon - riz - concombre",
    "Bœuf - riz - légumes", "Crevettes - riz - mangue",
  ],
  "🏋️ Avant le sport": [
    "Banane", "Compote", "Smoothie banane", "Overnight oats",
    "Galettes de riz", "Pain + miel",
  ],
  "💪 Après le sport": [
    "Whey + banane", "Smoothie protéiné", "Poulet - riz",
    "Steak haché - pommes de terre", "Saumon - riz", "Dinde - semoule",
  ],
  "⚡ Express": [
    "Riz micro-ondes - thon", "Riz micro-ondes - saumon fumé",
    "Riz micro-ondes - poulet", "Wrap jambon - emmental", "Wrap poulet",
    "Omelette", "Œufs brouillés", "Salade composée",
    "Sardines - pain", "Maquereau - pommes de terre vapeur",
    "Soupe + jambon", "Poulet déjà cuit - légumes vapeur",
    "Riz sauté aux œufs", "Patate douce rôtie + œufs",
  ],
  "☀️ Été": [
    "Melon - jambon", "Salade grecque", "Salade César légère",
    "Salade de riz", "Salade de pâtes", "Salade de pommes de terre",
    "Wrap froid", "Saumon froid", "Poulet froid",
    "Tartines tomate - mozzarella", "Carpaccio de bœuf",
    "Burrata - tomates", "Assiette de crudités",
  ],
  "❄️ Hiver": [
    "Poulet rôti - pommes de terre", "Filet mignon - purée",
    "Bœuf mijoté", "Cabillaud - purée", "Curry de poulet",
    "Curry de dinde", "Soupe + poulet",
  ],
  "🧊 Batch cooking": [
    "Poulet - riz - courgettes", "Poulet curry", "Dinde - semoule",
    "Steak haché - pommes de terre", "Saumon - riz",
    "Filet mignon - légumes", "Riz sauté au poulet",
  ],
  "🍢 Pique-nique": [
    "Wrap poulet", "Wrap saumon fumé", "Sandwich jambon",
    "Sandwich poulet", "Salade de riz", "Salade de pâtes",
    "Salade de pommes de terre", "Poulet froid", "Rôti de bœuf froid",
    "Œufs durs", "Melon", "Pastèque", "Compote", "Fruits frais",
  ],
  "🥂 Pour recevoir": [
    "Planche melon - jambon cru", "Planche de charcuterie",
    "Burrata - tomates - basilic", "Saumon fumé - citron - aneth",
    "Carpaccio de bœuf - parmesan - roquette",
    "Grande salade grecque", "Grande salade César",
    "Wraps découpés à partager", "Plateau de fruits frais", "Sorbets",
  ],
  "🍰 Desserts": [
    "Salade de fruits", "Pastèque", "Melon", "Fraises", "Pêches",
    "Nectarines", "Yaourt végétal", "Skyr sans lactose", "Compote",
    "Chocolat noir", "Sorbet citron", "Sorbet mangue", "Sorbet framboise",
  ],
};

const WARNINGS = {
  "Dinde - gnocchis - épinards": "⚠️ Gnocchis : surveiller la tolérance",
  "Riz - crevettes - curry": "⚠️ Vérifier tolérance épices",
  "Curry de poulet": "⚠️ Vérifier tolérance épices",
  "Curry de dinde": "⚠️ Vérifier tolérance épices",
  "Dinde curry": "⚠️ Vérifier tolérance épices",
  "Poulet curry": "⚠️ Vérifier tolérance épices",
};

const FAVORITES_DEFAULT = [
  "Poulet - riz - courgettes",
  "Saumon - riz - courgettes",
  "Steak haché - pommes de terre",
  "Overnight oats banane",
  "Poulet - pâtes - parmesan",
  "Wrap poulet - feta - concombre - citron",
  "Bowl poulet froid - concombre - feta - riz",
  "Saumon froid - pommes de terre - ciboulette - yaourt grec",
  "Riz - thon - tomates",
  "Omelette au fromage",
  "Smoothie banane",
  "Whey + banane",
  "Poulet - pommes de terre - haricots verts",
  "Dinde - riz - courgettes",
];

const STORAGE_KEY = "recipe_favs_v1";
const CUSTOM_KEY = "recipe_custom_v1";

function useStorage(key, def) {
  const [val, setVal] = useState(() => {
    try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : def; } catch { return def; }
  });
  const save = (v) => { setVal(v); try { localStorage.setItem(key, JSON.stringify(v)); } catch {} };
  return [val, save];
}

export default function RecipesTab() {
  const [favs, setFavs] = useStorage(STORAGE_KEY, FAVORITES_DEFAULT);
  const [custom, setCustom] = useStorage(CUSTOM_KEY, []);
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [newRecipe, setNewRecipe] = useState("");
  const [expandedCat, setExpandedCat] = useState(null);

  const allRecipes = [
    ...Object.values(RECIPES).flat(),
    ...custom,
  ];

  const searchResults = search.length > 1
    ? allRecipes.filter(r => r.toLowerCase().includes(search.toLowerCase()))
    : [];

  function toggleFav(recipe) {
    if (favs.includes(recipe)) {
      setFavs(favs.filter(f => f !== recipe));
    } else {
      setFavs([...favs, recipe]);
    }
  }

  function addCustom() {
    if (!newRecipe.trim()) return;
    const r = newRecipe.trim();
    if (!custom.includes(r)) setCustom([...custom, r]);
    if (!favs.includes(r)) setFavs([...favs, r]);
    setNewRecipe("");
  }

  function removeCustom(r) {
    setCustom(custom.filter(c => c !== r));
    setFavs(favs.filter(f => f !== r));
  }

  const C = {
    page: { fontFamily: "-apple-system,'Helvetica Neue',Helvetica,Arial,sans-serif", background: "#f4f4f6", minHeight: "100vh", paddingBottom: 20 },
    section: { padding: "14px 14px 0" },
    sectionLabel: { fontSize: 11, fontWeight: 700, color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, paddingLeft: 2 },
    card: { background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
    recipeRow: { display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #f5f5f5" },
    star: (active) => ({
      fontSize: 18, cursor: "pointer", color: active ? "#e8a020" : "#ddd", flexShrink: 0,
    }),
    recipeName: { fontSize: 13, color: "#1a1a2e", fontWeight: 500, flex: 1, lineHeight: 1.4 },
    warning: { fontSize: 10, color: "#e8a020", fontWeight: 600, display: "block", marginTop: 2 },
    catBtn: (active) => ({
      background: active ? "#1a1a2e" : "#fff",
      border: active ? "none" : "1.5px solid #e8e8e8",
      borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 700,
      color: active ? "#fff" : "#555", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
    }),
    catHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", marginBottom: 4 },
    catTitle: { fontSize: 14, fontWeight: 800, color: "#1a1a2e" },
    catCount: { fontSize: 11, color: "#aaa" },
    searchInput: { width: "100%", border: "1.5px solid #e0e0e0", borderRadius: 10, padding: "10px 14px", fontSize: 14, outline: "none", color: "#1a1a2e", boxSizing: "border-box", marginBottom: 10 },
    addRow: { display: "flex", gap: 8, marginTop: 8 },
    addInput: { flex: 1, border: "1.5px solid #e0e0e0", borderRadius: 10, padding: "10px 12px", fontSize: 13, outline: "none" },
    addBtn: { background: "#1a1a2e", border: "none", borderRadius: 10, padding: "0 16px", color: "#fff", fontSize: 18, cursor: "pointer", fontWeight: 700 },
  };

  function RecipeItem({ recipe, showRemove }) {
    return (
      <div style={C.recipeRow}>
        <span style={C.star(favs.includes(recipe))} onClick={() => toggleFav(recipe)}>
          {favs.includes(recipe) ? "⭐" : "☆"}
        </span>
        <div style={{ flex: 1 }}>
          <span style={C.recipeName}>{recipe}</span>
          {WARNINGS[recipe] && <span style={C.warning}>{WARNINGS[recipe]}</span>}
        </div>
        {showRemove && (
          <button style={{ background: "none", border: "none", color: "#ddd", fontSize: 14, cursor: "pointer" }} onClick={() => removeCustom(recipe)}>✕</button>
        )}
      </div>
    );
  }

  return (
    <div style={C.page}>
      <div style={C.section}>

        {/* SEARCH */}
        <input
          style={C.searchInput}
          placeholder="🔍 Rechercher une recette..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {search.length > 1 && (
          <div style={C.card}>
            <div style={C.sectionLabel}>Résultats ({searchResults.length})</div>
            {searchResults.length === 0 && <div style={{ fontSize: 13, color: "#aaa", fontStyle: "italic" }}>Aucun résultat</div>}
            {searchResults.map(r => <RecipeItem key={r} recipe={r} />)}
          </div>
        )}

        {!search && (
          <>
            {/* FAVORIS */}
            <div style={C.sectionLabel}>⭐ Mes favoris ({favs.length})</div>
            <div style={C.card}>
              {favs.length === 0 && <div style={{ fontSize: 13, color: "#aaa", fontStyle: "italic" }}>Appuie sur ☆ pour ajouter des favoris</div>}
              {favs.map(r => <RecipeItem key={r} recipe={r} showRemove={custom.includes(r)} />)}
            </div>

            {/* CUSTOM */}
            {custom.length > 0 && (
              <>
                <div style={C.sectionLabel}>✏️ Mes recettes</div>
                <div style={C.card}>
                  {custom.map(r => <RecipeItem key={r} recipe={r} showRemove />)}
                </div>
              </>
            )}

            {/* ADD CUSTOM */}
            <div style={C.card}>
              <div style={C.sectionLabel}>+ Créer une recette</div>
              <div style={C.addRow}>
                <input
                  style={C.addInput}
                  placeholder="Ex: Thon - avocat - riz..."
                  value={newRecipe}
                  onChange={e => setNewRecipe(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addCustom()}
                />
                <button style={C.addBtn} onClick={addCustom}>+</button>
              </div>
            </div>

            {/* CATÉGORIES FILTRE */}
            <div style={C.sectionLabel}>Catalogue complet</div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 10, marginBottom: 4 }}>
              <button style={C.catBtn(!activeCategory)} onClick={() => setActiveCategory(null)}>Tout</button>
              {Object.keys(RECIPES).map(cat => (
                <button key={cat} style={C.catBtn(activeCategory === cat)} onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}>
                  {cat}
                </button>
              ))}
            </div>

            {/* CATALOGUE */}
            {Object.entries(RECIPES)
              .filter(([cat]) => !activeCategory || activeCategory === cat)
              .map(([cat, recipes]) => {
                const isExpanded = expandedCat === cat || !!activeCategory;
                return (
                  <div key={cat} style={C.card}>
                    <div style={C.catHeader} onClick={() => setExpandedCat(isExpanded && !activeCategory ? null : cat)}>
                      <div style={C.catTitle}>{cat}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={C.catCount}>{recipes.length} idées</span>
                        <span style={{ fontSize: 16, color: "#aaa" }}>{isExpanded ? "▲" : "▼"}</span>
                      </div>
                    </div>
                    {isExpanded && recipes.map(r => <RecipeItem key={r} recipe={r} />)}
                  </div>
                );
              })}
          </>
        )}
        <div style={{ height: 32 }} />
      </div>
    </div>
  );
}
