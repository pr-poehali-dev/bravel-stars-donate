import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/7c7598fb-8c1f-4e17-9379-2c24b6317105/files/9de8695d-26cf-44aa-8099-f01bbb015cf0.jpg";

const PRODUCTS = [
  {
    id: 1,
    name: "30 гемов Brawl Stars",
    description: "30 гемов на аккаунт Brawl Stars",
    price: 250,
    oldPrice: null,
    badge: "СТАРТ",
    badgeClass: "badge-new",
    color: "cyan",
    icon: "Gem",
    popular: false,
  },
  {
    id: 2,
    name: "80 гемов Brawl Stars",
    description: "80 гемов на аккаунт Brawl Stars",
    price: 499,
    oldPrice: null,
    badge: null,
    badgeClass: "",
    color: "cyan",
    icon: "Gem",
    popular: false,
  },
  {
    id: 3,
    name: "170 гемов Brawl Stars",
    description: "170 гемов на аккаунт Brawl Stars",
    price: 949,
    oldPrice: null,
    badge: "ХАЙП",
    badgeClass: "badge-hot",
    color: "orange",
    icon: "Gem",
    popular: true,
  },
  {
    id: 4,
    name: "360 гемов Brawl Stars",
    description: "360 гемов на аккаунт Brawl Stars",
    price: 1799,
    oldPrice: null,
    badge: null,
    badgeClass: "",
    color: "purple",
    icon: "Gem",
    popular: false,
  },
  {
    id: 5,
    name: "950 гемов Brawl Stars",
    description: "950 гемов на аккаунт Brawl Stars",
    price: 4199,
    oldPrice: null,
    badge: "ТОП",
    badgeClass: "badge-hot",
    color: "orange",
    icon: "Gem",
    popular: false,
  },
  {
    id: 6,
    name: "2000 гемов Brawl Stars",
    description: "2000 гемов на аккаунт Brawl Stars",
    price: 8499,
    oldPrice: null,
    badge: "МЕГА",
    badgeClass: "badge-sale",
    color: "purple",
    icon: "Gem",
    popular: false,
  },
  {
    id: 7,
    name: "Brawl Pass",
    description: "Боевой пропуск на сезон Brawl Stars",
    price: 900,
    oldPrice: null,
    badge: "ПРОПУСК",
    badgeClass: "badge-new",
    color: "cyan",
    icon: "Sword",
    popular: false,
  },
  {
    id: 8,
    name: "Brawl Pass+",
    description: "Расширенный боевой пропуск + бонусы",
    price: 1250,
    oldPrice: null,
    badge: "ПЛЮС",
    badgeClass: "badge-sale",
    color: "purple",
    icon: "Crown",
    popular: false,
  },
];

const REVIEWS = [
  { id: 1, name: "Артём К.", game: "Brawl Stars", text: "170 гемов пришли за минуту! Взял скин на Эдгара, всё чисто. Уже третий раз покупаю.", stars: 5, avatar: "А" },
  { id: 2, name: "Даша М.", game: "Brawl Stars", text: "Применила промокод NEWGAMER — сэкономила на Brawl Pass+. Очень удобно, советую всем!", stars: 5, avatar: "Д" },
  { id: 3, name: "Игорь П.", game: "Brawl Stars", text: "Brawl Pass выдали за 2 минуты после оплаты. Поддержка ответила мгновенно, молодцы.", stars: 5, avatar: "И" },
  { id: 4, name: "Настя Л.", game: "Brawl Stars", text: "Купила 80 гемов, всё пришло сразу. Честный магазин, больше нигде не покупаю.", stars: 5, avatar: "Н" },
  { id: 5, name: "Макс Т.", game: "Brawl Stars", text: "Взял 950 гемов — цена лучше чем в AppStore. Гемы на аккаунте через 3 минуты. Огонь!", stars: 5, avatar: "М" },
];

const FAQ_ITEMS = [
  {
    q: "Как быстро придут гемы на аккаунт Brawl Stars?",
    a: "Гемы зачисляются автоматически в течение 1–3 минут после оплаты. В 99% случаев — моментально. Никаких задержек.",
  },
  {
    q: "Что нужно указать для покупки гемов?",
    a: "Только тег твоего аккаунта Brawl Stars — он выглядит так: #ABC123. Найти его можно в профиле игры. Пароль и почта не нужны.",
  },
  {
    q: "Безопасно ли покупать гемы здесь?",
    a: "Да, абсолютно. Мы используем официальные методы пополнения через Supercell — никаких взломов, читов и сторонних программ. Аккаунт в полной безопасности.",
  },
  {
    q: "Как использовать промокод?",
    a: "Введи промокод в поле при оформлении заказа — скидка применится сразу. Для новых покупателей действует промокод NEWGAMER на -15%!",
  },
  {
    q: "Что если гемы не пришли?",
    a: "Напиши в поддержку с тегом аккаунта и номером заказа — разберёмся за 15 минут. Гарантируем возврат средств или повторную выдачу.",
  },
  {
    q: "Какие способы оплаты доступны?",
    a: "Принимаем карты Visa/МИР, СБП, QIWI, ЮMoney, Telegram Stars и криптовалюту.",
  },
];

const PURCHASE_HISTORY = [
  { id: "#4521", item: "Боевой пропуск", date: "24.03.2026", price: 299, status: "Выдан" },
  { id: "#4312", item: "Кристаллы ×500", date: "18.03.2026", price: 499, status: "Выдан" },
  { id: "#4101", item: "VIP-статус", date: "01.03.2026", price: 799, status: "Выдан" },
];

type Tab = "main" | "catalog" | "reviews" | "faq" | "cabinet";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("main");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [cartItem, setCartItem] = useState<number | null>(null);
  const [gameNick, setGameNick] = useState("");
  const balance = 320;

  const handlePromo = () => {
    if (promoCode.toUpperCase() === "NEWGAMER") {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  };

  const getColorClass = (color: string) => {
    if (color === "cyan") return "neon-border-cyan";
    if (color === "orange") return "neon-border-orange";
    if (color === "purple") return "neon-border-purple";
    return "";
  };

  const getTextColor = (color: string) => {
    if (color === "cyan") return "neon-text-cyan";
    if (color === "orange") return "neon-text-orange";
    if (color === "purple") return "neon-text-purple";
    return "";
  };

  const navItems: { id: Tab; label: string; icon: string }[] = [
    { id: "main", label: "Главная", icon: "Home" },
    { id: "catalog", label: "Каталог", icon: "ShoppingBag" },
    { id: "reviews", label: "Отзывы", icon: "Star" },
    { id: "faq", label: "FAQ", icon: "HelpCircle" },
    { id: "cabinet", label: "Кабинет", icon: "User" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--dark-bg)", fontFamily: "Rubik, sans-serif" }}>
      {/* Ticker */}
      <div className="overflow-hidden py-2" style={{ background: "linear-gradient(90deg, rgba(0,245,255,0.08), rgba(168,85,247,0.08))", borderBottom: "1px solid rgba(0,245,255,0.15)" }}>
        <div className="flex animate-ticker whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 px-4 text-sm" style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.1em" }}>
              <span style={{ color: "rgba(0,245,255,0.8)" }}>⚡ МОМЕНТАЛЬНАЯ ВЫДАЧА ГЕМОВ</span>
              <span style={{ color: "rgba(168,85,247,0.8)" }}>🔥 ПРОМОКОД: NEWGAMER -15%</span>
              <span style={{ color: "rgba(0,245,255,0.8)" }}>💎 ГЕМЫ BRAWL STARS ОТ 250 ₽</span>
              <span style={{ color: "rgba(249,115,22,0.8)" }}>🎮 BRAWL PASS И BRAWL PASS+</span>
              <span style={{ color: "rgba(0,245,255,0.8)" }}>⚡ ГАРАНТИЯ ВЫДАЧИ</span>
              <span style={{ color: "rgba(34,197,94,0.8)" }}>✅ ОФИЦИАЛЬНЫЕ МЕТОДЫ</span>
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50" style={{ background: "rgba(8,12,20,0.95)", borderBottom: "1px solid rgba(0,245,255,0.12)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(168,85,247,0.2))", border: "1px solid rgba(0,245,255,0.4)" }}>
              <span className="text-xl">⚡</span>
            </div>
            <div>
              <div className="text-xl font-bold tracking-wider neon-text-cyan" style={{ fontFamily: "Oswald, sans-serif" }}>DONATESHOP</div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em" }}>ИГРОВОЙ МАГАЗИН</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: "Oswald, sans-serif",
                  letterSpacing: "0.08em",
                  background: activeTab === item.id ? "rgba(0,245,255,0.1)" : "transparent",
                  color: activeTab === item.id ? "var(--neon-cyan)" : "rgba(255,255,255,0.55)",
                  borderBottom: activeTab === item.id ? "2px solid var(--neon-cyan)" : "2px solid transparent",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e" }}>
              <Icon name="Wallet" size={14} />
              <span style={{ fontFamily: "Oswald, sans-serif" }}>{balance} ₽</span>
            </div>
            <button onClick={() => setActiveTab("cabinet")} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.4)", color: "var(--neon-purple)" }}>
              <Icon name="User" size={16} />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex overflow-x-auto gap-1 px-4 pb-3 no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                fontFamily: "Oswald, sans-serif",
                background: activeTab === item.id ? "rgba(0,245,255,0.15)" : "rgba(255,255,255,0.05)",
                color: activeTab === item.id ? "var(--neon-cyan)" : "rgba(255,255,255,0.5)",
                border: activeTab === item.id ? "1px solid rgba(0,245,255,0.4)" : "1px solid transparent",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* ===== ГЛАВНАЯ ===== */}
        {activeTab === "main" && (
          <div className="animate-fade-in">
            {/* Hero */}
            <div className="relative rounded-2xl overflow-hidden mb-10" style={{ minHeight: 420 }}>
              <img src={HERO_IMG} alt="Hero" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.35)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.12) 0%, rgba(8,12,20,0.5) 50%, rgba(168,85,247,0.08) 100%)" }} />
              <div className="relative z-10 p-8 md:p-16 flex flex-col justify-center" style={{ minHeight: 420 }}>
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full w-fit text-xs" style={{ background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.3)", color: "var(--neon-cyan)", fontFamily: "Oswald, sans-serif", letterSpacing: "0.1em" }}>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  МАГАЗИН ОНЛАЙН
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight" style={{ fontFamily: "Oswald, sans-serif" }}>
                  <span className="neon-text-cyan">ГЕМЫ</span>
                  <br />
                  <span style={{ color: "white" }}>BRAWL STARS</span>
                  <br />
                  <span className="neon-text-orange">ДЁШЕВО И БЫСТРО</span>
                </h1>
                <p className="text-lg mb-8 max-w-md" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Гемы и Brawl Pass за честную цену. Моментальная выдача на аккаунт. Уже 50 000+ довольных игроков.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setActiveTab("catalog")} className="btn-neon-orange px-8 py-3 rounded-xl text-base font-bold" style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.08em" }}>
                    <span className="flex items-center gap-2">
                      <Icon name="ShoppingBag" size={18} />
                      КУПИТЬ СЕЙЧАС
                    </span>
                  </button>
                  <button onClick={() => setActiveTab("catalog")} className="btn-neon-cyan px-8 py-3 rounded-xl text-base font-bold" style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.08em" }}>
                    СМОТРЕТЬ КАТАЛОГ
                  </button>
                </div>
              </div>
              {/* Stats */}
              <div className="absolute bottom-0 right-0 p-6 hidden md:flex gap-6">
                {[{ val: "50K+", label: "покупателей" }, { val: "99.9%", label: "выдача" }, { val: "< 3 мин", label: "скорость" }].map((s) => (
                  <div key={s.val} className="text-center">
                    <div className="text-2xl font-bold neon-text-cyan" style={{ fontFamily: "Oswald, sans-serif" }}>{s.val}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo banner */}
            <div className="rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4" style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(99,102,241,0.08))", border: "1px solid rgba(168,85,247,0.3)" }}>
              <div className="flex items-center gap-4">
                <div className="text-4xl animate-float">🎁</div>
                <div>
                  <div className="text-xl font-bold neon-text-purple" style={{ fontFamily: "Oswald, sans-serif" }}>ПРОМОКОД ДЛЯ НОВИЧКОВ</div>
                  <div style={{ color: "rgba(255,255,255,0.55)" }}>Скидка 15% на первый заказ</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-6 py-3 rounded-xl text-xl font-bold tracking-widest" style={{ fontFamily: "Oswald, sans-serif", background: "rgba(168,85,247,0.15)", border: "2px dashed rgba(168,85,247,0.6)", color: "var(--neon-purple)" }}>
                  NEWGAMER
                </div>
                <button onClick={() => { setPromoCode("NEWGAMER"); setActiveTab("catalog"); }} className="px-4 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105" style={{ fontFamily: "Oswald, sans-serif", background: "rgba(168,85,247,0.25)", color: "var(--neon-purple)", border: "1px solid rgba(168,85,247,0.5)" }}>
                  ПРИМЕНИТЬ
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { icon: "Zap", title: "Моментально", desc: "Выдача за 1–3 минуты", color: "cyan" },
                { icon: "Shield", title: "Безопасно", desc: "Официальные методы", color: "purple" },
                { icon: "Tag", title: "Промокоды", desc: "Скидки до -30%", color: "orange" },
                { icon: "Headphones", title: "Поддержка", desc: "Ответ за 15 минут", color: "cyan" },
              ].map((f) => (
                <div key={f.title} className="card-game rounded-xl p-5 text-center">
                  <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${getTextColor(f.color)}`} style={{ background: f.color === "cyan" ? "rgba(0,245,255,0.08)" : f.color === "orange" ? "rgba(249,115,22,0.08)" : "rgba(168,85,247,0.08)" }}>
                    <Icon name={f.icon} size={22} />
                  </div>
                  <div className="font-bold text-sm mb-1 text-white" style={{ fontFamily: "Oswald, sans-serif" }}>{f.title}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{f.desc}</div>
                </div>
              ))}
            </div>

            {/* Popular */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
                  🔥 <span className="neon-text-orange">ПОПУЛЯРНОЕ</span>
                </h2>
                <button onClick={() => setActiveTab("catalog")} className="text-sm flex items-center gap-1" style={{ color: "rgba(0,245,255,0.7)" }}>
                  Весь каталог <Icon name="ArrowRight" size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PRODUCTS.slice(0, 3).map((p) => (
                  <ProductCard key={p.id} product={p} onBuy={() => setCartItem(p.id)} colorClass={getColorClass(p.color)} textColor={getTextColor(p.color)} promoApplied={promoApplied} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== КАТАЛОГ ===== */}
        {activeTab === "catalog" && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>
                <span className="neon-text-cyan">КАТАЛОГ</span> <span className="text-white">ТОВАРОВ</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.45)" }}>Выбери пакет — выдача в течение 3 минут</p>
            </div>

            {/* Promo input */}
            <div className="rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center gap-3" style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.22)" }}>
              <Icon name="Tag" size={18} style={{ color: "var(--neon-purple)", flexShrink: 0 }} />
              <input
                type="text"
                value={promoCode}
                onChange={(e) => { setPromoCode(e.target.value); setPromoError(false); setPromoApplied(false); }}
                placeholder="Введи промокод..."
                className="flex-1 bg-transparent outline-none text-sm w-full"
                style={{ color: "white", fontFamily: "Rubik, sans-serif" }}
              />
              <button onClick={handlePromo} className="px-5 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105 flex-shrink-0" style={{ fontFamily: "Oswald, sans-serif", background: "rgba(168,85,247,0.25)", color: "var(--neon-purple)", border: "1px solid rgba(168,85,247,0.5)" }}>
                ПРИМЕНИТЬ
              </button>
              {promoApplied && <span className="text-sm font-bold flex-shrink-0" style={{ color: "#22c55e" }}>✅ -15%!</span>}
              {promoError && <span className="text-sm flex-shrink-0" style={{ color: "#ef4444" }}>❌ Неверный код</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PRODUCTS.map((p) => (
                <ProductCard key={p.id} product={p} onBuy={() => setCartItem(p.id)} colorClass={getColorClass(p.color)} textColor={getTextColor(p.color)} promoApplied={promoApplied} large />
              ))}
            </div>
          </div>
        )}

        {/* ===== ОТЗЫВЫ ===== */}
        {activeTab === "reviews" && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>
                <span className="neon-text-cyan">ОТЗЫВЫ</span> <span className="text-white">ИГРОКОВ</span>
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex">{[1, 2, 3, 4, 5].map((s) => <span key={s} className="text-yellow-400 text-xl">★</span>)}</div>
                <span className="text-white font-bold">4.9</span>
                <span style={{ color: "rgba(255,255,255,0.45)" }}>— 3800+ отзывов</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {REVIEWS.map((r, i) => (
                <div key={r.id} className="card-game rounded-xl p-5 animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(168,85,247,0.15))", border: "1px solid rgba(0,245,255,0.3)", color: "var(--neon-cyan)", fontFamily: "Oswald, sans-serif" }}>
                      {r.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{r.name}</div>
                      <div className="text-xs" style={{ color: "rgba(0,245,255,0.6)" }}>{r.game}</div>
                    </div>
                    <div className="ml-auto flex">{[...Array(r.stars)].map((_, j) => <span key={j} className="text-yellow-400 text-sm">★</span>)}</div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>"{r.text}"</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Icon name="CheckCircle" size={12} style={{ color: "#22c55e" }} />
                    <span className="text-xs" style={{ color: "#22c55e" }}>Подтверждённая покупка</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.06), rgba(168,85,247,0.06))", border: "1px solid rgba(0,245,255,0.2)" }}>
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>ПРИСОЕДИНЯЙСЯ К 50 000+ ИГРОКОВ</h3>
              <p className="mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>Быстро, безопасно, с гарантией выдачи</p>
              <button onClick={() => setActiveTab("catalog")} className="btn-neon-orange px-10 py-3 rounded-xl font-bold" style={{ fontFamily: "Oswald, sans-serif" }}>
                ПЕРЕЙТИ В КАТАЛОГ
              </button>
            </div>
          </div>
        )}

        {/* ===== FAQ ===== */}
        {activeTab === "faq" && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>
                <span className="text-white">ЧАСТО</span> <span className="neon-text-cyan">ЗАДАВАЕМЫЕ</span> <span className="text-white">ВОПРОСЫ</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.45)" }}>Здесь ответы на 90% вопросов. Не нашёл — напиши в поддержку.</p>
            </div>

            <div className="space-y-3 mb-10">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="rounded-xl overflow-hidden transition-all duration-300" style={{ background: openFaq === i ? "rgba(0,245,255,0.05)" : "rgba(13,18,32,0.8)", border: openFaq === i ? "1px solid rgba(0,245,255,0.3)" : "1px solid rgba(30,42,58,0.8)" }}>
                  <button className="w-full text-left px-6 py-4 flex items-center justify-between gap-4" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-medium text-white">{item.q}</span>
                    <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} style={{ color: openFaq === i ? "var(--neon-cyan)" : "rgba(255,255,255,0.35)", flexShrink: 0 }} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4">
                      <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl p-6 flex items-center gap-4" style={{ background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.2)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,245,255,0.08)" }}>
                  <Icon name="MessageCircle" size={22} style={{ color: "var(--neon-cyan)" }} />
                </div>
                <div>
                  <div className="font-bold text-white mb-1" style={{ fontFamily: "Oswald, sans-serif" }}>ОНЛАЙН-ЧАТ</div>
                  <div className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Ответим за 15 минут, 24/7</div>
                </div>
                <button className="ml-auto px-4 py-2 rounded-lg text-sm font-bold" style={{ fontFamily: "Oswald, sans-serif", background: "rgba(0,245,255,0.12)", color: "var(--neon-cyan)", border: "1px solid rgba(0,245,255,0.3)" }}>
                  ОТКРЫТЬ
                </button>
              </div>
              <div className="rounded-xl p-6 flex items-center gap-4" style={{ background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.2)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(168,85,247,0.08)" }}>
                  <Icon name="Send" size={22} style={{ color: "var(--neon-purple)" }} />
                </div>
                <div>
                  <div className="font-bold text-white mb-1" style={{ fontFamily: "Oswald, sans-serif" }}>TELEGRAM</div>
                  <div className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>@donateshop_support</div>
                </div>
                <button className="ml-auto px-4 py-2 rounded-lg text-sm font-bold" style={{ fontFamily: "Oswald, sans-serif", background: "rgba(168,85,247,0.15)", color: "var(--neon-purple)", border: "1px solid rgba(168,85,247,0.3)" }}>
                  НАПИСАТЬ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== ЛИЧНЫЙ КАБИНЕТ ===== */}
        {activeTab === "cabinet" && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>
                <span className="neon-text-purple">ЛИЧНЫЙ</span> <span className="text-white">КАБИНЕТ</span>
              </h2>
            </div>

            {/* Profile */}
            <div className="rounded-2xl p-6 mb-6" style={{ background: "rgba(13,18,32,0.8)", border: "1px solid rgba(0,245,255,0.2)" }}>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold" style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.2), rgba(168,85,247,0.2))", border: "2px solid rgba(0,245,255,0.4)", fontFamily: "Oswald, sans-serif", color: "var(--neon-cyan)" }}>
                    П
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2" style={{ borderColor: "var(--dark-bg)" }} />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="text-xl font-bold text-white mb-1" style={{ fontFamily: "Oswald, sans-serif" }}>Игрок#4521</div>
                  <div className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>Клиент с марта 2025</div>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    <span className="px-3 py-1 rounded-lg text-xs font-bold" style={{ background: "rgba(249,115,22,0.12)", color: "var(--neon-orange)", border: "1px solid rgba(249,115,22,0.3)", fontFamily: "Oswald, sans-serif" }}>🔥 VIP</span>
                    <span className="px-3 py-1 rounded-lg text-xs font-bold" style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)", fontFamily: "Oswald, sans-serif" }}>✅ Верифицирован</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Oswald, sans-serif", letterSpacing: "0.1em" }}>БАЛАНС</div>
                  <div className="text-3xl font-bold neon-text-cyan" style={{ fontFamily: "Oswald, sans-serif" }}>{balance} ₽</div>
                  <button className="mt-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105" style={{ fontFamily: "Oswald, sans-serif", background: "rgba(0,245,255,0.12)", color: "var(--neon-cyan)", border: "1px solid rgba(0,245,255,0.3)" }}>
                    + ПОПОЛНИТЬ
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Покупок", value: "12", color: "cyan" },
                { label: "Сэкономлено", value: "840 ₽", color: "orange" },
                { label: "Бонусов", value: "156 ₽", color: "purple" },
              ].map((s) => (
                <div key={s.label} className="card-game rounded-xl p-4 text-center">
                  <div className={`text-2xl font-bold mb-1 ${getTextColor(s.color)}`} style={{ fontFamily: "Oswald, sans-serif" }}>{s.value}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* History */}
            <div className="rounded-xl overflow-hidden mb-6" style={{ border: "1px solid rgba(30,42,58,0.8)" }}>
              <div className="px-5 py-4 flex items-center gap-2" style={{ background: "rgba(13,18,32,0.9)", borderBottom: "1px solid rgba(30,42,58,0.8)" }}>
                <Icon name="History" size={16} style={{ color: "var(--neon-cyan)" }} />
                <span className="font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>ИСТОРИЯ ПОКУПОК</span>
              </div>
              {PURCHASE_HISTORY.map((h, i) => (
                <div key={h.id} className="px-5 py-4 flex items-center gap-4 transition-all hover:bg-white/5" style={{ borderBottom: i < PURCHASE_HISTORY.length - 1 ? "1px solid rgba(30,42,58,0.5)" : "none", background: "rgba(8,12,20,0.6)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,245,255,0.08)" }}>
                    <Icon name="Package" size={14} style={{ color: "var(--neon-cyan)" }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{h.item}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{h.date} · {h.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">{h.price} ₽</div>
                    <div className="text-xs px-2 py-0.5 rounded-md inline-block mt-1" style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e" }}>{h.status}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promos */}
            <div className="rounded-xl p-5" style={{ background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.2)" }}>
              <div className="font-bold text-white mb-3 flex items-center gap-2" style={{ fontFamily: "Oswald, sans-serif" }}>
                <Icon name="Tag" size={16} style={{ color: "var(--neon-purple)" }} />
                МОИ ПРОМОКОДЫ
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: "rgba(168,85,247,0.08)", border: "1px dashed rgba(168,85,247,0.4)" }}>
                <div>
                  <div className="font-bold" style={{ fontFamily: "Oswald, sans-serif", color: "var(--neon-purple)", letterSpacing: "0.1em" }}>NEWGAMER</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Скидка 15% · До 31.12.2026</div>
                </div>
                <button onClick={() => { setActiveTab("catalog"); setPromoCode("NEWGAMER"); }} className="px-4 py-2 rounded-lg text-xs font-bold" style={{ fontFamily: "Oswald, sans-serif", background: "rgba(168,85,247,0.2)", color: "var(--neon-purple)", border: "1px solid rgba(168,85,247,0.4)" }}>
                  ПРИМЕНИТЬ
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Purchase Modal */}
      {cartItem !== null && (() => {
        const p = PRODUCTS.find((x) => x.id === cartItem)!;
        const finalPrice = promoApplied ? Math.round(p.price * 0.85) : p.price;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" }}>
            <div className="rounded-2xl p-6 w-full max-w-md animate-scale-in" style={{ background: "var(--dark-card)", border: "1px solid rgba(0,245,255,0.3)" }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>ОФОРМИТЬ ЗАКАЗ</h3>
                <button onClick={() => setCartItem(null)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
                  <Icon name="X" size={16} />
                </button>
              </div>

              <div className="rounded-xl p-4 mb-4" style={{ background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.2)" }}>
                <div className="font-bold text-white mb-1">{p.name}</div>
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{p.description}</div>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>Цена</span>
                  <span className="text-white">{p.price} ₽</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#22c55e" }}>Промокод NEWGAMER</span>
                    <span style={{ color: "#22c55e" }}>-{p.price - finalPrice} ₽</span>
                  </div>
                )}
                <div className="h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                <div className="flex justify-between font-bold">
                  <span className="text-white" style={{ fontFamily: "Oswald, sans-serif" }}>ИТОГО</span>
                  <span className="neon-text-cyan text-lg" style={{ fontFamily: "Oswald, sans-serif" }}>{finalPrice} ₽</span>
                </div>
              </div>

              <div className="mb-5">
                <label className="text-sm mb-2 block" style={{ color: "rgba(255,255,255,0.45)" }}>Ник в игре / ID аккаунта</label>
                <input
                  type="text"
                  value={gameNick}
                  onChange={(e) => setGameNick(e.target.value)}
                  placeholder="Введи свой игровой ник..."
                  className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,245,255,0.3)", color: "white", fontFamily: "Rubik, sans-serif" }}
                />
              </div>

              <button className="btn-neon-orange w-full py-3 rounded-xl font-bold text-base" style={{ fontFamily: "Oswald, sans-serif" }}>
                <span className="flex items-center justify-center gap-2">
                  <Icon name="CreditCard" size={18} />
                  ОПЛАТИТЬ {finalPrice} ₽
                </span>
              </button>
              <p className="text-center text-xs mt-3" style={{ color: "rgba(255,255,255,0.25)" }}>🔒 Безопасная оплата · Мгновенная выдача</p>
            </div>
          </div>
        );
      })()}

      {/* Footer */}
      <footer className="mt-16 py-8" style={{ borderTop: "1px solid rgba(30,42,58,0.6)", background: "rgba(8,12,20,0.5)" }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-lg font-bold neon-text-cyan mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>DONATESHOP</div>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>© 2026 DonateShop · Все права защищены · support@donateshop.ru</p>
        </div>
      </footer>
    </div>
  );
}

interface ProductCardProps {
  product: (typeof PRODUCTS)[0];
  onBuy: () => void;
  colorClass: string;
  textColor: string;
  promoApplied: boolean;
  large?: boolean;
}

function ProductCard({ product: p, onBuy, colorClass, textColor, promoApplied, large }: ProductCardProps) {
  const finalPrice = promoApplied ? Math.round(p.price * 0.85) : p.price;

  return (
    <div className={`card-game rounded-xl overflow-hidden relative border ${colorClass} ${p.popular ? "ring-1 ring-orange-500/50" : ""}`}>
      {p.popular && (
        <div className="text-center py-1.5 text-xs font-bold" style={{ background: "linear-gradient(90deg, rgba(249,115,22,0.8), rgba(234,88,12,0.8))", fontFamily: "Oswald, sans-serif", letterSpacing: "0.08em", color: "white" }}>
          ⭐ ПОПУЛЯРНЫЙ ВЫБОР
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${textColor}`} style={{ background: "rgba(255,255,255,0.04)" }}>
            <Icon name={p.icon} size={22} />
          </div>
          {p.badge && (
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${p.badgeClass}`} style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.06em" }}>
              {p.badge}
            </span>
          )}
        </div>

        <h3 className="font-bold text-white mb-1" style={{ fontFamily: "Oswald, sans-serif", fontSize: large ? "1.05rem" : "1rem" }}>{p.name}</h3>
        <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.48)" }}>{p.description}</p>

        <div className="flex items-center justify-between">
          <div>
            {(p.oldPrice || promoApplied) && (
              <div className="text-sm line-through" style={{ color: "rgba(255,255,255,0.3)" }}>
                {promoApplied ? p.price : p.oldPrice} ₽
              </div>
            )}
            <div className={`text-2xl font-bold ${textColor}`} style={{ fontFamily: "Oswald, sans-serif" }}>
              {finalPrice} ₽
            </div>
          </div>
          <button
            onClick={onBuy}
            className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              fontFamily: "Oswald, sans-serif",
              background: p.color === "orange" ? "linear-gradient(135deg, rgba(249,115,22,0.9), rgba(234,88,12,0.9))" : p.color === "purple" ? "rgba(168,85,247,0.22)" : "rgba(0,245,255,0.12)",
              color: p.color === "orange" ? "white" : p.color === "purple" ? "var(--neon-purple)" : "var(--neon-cyan)",
              border: p.color === "orange" ? "1px solid rgba(249,115,22,0.5)" : p.color === "purple" ? "1px solid rgba(168,85,247,0.5)" : "1px solid rgba(0,245,255,0.4)",
            }}
          >
            КУПИТЬ
          </button>
        </div>
      </div>
    </div>
  );
}