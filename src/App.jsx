import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Coffee, Star, ShoppingCart, RotateCcw, Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import "./styles.css";

const coffees = [
  {
    id: 1,
    name: "Da Lat Arabica Honey Process",
    origin: "Da Lat, Vietnam",
    bean: "Arabica",
    roast: "Medium",
    notes: ["honey", "citrus", "floral"],
    bitterness: 2,
    acidity: 4,
    sweetness: 5,
    body: 3,
    caffeine: 3,
    brewMethods: ["Pour-over", "Drip", "French Press"],
    price: 18,
    description: "A premium Vietnamese Arabica with bright acidity, natural sweetness, and a clean finish."
  },
  {
    id: 2,
    name: "Buon Ma Thuot Robusta Dark Roast",
    origin: "Dak Lak, Vietnam",
    bean: "Robusta",
    roast: "Dark",
    notes: ["dark chocolate", "bold", "nutty"],
    bitterness: 5,
    acidity: 1,
    sweetness: 2,
    body: 5,
    caffeine: 5,
    brewMethods: ["Phin", "Espresso", "French Press"],
    price: 15,
    description: "A bold, high-caffeine robusta ideal for Vietnamese iced coffee and strong morning brews."
  },
  {
    id: 3,
    name: "Vietnamese Phin Blend",
    origin: "Central Highlands, Vietnam",
    bean: "Arabica + Robusta",
    roast: "Medium-Dark",
    notes: ["chocolate", "caramel", "roasted nuts"],
    bitterness: 4,
    acidity: 2,
    sweetness: 4,
    body: 5,
    caffeine: 4,
    brewMethods: ["Phin", "Espresso", "Drip"],
    price: 16,
    description: "A balanced blend designed for traditional Vietnamese phin brewing and condensed milk coffee."
  },
  {
    id: 4,
    name: "Light Roast Floral Arabica",
    origin: "Lam Dong, Vietnam",
    bean: "Arabica",
    roast: "Light",
    notes: ["jasmine", "berry", "tea-like"],
    bitterness: 1,
    acidity: 5,
    sweetness: 4,
    body: 2,
    caffeine: 3,
    brewMethods: ["Pour-over", "Aeropress"],
    price: 20,
    description: "A delicate specialty coffee for customers who enjoy fruity, floral, and lighter profiles."
  },
  {
    id: 5,
    name: "Low-Acidity Smooth Blend",
    origin: "Vietnam",
    bean: "Arabica + Robusta",
    roast: "Medium",
    notes: ["milk chocolate", "almond", "brown sugar"],
    bitterness: 3,
    acidity: 1,
    sweetness: 4,
    body: 4,
    caffeine: 3,
    brewMethods: ["Drip", "Phin", "French Press"],
    price: 17,
    description: "A smooth, low-acidity option for customers who want comfort, sweetness, and balance."
  }
];

const defaultProfile = {
  sweetness: 3,
  bitterness: 3,
  acidity: 3,
  body: 3,
  caffeine: 3,
  preferredRoast: "Medium",
  brewMethod: "Phin",
  flavorFamily: "chocolate",
  goal: "Daily coffee"
};

function scoreCoffee(coffee, profile) {
  let score = 100;
  score -= Math.abs(coffee.sweetness - Number(profile.sweetness)) * 8;
  score -= Math.abs(coffee.bitterness - Number(profile.bitterness)) * 8;
  score -= Math.abs(coffee.acidity - Number(profile.acidity)) * 8;
  score -= Math.abs(coffee.body - Number(profile.body)) * 7;
  score -= Math.abs(coffee.caffeine - Number(profile.caffeine)) * 7;

  if (coffee.roast.toLowerCase().includes(profile.preferredRoast.toLowerCase())) score += 15;
  if (coffee.brewMethods.includes(profile.brewMethod)) score += 15;
  if (coffee.notes.some((n) => n.toLowerCase().includes(profile.flavorFamily.toLowerCase()))) score += 10;

  return Math.max(0, Math.min(100, Math.round(score)));
}

function Slider({ label, value, onChange, left, right }) {
  return (
    <label className="sliderGroup">
      <div className="sliderHeader">
        <span>{label}</span>
        <strong>{value}/5</strong>
      </div>
      <input type="range" min="1" max="5" value={value} onChange={(e) => onChange(e.target.value)} />
      <div className="sliderLabels">
        <small>{left}</small>
        <small>{right}</small>
      </div>
    </label>
  );
}

function App() {
  const [profile, setProfile] = useState(defaultProfile);
  const [feedback, setFeedback] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const ranked = useMemo(() => {
    return coffees
      .map((coffee) => ({ ...coffee, match: scoreCoffee(coffee, profile) }))
      .sort((a, b) => b.match - a.match);
  }, [profile]);

  const top = ranked[0];

  function updateField(field, value) {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }

  function saveFeedback(coffeeId, rating) {
    setFeedback((prev) => ({ ...prev, [coffeeId]: rating }));
  }

  return (
    <main className="app">
      <section className="hero">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="badge"><Sparkles size={16} /> AI Taste Profile Prototype</div>
          <h1>Personalized Vietnamese Coffee Subscription</h1>
          <p>
            Match customers with Vietnamese coffee based on taste preference, brew method,
            caffeine level, and flavor profile.
          </p>
        </motion.div>
      </section>

      <section className="grid">
        <div className="card">
          <h2><Coffee size={22} /> Taste Quiz</h2>

          <Slider label="Sweetness" value={profile.sweetness} onChange={(v) => updateField("sweetness", v)} left="Dry" right="Sweet" />
          <Slider label="Bitterness" value={profile.bitterness} onChange={(v) => updateField("bitterness", v)} left="Mild" right="Bold" />
          <Slider label="Acidity" value={profile.acidity} onChange={(v) => updateField("acidity", v)} left="Low" right="Bright" />
          <Slider label="Body" value={profile.body} onChange={(v) => updateField("body", v)} left="Light" right="Full" />
          <Slider label="Caffeine" value={profile.caffeine} onChange={(v) => updateField("caffeine", v)} left="Gentle" right="Strong" />

          <div className="formRow">
            <label>
              Preferred roast
              <select value={profile.preferredRoast} onChange={(e) => updateField("preferredRoast", e.target.value)}>
                <option>Light</option>
                <option>Medium</option>
                <option>Medium-Dark</option>
                <option>Dark</option>
              </select>
            </label>

            <label>
              Brew method
              <select value={profile.brewMethod} onChange={(e) => updateField("brewMethod", e.target.value)}>
                <option>Phin</option>
                <option>Pour-over</option>
                <option>Espresso</option>
                <option>Drip</option>
                <option>French Press</option>
                <option>Aeropress</option>
              </select>
            </label>
          </div>

          <div className="formRow">
            <label>
              Favorite flavor
              <select value={profile.flavorFamily} onChange={(e) => updateField("flavorFamily", e.target.value)}>
                <option>chocolate</option>
                <option>caramel</option>
                <option>nutty</option>
                <option>citrus</option>
                <option>floral</option>
                <option>berry</option>
              </select>
            </label>

            <label>
              Main goal
              <select value={profile.goal} onChange={(e) => updateField("goal", e.target.value)}>
                <option>Daily coffee</option>
                <option>Vietnamese iced coffee</option>
                <option>Specialty tasting</option>
                <option>High caffeine</option>
                <option>Low acidity</option>
              </select>
            </label>
          </div>

          <button className="primaryBtn" onClick={() => setSubmitted(true)}>
            <Send size={18} /> Generate Recommendation
          </button>

          <button className="secondaryBtn" onClick={() => { setProfile(defaultProfile); setSubmitted(false); setFeedback({}); }}>
            <RotateCcw size={16} /> Reset
          </button>
        </div>

        <div className="card resultCard">
          <h2><Star size={22} /> Best Match</h2>
          {submitted ? (
            <>
              <div className="matchCircle">{top.match}%</div>
              <h3>{top.name}</h3>
              <p className="muted">{top.origin} • {top.bean} • {top.roast}</p>
              <p>{top.description}</p>
              <div className="chips">
                {top.notes.map((note) => <span key={note}>{note}</span>)}
              </div>
              <div className="subscriptionBox">
                <strong>Suggested subscription:</strong>
                <p>Ship one 12 oz bag every 2 weeks. Estimated price: ${top.price}/bag.</p>
              </div>
              <button className="primaryBtn"><ShoppingCart size={18} /> Add to Subscription</button>
            </>
          ) : (
            <p className="placeholder">Complete the quiz and generate a recommendation.</p>
          )}
        </div>
      </section>

      <section className="card">
        <h2>Ranked Coffee Recommendations</h2>
        <div className="coffeeList">
          {ranked.map((coffee) => (
            <div className="coffeeItem" key={coffee.id}>
              <div>
                <h3>{coffee.name}</h3>
                <p className="muted">{coffee.origin} • {coffee.roast} • ${coffee.price}</p>
                <div className="chips">
                  {coffee.notes.map((note) => <span key={note}>{note}</span>)}
                </div>
              </div>
              <div className="rightPanel">
                <strong>{coffee.match}% match</strong>
                <select value={feedback[coffee.id] || ""} onChange={(e) => saveFeedback(coffee.id, e.target.value)}>
                  <option value="">Rate after trying</option>
                  <option value="5">Loved it</option>
                  <option value="4">Good</option>
                  <option value="3">Okay</option>
                  <option value="2">Not for me</option>
                  <option value="1">Disliked it</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Prototype Notes</h2>
        <p>
          This version uses rule-based scoring. For a real business, store customer profiles,
          purchase history, and ratings in a database, then replace the scoring function with a
          machine-learning recommendation model once you have enough feedback data.
        </p>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);