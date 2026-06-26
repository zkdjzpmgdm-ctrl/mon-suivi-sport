import { useState, useEffect } from "react";

// ─── DONNÉES PROGRAMME ───────────────────────────────────────────────────────

const PROGRAM = {
  PUSH: {
    label: "PUSH", color: "#c0392b", day: "Lundi",
    exercises: [
      { name: "Développé couché haltères (banc)", sets: 4, reps: "6-8" },
      { name: "Dips lestés", sets: 4, reps: "8-10" },
      { name: "Développé incliné haltères", sets: 4, reps: "8-10" },
      { name: "Développé militaire haltères", sets: 4, reps: "6-8" },
      { name: "Élévations latérales", sets: 4, reps: "12-15" },
      { name: "Extensions triceps + Kickbacks", sets: 3, reps: "12+12" },
    ],
  },
  PULL: {
    label: "PULL", color: "#1a6b3c", day: "Mardi",
    exercises: [
      { name: "Tractions pronation lestées", sets: 5, reps: "6-8" },
      { name: "Rowing haltère unilatéral", sets: 4, reps: "8-10" },
      { name: "Rowing penché bilatéral", sets: 4, reps: "8-10" },
      { name: "Face pull (poulie de porte)", sets: 4, reps: "12-15" },
      { name: "Oiseau haltères", sets: 3, reps: "15-20" },
      { name: "Tractions supination", sets: 3, reps: "Max" },
      { name: "Shrugs haltères lourds", sets: 5, reps: "8-10" },
      { name: "Curl alterné haltères", sets: 3, reps: "10-12" },
    ],
  },
  LEGS: {
    label: "LEGS", color: "#1a3a6b", day: "Jeudi",
    exercises: [
      { name: "Goblet squat lesté", sets: 5, reps: "5" },
      { name: "Hip thrust haltère (banc)", sets: 5, reps: "8-10" },
      { name: "Fentes bulgares haltères", sets: 4, reps: "8-10/jambe" },
      { name: "SDT jambes tendues haltères", sets: 3, reps: "8-10" },
      { name: "Fentes marchées haltères", sets: 3, reps: "12/jambe" },
      { name: "Élévations mollets lestées", sets: 5, reps: "15-20" },
      { name: "Crunch lesté lourd", sets: 4, reps: "15" },
      { name: "Relevés de jambes", sets: 4, reps: "12" },
      { name: "Gainage lesté", sets: 2, reps: "60 sec" },
    ],
  },
  BRAS: {
    label: "BRAS", color: "#6b1a6b", day: "Vendredi",
    exercises: [
      { name: "Curl haltères lourd", sets: 4, reps: "6-8" },
      { name: "Curl incliné haltères (banc)", sets: 3, reps: "10-12" },
      { name: "Curl marteau lourd", sets: 3, reps: "10-12" },
      { name: "Extensions triceps + Kickbacks", sets: 3, reps: "12+12" },
      { name: "Élévations latérales", sets: 3, reps: "12-15" },
      { name: "Shrugs très lourds", sets: 5, reps: "8-10" },
      { name: "Gainage cou 4 directions", sets: 4, reps: "20 sec" },
      { name: "Farmer Walk", sets: 3, reps: "30-60 sec" },
      { name: "Enroulements de poignets", sets: 3, reps: "20" },
      { name: "Crunch lesté lourd", sets: 4, reps: "15" },
      { name: "Relevés de jambes", sets: 4, reps: "12" },
      { name: "Gainage lesté", sets: 2, reps: "60 sec" },
    ],
  },
};

const MEALS = {
  PETITDEJ: {
    label: "Petit-déjeuner", emoji: "🌅", color: "#e8a020",
    options: [
      { name: "Standard", items: ["60g flocons d'avoine", "200ml lait demi-écrémé", "30g whey isolate", "1 banane", "15g purée d'amandes"], macros: { kcal: 650, protein: 38, carbs: 85, fat: 18 } },
      { name: "Express", items: ["2 scoops whey + 200ml lait d'amande", "1 banane", "30g amandes"], macros: { kcal: 550, protein: 50, carbs: 55, fat: 16 } },
    ],
  },
  DEJEUNER: {
    label: "Déjeuner", emoji: "🍽️", color: "#1a6b3c",
    options: [
      { name: "Rotation A — Maison", items: ["160g poulet/dinde", "140g riz blanc cru", "150g légumes cuits", "10g huile d'olive"], macros: { kcal: 800, protein: 50, carbs: 105, fat: 20 } },
      { name: "Rotation B — Été", items: ["160g poulet froid", "120g riz cru", "Concombre pelé + 30g feta", "10g huile d'olive + citron"], macros: { kcal: 780, protein: 48, carbs: 95, fat: 22 } },
      { name: "Rotation C — Japonais", items: ["1 bol riz", "6 maki saumon", "6 California avocat", "2 brochettes poulet"], macros: { kcal: 750, protein: 45, carbs: 90, fat: 18 } },
      { name: "Rotation C — Boulangerie", items: ["Sandwich poulet", "Compote", "Shaker whey"], macros: { kcal: 700, protein: 42, carbs: 85, fat: 16 } },
    ],
  },
  PRESEANCE: {
    label: "Pré-séance", emoji: "🥤", color: "#1a3a6b",
    options: [
      { name: "Standard", items: ["1 scoop whey + 5g créatine", "1 banane", "40g noix de cajou"], macros: { kcal: 450, protein: 30, carbs: 50, fat: 15 } },
    ],
  },
  DINER: {
    label: "Dîner post-séance", emoji: "🍽️", color: "#c0392b",
    options: [
      { name: "Rotation A — Classique", items: ["150g steak haché 5%", "300g pommes de terre vapeur", "150g haricots verts", "10g huile d'olive"], macros: { kcal: 750, protein: 45, carbs: 80, fat: 22 } },
      { name: "Rotation B — Saumon", items: ["140g saumon au four", "120g riz blanc cru", "150g légumes cuits", "10g huile d'olive"], macros: { kcal: 720, protein: 44, carbs: 85, fat: 24 } },
      { name: "Rotation C — Flemme", items: ["4 œufs entiers", "110g riz blanc cru", "2 tranches jambon", "Fromage râpé"], macros: { kcal: 700, protein: 46, carbs: 75, fat: 20 } },
    ],
  },
  COLLATION: {
    label: "Collation soir", emoji: "🌙", color: "#6b1a6b",
    options: [
      { name: "Option A", items: ["250g fromage blanc 0%", "10g miel"], macros: { kcal: 220, protein: 28, carbs: 22, fat: 2 } },
      { name: "Option B — Crohn", items: ["Yaourt coco", "1 scoop whey"], macros: { kcal: 280, protein: 30, carbs: 18, fat: 8 } },
      { name: "Option C — Overnight oats", items: ["30g flocons d'avoine", "150ml lait", "10g miel"], macros: { kcal: 280, protein: 10, carbs: 48, fat: 5 } },
    ],
  },
};

const DAILY_TARGET = { kcal: 2900, protein: 165, carbs: 365, fat: 90 };
const WORKOUT_KEY = "workout_log_v1";
const DIET_KEY = "diet_log_v1";

// ─── UTILS ───────────────────────────────────────────────────────────────────

function todayKey() { return new Date().toISOString().slice(0, 10); }

function formatDate(str) {
  const d = new Date(str + "T12:00:00");
  return d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
}

function useStorage(key, def) {
  const [val, setVal] = useState(() => { try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : def; } catch { return def; } });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }, [key, val]);
  return [val, setVal];
}

// ─── COMPOSANTS PARTAGÉS ─────────────────────────────────────────────────────

function MacroBar({ label, value, target, color }) {
  const pct = Math.min((value / target) * 100, 100);
  const over = value > target;
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#666", textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: over ? "#c0392b" : "#333" }}>
          {Math.round(value)}<span style={{ color: "#aaa", fontWeight: 400 }}>/{target}{label === "kcal" ? "" : "g"}</span>
        </span>
      </div>
      <div style={{ background: "#f0f0f0", borderRadius: 4, height: 6, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: over ? "#c0392b" : color, borderRadius: 4, transition: "width 0.3s" }} />
      </div>
    </div>
  );
}

// ─── SUIVI SÉANCES ───────────────────────────────────────────────────────────

function WorkoutTab() {
  const [log, setLog] = useStorage(WORKOUT_KEY, {});
  const [view, setView] = useState("home");
  const [activeSession, setActiveSession] = useState(null);
  const [sessionData, setSessionData] = useState({});
  const [showHistory, setShowHistory] = useState(false);

  function startSession(type) {
    setActiveSession(type);
    const prog = PROGRAM[type];
    const init = {};
    prog.exercises.forEach(ex => { init[ex.name] = Array.from({ length: ex.sets }, () => ({ kg: "", reps: "" })); });
    setSessionData(init);
    setView("session");
  }

  function updateSet(exName, setIdx, field, value) {
    setSessionData(prev => {
      const u = { ...prev };
      u[exName] = u[exName].map((s, i) => i === setIdx ? { ...s, [field]: value } : s);
      return u;
    });
  }

  function saveSession() {
    const key = todayKey() + "_" + activeSession;
    setLog(prev => ({ ...prev, [key]: { type: activeSession, date: todayKey(), data: sessionData } }));
    setView("done");
  }

  function getPrev(type) {
    return Object.values(log).filter(e => e.type === type).sort((a, b) => b.date.localeCompare(a.date))[0] || null;
  }

  const weekSessions = Object.values(log).filter(s => {
    const d = new Date(s.date);
    return d >= new Date(Date.now() - 7 * 864e5);
  });

  const prog = activeSession ? PROGRAM[activeSession] : null;

  if (view === "done") return (
    <div style={S.centerCard}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>💪</div>
      <div style={S.doneTitle}>Séance terminée !</div>
      <div style={S.doneSub}>Enregistrée avec succès</div>
      <button style={{ ...S.btn, background: "#1a1a2e", marginTop: 24 }} onClick={() => setView("home")}>Retour</button>
    </div>
  );

  if (showHistory) {
    const all = Object.values(log).sort((a, b) => b.date.localeCompare(a.date));
    return (
      <div style={S.tabContent}>
        <button style={S.backLink} onClick={() => setShowHistory(false)}>← Retour</button>
        <div style={S.sectionLabel}>Historique des séances</div>
        {all.length === 0 && <div style={S.empty}>Aucune séance enregistrée.</div>}
        {all.map((session, idx) => {
          const p = PROGRAM[session.type];
          return (
            <div key={idx} style={{ ...S.card, borderLeft: `4px solid ${p.color}` }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                <div style={{ ...S.badge, background: p.color }}>{p.label}</div>
                <div style={{ fontSize: 13, color: "#555", fontWeight: 600 }}>{formatDate(session.date)}</div>
              </div>
              {p.exercises.map(ex => {
                const sets = session.data?.[ex.name] || [];
                const filled = sets.filter(s => s.kg);
                if (!filled.length) return null;
                return (
                  <div key={ex.name} style={{ marginBottom: 6 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e", marginBottom: 3 }}>{ex.name}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {filled.map((s, i) => <span key={i} style={S.setChip}>{s.kg}kg × {s.reps}</span>)}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        <div style={{ height: 32 }} />
      </div>
    );
  }

  if (view === "session" && prog) return (
    <div style={S.tabContent}>
      <div style={{ ...S.sessionBanner, background: prog.color }}>
        <button style={S.backBtnWhite} onClick={() => setView("home")}>← Retour</button>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: 2 }}>{prog.label}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{prog.day} · {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}</div>
      </div>

      {getPrev(activeSession) && (
        <div style={S.prevBanner}>📅 Dernière séance : {formatDate(getPrev(activeSession).date)}</div>
      )}

      {prog.exercises.map(ex => {
        const prevData = getPrev(activeSession)?.data?.[ex.name];
        return (
          <div key={ex.name} style={S.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", flex: 1, lineHeight: 1.3 }}>{ex.name}</div>
              <div style={{ ...S.badge, background: prog.color }}>{ex.sets} × {ex.reps}</div>
            </div>
            {prevData && (
              <div style={{ fontSize: 10, color: "#888", marginBottom: 8, fontStyle: "italic" }}>
                Avant : {prevData.filter(s => s.kg).map((s, i) => `S${i+1}: ${s.kg}kg×${s.reps}`).join(" · ")}
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "28px 1fr 1fr" + (prevData ? " 70px" : ""), gap: 5, marginBottom: 4 }}>
              <span style={S.colHead}>#</span>
              <span style={S.colHead}>Kg</span>
              <span style={S.colHead}>Reps</span>
              {prevData && <span style={S.colHead}>Avant</span>}
            </div>
            {(sessionData[ex.name] || []).map((s, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "28px 1fr 1fr" + (prevData ? " 70px" : ""), gap: 5, marginBottom: 5 }}>
                <div style={{ ...S.setNum, background: prog.color }}>{i + 1}</div>
                <input style={S.inp} type="number" inputMode="decimal" placeholder="—" value={s.kg} onChange={e => updateSet(ex.name, i, "kg", e.target.value)} />
                <input style={S.inp} type="number" inputMode="numeric" placeholder="—" value={s.reps} onChange={e => updateSet(ex.name, i, "reps", e.target.value)} />
                {prevData && <span style={{ fontSize: 11, color: "#aaa", textAlign: "center", alignSelf: "center" }}>{prevData[i]?.kg ? `${prevData[i].kg}×${prevData[i].reps}` : "—"}</span>}
              </div>
            ))}
          </div>
        );
      })}
      <button style={{ ...S.btn, background: prog.color }} onClick={saveSession}>✅ Terminer la séance</button>
      <div style={{ height: 40 }} />
    </div>
  );

  return (
    <div style={S.tabContent}>
      <div style={S.weekCard}>
        <div style={S.sectionLabel}>Cette semaine</div>
        <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
          {["PUSH", "PULL", "LEGS", "BRAS"].map(t => {
            const done = weekSessions.some(s => s.type === t);
            const p = PROGRAM[t];
            return (
              <div key={t} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: done ? p.color : "#e0e0e0" }} />
                <div style={{ fontSize: 9, fontWeight: 700, color: done ? p.color : "#aaa" }}>{t}</div>
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: 12, color: "#666", fontWeight: 600 }}>{weekSessions.length}/4 séances cette semaine</div>
      </div>

      <div style={S.sectionLabel}>Commencer une séance</div>
      {Object.entries(PROGRAM).map(([type, p]) => {
        const last = getPrev(type);
        return (
          <button key={type} style={{ ...S.card, ...S.clickable, borderLeft: `4px solid ${p.color}`, display: "flex", justifyContent: "space-between", alignItems: "center" }} onClick={() => startSession(type)}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: p.color, letterSpacing: 0.5 }}>{p.label} <span style={{ fontWeight: 400, color: "#999", fontSize: 12 }}>— {p.day}</span></div>
              <div style={{ fontSize: 12, color: "#777", marginTop: 2 }}>{p.exercises.length} exercices</div>
              {last && <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>Dernière fois : {formatDate(last.date)}</div>}
            </div>
            <div style={{ fontSize: 24, color: p.color, fontWeight: 300 }}>›</div>
          </button>
        );
      })}
      <button style={S.ghostBtn} onClick={() => setShowHistory(true)}>📊 Historique complet</button>
      <div style={{ height: 32 }} />
    </div>
  );
}

// ─── SUIVI DIÈTE ─────────────────────────────────────────────────────────────

function DietTab() {
  const [log, setLog] = useStorage(DIET_KEY, {});
  const [selectingMeal, setSelectingMeal] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const today = todayKey();
  const todayLog = log[today] || { meals: {}, water: 0, note: "", weight: "" };

  function updateToday(updates) {
    setLog(prev => ({ ...prev, [today]: { ...todayLog, ...updates } }));
  }

  function selectOption(mealKey, option) {
    updateToday({ meals: { ...todayLog.meals, [mealKey]: option } });
    setSelectingMeal(null);
  }

  function removeMeal(mealKey) {
    const meals = { ...todayLog.meals };
    delete meals[mealKey];
    updateToday({ meals });
  }

  const totals = Object.values(todayLog.meals).reduce(
    (acc, m) => ({ kcal: acc.kcal + (m.macros?.kcal || 0), protein: acc.protein + (m.macros?.protein || 0), carbs: acc.carbs + (m.macros?.carbs || 0), fat: acc.fat + (m.macros?.fat || 0) }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );
  const pctKcal = Math.round((totals.kcal / DAILY_TARGET.kcal) * 100);

  if (selectingMeal) {
    const meal = MEALS[selectingMeal];
    return (
      <div style={S.tabContent}>
        <div style={{ ...S.sessionBanner, background: meal.color }}>
          <button style={S.backBtnWhite} onClick={() => setSelectingMeal(null)}>← Retour</button>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{meal.emoji} {meal.label}</div>
        </div>
        {meal.options.map((opt, i) => (
          <button key={i} style={{ ...S.card, ...S.clickable, textAlign: "left" }} onClick={() => selectOption(selectingMeal, opt)}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1a1a2e", marginBottom: 6 }}>{opt.name}</div>
            {opt.items.map((item, j) => <div key={j} style={{ fontSize: 12, color: "#555", lineHeight: 1.7 }}>· {item}</div>)}
            <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
              <span style={{ color: meal.color, fontWeight: 700, fontSize: 12 }}>{opt.macros.kcal} kcal</span>
              <span style={{ fontSize: 11, color: "#777", fontWeight: 600 }}>P: {opt.macros.protein}g</span>
              <span style={{ fontSize: 11, color: "#777", fontWeight: 600 }}>G: {opt.macros.carbs}g</span>
              <span style={{ fontSize: 11, color: "#777", fontWeight: 600 }}>L: {opt.macros.fat}g</span>
            </div>
          </button>
        ))}
        <button style={S.ghostBtn} onClick={() => selectOption(selectingMeal, { name: "Repas libre", items: [], macros: { kcal: 0, protein: 0, carbs: 0, fat: 0 } })}>
          ✏️ Repas libre (sans comptage)
        </button>
        <div style={{ height: 32 }} />
      </div>
    );
  }

  if (showHistory) {
    const entries = Object.entries(log).filter(([k]) => k !== today).sort(([a], [b]) => b.localeCompare(a)).slice(0, 14);
    return (
      <div style={S.tabContent}>
        <button style={S.backLink} onClick={() => setShowHistory(false)}>← Retour</button>
        <div style={S.sectionLabel}>14 derniers jours</div>
        {entries.length === 0 && <div style={S.empty}>Aucun historique.</div>}
        {entries.map(([date, entry]) => {
          const t = Object.values(entry.meals || {}).reduce((acc, m) => ({ kcal: acc.kcal + (m.macros?.kcal || 0), protein: acc.protein + (m.macros?.protein || 0) }), { kcal: 0, protein: 0 });
          return (
            <div key={date} style={S.card}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{formatDate(date)}</div>
                {entry.weight && <div style={{ fontSize: 12, color: "#888" }}>⚖️ {entry.weight} kg</div>}
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                <span style={{ color: "#e8a020", fontWeight: 700, fontSize: 12 }}>{t.kcal} kcal</span>
                <span style={{ fontSize: 11, color: "#777" }}>P: {t.protein}g</span>
                <span style={{ fontSize: 11, color: "#1a3a6b" }}>💧 {(entry.water || 0) * 375}ml</span>
              </div>
              {Object.values(entry.meals || {}).map((m, i) => <div key={i} style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>· {m.name}</div>)}
              {entry.note && <div style={{ fontSize: 11, color: "#aaa", fontStyle: "italic", marginTop: 4 }}>"{entry.note}"</div>}
            </div>
          );
        })}
        <div style={{ height: 32 }} />
      </div>
    );
  }

  return (
    <div style={S.tabContent}>
      {/* BILAN */}
      <div style={S.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={S.sectionLabel}>Bilan du jour</div>
          <div style={{ ...S.badge, background: pctKcal >= 90 ? "#1a6b3c" : pctKcal >= 60 ? "#e8a020" : "#aaa" }}>{pctKcal}%</div>
        </div>
        <MacroBar label="kcal" value={totals.kcal} target={DAILY_TARGET.kcal} color="#e8a020" />
        <MacroBar label="Protéines" value={totals.protein} target={DAILY_TARGET.protein} color="#1a6b3c" />
        <MacroBar label="Glucides" value={totals.carbs} target={DAILY_TARGET.carbs} color="#1a3a6b" />
        <MacroBar label="Lipides" value={totals.fat} target={DAILY_TARGET.fat} color="#6b1a6b" />
      </div>

      {/* POIDS + EAU */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
        <div style={S.card}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>⚖️ Poids</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <input type="number" inputMode="decimal" step="0.1" placeholder="65.0" value={todayLog.weight || ""} onChange={e => updateToday({ weight: e.target.value })} style={{ ...S.inp, flex: 1, fontSize: 16, fontWeight: 700 }} />
            <span style={{ fontSize: 12, color: "#888" }}>kg</span>
          </div>
        </div>
        <div style={S.card}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#1a3a6b", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>💧 Eau</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <button key={i} onClick={() => updateToday({ water: i < todayLog.water ? i : i + 1 })}
                style={{ width: 22, height: 22, borderRadius: 4, border: "none", cursor: "pointer", background: i < (todayLog.water || 0) ? "#1a3a6b" : "#e8e8f0", fontSize: 10 }}>
                💧
              </button>
            ))}
          </div>
          <div style={{ fontSize: 10, color: "#1a3a6b", fontWeight: 700, marginTop: 4 }}>{(todayLog.water || 0) * 375}ml</div>
        </div>
      </div>

      {/* REPAS */}
      <div style={S.sectionLabel}>Repas du jour</div>
      {Object.entries(MEALS).map(([key, meal]) => {
        const logged = todayLog.meals?.[key];
        return (
          <div key={key} style={{ ...S.card, borderLeft: `4px solid ${meal.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>{meal.emoji} {meal.label}</div>
                {logged ? (
                  <>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 3 }}>{logged.name}</div>
                    {logged.macros?.kcal > 0 && (
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ color: meal.color, fontWeight: 700, fontSize: 11 }}>{logged.macros.kcal} kcal</span>
                        <span style={{ fontSize: 11, color: "#777" }}>P: {logged.macros.protein}g</span>
                        <span style={{ fontSize: 11, color: "#777" }}>G: {logged.macros.carbs}g</span>
                      </div>
                    )}
                  </>
                ) : <div style={{ fontSize: 12, color: "#bbb", fontStyle: "italic" }}>Non enregistré</div>}
              </div>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <button style={{ ...S.iconBtn, background: meal.color }} onClick={() => setSelectingMeal(key)}>{logged ? "✏️" : "+"}</button>
                {logged && <button style={{ ...S.iconBtn, background: "#f0f0f0", color: "#aaa" }} onClick={() => removeMeal(key)}>✕</button>}
              </div>
            </div>
          </div>
        );
      })}

      {/* NOTE */}
      <div style={S.card}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>📝 Note du jour</div>
        <textarea style={{ width: "100%", border: "1.5px solid #e8e8e8", borderRadius: 8, padding: 10, fontSize: 13, color: "#333", resize: "none", height: 70, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
          placeholder="Digestion, énergie, faim..."
          value={todayLog.note || ""}
          onChange={e => updateToday({ note: e.target.value })}
        />
      </div>

      {/* RÈGLES */}
      <div style={{ ...S.card, background: "#1a1a2e" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#8888aa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Règles non négociables</div>
        {[["⏰", "Ne jamais sauter le petit-déj"], ["🍽️", "Dîner dans les 90 min post-séance"], ["💊", "Créatine 5g tous les jours"], ["💧", "3L d'eau minimum"]].map(([e, t], i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 15 }}>{e}</span>
            <span style={{ fontSize: 12, color: "#ddd" }}>{t}</span>
          </div>
        ))}
      </div>

      <button style={S.ghostBtn} onClick={() => setShowHistory(true)}>📊 Historique</button>
      <div style={{ height: 32 }} />
    </div>
  );
}

// ─── APP PRINCIPALE ──────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("workout");

  return (
    <div style={{ fontFamily: "-apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif", background: "#f4f4f6", minHeight: "100vh", maxWidth: 480, margin: "0 auto", paddingBottom: 70 }}>

      {/* HEADER */}
      <div style={{ background: "#1a1a2e", padding: "20px 20px 16px", textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: 2, color: "#8888aa", textTransform: "uppercase", marginBottom: 4 }}>Mon Suivi</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: 1 }}>
          {tab === "workout" ? "💪 Séances" : "🥗 Diète"}
        </div>
        <div style={{ fontSize: 11, color: "#8888aa", marginTop: 2 }}>
          {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
        </div>
      </div>

      {/* CONTENT */}
      {tab === "workout" ? <WorkoutTab /> : <DietTab />}

      {/* TAB BAR */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#fff", borderTop: "1px solid #e8e8e8", display: "flex", zIndex: 100 }}>
        {[
          { key: "workout", emoji: "💪", label: "Séances" },
          { key: "diet", emoji: "🥗", label: "Diète" },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ flex: 1, border: "none", background: "transparent", padding: "10px 0 12px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <span style={{ fontSize: 20 }}>{t.emoji}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: tab === t.key ? "#1a1a2e" : "#aaa", letterSpacing: 0.5 }}>{t.label}</span>
            {tab === t.key && <div style={{ width: 20, height: 2, background: "#1a1a2e", borderRadius: 2 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── STYLES PARTAGÉS ─────────────────────────────────────────────────────────

const S = {
  tabContent: { padding: "14px 14px 0" },
  card: { background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  clickable: { border: "none", width: "100%", cursor: "pointer", textAlign: "left" },
  weekCard: { background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  sectionLabel: { fontSize: 11, fontWeight: 700, color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, paddingLeft: 2 },
  badge: { fontSize: 10, fontWeight: 800, color: "#fff", borderRadius: 6, padding: "3px 8px", whiteSpace: "nowrap" },
  setChip: { fontSize: 11, background: "#f0f0f4", borderRadius: 6, padding: "2px 8px", color: "#444", fontWeight: 600 },
  btn: { width: "100%", padding: "15px", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 800, color: "#fff", cursor: "pointer", marginTop: 6, letterSpacing: 0.5 },
  ghostBtn: { width: "100%", background: "transparent", border: "1.5px solid #ddd", borderRadius: 12, padding: "13px", fontSize: 13, color: "#555", cursor: "pointer", marginTop: 4, fontWeight: 600, marginBottom: 10 },
  backLink: { display: "inline-block", fontSize: 13, color: "#555", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: "0 0 12px 0" },
  backBtnWhite: { display: "block", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: 13, padding: "6px 12px", borderRadius: 20, cursor: "pointer", marginBottom: 10, fontWeight: 600 },
  sessionBanner: { padding: "18px 18px 16px", marginBottom: 12, borderRadius: 12 },
  prevBanner: { background: "#fff8e1", borderRadius: 8, padding: "9px 14px", fontSize: 12, color: "#886600", fontWeight: 600, marginBottom: 12 },
  inp: { border: "1.5px solid #e8e8e8", borderRadius: 8, padding: "7px 8px", fontSize: 13, fontWeight: 600, textAlign: "center", color: "#1a1a2e", background: "#fafafa", width: "100%", outline: "none", boxSizing: "border-box" },
  setNum: { width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff", margin: "0 auto" },
  colHead: { fontSize: 10, fontWeight: 700, color: "#aaa", textTransform: "uppercase", textAlign: "center" },
  centerCard: { margin: "80px 20px", background: "#fff", borderRadius: 16, padding: "40px 24px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" },
  doneTitle: { fontSize: 22, fontWeight: 800, color: "#1a1a2e", marginBottom: 8 },
  doneSub: { fontSize: 14, color: "#888" },
  iconBtn: { border: "none", color: "#fff", borderRadius: 8, width: 32, height: 32, fontSize: 14, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  empty: { textAlign: "center", color: "#aaa", fontSize: 14, padding: "40px 0" },
};
