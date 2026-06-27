export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing query" });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 500,
        messages: [{
          role: "user",
          content: `Tu es un nutritionniste. Pour l'aliment suivant: "${q}", donne-moi les valeurs nutritionnelles pour 100g. Réponds UNIQUEMENT avec un JSON valide, sans texte avant ou après, dans ce format exact: {"products": [{"product_name": "Nom de l'aliment","brands": "Générique","nutriments": {"energy-kcal_100g": 165,"proteins_100g": 31,"carbohydrates_100g": 0,"fat_100g": 3.6}}]}. Si l'aliment peut avoir plusieurs formes (cru, cuit, etc.), donne 2-3 variantes.`
        }]
      })
    });

    const data = await response.json();
    const text = data.content[0].text;
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
