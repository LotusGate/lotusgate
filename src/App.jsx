import React, { useMemo, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  Coffee, Mail, MapPin, Send, Sparkles, Star, ShoppingBag,
  Instagram, Linkedin, Facebook, Twitter, Menu, X as XIcon
} from "lucide-react";
import "./styles.css";

/* ── Social links ─────────────────────────────────────────── */
const socials = {
  instagram: "https://www.instagram.com/lotusgate.ai/",
  tiktok:    "https://www.tiktok.com/@lotusgatecoffee",
  linkedin:  "https://www.linkedin.com/in/lotus-gate-b6ab77415/",
  facebook:  "https://www.facebook.com/profile.php?id=61590673413083",
  x:         "https://x.com/vietcoff",
  pinterest: "https://www.pinterest.com/vietcoff/"
};

/* ── Coffee database ──────────────────────────────────────── */
const coffees = [
  {
    id: 1,
    name: "Da Lat Arabica Honey Process",
    origin: "Da Lat, Vietnam",
    roast: "Medium",
    altitude: "1,500m",
    notes: ["honey", "citrus", "floral"],
    sweetness: 5, bitterness: 2, acidity: 4, body: 3, caffeine: 3,
    description: "A bright, elegant Vietnamese Arabica for people who enjoy sweetness, aroma, and a clean finish.",
    price: "$18 / 250g",
  },
  {
    id: 2,
    name: "Central Highlands Robusta",
    origin: "Buon Ma Thuot, Vietnam",
    roast: "Dark",
    altitude: "800m",
    notes: ["dark chocolate", "bold", "nutty"],
    sweetness: 2, bitterness: 5, acidity: 1, body: 5, caffeine: 5,
    description: "A strong, high-caffeine profile inspired by traditional Vietnamese coffee culture.",
    price: "$16 / 250g",
  },
  {
    id: 3,
    name: "Saigon Phin Blend",
    origin: "Vietnam Blend",
    roast: "Medium-Dark",
    altitude: "900m",
    notes: ["chocolate", "caramel", "roasted nuts"],
    sweetness: 4, bitterness: 4, acidity: 2, body: 5, caffeine: 4,
    description: "A balanced blend designed for phin brewing, iced coffee, and a rich daily cup.",
    price: "$17 / 250g",
  },
  {
    id: 4,
    name: "Hanoi Morning Blend",
    origin: "Vietnam",
    roast: "Medium",
    altitude: "1,200m",
    notes: ["brown sugar", "almond", "smooth"],
    sweetness: 4, bitterness: 3, acidity: 2, body: 4, caffeine: 3,
    description: "A smooth, approachable profile for customers who prefer a lower-acidity morning coffee.",
    price: "$17 / 250g",
  },
];

const defaultProfile = {
  sweetness: 3, bitterness: 3, acidity: 3, body: 3, caffeine: 3,
  brew: "Phin", goal: "Daily coffee"
};

function scoreCoffee(coffee, profile) {
  let score = 100;
  score -= Math.abs(coffee.sweetness - Number(profile.sweetness)) * 8;
  score -= Math.abs(coffee.bitterness - Number(profile.bitterness)) * 8;
  score -= Math.abs(coffee.acidity   - Number(profile.acidity))    * 8;
  score -= Math.abs(coffee.body      - Number(profile.body))       * 7;
  score -= Math.abs(coffee.caffeine  - Number(profile.caffeine))   * 7;
  if (profile.goal === "High caffeine" && coffee.caffeine >= 4)  score += 12;
  if (profile.goal === "Low acidity"   && coffee.acidity  <= 2)  score += 12;
  if (profile.brew === "Phin" && coffee.name.toLowerCase().includes("phin")) score += 10;
  return Math.max(0, Math.min(100, Math.round(score)));
}

/* ── Slider component ─────────────────────────────────────── */
function Slider({ label, value, onChange, left, right }) {
  return (
    <label className="sliderGroup">
      <div className="sliderHeader"><span>{label}</span><strong>{value}/5</strong></div>
      <input
        type="range" min="1" max="5" step="1" value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      />
      <div className="sliderLabels"><small>{left}</small><small>{right}</small></div>
    </label>
  );
}

/* ── Social icons row ─────────────────────────────────────── */
function SocialRow({ className = "" }) {
  const items = [
    { href: socials.instagram, label: "Instagram",  Icon: Instagram },
    { href: socials.tiktok,    label: "TikTok",     Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg> },
    { href: socials.linkedin,  label: "LinkedIn",   Icon: Linkedin },
    { href: socials.facebook,  label: "Facebook",   Icon: Facebook },
    { href: socials.x,         label: "X / Twitter",Icon: Twitter },
    { href: socials.pinterest, label: "Pinterest",  Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 20l4-9"/><path d="M10.7 13.3a4 4 0 1 0 .6-5.6"/></svg> },
  ];
  return (
    <div className={`socialRow ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
           className="socialIcon" aria-label={label}>
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}

/* ── Main App ─────────────────────────────────────────────── */
function App() {
  const [profile, setProfile]     = useState(defaultProfile);
  const [submitted, setSubmitted] = useState(false);
  const [navOpen, setNavOpen]     = useState(false);
  const [waitlistCoffee, setWaitlistCoffee] = useState("");
  const waitlistRef = useRef(null);

  const ranked = useMemo(
    () => coffees
      .map(c => ({ ...c, match: scoreCoffee(c, profile) }))
      .sort((a, b) => b.match - a.match),
    [profile]
  );
  const top = ranked[0];

  const update = (field, value) => setProfile(prev => ({ ...prev, [field]: value }));

  const handleSubscribe = (coffeeName) => {
    setWaitlistCoffee(coffeeName);
    waitlistRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>

      {/* ── Nav ───────────────────────────────────────────── */}
      <header className="nav">
        <a className="brand" href="#top" aria-label="Lotus Gate home">
          <img src="/lotus-gate-logo.png" alt="Lotus Gate logo" />
          <span>Lotus Gate</span>
        </a>
        <nav className={`navLinks ${navOpen ? "open" : ""}`} aria-label="Main navigation">
          <a href="#story"    onClick={() => setNavOpen(false)}>Story</a>
          <a href="#quiz"     onClick={() => setNavOpen(false)}>Taste Quiz</a>
          <a href="#social"   onClick={() => setNavOpen(false)}>Social</a>
          <a href="#waitlist" onClick={() => setNavOpen(false)}>Waitlist</a>
        </nav>
        <button
          className="navToggle"
          aria-label={navOpen ? "Close menu" : "Open menu"}
          onClick={() => setNavOpen(v => !v)}
        >
          {navOpen ? <XIcon size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero" id="top">
        <div className="heroText">
          <div className="eyebrow"><Sparkles size={16} /> AI-powered coffee discovery</div>
          <h1>Premium Vietnamese coffee, curated for your taste.</h1>
          <p>Lotus Gate connects authentic Vietnamese coffee culture with an intelligent taste profile experience — helping you discover the roast, origin, and flavor that fits you best.</p>
          <div className="heroActions">
            <a className="primaryBtn" href="#quiz">Find Your Coffee</a>
            <a className="secondaryBtn" href="#story">Our Story</a>
          </div>
        </div>
        <div className="heroImage">
          <img
            src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80"
            alt="Vietnamese phin coffee dripping into a glass, highlands in background"
            className="heroCoffeeImg"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.classList.add("logoFallback");
              const img = document.createElement("img");
              img.src = "/lotus-gate-logo.png";
              img.alt = "Lotus Gate logo";
              e.target.parentElement.appendChild(img);
            }}
          />
        </div>
      </section>

      {/* ── Three info cards ──────────────────────────────── */}
      <section className="section threeCards">
        <article className="infoCard">
          <Coffee aria-hidden="true" />
          <h3>Vietnamese Origin</h3>
          <p>Sourced directly from farms and roasters in Dak Lak, Da Lat, and the Central Highlands of Vietnam.</p>
        </article>
        <article className="infoCard">
          <Star aria-hidden="true" />
          <h3>Premium Taste</h3>
          <p>Specialty profiles — Da Lat Arabica, bold Robusta blends, and traditional phin-style coffee.</p>
        </article>
        <article className="infoCard">
          <ShoppingBag aria-hidden="true" />
          <h3>Subscription Ready</h3>
          <p>A personalized coffee subscription built around your taste profile, arriving on your schedule.</p>
        </article>
      </section>

      {/* ── Story ─────────────────────────────────────────── */}
      <section className="section story" id="story">
        <div>
          <div className="eyebrow"><MapPin size={16} /> Our beginning</div>
          <h2>From a gift of Vietnamese coffee to a new idea.</h2>
          <p>Lotus Gate began with a simple memory: coffee shared by a friend in Vietnam. That first cup — bold, dark, slowly dripping through a phin filter into sweetened condensed milk — was unlike anything available in the US.</p>
          <p>That experience became the starting point for a broader vision: importing premium Vietnamese coffee directly from highland farms in Da Lat and Buon Ma Thuot, and using AI to help every customer discover the coffee that best matches their own preferences.</p>
          <p>We are heading to Vietnam this summer to source directly — building relationships with farmers, tasting single-origin lots, and laying the foundation for the first AI-personalized Vietnamese coffee brand in America.</p>
        </div>
        <div className="storyVisual">
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80"
            alt="Coffee cherries being harvested on a Vietnamese highland farm"
            className="storyImg"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div className="storyStats">
            <div className="statItem"><strong>2</strong><span>highland regions</span></div>
            <div className="statItem"><strong>4+</strong><span>coffee varieties</span></div>
            <div className="statItem"><strong>AI</strong><span>taste matching</span></div>
          </div>
        </div>
      </section>

      {/* ── Quiz ──────────────────────────────────────────── */}
      <section className="section quizSection" id="quiz">
        <div className="quizIntro">
          <div className="eyebrow"><Sparkles size={16} /> Taste profile engine</div>
          <h2>Find your Vietnamese coffee match.</h2>
          <p>Adjust your taste preferences below and our AI engine will rank all coffees by compatibility with your profile.</p>
        </div>

        <div className="grid">
          {/* Quiz inputs */}
          <div className="card">
            <h3>Your Taste Profile</h3>
            <Slider label="Sweetness" value={profile.sweetness} onChange={(v) => update("sweetness", v)} left="Dry" right="Sweet" />
            <Slider label="Bitterness" value={profile.bitterness} onChange={(v) => update("bitterness", v)} left="Mild" right="Bold" />
            <Slider label="Acidity"    value={profile.acidity}    onChange={(v) => update("acidity",    v)} left="Low"  right="Bright" />
            <Slider label="Body"       value={profile.body}       onChange={(v) => update("body",       v)} left="Light" right="Full" />
            <Slider label="Caffeine"   value={profile.caffeine}   onChange={(v) => update("caffeine",   v)} left="Gentle" right="Strong" />
            <div className="formRow">
              <label>
                Brew method
                <select value={profile.brew} onChange={(e) => update("brew", e.target.value)}>
                  <option>Phin</option>
                  <option>Drip</option>
                  <option>Espresso</option>
                  <option>Pour-over</option>
                  <option>French Press</option>
                </select>
              </label>
              <label>
                Main goal
                <select value={profile.goal} onChange={(e) => update("goal", e.target.value)}>
                  <option>Daily coffee</option>
                  <option>Vietnamese iced coffee</option>
                  <option>High caffeine</option>
                  <option>Low acidity</option>
                  <option>Specialty tasting</option>
                </select>
              </label>
            </div>
            <button className="primaryBtn full" onClick={() => setSubmitted(true)}>
              <Send size={18} aria-hidden="true" /> Generate My Matches
            </button>
          </div>

          {/* Best match result */}
          <div className="card resultCard">
            <h3>Best Match</h3>
            {submitted ? (
              <>
                <div className="matchCircle" aria-label={`${top.match}% match`}>{top.match}%</div>
                <h2>{top.name}</h2>
                <p className="muted">{top.origin} · {top.roast} · {top.altitude}</p>
                <p>{top.description}</p>
                <div className="chips">
                  {top.notes.map(note => <span key={note}>{note}</span>)}
                </div>
                <p className="priceTag">{top.price}</p>
                <button
                  className="primaryBtn full subscribeBtn"
                  onClick={() => handleSubscribe(top.name)}
                >
                  <Mail size={16} aria-hidden="true" /> Subscribe for this coffee
                </button>
              </>
            ) : (
              <p className="placeholder">Complete the quiz and generate your personalized matches.</p>
            )}
          </div>
        </div>

        {/* All ranked results */}
        {submitted && (
          <div className="rankedResults">
            <h3>All coffees ranked for you</h3>
            <div className="rankedGrid">
              {ranked.map((coffee, i) => (
                <div key={coffee.id} className={`rankedCard ${i === 0 ? "topMatch" : ""}`}>
                  <div className="rankedHeader">
                    <span className="rankBadge">#{i + 1}</span>
                    <span className="matchScore">{coffee.match}% match</span>
                  </div>
                  <h4>{coffee.name}</h4>
                  <p className="muted">{coffee.origin} · {coffee.roast}</p>
                  <div className="chips small">
                    {coffee.notes.map(n => <span key={n}>{n}</span>)}
                  </div>
                  <div className="rankedFooter">
                    <span className="priceTag">{coffee.price}</span>
                    <button className="outlineBtn" onClick={() => handleSubscribe(coffee.name)}>
                      Subscribe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Social ────────────────────────────────────────── */}
      <section className="section socialSection" id="social">
        <div>
          <div className="eyebrow"><Sparkles size={16} /> Follow along</div>
          <h2>Join the Lotus Gate community.</h2>
          <p>Follow our journey from Vietnam sourcing trips to your morning cup. Behind-the-scenes farm visits, brewing guides, and early access for followers.</p>
          <SocialRow className="hereSocialRow" />
        </div>
        <div className="socialPlatforms">
          {[
            { name: "Instagram",  handle: "@lotusgate.ai",    href: socials.instagram, color: "#E1306C" },
            { name: "TikTok",     handle: "@lotusgatecoffee", href: socials.tiktok,    color: "#000000" },
            { name: "LinkedIn",   handle: "Lotus Gate",       href: socials.linkedin,  color: "#0077B5" },
            { name: "Pinterest",  handle: "@vietcoff",        href: socials.pinterest, color: "#E60023" },
          ].map(({ name, handle, href, color }) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer"
               className="platformCard" style={{ "--platform-color": color }}>
              <span className="platformName">{name}</span>
              <span className="platformHandle">{handle}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Waitlist ──────────────────────────────────────── */}
      <section className="section waitlist" id="waitlist" ref={waitlistRef}>
        <div>
          <div className="eyebrow"><Mail size={16} /> Coming soon</div>
          <h2>Join the Lotus Gate waitlist.</h2>
          <p>Be first to access our curated Vietnamese coffees, early tasting kits, and personalized subscription launch.</p>
          {waitlistCoffee && (
            <p className="waitlistHint">
              ☕ You selected: <strong>{waitlistCoffee}</strong> — we'll notify you when it's available.
            </p>
          )}
        </div>
        <form
          className="waitlistForm"
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          onSubmit={(e) => {
            /* Remove this block once Formspree is connected */
            e.preventDefault();
            alert(`Welcome to the Lotus Gate waitlist${waitlistCoffee ? ` — we'll let you know about ${waitlistCoffee}` : ""}! We'll be in touch soon.`);
          }}
        >
          <input type="hidden" name="coffee_match" value={waitlistCoffee} />
          <input type="email" name="email" placeholder="Your email address" required aria-label="Email address" />
          <button className="primaryBtn" type="submit">Join Waitlist</button>
        </form>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer>
        <img src="/lotus-gate-logo.png" alt="Lotus Gate logo" width="88" height="88" />
        <p><strong>Lotus Gate LLC</strong></p>
        <p>Premium Vietnamese Coffee · AI Personalization</p>
        <p><a href="mailto:info@lotusgate.ai">info@lotusgate.ai</a></p>
        <SocialRow className="footerSocialRow" />
        <p className="copyright">© {new Date().getFullYear()} Lotus Gate LLC · Michigan, USA</p>
      </footer>

    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
