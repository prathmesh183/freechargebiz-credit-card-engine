import { useState, useEffect, useRef } from "react";

// ─── FreechargeBiz Premium Design Tokens ───────────────────────────────────────
const ORANGE = "#F26522";
const ORANGE_DARK = "#D4531A";
const ORANGE_LIGHT = "#FFF3EE";
const ORANGE_BORDER = "#FDDACC";
const INK = "#1A1A1A";
const INK_SECONDARY = "#4A4A4A";
const MUTED = "#757575";
const SURFACE = "#F8F9FA";
const BORDER = "#EAEAEA";
const WHITE = "#FFFFFF";
const SUCCESS = "#0B8457";
const SUCCESS_BG = "#EAF6F0";
const WARNING = "#D97706";
const WARNING_BG = "#FEF3C7";
const ERROR_RED = "#DC2626";
const ERROR_BG = "#FEE2E2";

// ─── Clean Content Profiles ──────────────────────────────────────────────────
const SOURCE_CONFIGS = {
  sms: {
    title: "Spending Patterns",
    subtitle: "Insights securely calculated from your recent transaction messages.",
    income: 85000,
    spends: { fuel: 3500, dining: 7200, travel: 4500, shopping: 12000, utilities: 3100, entertainment: 4800 },
    merchants: [
      { name: "Swiggy / Zomato", share: "Daily Dining", icon: "🛵" },
      { name: "Amazon Retail", share: "Online Shopping", icon: "📦" },
      { name: "Uber / Ola", share: "Commute", icon: "🚗" },
      { name: "Netflix & Spotify", share: "Recurring Bills", icon: "🎵" }
    ],
    insights: [
      { title: "Frequent Dining Spend", desc: "Regular transaction activity across premium food delivery apps.", tag: "Dining" },
      { title: "Recurring Digital Bills", desc: "Predictable monthly trends match recurring entertainment plans.", tag: "Subscriptions" }
    ]
  },
  upload: {
    title: "Account Statement Audit",
    subtitle: "Verified metrics computed safely from your uploaded statement history.",
    income: 140000,
    spends: { fuel: 6000, dining: 8500, travel: 24000, shopping: 18500, utilities: 11200, entertainment: 3000 },
    merchants: [
      { name: "IndiGo / MakeMyTrip", share: "Travel & Flights", icon: "✈️" },
      { name: "Tata Power / BESST", share: "Utility Bills", icon: "⚡" },
      { name: "Amazon Direct", share: "Online Purchases", icon: "🛍️" },
      { name: "Club Marriott", share: "Hospitality", icon: "🏨" }
    ],
    insights: [
      { title: "Concentrated Travel Spend", desc: "High-value flight and accommodation bookings drive your monthly volume.", tag: "Travel" },
      { title: "Regular Utility Outlays", desc: "Structured recurring bills are settled consistently each month.", tag: "Utilities" }
    ]
  },
  lifestyle: {
    title: "Profile Estimate",
    subtitle: "Baseline profile configured with standard consumer averages.",
    income: 60000,
    spends: { fuel: 2000, dining: 3000, travel: 2000, shopping: 4000, utilities: 2000, entertainment: 1000 },
    merchants: [],
    insights: []
  }
};

const CARDS = {
  daily: {
    id: "daily", name: "Axis My Zone", variant: "Freecharge Preferred Edition", yieldRatio: 0.035,
    tagline: "Optimized for everyday urban purchases and digital apps",
    annualFee: "₹0", joiningFee: "₹0", network: "VISA", rewardYield: "3.5%", approvalTag: "High Eligibility",
    accentFrom: "#0F172A", accentTo: "#1E293B", textColor: "#F1F5F9", subColor: "#94A3B8", chipColor: "#CBD5E1",
    highlights: ["1% fuel surcharge waiver across India", "5% cashback on utility bills via auto-pay", "3% flat cashback on food delivery apps", "Lifetime free credit card structure permanently locked"],
    perks: ["Buy 1 Get 1 free movie tickets on BookMyShow", "Instant in-app EMI conversions", "Contactless NFC payments enabled", "Dedicated 24/7 bank customer care line"],
    savingsBreakdown: [
      { label: "Fuel Surcharges Saved", monthly: 310 },
      { label: "Everyday Purchases Cashback", monthly: 255 },
      { label: "Dining App Cashbacks", monthly: 165 },
    ],
    whyPoints: [
      { title: "Direct statement credits maximize savings", body: "Your routine utility bills and regular dining transactions earn direct category cashback credited straight to your balance, preventing reward expiration." },
      { title: "Highest net value with zero fee friction", body: "For your current spending run-rate, an optimized zero-fee card outperforms premium fee cards by saving you an extra ₹4,200 annually in maintenance fees." },
    ],
    whyNotReason: "Your current travel spend volume is below the baseline needed to break even on premium annual maintenance fees."
  },
  travel: {
    id: "travel", name: "Axis Atlas", variant: "Freecharge Travel Select", yieldRatio: 0.05,
    tagline: "Engineered to maximize value on travel and luxury benefits",
    annualFee: "₹5,000", joiningFee: "₹5,000", network: "MASTERCARD", rewardYield: "5.0%", approvalTag: "Instant Issuance",
    accentFrom: "#1E1B4B", accentTo: "#2E1065", textColor: "#F5F3FF", subColor: "#C084FC", chipColor: "#F59E0B",
    highlights: ["4 EDGE Miles per ₹100 on all travel bookings", "Complimentary domestic & international lounge access", "Air accident coverage up to ₹1 Crore", "Accelerated bonus miles on key spend milestones"],
    perks: ["4 domestic lounge entries per quarter", "2 international lounge entries per year", "Complimentary luxury hotel room upgrades", "Dedicated global travel concierge desk"],
    savingsBreakdown: [
      { label: "Travel Miles Value", monthly: 1340 },
      { label: "Hotel Partner Direct Rebates", monthly: 615 },
      { label: "Lounge Access Cost Saved", monthly: 328 },
    ],
    whyPoints: [
      { title: "Miles conversion beats flat cashback", body: "Your high flight and premium lodging spends generate reward miles that add ₹18,500 more annual value compared to standard cashback cards." },
      { title: "Fast-track hotel and airline tier status", body: "Your travel booking habits earn 2x reward miles while accelerating elite membership status across top airline and hotel loyalty networks." },
    ],
    whyNotReason: "Your regular spending distribution does not meet the higher travel volume needed to unlock premium miles accelerators."
  },
  ecomm: {
    id: "ecomm", name: "Axis ACE", variant: "Freecharge Cashback Plus", yieldRatio: 0.054,
    tagline: "Uncapped returns on everyday digital shopping",
    annualFee: "₹499", joiningFee: "₹499", network: "VISA", rewardYield: "5.4%", approvalTag: "High Eligibility",
    accentFrom: "#022C22", accentTo: "#064E3B", textColor: "#CCFBF1", subColor: "#2DD4BF", chipColor: "#E2E8F0",
    highlights: ["5% cashback on utility bills via Google Pay", "4% cashback on top dining and delivery apps", "2% unlimited cashback on all other purchases", "Permanent cashback returns with zero expiration date"],
    perks: ["Seamless digital wallet cashback integration", "Complimentary premium entertainment subscriptions", "Easy online EMI options on checkouts", "Instant credit line activations"],
    savingsBreakdown: [
      { label: "Online Retail Cashback Dividends", monthly: 520 },
      { label: "Ecosystem Utility Cashbacks", monthly: 335 },
      { label: "Food Delivery Platform Multipliers", monthly: 225 },
    ],
    whyPoints: [
      { title: "Highest return on domestic utility bills", body: "Your high monthly bills and shopping volume earn peak returns via the Axis ACE card, automatically applied to your statement balance." },
      { title: "Uncapped cashback on food delivery apps", body: "Your regular food orders trigger a guaranteed 4% return, translating into a clean and predictable ₹2,700 annual saving." },
    ],
    whyNotReason: "Your category spend pattern indicates you would miss out on the higher specialized digital rewards offered by this card."
  },
};

const SPEND_CATEGORIES = [
  { id: "travel", label: "Travel & Flights", color: "#6366F1", hint: "Airlines, hotels, holidays" },
  { id: "shopping", label: "Online Shopping", color: "#8B5CF6", hint: "E-commerce, retail stores" },
  { id: "dining", label: "Dining & Delivery", color: "#EF4444", hint: "Restaurants, Swiggy, Zomato" },
  { id: "fuel", label: "Fuel & Transport", color: "#F59E0B", hint: "Fuel stations, cabs, transit" },
  { id: "utilities", label: "Bills & Utilities", color: "#0B8457", hint: "Electricity, mobile, internet" },
  { id: "entertainment", label: "Entertainment", color: "#F43F5E", hint: "Movie tickets, events, streaming" },
];

function fmt(n) { return "₹" + Math.round(n).toLocaleString("en-IN"); }

function FCBizLogo({ scale = 1 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", transform: `scale(${scale})`, transformOrigin: "left center" }}>
      <svg width="45" height="32" viewBox="0 0 45 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 4 }}>
        <path d="M18 2L5 15.5H23L7 30L38 15.5H18L26 2Z" fill={ORANGE} />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontWeight: 800, fontSize: 19, fontStyle: "italic", letterSpacing: "0.02em", color: ORANGE }}>
            FREECHARGE
          </span>
          <div style={{ background: ORANGE, padding: "1px 6px", borderRadius: 2, transform: "skewX(-10deg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: WHITE, fontWeight: 900, fontSize: 13, fontStyle: "italic", letterSpacing: "0.02em" }}>
              BIZ
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: -2, paddingLeft: 2 }}>
          <span style={{ fontSize: 10, color: "#7A2244", fontWeight: 500, marginRight: 4 }}>by</span>
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 3, marginTop: 1 }}>
            <path d="M6 0L0 10H3.5L6 4L8.5 10H12L6 0Z" fill="#7A2244" />
          </svg>
          <span style={{ fontSize: 9, color: "#7A2244", fontWeight: 700, letterSpacing: "0.08em" }}>AXIS BANK</span>
        </div>
      </div>
    </div>
  );
}

function EMVChip({ color = "#CBD5E1" }) {
  return (
    <div style={{ width: 34, height: 24, borderRadius: 4, background: `linear-gradient(135deg, ${color}cc, ${color}44)`, border: "1px solid rgba(255,255,255,0.2)", padding: 3, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{ borderRadius: 1, background: "rgba(255,255,255,0.3)", border: "0.5px solid rgba(0,0,0,0.1)" }} />
      ))}
    </div>
  );
}

function CreditCard({ card, flipped, onClick, compact }) {
  const baseWidth = compact ? 310 : 330;
  const baseHeight = baseWidth / 1.586;
  const bg = card.accentFrom.startsWith("linear") ? card.accentFrom : `linear-gradient(135deg, ${card.accentFrom} 0%, ${card.accentTo} 100%)`;

  return (
    <div onClick={onClick} style={{ perspective: 1200, cursor: onClick ? "pointer" : "default", width: baseWidth, height: baseHeight, margin: "0 auto" }}>
      <div style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", borderRadius: 16, background: bg, padding: "20px 22px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", boxShadow: "0 16px 36px -12px rgba(0,0,0,0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>AXIS BANK CO-BRANDED</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: WHITE, marginTop: 2 }}>{card.variant}</div>
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", padding: "3px 8px", borderRadius: 4, color: WHITE, letterSpacing: "0.05em" }}>{card.network}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <EMVChip color={card.chipColor} />
            <div style={{ fontSize: 17, fontWeight: 800, color: ORANGE, letterSpacing: "-0.03em" }}>fc<span style={{ color: WHITE, fontWeight: 300, fontSize: 12 }}>biz</span></div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 10 }}>
            <div style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.16em", color: "rgba(255,255,255,0.5)" }}>•••• •••• •••• 8094</div>
            <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>09/31</div>
          </div>
        </div>
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: 16, background: bg, overflow: "hidden", boxShadow: "0 16px 36px -12px rgba(0,0,0,0.3)" }}>
          <div style={{ height: 40, background: "rgba(0,0,0,0.85)", marginTop: 20, width: "100%" }} />
          <div style={{ padding: "14px 22px" }}>
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 4, padding: "5px 12px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", marginRight: 6 }}>SIGNATURE</div>
              <div style={{ background: WHITE, color: "#000", fontFamily: "monospace", fontSize: 12, fontWeight: 700, padding: "2px 6px", borderRadius: 2 }}>894</div>
            </div>
            <div style={{ marginTop: 10, fontSize: 9, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>
              {card.highlights.slice(0, 2).map((h, i) => <div key={i} style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>• {h}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepBar({ total = 9, current }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div style={{ height: 3, background: BORDER, borderRadius: 2, overflow: "hidden", flex: 1, maxWidth: 100 }}>
      <div style={{ height: "100%", width: `${pct}%`, background: ORANGE, borderRadius: 2, transition: "width 0.35s ease" }} />
    </div>
  );
}

function Btn({ children, onClick, disabled, secondary, small }) {
  const h = small ? 40 : 50;
  if (secondary) return (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, height: h, borderRadius: 12, border: `1.5px solid ${ORANGE}`, background: WHITE, color: ORANGE, fontSize: small ? 13 : 15, fontWeight: 600, cursor: "pointer", width: "100%", fontFamily: "inherit" }}>{children}</button>
  );
  return (
    <button onClick={onClick} disabled={disabled} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, height: h, borderRadius: 12, border: "none", background: disabled ? "#E0E0E0" : ORANGE, color: disabled ? "#A0A0A0" : WHITE, fontSize: small ? 13 : 15, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", width: "100%", fontFamily: "inherit", transition: "all 0.2s" }}>{children}</button>
  );
}

function Shell({ step, total = 9, onBack, children, hideHeader, style }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUpSheet { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-4px); } 40%, 80% { transform: translateX(4px); } }
        input[type=range] { -webkit-appearance: none; background: transparent; cursor: pointer; }
        input[type=range]:focus { outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: ${ORANGE}; border: 2px solid ${WHITE}; box-shadow: 0 2px 4px rgba(0,0,0,0.15); cursor: pointer; }
        input:focus { outline: none; }
        button:focus { outline: none; }
        ::-webkit-scrollbar { width: 0; }
      `}</style>
      <main style={{ width: "100%", maxWidth: 412, background: WHITE, borderRadius: 24, overflow: "hidden", display: "flex", flexDirection: "column", minHeight: 730, maxHeight: 860, boxShadow: "0 20px 40px rgba(0,0,0,0.06)", animation: "fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both", position: "relative", ...style }}>
        {!hideHeader && (
          <header style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${BORDER}`, background: WHITE, position: "sticky", top: 0, zIndex: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {onBack && (
                <button onClick={onBack} style={{ background: SURFACE, border: "none", borderRadius: 10, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: INK, fontSize: 16, fontWeight: "bold" }}>‹</button>
              )}
              <FCBizLogo scale={0.78} />
            </div>
            <StepBar total={total} current={step} />
          </header>
        )}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>{children}</div>
      </main>
    </div>
  );
}

function OnboardingScreen({ onNext }) {
  const [mobile, setMobile] = useState("");
  const valid = mobile.length === 10;

  return (
    <Shell step={0} hideHeader>
      <div style={{ background: "linear-gradient(135deg, #FFFDFB 0%, #FFF5EF 100%)", borderBottom: `1px solid ${BORDER}`, padding: "44px 24px 32px", position: "relative" }}>
        <FCBizLogo scale={1.05} />
        <h1 style={{ fontSize: 24, fontWeight: 700, color: INK, margin: "20px 0 6px", letterSpacing: "-0.02em", lineHeight: 1.25 }}>
          Welcome to<br />FreechargeBiz
        </h1>
        <p style={{ fontSize: 14, color: INK_SECONDARY, margin: 0 }}>
          Verify your mobile number to view card recommendations.
        </p>
      </div>

      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", height: 52, borderRadius: 12, border: `1px solid ${valid ? ORANGE : BORDER}`, background: WHITE, padding: "0 16px", transition: "all 0.2s", marginBottom: 24 }}>
            <span style={{ fontSize: 16, marginRight: 8 }}>🇮🇳</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: INK_SECONDARY, borderRight: `1px solid ${BORDER}`, paddingRight: 12, marginRight: 12 }}>+91</span>
            <input
              value={mobile}
              onChange={e => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="Enter mobile number"
              inputMode="numeric"
              style={{ flex: 1, border: "none", background: "transparent", fontSize: 15, fontWeight: 600, color: INK, fontFamily: "inherit", letterSpacing: "0.02em" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["Secure Bank Infrastructure", "Your records are handled under strict Axis Bank security protocols."],
              ["Tailored Card Matching", "Analyzes spending habits against current partner category benefits."],
              ["Zero Credit Score Impact", "Pre-qualification checks run a soft query without affecting credit metrics."]
            ].map(([title, desc], i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "start", padding: "12px 14px", borderRadius: 12, background: SURFACE }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: ORANGE, marginTop: 6, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{title}</div>
                  <div style={{ fontSize: 12, color: MUTED, marginTop: 2, lineHeight: 1.4 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <Btn onClick={() => onNext(mobile)} disabled={!valid}>Continue</Btn>
        </div>
      </div>
    </Shell>
  );
}

function OTPScreen({ mobile, onNext, onBack }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const refs = useRef([]);

  const verifyOTP = (currentOtpArray) => {
    const fullOtp = currentOtpArray.join("");
    if (fullOtp === "123456") {
      setError(false);
      onNext();
    } else {
      setError(true);
    }
  };

  const handleTextChange = (i, val) => {
    const cleanVal = val.replace(/\D/g, "").slice(-1);
    if (!cleanVal && val !== "") return;

    setError(false);
    const next = [...otp];
    next[i] = cleanVal;
    setOtp(next);

    if (cleanVal && i < 5) {
      refs.current[i + 1]?.focus();
      setTimeout(() => refs.current[i + 1]?.select(), 5);
    }

    if (next.every(digit => digit !== "")) {
      verifyOTP(next);
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace") {
      setError(false);
      if (!otp[i] && i > 0) {
        const next = [...otp];
        next[i - 1] = "";
        setOtp(next);
        refs.current[i - 1]?.focus();
        setTimeout(() => refs.current[i - 1]?.select(), 5);
      } else if (otp[i]) {
        const next = [...otp];
        next[i] = "";
        setOtp(next);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    if (pasteData.length > 0) {
      const next = [...otp];
      pasteData.forEach((char, idx) => {
        if (idx < 6) next[idx] = char;
      });
      setOtp(next);
      if (pasteData.length === 6) {
        verifyOTP(next);
      } else {
        refs.current[pasteData.length]?.focus();
      }
    }
  };

  const isFormComplete = otp.every(d => d !== "");

  return (
    <Shell step={1} onBack={onBack}>
      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: INK, margin: "0 0 6px", letterSpacing: "-0.01em" }}>Enter Verification Code</h2>
        <p style={{ fontSize: 14, color: MUTED, margin: "0 0 16px", lineHeight: 1.4 }}>
          We sent a 6-digit verification code to <strong style={{ color: INK }}>+91 •••••{mobile.slice(-5)}</strong>
        </p>
        
        <div style={{ display: "inline-flex", alignItems: "center", background: WARNING_BG, border: `1px solid ${WARNING}25`, borderRadius: 8, padding: "6px 12px", marginBottom: 24, width: "fit-content" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: WARNING }}>Demo Bypass Code: 123456</span>
        </div>

        <div 
          onPaste={handlePaste}
          style={{ 
            display: "flex", 
            gap: 6, 
            marginBottom: error ? 12 : 24,
            animation: error ? "shake 0.4s ease both" : "none"
          }}
        >
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={el => refs.current[i] = el}
              value={digit}
              onFocus={e => e.target.select()}
              onChange={e => handleTextChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              maxLength={1}
              inputMode="numeric"
              pattern="[0-9]*"
              style={{ 
                flex: "1 1 0",
                height: 48,
                textAlign: "center",
                fontSize: 20,
                fontWeight: 700,
                color: error ? ERROR_RED : INK,
                border: `1px solid ${error ? ERROR_RED : (digit ? ORANGE : BORDER)}`,
                borderRadius: 10,
                background: error ? ERROR_BG : (digit ? ORANGE_LIGHT : SURFACE),
                fontFamily: "inherit",
                transition: "all 0.15s",
                minWidth: 0
              }}
            />
          ))}
        </div>

        {error && (
          <div style={{ fontSize: 13, fontWeight: 600, color: ERROR_RED, marginBottom: 20 }}>
            Incorrect code entered. Please try again.
          </div>
        )}

        <p style={{ fontSize: 13, color: MUTED, marginBottom: 0 }}>
          Didn't receive the code? <span style={{ color: ORANGE, fontWeight: 600, cursor: "pointer" }}>Resend Code</span>
        </p>

        <div style={{ flex: 1 }} />
        <Btn onClick={() => verifyOTP(otp)} disabled={!isFormComplete}>Verify & Continue</Btn>
      </div>
    </Shell>
  );
}

function FrameworkSelectionScreen({ onSelect, onBack }) {
  return (
    <Shell step={2} onBack={onBack}>
      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: INK, margin: "0 0 6px", letterSpacing: "-0.01em" }}>Select Profile Method</h2>
          <p style={{ fontSize: 14, color: MUTED, margin: 0 }}>Choose how you would like to map your spending preferences.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
          {[
            { key: "sms", title: "Analyze transaction messages", desc: "Scans merchant text alerts locally on your device for quick tracking.", meta: "Takes ~10 seconds", badge: "Fastest", active: true },
            { key: "upload", title: "Upload account statement", desc: "Verifies official banking PDF format statements securely.", meta: "Takes ~30 seconds", badge: null, active: false },
            { key: "lifestyle", title: "Estimate lifestyle habits", desc: "Input your monthly categories and values manually.", meta: "Instant Setup", badge: null, active: false },
          ].map(opt => (
            <div
              key={opt.key}
              onClick={() => onSelect(opt.key)}
              style={{
                padding: "16px",
                borderRadius: 14,
                border: `1.5px solid ${opt.active ? ORANGE : BORDER}`,
                background: opt.active ? ORANGE_LIGHT : WHITE,
                cursor: "pointer",
                position: "relative",
                transition: "all 0.15s"
              }}>
              {opt.badge && (
                <div style={{ position: "absolute", right: 14, top: 14, fontSize: 10, fontWeight: 700, color: WHITE, background: ORANGE, padding: "2px 8px", borderRadius: 8 }}>{opt.badge}</div>
              )}
              <div style={{ fontSize: 15, fontWeight: 600, color: INK, marginBottom: 4 }}>{opt.title}</div>
              <div style={{ fontSize: 13, color: MUTED, marginBottom: 8, lineHeight: 1.4 }}>{opt.desc}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: opt.active ? ORANGE : MUTED }}>{opt.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

function DataConsentScreen({ onAuthorize, onBack }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <Shell step={3} onBack={onBack} hideHeader style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ 
          background: WHITE, 
          borderTopLeftRadius: 24, 
          borderTopRightRadius: 24, 
          padding: "24px 24px 20px", 
          maxHeight: "90%", 
          display: "flex", 
          flexDirection: "column",
          animation: "slideUpSheet 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
          boxShadow: "0 -10px 30px rgba(0,0,0,0.08)"
        }}>
          <div style={{ width: 36, height: 4, background: BORDER, borderRadius: 2, margin: "0 auto 20px" }} />
          
          <div>
            <div style={{ display: "inline-block", background: ORANGE_LIGHT, border: `1px solid ${ORANGE_BORDER}`, borderRadius: 20, padding: "2px 10px", marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: ORANGE }}>Regulatory Compliance</span>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: INK, margin: "0 0 6px", letterSpacing: "-0.01em" }}>Data Authorization</h2>
            <p style={{ fontSize: 13, color: MUTED, margin: "0 0 20px", lineHeight: 1.4 }}>
              Review how your info is handled securely to calculate match metrics under bank safety standards.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {[
                "Transaction Records: Only authorized local merchant tokens and value receipts are reviewed.",
                "Credit History Check: Verification triggers a soft query that has zero impact on credit scores.",
                "Ecosystem Mapping: Evaluates current category weights to identify premium rewards compatibility."
              ].map((bullet, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "start" }}>
                  <span style={{ color: SUCCESS, fontWeight: "bold", fontSize: 13 }}>✓</span>
                  <p style={{ margin: 0, fontSize: 13, color: INK_SECONDARY, lineHeight: 1.4 }}>{bullet}</p>
                </div>
              ))}
            </div>

            <label style={{ display: "flex", gap: 10, cursor: "pointer", marginBottom: 20, alignItems: "start" }}>
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={e => setAgreed(e.target.checked)} 
                style={{ marginTop: 3, accentColor: ORANGE, width: 15, height: 15 }} 
              />
              <span style={{ fontSize: 12, color: MUTED, lineHeight: 1.4 }}>
                I authorize FreechargeBiz to process my secure spend tokens solely for the purposes of generating personal card recommendations.
              </span>
            </label>
            <Btn onClick={onAuthorize} disabled={!agreed}>Agree & Continue</Btn>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function ProcessingSimulationScreen({ source, onNext }) {
  const [logIndex, setLogIndex] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const isUpload = source === "upload";
  
  const smsLogs = ["Scanning transaction histories...", "Mapping merchant records to categories...", "Identifying recurring billing patterns...", "Evaluating reward tier options...", "Profile created successfully!"];
  const uploadLogs = ["Reading statement layout...", "Scanning monthly line items...", "Identifying recurring category entries...", "Matching partner category weights...", "Statement verified successfully!"];
  const logs = isUpload ? uploadLogs : smsLogs;

  useEffect(() => {
    if (isUpload && uploadProgress < 100) {
      const t = setInterval(() => setUploadProgress(p => {
        if (p >= 100) {
          clearInterval(t);
          return 100;
        }
        return p + 10;
      }), 200);
      return () => clearInterval(t);
    }
  }, [isUpload, uploadProgress]);

  useEffect(() => {
    if (!isUpload || uploadProgress === 100) {
      const t = setInterval(() => {
        setLogIndex(prev => {
          if (prev < logs.length - 1) return prev + 1;
          clearInterval(t);
          setTimeout(onNext, 800);
          return prev;
        });
      }, 600);
      return () => clearInterval(t);
    }
  }, [isUpload, uploadProgress, logs.length, onNext]);

  return (
    <Shell step={4}>
      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {isUpload && uploadProgress < 100 ? (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ width: 52, height: 52, borderRadius: 12, background: ORANGE_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, margin: "0 auto 16px" }}>📄</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: INK, margin: "0 0 6px", textAlign: "center" }}>Uploading Document</h3>
            <p style={{ fontSize: 13, color: MUTED, margin: "0 0 24px", textAlign: "center" }}>Processing statement structure safely...</p>
            <div style={{ height: 4, background: BORDER, borderRadius: 2, overflow: "hidden", width: 160, margin: "0 auto" }}>
              <div style={{ height: "100%", width: `${uploadProgress}%`, background: ORANGE, transition: "width 0.2s" }} />
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, animation: "fadeIn 0.3s ease" }}>
            <div style={{ position: "relative", width: 72, height: 72 }}>
              <svg width="72" height="72" viewBox="0 0 72 72">
                <circle cx="36" cy="36" r="32" fill="none" stroke={`${ORANGE}15`} strokeWidth="3" />
              </svg>
              <svg style={{ position: "absolute", inset: 0, animation: "spin 1.2s linear infinite" }} width="72" height="72" viewBox="0 0 72 72">
                <circle cx="36" cy="36" r="32" fill="none" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeDasharray="150 50" strokeDashoffset="0" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 36 36" fill="none">
                  <path d="M22 6L12 19.5H19L17 30L27 16.5H20L22 6Z" fill={ORANGE}/>
                </svg>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: INK, margin: "0 0 4px" }}>
                {isUpload ? "Verifying Statement" : "Analyzing Spending Patterns"}
              </h3>
              <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>
                {isUpload ? "Reviewing items for category rewards." : "Computing local tokens for custom profile rewards."}
              </p>
            </div>
          </div>
        )}

        {(!isUpload || uploadProgress === 100) && (
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "12px 16px", width: "100%", maxWidth: 300, margin: "32px auto 0", minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: INK, textAlign: "center" }}>{logs[logIndex]}</span>
          </div>
        )}
      </div>
    </Shell>
  );
}

function InsightsDashboardScreen({ source, onNext }) {
  const config = SOURCE_CONFIGS[source || "lifestyle"];
  const totalSpend = Object.values(config.spends).reduce((a, b) => a + b, 0);
  const spendValues = Object.values(config.spends);
  const maxSpend = Math.max(...spendValues, 1);
  const svgW = 320, svgH = 80;
  const pts = spendValues.map((v, i) => `${(i / (spendValues.length - 1)) * svgW},${svgH - (v / maxSpend) * (svgH - 12) - 6}`);
  const dPath = `M ${pts.join(" L ")}`;

  return (
    <Shell step={5}>
      <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <div style={{ background: SUCCESS_BG, borderRadius: 12, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: SUCCESS, fontWeight: "bold" }}>✓</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: SUCCESS, lineHeight: 1.4 }}> Verified Profile: Eligible tier matching ₹{config.income.toLocaleString("en-IN")}/mo base limit</span>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: INK, margin: "0 0 4px", letterSpacing: "-0.01em" }}>Spending Distribution</h2>
        <p style={{ fontSize: 13, color: MUTED, margin: "0 0 20px" }}>{config.subtitle}</p>

        {config.merchants.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: MUTED, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 10 }}>Frequent Outlets</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {config.merchants.map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: SURFACE, borderRadius: 10 }}>
                  <span style={{ fontSize: 16 }}>{m.icon}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: INK, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>{m.share}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: SURFACE, borderRadius: 14, padding: "16px", marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: MUTED, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 12 }}>Monthly Outlays</div>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: INK }}>{fmt(totalSpend)}</div>
              <div style={{ fontSize: 12, color: MUTED, marginTop: 1 }}>Total categorized spend / mo</div>
            </div>
          </div>

          <div style={{ margin: "0 -4px 16px", overflow: "hidden" }}>
            <svg width="100%" height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="none" style={{ display: "block" }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={ORANGE} stopOpacity="0.15" />
                  <stop offset="100%" stopColor={ORANGE} stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d={`${dPath} L ${svgW},${svgH} L 0,${svgH} Z`} fill="url(#g1)" />
              <path d={dPath} fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SPEND_CATEGORIES.map(cat => {
              const value = config.spends[cat.id] || 0;
              const pct = totalSpend > 0 ? Math.round((value / totalSpend) * 100) : 0;
              if (!value) return null;
              return (
                <div key={cat.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                    <span style={{ fontWeight: 500, color: INK }}>{cat.label}</span>
                    <span style={{ fontWeight: 600, color: INK }}>{fmt(value)} <span style={{ color: MUTED, fontWeight: 400 }}>({pct}%)</span></span>
                  </div>
                  <div style={{ height: 4, background: "#E5E7EB", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: cat.color, borderRadius: 2 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {config.insights.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {config.insights.map((b, i) => (
              <div key={i} style={{ padding: "12px", background: SURFACE, borderRadius: 12, display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: ORANGE, textTransform: "uppercase", letterSpacing: "0.02em" }}>{b.tag}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{b.title}</div>
                <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.4 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "auto" }}>
          <Btn onClick={onNext}>Continue Setup</Btn>
        </div>
      </div>
    </Shell>
  );
}

function SpendProfilerScreen({ source, onNext, onBack }) {
  const config = SOURCE_CONFIGS[source || "lifestyle"];
  const [income, setIncome] = useState(config.income);
  const [spends, setSpends] = useState({ ...config.spends });

  return (
    <Shell step={6} onBack={onBack}>
      <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: INK, margin: "0 0 4px", letterSpacing: "-0.01em" }}>Adjust Estimates</h2>
          <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>Review or modify your parameters below to refine card matching thresholds.</p>
        </div>

        <div style={{ background: SURFACE, borderRadius: 14, padding: "16px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, color: INK, marginBottom: 8 }}>
            <span>Monthly Income</span>
            <span style={{ color: ORANGE, fontWeight: 700 }}>{fmt(income)}</span>
          </div>
          <input 
            type="range" 
            min={20000} 
            max={300000} 
            step={5000} 
            value={income} 
            onChange={e => setIncome(+e.target.value)} 
            style={{ width: "100%", height: 4, borderRadius: 2, background: `linear-gradient(to right, ${ORANGE} ${((income - 20000) / 280000) * 100}%, ${BORDER} ${((income - 20000) / 280000) * 100}%)` }} 
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {SPEND_CATEGORIES.map(cat => {
            const val = spends[cat.id] || 0;
            const pct = income > 0 ? Math.round((val / income) * 100) : 0;
            return (
              <div key={cat.id} style={{ padding: "12px 14px", borderRadius: 12, background: WHITE, border: `1px solid ${BORDER}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{cat.label}</div>
                    <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>{cat.hint}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{fmt(val)}</div>
                    <div style={{ fontSize: 10, color: MUTED, marginTop: 1 }}>{pct}% of income</div>
                  </div>
                </div>
                <input 
                  type="range" 
                  min={0} 
                  max={40000} 
                  step={500} 
                  value={val} 
                  onChange={e => setSpends(p => ({ ...p, [cat.id]: +e.target.value }))} 
                  style={{ width: "100%", height: 4, borderRadius: 2, background: `linear-gradient(to right, ${cat.color} ${(val / 40000) * 100}%, #E5E7EB ${(val / 40000) * 100}%)` }} 
                />
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: "auto" }}>
          <Btn onClick={() => onNext({ income, spends })}>Calculate Recommendation</Btn>
        </div>
      </div>
    </Shell>
  );
}

function OptimizationAnalysisScreen({ spendData, onDone }) {
  const [phase, setPhase] = useState(0);
  const steps = ["Evaluating partner reward rules...", "Calculating category rewards structure...", "Checking tier eligibility credentials...", "Finalizing card match recommendation..."];

  useEffect(() => {
    const t = setInterval(() => {
      setPhase(prev => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(t);
        
        const spends = spendData?.spends || { travel: 0, dining: 0, shopping: 0 };
        let selectedId = "daily";
        if (spends.travel > 12000) {
          selectedId = "travel";
        } else if (spends.shopping > 8000 || spends.dining > 5000) {
          selectedId = "ecomm";
        }
        setTimeout(() => onDone(selectedId), 600);
        return prev;
      });
    }, 600);
    return () => clearInterval(t);
  }, [spendData, onDone, steps.length]);

  return (
    <Shell step={7}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ position: "relative", width: 72, height: 72, marginBottom: 24 }}>
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="32" fill="none" stroke={`${ORANGE}15`} strokeWidth="3" />
          </svg>
          <svg style={{ position: "absolute", inset: 0, animation: "spin 1.2s linear infinite" }} width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="32" fill="none" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeDasharray="150 50" strokeDashoffset="0" />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 36 36" fill="none">
              <path d="M22 6L12 19.5H19L17 30L27 16.5H20L22 6Z" fill={ORANGE}/>
            </svg>
          </div>
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: INK, margin: "0 0 6px", textAlign: "center" }}>Finding Best Matching Card</h2>
        <p style={{ fontSize: 13, color: MUTED, textAlign: "center", margin: 0, minHeight: 20 }}>{steps[phase]}</p>
      </div>
    </Shell>
  );
}

function RecommendationScreen({ cardId, spendData, onBack, onCompare }) {
  const card = CARDS[cardId || "daily"];
  const [tab, setTab] = useState("why");
  const [flipped, setFlipped] = useState(false);
  
  const initialSpendsSum = Object.values(spendData?.spends || {}).reduce((a, b) => a + b, 0);
  const [calcSpend, setCalcSpend] = useState(initialSpendsSum || 25000);
  const [leadStep, setLeadStep] = useState(0);
  const [profession, setProfession] = useState("");
  const [refId, setRefId] = useState("");

  const dynamicCalculatorSavings = calcSpend * 12 * card.yieldRatio;

  // ── Dynamic reasoning: derive real numbers from actual user spend inputs ──
  const spends = spendData?.spends || {};
  const totalSpend = Object.values(spends).reduce((a, b) => a + b, 0);

  // Find top 2 categories by value
  const rankedCategories = SPEND_CATEGORIES
    .map(cat => ({ ...cat, value: spends[cat.id] || 0 }))
    .filter(cat => cat.value > 0)
    .sort((a, b) => b.value - a.value);

  const topCat = rankedCategories[0] || { label: "Online Shopping", value: 12000, id: "shopping" };
  const secondCat = rankedCategories[1] || { label: "Dining & Delivery", value: 5000, id: "dining" };

  // Card-specific annual yield on top category
  const topCatAnnualReturn = Math.round(topCat.value * 12 * card.yieldRatio);
  const topCatPct = totalSpend > 0 ? Math.round((topCat.value / totalSpend) * 100) : 0;

  // How much they're missing without this card (35% of total potential)
  const currentCardLeakage = Math.round(totalSpend * 12 * card.yieldRatio * 0.35);

  // Card-specific insight copy
  const cardInsightMap = {
    daily: {
      point1Title: `Your top spend is ${topCat.label} at ${topCatPct}% of monthly outflow`,
      point1Body: `You spend ${fmt(topCat.value)}/month on ${topCat.label}. Axis My Zone's zero-fee structure means every rupee you earn in cashback stays with you — no annual fee eating into your returns.`,
      point2Title: `${secondCat.label} earns you direct statement credits`,
      point2Body: `Your ${fmt(secondCat.value)}/month on ${secondCat.label} earns direct cashback credited straight to your balance — no points to redeem, no expiry to worry about. That's ${fmt(secondCat.value * 12 * 0.03)} back every year just from this category.`,
    },
    travel: {
      point1Title: `${fmt(topCat.value)}/month on ${topCat.label} is your biggest lever`,
      point1Body: `Your travel volume generates ${fmt(topCatAnnualReturn)} in EDGE Miles annually on Axis Atlas — ${fmt(Math.round(topCatAnnualReturn * 1.3))} more than any flat cashback card would give you on the same spend.`,
      point2Title: `Your ${fmt(secondCat.value)}/month on ${secondCat.label} triggers milestone bonuses`,
      point2Body: `Axis Atlas rewards consistent spending across categories. Your ${secondCat.label} volume accelerates you toward quarterly milestone tiers that unlock bonus miles and hotel upgrade vouchers.`,
    },
    ecomm: {
      point1Title: `${fmt(topCat.value)}/month on ${topCat.label} — your highest-yield category`,
      point1Body: `Axis ACE pays 5% on utility bills and 4% on food apps — your two biggest spends. At your current run-rate, that's ${fmt(topCatAnnualReturn)} back per year, automatically applied to your statement.`,
      point2Title: `Without this card, you're leaving ${fmt(currentCardLeakage)}/year on the table`,
      point2Body: `Based on your ${fmt(totalSpend)}/month total spend and current category mix, you're missing ${fmt(currentCardLeakage)} in annual cashback that Axis ACE would have captured automatically.`,
    },
  };

  const dynamicInsights = cardInsightMap[cardId] || cardInsightMap.daily;

  const handleApplyClick = () => {
    if (leadStep === 0) {
      setLeadStep(1);
    } else if (leadStep === 1 && profession) {
      const randDigits = Math.floor(1000 + Math.random() * 9000).toString();
      setRefId("FC-2026-" + randDigits);
      setLeadStep(2);
    }
  };

  return (
    <Shell step={8} onBack={onBack}>
      <div style={{ padding: "16px 20px", flex: 1, overflowY: "auto" }}>
        <div style={{ background: SUCCESS_BG, borderRadius: 12, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
          <span style={{ color: SUCCESS, fontWeight: "bold" }}>✓</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: SUCCESS, textAlign: "center" }}> Pre-Approved: Eligible tier based on your ₹{(spendData?.income || 60000).toLocaleString("en-IN")}/mo profile</span>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: ORANGE_LIGHT, border: `1px solid ${ORANGE_BORDER}`, borderRadius: 20, padding: "4px 12px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: ORANGE }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: ORANGE }}>Matched — {card.rewardYield} Rewards Yield</span>
          </div>
        </div>

        <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 700, color: INK, margin: "0 0 2px", letterSpacing: "-0.01em" }}>{card.name}</h2>
        <p style={{ textAlign: "center", fontSize: 13, color: MUTED, margin: "0 0 16px", lineHeight: 1.4 }}>{card.tagline}</p>

        <CreditCard card={card} flipped={flipped} onClick={() => setFlipped(f => !f)} />
        <p style={{ textAlign: "center", fontSize: 11, color: MUTED, marginTop: 10, marginBottom: 20 }}>Tap card to see terms and features</p>

        <div style={{ display: "flex", background: SURFACE, borderRadius: 10, padding: "3px", marginBottom: 16 }}>
          {[
            { id: "why", label: "Match Reason" },
            { id: "savings", label: "Annual Value" },
            { id: "features", label: "Features" }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1, padding: "8px 0", fontSize: 12, fontWeight: 600, borderRadius: 8,
                border: "none", background: tab === t.id ? WHITE : "transparent",
                color: tab === t.id ? INK : MUTED, cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit"
              }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ minHeight: 180, marginBottom: 20 }}>
          {tab === "why" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

              {/* Dynamic headline banner — references actual top spend */}
              <div style={{ padding: "14px", background: `linear-gradient(135deg, #FFFDFB, #FFF3EE)`, borderRadius: 12, border: `1px solid ${ORANGE_BORDER}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>Why this card fits you</div>
                <p style={{ fontSize: 14, fontWeight: 500, color: INK, margin: 0, lineHeight: 1.6 }}>
                  You spend <strong style={{ color: ORANGE }}>{fmt(topCat.value)}/month</strong> on <strong>{topCat.label}</strong> — your single biggest category at {topCatPct}% of total outflow. {card.name} is built to reward exactly that.
                </p>
              </div>

              {/* Dynamic point 1 */}
              <div style={{ padding: "12px 14px", background: SURFACE, borderRadius: 12 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "start" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: ORANGE, marginTop: 7, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 3 }}>{dynamicInsights.point1Title}</div>
                    <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{dynamicInsights.point1Body}</div>
                  </div>
                </div>
              </div>

              {/* Dynamic point 2 */}
              <div style={{ padding: "12px 14px", background: SURFACE, borderRadius: 12 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "start" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: ORANGE, marginTop: 7, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 3 }}>{dynamicInsights.point2Title}</div>
                    <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{dynamicInsights.point2Body}</div>
                  </div>
                </div>
              </div>

              {/* Spend breakdown — carries forward all non-zero categories */}
              <div style={{ padding: "12px 14px", background: SURFACE, borderRadius: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 10 }}>Your spend breakdown</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {rankedCategories.slice(0, 4).map(cat => {
                    const pct = totalSpend > 0 ? Math.round((cat.value / totalSpend) * 100) : 0;
                    const annualReturn = Math.round(cat.value * 12 * card.yieldRatio);
                    return (
                      <div key={cat.id}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                          <span style={{ fontWeight: 500, color: INK }}>{cat.label}</span>
                          <span style={{ fontWeight: 600, color: SUCCESS, fontSize: 11 }}>+{fmt(annualReturn)}/yr back</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ flex: 1, height: 4, background: BORDER, borderRadius: 2, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${pct}%`, background: cat.color, borderRadius: 2 }} />
                          </div>
                          <span style={{ fontSize: 10, color: MUTED, width: 28, textAlign: "right" }}>{pct}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {tab === "savings" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ padding: "14px", borderRadius: 12, background: "#FEF2F2", border: "1px solid #FEE2E2" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: ERROR_RED, textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 4 }}>Estimated Missed Rewards</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: ERROR_RED }}>{fmt((calcSpend * 12 * card.yieldRatio) * 0.35)} / year</div>
                <div style={{ height: 4, background: "rgba(220,38,38,0.1)", borderRadius: 2, marginTop: 8, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "35%", background: ERROR_RED }} />
                </div>
              </div>

              <div style={{ padding: "14px", borderRadius: 12, background: SUCCESS_BG, border: `1px solid #A7F3D0` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: SUCCESS, textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 4 }}>Projected Annual Value Added</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: SUCCESS }}>{fmt(calcSpend * 12 * card.yieldRatio)}</div>
              </div>

              {card.savingsBreakdown.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 10, background: SURFACE }}>
                  <span style={{ fontSize: 12, color: INK_SECONDARY }}>{item.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: INK }}>+{fmt(item.monthly)}/mo</span>
                </div>
              ))}

              <div style={{ background: SURFACE, borderRadius: 12, padding: "14px", marginTop: 4 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, color: INK, marginBottom: 8 }}>
                  <span>Calculate by Spend:</span>
                  <span style={{ color: ORANGE }}>{fmt(calcSpend)}/mo</span>
                </div>
                <input 
                  type="range" 
                  min={5000} 
                  max={100000} 
                  step={2500} 
                  value={calcSpend} 
                  onChange={e => setCalcSpend(+e.target.value)} 
                  style={{ width: "100%", height: 4, borderRadius: 2, background: `linear-gradient(to right, ${ORANGE} ${((calcSpend - 5000) / 95000) * 100}%, #E5E7EB ${((calcSpend - 5000) / 95000) * 100}%)` }} 
                />
              </div>
            </div>
          )}

          {tab === "features" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, background: SURFACE, padding: "12px", borderRadius: 12 }}>
                {card.highlights.map((h, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, fontSize: 12, color: INK_SECONDARY, alignItems: "start" }}>
                    <span style={{ color: SUCCESS, fontWeight: "bold" }}>✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["Joining Fee", card.joiningFee], ["Annual Fee", card.annualFee]].map(([l, v]) => (
                  <div key={l} style={{ padding: "10px", borderRadius: 12, border: `1.5px solid ${BORDER}`, background: SURFACE, textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: MUTED, fontWeight: 600, marginBottom: 2 }}>{l}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: INK }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: INK, marginBottom: 8 }}>Alternative Option Logic</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {Object.values(CARDS).filter(c => c.id !== cardId).map(alt => (
              <div key={alt.id} style={{ padding: "10px 12px", background: SURFACE, borderRadius: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: MUTED, marginBottom: 2 }}>{alt.name}</div>
                <p style={{ fontSize: 11, color: INK_SECONDARY, margin: 0, lineHeight: 1.4 }}>{alt.whyNotReason}</p>
              </div>
            ))}
          </div>
        </div>

        <button onClick={onCompare} style={{ width: "100%", padding: "10px", borderRadius: 12, background: WHITE, border: `1px solid ${BORDER}`, fontSize: 13, fontWeight: 600, color: INK, cursor: "pointer", marginBottom: 16, fontFamily: "inherit", transition: "all 0.15s" }}>
          Compare All Options
        </button>

        <div style={{ padding: "12px", background: SURFACE, borderRadius: 14, border: `1px solid ${BORDER}` }}>
          {leadStep === 0 && (
            <Btn onClick={handleApplyClick}>Apply Now</Btn>
          )}

          {leadStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, animation: "fadeIn 0.2s ease" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>Select Employment Type</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {["Salaried", "Self-Employed"].map(p => (
                  <button 
                    key={p} 
                    onClick={() => setProfession(p)}
                    style={{
                      padding: "10px", borderRadius: 10, fontSize: 12, fontWeight: 600,
                      border: `1.5px solid ${profession === p ? ORANGE : BORDER}`,
                      background: profession === p ? ORANGE_LIGHT : WHITE,
                      color: profession === p ? ORANGE : INK,
                      cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit"
                    }}>
                    {p}
                  </button>
                ))}
              </div>
              <Btn onClick={handleApplyClick} disabled={!profession}>Submit Application</Btn>
            </div>
          )}

          {leadStep === 2 && (
            <div style={{ textAlign: "center", padding: "8px 0", animation: "fadeIn 0.2s ease" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: SUCCESS_BG, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", color: SUCCESS, fontWeight: "bold", fontSize: 16 }}>✓</div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: INK, margin: "0 0 4px" }}>Application Submitted</h4>
              <p style={{ fontSize: 12, color: MUTED, margin: "0 0 10px" }}>An Axis Bank representative will call you shortly.</p>
              <div style={{ fontFamily: "monospace", fontSize: 11, background: WHITE, padding: "6px 12px", borderRadius: 6, display: "inline-block", border: `1px solid ${BORDER}`, color: INK_SECONDARY }}>
                Ref ID: {refId}
              </div>
            </div>
          )}
        </div>
      </div>
    </Shell>
  );
}

function CompareScreen({ activeCardId, onBack }) {
  const [flips, setFlips] = useState({});

  return (
    <Shell step={8} onBack={onBack}>
      <div style={{ padding: "16px 20px", flex: 1, overflowY: "auto" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: INK, margin: "0 0 4px", letterSpacing: "-0.01em" }}>Card Catalog</h2>
        <p style={{ fontSize: 13, color: MUTED, margin: "0 0 16px" }}>Compare all card choices. Your matched option is pinned at the top.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {Object.values(CARDS).map(card => (
            <div key={card.id} style={{ borderRadius: 16, border: card.id === activeCardId ? `1.5px solid ${ORANGE}` : `1.5px solid ${BORDER}`, overflow: "hidden" }}>
              {card.id === activeCardId && (
                <div style={{ background: ORANGE, padding: "4px 14px" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: WHITE, letterSpacing: "0.04em", textTransform: "uppercase" }}>Your Best Match</span>
                </div>
              )}
              <div style={{ padding: "16px" }}>
                <CreditCard card={card} flipped={flips[card.id]} onClick={() => setFlips(f => ({ ...f, [card.id]: !f[card.id] }))} compact />
                <div style={{ marginTop: 14 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: INK, margin: "0 0 2px" }}>{card.name}</h3>
                  <p style={{ fontSize: 12, color: MUTED, margin: "0 0 12px" }}>{card.tagline}</p>
                  <div style={{ display: "flex", gap: 10, borderTop: `1px solid ${BORDER}`, paddingTop: 10 }}>
                    <div>
                      <span style={{ fontSize: 10, color: MUTED, textTransform: "uppercase", display: "block" }}>Rewards Yield</span>
                      <strong style={{ fontSize: 13, color: INK }}>{card.rewardYield}</strong>
                    </div>
                    <div style={{ borderLeft: `1px solid ${BORDER}`, paddingLeft: 10 }}>
                      <span style={{ fontSize: 10, color: MUTED, textTransform: "uppercase", display: "block" }}>Annual Fee</span>
                      <strong style={{ fontSize: 13, color: INK }}>{card.annualFee}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

export default function FreechargeCreditCardRecommendation() {
  const [screen, setScreen] = useState("onboarding");
  const [mobile, setMobile] = useState("");
  const [source, setSource] = useState("lifestyle");
  const [spendData, setSpendData] = useState(null);
  const [cardId, setCardId] = useState("daily");

  const handleSource = (src) => {
    setSource(src);
    if (src === "lifestyle") {
      setScreen("spend");
    } else {
      setScreen("data_consent");
    }
  };

  const handleConsentAuthorize = () => {
    setScreen("simulation");
  };

  if (screen === "onboarding") return <OnboardingScreen onNext={m => { setMobile(m); setScreen("otp"); }} />;
  if (screen === "otp") return <OTPScreen mobile={mobile} onNext={() => setScreen("framework_select")} onBack={() => setScreen("onboarding")} />;
  if (screen === "framework_select") return <FrameworkSelectionScreen onSelect={handleSource} onBack={() => setScreen("otp")} />;
  if (screen === "data_consent") return <DataConsentScreen onAuthorize={handleConsentAuthorize} onBack={() => setScreen("framework_select")} />;
  if (screen === "simulation") return <ProcessingSimulationScreen source={source} onNext={() => setScreen("insights")} />;
  if (screen === "insights") return <InsightsDashboardScreen source={source} onNext={() => setScreen("spend")} />;
  if (screen === "spend") return <SpendProfilerScreen source={source} onNext={d => { setSpendData(d); setScreen("processing"); }} onBack={() => setScreen("framework_select")} />;
  if (screen === "processing") return <OptimizationAnalysisScreen spendData={spendData} onDone={c => { setCardId(c); setScreen("recommendation"); }} />;
  if (screen === "recommendation") return <RecommendationScreen cardId={cardId} spendData={spendData || { income: 60000, spends: SOURCE_CONFIGS[source || "lifestyle"].spends }} onBack={() => setScreen("spend")} onCompare={() => setScreen("compare")} />;
  if (screen === "compare") return <CompareScreen activeCardId={cardId} onBack={() => setScreen("recommendation")} />;
  return null;
}