import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Coffee,
  Mail,
  MapPin,
  Send,
  Sparkles,
  Star,
  ShoppingBag
} from "lucide-react";

import "./styles.css";

const socials = {
  instagram: "https://www.instagram.com/lotusgate.ai/",
  tiktok: "https://www.tiktok.com/@lotusgatecoffee",
  linkedin: "https://www.linkedin.com/in/lotus-gate-b6ab77415/?skipRedirect=true",
  facebook: "https://www.facebook.com/profile.php?id=61590673413083",
  x: "https://x.com/vietcoff",
  pinterest: "https://www.pinterest.com/vietcoff/"
};
const coffees = [
  { id: 1, name: "Da Lat Arabica Honey Process", origin: "Da Lat, Vietnam", roast: "Medium", notes: ["honey", "citrus", "floral"], sweetness: 5, bitterness: 2, acidity: 4, body: 3, caffeine: 3, description: "A bright, elegant Vietnamese Arabica for people who enjoy sweetness, aroma, and a clean finish." },
  { id: 2, name: "Central Highlands Robusta", origin: "Buon Ma Thuot, Vietnam", roast: "Dark", notes: ["dark chocolate", "bold", "nutty"], sweetness: 2, bitterness: 5, acidity: 1, body: 5, caffeine: 5, description: "A strong, high-caffeine profile inspired by traditional Vietnamese coffee culture." },
  { id: 3, name: "Saigon Phin Blend", origin: "Vietnam", roast: "Medium-Dark", notes: ["chocolate", "caramel", "roasted nuts"], sweetness: 4, bitterness: 4, acidity: 2, body: 5, caffeine: 4, description: "A balanced blend designed for phin brewing, iced coffee, and a rich daily cup." },
  { id: 4, name: "Hanoi Morning Blend", origin: "Vietnam", roast: "Medium", notes: ["brown sugar", "almond", "smooth"], sweetness: 4, bitterness: 3, acidity: 2, body: 4, caffeine: 3, description: "A smooth, approachable profile for customers who prefer a lower-acidity morning coffee." }
];

const defaultProfile = { sweetness: 3, bitterness: 3, acidity: 3, body: 3, caffeine: 3, brew: "Phin", goal: "Daily coffee" };

function scoreCoffee(coffee, profile) {
  let score = 100;
  score -= Math.abs(coffee.sweetness - Number(profile.sweetness)) * 8;
  score -= Math.abs(coffee.bitterness - Number(profile.bitterness)) * 8;
  score -= Math.abs(coffee.acidity - Number(profile.acidity)) * 8;
  score -= Math.abs(coffee.body - Number(profile.body)) * 7;
  score -= Math.abs(coffee.caffeine - Number(profile.caffeine)) * 7;
  if (profile.goal === "High caffeine" && coffee.caffeine >= 4) score += 12;
  if (profile.goal === "Low acidity" && coffee.acidity <= 2) score += 12;
  if (profile.brew === "Phin" && coffee.name.toLowerCase().includes("phin")) score += 10;
  return Math.max(0, Math.min(100, Math.round(score)));
}

function Slider({ label, value, onChange, left, right }) {
  return (
    <label className="sliderGroup">
      <div className="sliderHeader"><span>{label}</span><strong>{value}/5</strong></div>
      <input type="range" min="1" max="5" value={value} onChange={(e) => onChange(e.target.value)} />
      <div className="sliderLabels"><small>{left}</small><small>{right}</small></div>
    </label>
  );
}

function App() {
  const [profile, setProfile] = useState(defaultProfile);
  const [submitted, setSubmitted] = useState(false);
  const ranked = useMemo(() => coffees.map(c => ({ ...c, match: scoreCoffee(c, profile) })).sort((a, b) => b.match - a.match), [profile]);
  const top = ranked[0];
  const update = (field, value) => setProfile(prev => ({ ...prev, [field]: value }));

  return (
    <main>
      <header className="nav">
        <a className="brand" href="#top" aria-label="Lotus Gate home">
          <img src="/lotus-gate-logo.png" alt="Lotus Gate logo" />
          <span>Lotus Gate</span>
        </a>
        <nav>
          <a href="#story">Story</a>
          <a href="#quiz">Taste Quiz</a>
          <a href="#social">Social</a>
          <a href="#waitlist">Waitlist</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="heroText">
          <div className="eyebrow"><Sparkles size={16} /> AI-powered coffee discovery</div>
          <h1>Premium Vietnamese coffee, curated for your taste.</h1>
          <p>Lotus Gate connects authentic Vietnamese coffee culture with an intelligent taste profile experience, helping customers discover the roast, origin, and flavor profile that fits them best.</p>
          <div className="heroActions">
            <a className="primaryBtn" href="#quiz">Find Your Coffee</a>
            <a className="secondaryBtn" href="#social">Follow Lotus Gate</a>
          </div>
        </div>
        <div className="logoCard"><img src="/lotus-gate-logo.png" alt="Lotus Gate lotus and gate logo" /></div>
      </section>

      <section className="section threeCards">
        <article className="infoCard"><Coffee /><h3>Vietnamese Origin</h3><p>Inspired by coffee from Vietnam and future sourcing from farms, roasters, and exporters.</p></article>
        <article className="infoCard"><Star /><h3>Premium Taste</h3><p>Designed around specialty profiles such as Da Lat Arabica, robusta blends, and phin-style coffee.</p></article>
        <article className="infoCard"><ShoppingBag /><h3>Subscription Ready</h3><p>Built toward a future personalized coffee subscription and e-commerce experience.</p></article>
      </section>

      <section className="section story" id="story">
        <div><div className="eyebrow"><MapPin size={16} /> Our beginning</div><h2>From a gift of Vietnamese coffee to a new idea.</h2></div>
        <p>Lotus Gate began with a simple memory: coffee shared by a friend in Vietnam. That experience became the starting point for a broader vision—bringing premium Vietnamese coffee to the U.S. market and using AI to help each customer discover the coffee that best matches their preferences.</p>
      </section>

      <section className="section quizSection" id="quiz">
        <div className="quizIntro"><div className="eyebrow"><Sparkles size={16} /> Taste profile prototype</div><h2>Find your Vietnamese coffee match.</h2><p>Adjust your taste preferences and generate a recommendation. This is the first prototype of the Lotus Gate AI taste engine.</p></div>
        <div className="grid">
          <div className="card">
            <h3>Taste Quiz</h3>
            <Slider label="Sweetness" value={profile.sweetness} onChange={(v) => update("sweetness", v)} left="Dry" right="Sweet" />
            <Slider label="Bitterness" value={profile.bitterness} onChange={(v) => update("bitterness", v)} left="Mild" right="Bold" />
            <Slider label="Acidity" value={profile.acidity} onChange={(v) => update("acidity", v)} left="Low" right="Bright" />
            <Slider label="Body" value={profile.body} onChange={(v) => update("body", v)} left="Light" right="Full" />
            <Slider label="Caffeine" value={profile.caffeine} onChange={(v) => update("caffeine", v)} left="Gentle" right="Strong" />
            <div className="formRow">
              <label>Brew method<select value={profile.brew} onChange={(e) => update("brew", e.target.value)}><option>Phin</option><option>Drip</option><option>Espresso</option><option>Pour-over</option><option>French Press</option></select></label>
              <label>Main goal<select value={profile.goal} onChange={(e) => update("goal", e.target.value)}><option>Daily coffee</option><option>Vietnamese iced coffee</option><option>High caffeine</option><option>Low acidity</option><option>Specialty tasting</option></select></label>
            </div>
            <button className="primaryBtn full" onClick={() => setSubmitted(true)}><Send size={18} /> Generate Recommendation</button>
          </div>
          <div className="card resultCard">
            <h3>Best Match</h3>
            {submitted ? <><div className="matchCircle">{top.match}%</div><h2>{top.name}</h2><p className="muted">{top.origin} • {top.roast}</p><p>{top.description}</p><div className="chips">{top.notes.map(note => <span key={note}>{note}</span>)}</div></> : <p className="placeholder">Complete the quiz and generate a recommendation.</p>}
          </div>
        </div>
      </section>

      <section className="social-section">
  <h2>Follow Lotus Gate</h2>

  <div className="social-links">
  <a href={socials.instagram} className="social-button">Instagram</a>
  <a href={socials.tiktok} className="social-button">TikTok</a>
  <a href={socials.linkedin} className="social-button">LinkedIn</a>
  <a href={socials.facebook} className="social-button">Facebook</a>
  <a href={socials.x} className="social-button">X</a>
  <a href={socials.pinterest} className="social-button">Pinterest</a>
</div>
</section>
      <section className="section waitlist" id="waitlist">
        <div><div className="eyebrow"><Mail size={16} /> Coming soon</div><h2>Join the Lotus Gate waitlist.</h2><p>We are preparing the next version of the platform, coffee sourcing, and early tasting opportunities.</p></div>
        <form className="waitlistForm" onSubmit={(e) => { e.preventDefault(); alert("Thank you for joining the Lotus Gate waitlist!"); }}>
          <input type="email" placeholder="Your email address" required />
          <button className="primaryBtn" type="submit">Join Waitlist</button>
        </form>
      </section>

      <footer>
        <img src="/lotus-gate-logo.png" alt="Lotus Gate logo" />
        <p><strong>Lotus Gate LLC</strong></p>
        <p>Premium Vietnamese Coffee + AI Personalization</p>
        <p><a href="mailto:info@lotusgate.ai">info@lotusgate.ai</a></p>
        <div className="social-icon-links">
  <a href={socials.instagram} target="_blank" rel="noopener noreferrer">IG</a>
  <a href={socials.tiktok} target="_blank" rel="noopener noreferrer">♪</a>
  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">in</a>
  <a href={socials.facebook} target="_blank" rel="noopener noreferrer">f</a>
  <a href={socials.x} target="_blank" rel="noopener noreferrer">𝕏</a>
  <a href={socials.pinterest} target="_blank" rel="noopener noreferrer">P</a>
</div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
