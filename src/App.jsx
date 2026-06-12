import React, { useMemo, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

/* ── All icons as inline SVGs — zero external dependencies ── */
const CoffeeIcon    = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>;
const MailIcon      = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const MapPinIcon    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const SendIcon      = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>;
const SparklesIcon  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
const StarIcon      = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const BagIcon       = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
const MenuIcon      = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>;
const CloseIcon     = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IgIcon        = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const TikTokIcon    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>;
const LinkedInIcon  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
const FacebookIcon  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const XIcon2        = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20"/></svg>;
const PinterestIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.77 1.26-5.33 1.26-5.33s-.32-.64-.32-1.59c0-1.49.86-2.6 1.93-2.6.91 0 1.35.68 1.35 1.5 0 .91-.58 2.28-.88 3.55-.25 1.06.53 1.92 1.57 1.92 1.88 0 3.14-2.42 3.14-5.28 0-2.18-1.47-3.81-4.12-3.81-3 0-4.87 2.24-4.87 4.75 0 .86.25 1.47.64 1.94.18.21.2.3.14.54-.05.17-.15.59-.19.75-.06.24-.25.33-.46.24-1.32-.54-1.94-2-1.94-3.63 0-2.69 2.27-5.93 6.8-5.93 3.64 0 6.04 2.64 6.04 5.48 0 3.75-2.08 6.57-5.14 6.57-1.03 0-2-.55-2.33-1.18l-.65 2.49c-.23.88-.69 1.77-1.06 2.47.8.24 1.64.37 2.51.37 5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>;

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
const BRAND = "VietCoff";
const coffees = [
  {
    id: 1,
    brand: BRAND,
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
    brand: BRAND,
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
    brand: BRAND,
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
    brand: BRAND,
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
    { href: socials.instagram, label: "Instagram",   Icon: IgIcon },
    { href: socials.tiktok,    label: "TikTok",      Icon: TikTokIcon },
    { href: socials.linkedin,  label: "LinkedIn",    Icon: LinkedInIcon },
    { href: socials.facebook,  label: "Facebook",    Icon: FacebookIcon },
    { href: socials.x,         label: "X / Twitter", Icon: XIcon2 },
    { href: socials.pinterest, label: "Pinterest",   Icon: PinterestIcon },
  ];
  return (
    <div className={`socialRow ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
           className="socialIcon" aria-label={label}>
          <Icon />
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
          {navOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero" id="top">
        <div className="heroText">
          <div className="eyebrow"><SparklesIcon /> AI-powered coffee discovery</div>
          <div className="heroBrandPill">Introducing <strong>VietCoff</strong></div>
          <h1>Premium Vietnamese coffee, curated for your taste.</h1>
          <p>Lotus Gate brings you <strong>VietCoff</strong> — authentic single-origin Vietnamese coffee from the highlands of Da Lat and Buon Ma Thuot, matched to your taste by AI.</p>
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
          <CoffeeIcon aria-hidden="true" />
          <h3>Vietnamese Origin</h3>
          <p>Every VietCoff bag is sourced directly from farms and roasters in Dak Lak, Da Lat, and the Central Highlands.</p>
        </article>
        <article className="infoCard">
          <StarIcon aria-hidden="true" />
          <h3>Premium Taste</h3>
          <p>VietCoff specialty profiles — Da Lat Arabica, bold Robusta blends, and traditional phin-style coffee.</p>
        </article>
        <article className="infoCard">
          <BagIcon aria-hidden="true" />
          <h3>Subscription Ready</h3>
          <p>A personalized VietCoff subscription built around your taste profile, arriving on your schedule.</p>
        </article>
      </section>

      {/* ── Story ─────────────────────────────────────────── */}
      <section className="section story" id="story">
        <div>
          <div className="eyebrow"><MapPinIcon /> Our beginning</div>
          <h2>From a gift of Vietnamese coffee to a new idea.</h2>
          <p>Lotus Gate began with a simple memory: coffee shared by a friend in Vietnam. That first cup — bold, dark, slowly dripping through a phin filter into sweetened condensed milk — was unlike anything available in the US.</p>
          <p>That experience became the starting point for a broader vision: importing premium Vietnamese coffee directly from highland farms in Da Lat and Buon Ma Thuot under our own brand, <strong>VietCoff</strong>. Every bag carries the story of where it came from.</p>
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
          <div className="eyebrow"><SparklesIcon /> VietCoff taste engine</div>
          <h2>Find your VietCoff match.</h2>
          <p>Adjust your taste preferences below and our AI engine will rank all VietCoff coffees by compatibility with your profile.</p>
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
              <SendIcon /> Generate My Matches
            </button>
          </div>

          {/* Best match result */}
          <div className="card resultCard">
            <h3>Best Match</h3>
            {submitted ? (
              <>
                <div className="matchCircle" aria-label={`${top.match}% match`}>{top.match}%</div>
                <p className="brandLabel">{top.brand}</p>
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
                  <MailIcon /> Subscribe for this VietCoff
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
            <h3>All VietCoff blends ranked for you</h3>
            <div className="rankedGrid">
              {ranked.map((coffee, i) => (
                <div key={coffee.id} className={`rankedCard ${i === 0 ? "topMatch" : ""}`}>
                  <div className="rankedHeader">
                    <span className="rankBadge">#{i + 1}</span>
                    <span className="matchScore">{coffee.match}% match</span>
                  </div>
                  <p className="brandLabel">{coffee.brand}</p>
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
          <div className="eyebrow"><SparklesIcon /> Follow along</div>
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
          <div className="eyebrow"><MailIcon /> Coming soon</div>
          <h2>Join the VietCoff waitlist.</h2>
          <p>Be first to access our curated VietCoff blends, early tasting kits, and personalized subscription launch — brought to you by Lotus Gate.</p>
          {waitlistCoffee && (
            <p className="waitlistHint">
              ☕ You selected: <strong>VietCoff — {waitlistCoffee}</strong> — we'll notify you when it's available.
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
            alert(`Welcome to the VietCoff waitlist${waitlistCoffee ? ` — we'll let you know when ${waitlistCoffee} is ready` : ""}! We'll be in touch soon.`);
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
        <p><span className="footerBrand">VietCoff</span> · Premium Vietnamese Coffee · AI Personalization</p>
        <p><a href="mailto:info@lotusgate.ai">info@lotusgate.ai</a></p>
        <SocialRow className="footerSocialRow" />
        <p className="copyright">© {new Date().getFullYear()} Lotus Gate LLC · Michigan, USA</p>
      </footer>

    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
