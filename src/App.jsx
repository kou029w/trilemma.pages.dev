import { useState } from "react";

const DOMAINS = [
  { id: "all", label: "すべて", icon: "◎" },
  { id: "philosophy", label: "哲学・論理", icon: "🔺" },
  { id: "economics", label: "経済・金融", icon: "💹" },
  { id: "tech", label: "技術・IT", icon: "⚙️" },
  { id: "society", label: "社会・政治", icon: "🌐" },
  { id: "business", label: "経営・品質", icon: "📊" },
  { id: "environment", label: "環境・科学", icon: "🌿" },
];

const TRILEMMAS = [
  {
    id: "munchausen", domain: "philosophy",
    name: "ミュンヒハウゼントリレンマ", nameEn: "Münchhausen Trilemma",
    author: "Hans Albert, 1968", color: "#C084FC",
    elements: ["無限後退", "循環論法", "独断的停止"],
    subelements: ["Infinite Regress", "Circular Reasoning", "Dogmatic Axiom"],
    desc: "あらゆる命題の証明は3つの不完全な方法のどれかに陥る",
  },
  {
    id: "epicurus", domain: "philosophy",
    name: "悪の問題（エピクロス）", nameEn: "Problem of Evil",
    author: "Epicurus, 〜300 BC", color: "#818CF8",
    elements: ["神の全能", "神の全善", "悪の存在"],
    subelements: ["Omnipotence", "Omnibenevolence", "Evil Exists"],
    desc: "全能で全善の神が存在するなら悪はなぜ存在するか",
  },
  {
    id: "cslewis", domain: "philosophy",
    name: "C.S.ルイスのトリレンマ", nameEn: "Lewis's Trilemma",
    author: "C.S. Lewis, 1952", color: "#A5B4FC",
    elements: ["主（Lord）", "狂人（Lunatic）", "詐欺師（Liar）"],
    subelements: ["Divine", "Deluded", "Deceiver"],
    desc: "イエスは神か、狂人か、嘘つきか――3つ以外の選択肢はない",
  },
  {
    id: "nagarjuna", domain: "philosophy",
    name: "ナーガールジュナのトリレンマ", nameEn: "Nāgārjuna's Trilemma",
    author: "Nāgārjuna, 〜150 AD", color: "#7C3AED",
    elements: ["自己生起", "他者生起", "両者から生起"],
    subelements: ["Self-caused", "Other-caused", "Both"],
    desc: "中観派：いかなるものも固有の実体から生じない（空）",
  },
  {
    id: "impossible_trinity", domain: "economics",
    name: "国際金融のトリレンマ", nameEn: "Impossible Trinity",
    author: "Mundell & Fleming, 1962", color: "#34D399",
    elements: ["為替安定", "金融政策の独立性", "資本移動の自由"],
    subelements: ["Fixed Exchange Rate", "Monetary Autonomy", "Free Capital Flow"],
    desc: "開放経済で3つの金融政策目標を同時に達成することは不可能",
  },
  {
    id: "rodrik", domain: "economics",
    name: "政治経済のトリレンマ", nameEn: "Rodrik's Trilemma",
    author: "Dani Rodrik, 2000", color: "#6EE7B7",
    elements: ["民主主義", "国家主権", "グローバリゼーション"],
    subelements: ["Democracy", "National Sovereignty", "Globalization"],
    desc: "民主主義・国家主権・経済統合の3つは同時に完全実現できない",
  },
  {
    id: "service_economy", domain: "economics",
    name: "サービス経済のトリレンマ", nameEn: "Baumol's Service Trilemma",
    author: "Iversen & Wren, 1998", color: "#10B981",
    elements: ["所得平等", "雇用拡大", "均衡財政"],
    subelements: ["Income Equality", "Job Growth", "Fiscal Balance"],
    desc: "脱工業化社会で3つの経済目標を同時に実現することはできない",
  },
  {
    id: "holmstrom", domain: "economics",
    name: "Holmströmの定理", nameEn: "Holmström's Theorem",
    author: "Bengt Holmström, 1982", color: "#059669",
    elements: ["ナッシュ均衡", "均衡予算", "パレート最適"],
    subelements: ["Nash Equilibrium", "Budget Balance", "Pareto Optimal"],
    desc: "エージェント問題：3条件を同時に満たすインセンティブ設計は存在しない",
  },
  {
    id: "uneasy", domain: "economics",
    name: "不安の三角形", nameEn: "Uneasy Triangle",
    author: "The Economist, 1952", color: "#047857",
    elements: ["物価安定", "完全雇用", "労働組合の自由"],
    subelements: ["Price Stability", "Full Employment", "Free Bargaining"],
    desc: "ケインズが予見した労働・物価・雇用の三すくみ",
  },
  {
    id: "cap", domain: "tech",
    name: "CAP定理", nameEn: "CAP Theorem",
    author: "Eric Brewer, 2000", color: "#FBBF24",
    elements: ["可用性", "整合性", "分断耐性"],
    subelements: ["Availability", "Consistency", "Partition Tolerance"],
    desc: "分散システムはCAP3要素の全てを同時に保証できない",
  },
  {
    id: "zooko", domain: "tech",
    name: "ズーコの三角形", nameEn: "Zooko's Triangle",
    author: "Zooko Wilcox, 2001", color: "#F59E0B",
    elements: ["Human-meaningful", "Secure", "Decentralized"],
    subelements: ["人間可読", "安全", "分散"],
    desc: "ネットワーク識別子は3つの性質を同時に持てない",
  },
  {
    id: "blockchain", domain: "tech",
    name: "ブロックチェーントリレンマ", nameEn: "Blockchain Trilemma",
    author: "Vitalik Buterin, 2015", color: "#D97706",
    elements: ["セキュリティ", "スケーラビリティ", "分散性"],
    subelements: ["Security", "Scalability", "Decentralization"],
    desc: "ブロックチェーンは3つの特性を同時に最大化できない",
  },
  {
    id: "privacy_trilemma", domain: "tech",
    name: "プライバシートリレンマ", nameEn: "Privacy-Security-Usability",
    author: "Security Research, 2000s", color: "#B45309",
    elements: ["利便性", "セキュリティ", "プライバシー"],
    subelements: ["Usability", "Security", "Privacy"],
    desc: "システム設計でプライバシー・安全・使いやすさは相互に競合する",
  },
  {
    id: "community", domain: "society",
    name: "オンラインコミュニティ", nameEn: "Online Community Trilemma",
    author: "Community Research", color: "#F87171",
    elements: ["人", "情報", "規模"],
    subelements: ["People", "Information", "Scale"],
    desc: "オンラインコミュニティは質・量・人の全てを同時に維持できない",
  },
  {
    id: "zionism", domain: "society",
    name: "シオニズムのトリレンマ", nameEn: "Zionist Trilemma",
    author: "Aryeh Naor / T.Friedman, 1989", color: "#EF4444",
    elements: ["ユダヤ人国家", "民主主義国家", "大イスラエル"],
    subelements: ["Jewish State", "Democratic State", "Greater Israel"],
    desc: "イスラエルは3つの国家目標を同時に完全実現できない",
  },
  {
    id: "zizek", domain: "society",
    name: "ジジェクのトリレンマ", nameEn: "Žižek's Trilemma",
    author: "Slavoj Žižek (引用), ~2000", color: "#DC2626",
    elements: ["誠実さ", "知性", "体制への忠誠"],
    subelements: ["Honesty", "Intelligence", "Party Loyalty"],
    desc: "共産主義体制下では3つの美徳のうち2つしか同時に持てない",
  },
  {
    id: "qcd", domain: "business",
    name: "QCD", nameEn: "Quality Cost Delivery",
    author: "Manufacturing / Toyota", color: "#FB923C",
    elements: ["品質", "コスト", "生産性"],
    subelements: ["Quality", "Cost", "Delivery"],
    desc: "ものづくりの三要素：高品質・低コスト・短納期は同時に極限まで追えない",
  },
  {
    id: "iron_triangle", domain: "business",
    name: "プロジェクト管理の鉄の三角形", nameEn: "Iron Triangle",
    author: "Project Management Institute", color: "#F97316",
    elements: ["品質", "コスト", "スケジュール"],
    subelements: ["Scope/Quality", "Cost", "Time"],
    desc: "早く・安く・良いものは同時に実現できない",
  },
  {
    id: "good_fast_cheap", domain: "business",
    name: "Good-Fast-Cheap", nameEn: "Good-Fast-Cheap",
    author: "Engineering Adage", color: "#EA580C",
    elements: ["良いもの", "安さ", "速さ"],
    subelements: ["Good", "Cheap", "Fast"],
    desc: '"良いもの・速い・安い"の3つは同時に選べない――2つまで',
  },
  {
    id: "environment", domain: "environment",
    name: "環境問題のトリレンマ", nameEn: "Environmental Trilemma",
    author: "環境経済学", color: "#4ADE80",
    elements: ["経済発展", "エネルギー確保", "環境保全"],
    subelements: ["Economic Growth", "Energy Security", "Environmental Protection"],
    desc: "経済成長・エネルギー・環境の3つを同時に最大化することはできない",
  },
];

// --- Triangle geometry ---
const W = 560, H = 500;
const CX = W / 2, CY = H * 0.5;
const R = 160;
const toRad = (d) => (d * Math.PI) / 180;
// 上→左→右の順（反時計回り）
const vertices = [0, 1, 2].map((i) => ({
  x: CX + R * Math.cos(toRad(-90 - 120 * i)),
  y: CY + R * Math.sin(toRad(-90 - 120 * i)),
}));
const centroid = {
  x: vertices.reduce((s, v) => s + v.x, 0) / 3,
  y: vertices.reduce((s, v) => s + v.y, 0) / 3,
};
const outDir = vertices.map((v) => {
  const dx = v.x - centroid.x, dy = v.y - centroid.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  return { dx: dx / len, dy: dy / len };
});

const DOT_R = 6, DOT_SPACING = 16, COLS = 5;
const DOT_HIT_R = DOT_R + 5;

function getDotPos(vi, idx) {
  const col = idx % COLS;
  const row = Math.floor(idx / COLS);
  const v = vertices[vi];
  const { dx, dy } = outDir[vi];
  const px = -dy, py = dx;
  const rowDist = 28 + row * (DOT_SPACING + 1);
  const colOffset = (col - (COLS - 1) / 2) * DOT_SPACING;
  return {
    cx: v.x + dx * rowDist + px * colOffset,
    cy: v.y + dy * rowDist + py * colOffset,
  };
}

function HoverChip({ vi, t }) {
  const v = vertices[vi];
  const { dx, dy } = outDir[vi];
  const label = t.elements[vi];
  const sub = t.subelements[vi];
  const chipW = Math.max(label.length * 13 + 28, 90);
  const chipH = 38;
  const dist = 65;
  const bx = v.x + dx * dist;
  const by = v.y + dy * dist;
  return (
    <g style={{ pointerEvents: "none" }}>
      <line x1={v.x} y1={v.y} x2={bx} y2={by}
        stroke={t.color} strokeWidth="1.5" strokeDasharray="3,5" opacity={0.5} />
      <rect x={bx - chipW / 2} y={by - chipH / 2}
        width={chipW} height={chipH} rx="6"
        fill="#0A1220" stroke={t.color} strokeWidth="2" />
      <rect x={bx - chipW / 2} y={by - chipH / 2}
        width="4" height={chipH} rx="4" fill={t.color} />
      <text x={bx + 4} y={by - 3} textAnchor="middle"
        fill={t.color} fontSize={label.length > 9 ? "10" : "12"}
        fontWeight="700" fontFamily="'Noto Sans JP', sans-serif">{label}</text>
      <text x={bx + 4} y={by + 11} textAnchor="middle"
        fill="#9CA3AF" fontSize="9"
        fontFamily="'Noto Sans JP', sans-serif">{sub}</text>
    </g>
  );
}

function TriangleViz({ trilemmas, activeId, selectedId, setHovered, onSelect }) {
  const activeT = trilemmas.find((t) => t.id === activeId) || null;
  return (
    <svg viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", maxWidth: 560, overflow: "visible", display: "block" }}>
      <defs>
        <filter id="gv">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="bgv" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#1A2D42" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#080C14" stopOpacity="0" />
        </radialGradient>
      </defs>

      <polygon points={vertices.map(v => `${v.x},${v.y}`).join(" ")} fill="url(#bgv)" />
      {[0.33, 0.66].map((t, i) => (
        <polygon key={i}
          points={vertices.map(v => ({
            x: centroid.x + (v.x - centroid.x) * t,
            y: centroid.y + (v.y - centroid.y) * t,
          })).map(p => `${p.x},${p.y}`).join(" ")}
          fill="none" stroke="#1A2D42" strokeWidth="0.8" opacity={0.9} />
      ))}
      <polygon points={vertices.map(v => `${v.x},${v.y}`).join(" ")}
        fill="none" stroke="#2D4060" strokeWidth="2" filter="url(#gv)" />

      {[0, 1, 2].map((vi) =>
        trilemmas.map((t, ti) => {
          const { cx, cy } = getDotPos(vi, ti);
          const isActive = activeId === t.id;
          const isSelected = selectedId === t.id;
          const isDim = activeId !== null && !isActive;
          return (
            <g key={`${vi}-${t.id}`}
              role="button"
              tabIndex={0}
              aria-label={t.name}
              aria-pressed={isSelected}
              onMouseEnter={() => setHovered(t.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(t.id)}
              onBlur={() => setHovered(null)}
              onClick={() => onSelect(t.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(t.id);
                }
              }}>
              <circle cx={cx} cy={cy} r={DOT_HIT_R} fill="transparent" />
              {isSelected && !isActive && (
                <circle cx={cx} cy={cy} r={DOT_R + 4}
                  fill="none" stroke={t.color} strokeWidth="1" opacity={0.45}
                  style={{ transition: "all 0.15s" }} />
              )}
              <circle cx={cx} cy={cy}
                r={isActive ? DOT_R + 2.5 : DOT_R}
                fill={t.color}
                opacity={isDim ? 0.12 : isActive ? 1 : 0.72}
                stroke={isActive ? "#fff" : "none"} strokeWidth="1.5"
                style={{ cursor: "pointer", transition: "all 0.15s" }} />
            </g>
          );
        })
      )}

      {activeT && [0, 1, 2].map((vi) => <HoverChip key={vi} vi={vi} t={activeT} />)}

      {vertices.map((v, i) => (
        <circle key={i} cx={v.x} cy={v.y} r="5"
          fill="#0A1220" stroke="#3B5270" strokeWidth="2" />
      ))}

      <text x={centroid.x} y={centroid.y - 7} textAnchor="middle"
        fill="#2D3D50" fontSize="11" fontFamily="Cormorant Garamond, serif"
        fontStyle="italic">Trilemma</text>
      <text x={centroid.x} y={centroid.y + 9} textAnchor="middle"
        fill="#1F2937" fontSize="9" fontFamily="'Noto Sans JP', sans-serif">
        {trilemmas.length} selected
      </text>
    </svg>
  );
}

function Card({ t, activeId, selectedId, setHovered, onSelect }) {
  const isActive = activeId === t.id;
  const isSelected = selectedId === t.id;
  const isDim = activeId !== null && !isActive;
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={t.name}
      aria-pressed={isSelected}
      onMouseEnter={() => setHovered(t.id)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(t.id)}
      onBlur={() => setHovered(null)}
      onClick={() => onSelect(t.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(t.id);
        }
      }}
      style={{
        background: isActive ? "#111827" : "#0D1520",
        border: `1px solid ${isActive ? t.color : isSelected ? t.color + "55" : "#1F2937"}`,
        borderLeft: `4px solid ${t.color}`,
        borderRadius: "8px", padding: "10px 14px",
        cursor: "pointer", transition: "all 0.15s",
        opacity: isDim ? 0.28 : 1,
      }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
        <span style={{ color: t.color, fontWeight: 700, fontSize: "13px",
          fontFamily: "'Noto Sans JP', sans-serif" }}>{t.name}</span>
        <span style={{ color: "#374151", fontSize: "10px" }}>{t.author}</span>
      </div>
      <div style={{ display: "flex", gap: "5px", marginTop: "5px", flexWrap: "wrap" }}>
        {t.elements.map((el, i) => (
          <span key={i} style={{
            background: "#1A2535", border: `1px solid ${t.color}44`,
            color: t.color, borderRadius: "4px", padding: "2px 8px",
            fontSize: "11px", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 600,
          }}>{el}</span>
        ))}
      </div>
      {isActive && (
        <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "7px 0 0",
          fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1.6 }}>
          {t.desc}
        </p>
      )}
    </div>
  );
}

export default function App() {
  const [domain, setDomain] = useState("all");
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const activeId = hovered ?? selected;
  const filteredTrilemmas = domain === "all" ? TRILEMMAS : TRILEMMAS.filter(t => t.domain === domain);

  const handleDomainChange = (id) => {
    setDomain(id);
    setHovered(null);
    setSelected(null);
  };

  const handleSelect = (id) => {
    setSelected(prev => prev === id ? null : id);
  };

  return (
    <div style={{ background: "#080C14", minHeight: "100vh", color: "#E8E4D8",
      fontFamily: "'Noto Sans JP', sans-serif", padding: "24px 16px 40px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 400,
          fontSize: "clamp(22px, 5vw, 36px)", letterSpacing: "0.1em", margin: "0 0 4px" }}>
          World Trilemma Atlas
        </h1>
        <p style={{ color: "#4B5563", fontSize: "11px", letterSpacing: "0.2em",
          margin: 0, fontWeight: 300 }}>
          世界中のトリレンマ {TRILEMMAS.length}選 ― 3つは同時に達成できない
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px",
        justifyContent: "center", marginBottom: "20px" }}>
        {DOMAINS.map((d) => {
          const active = domain === d.id;
          const cnt = d.id === "all" ? TRILEMMAS.length
            : TRILEMMAS.filter(t => t.domain === d.id).length;
          return (
            <button key={d.id} onClick={() => handleDomainChange(d.id)}
              style={{
                background: active ? "#1E3A5F" : "#0D1520",
                border: `1px solid ${active ? "#3B82F6" : "#1F2937"}`,
                color: active ? "#93C5FD" : "#6B7280",
                borderRadius: "20px", padding: "5px 14px", fontSize: "12px",
                cursor: "pointer", fontFamily: "'Noto Sans JP', sans-serif",
                transition: "all 0.15s", display: "flex", alignItems: "center", gap: "5px",
              }}>
              {d.icon} {d.label}
              <span style={{ background: active ? "#1D4ED8" : "#111827",
                borderRadius: "10px", padding: "0 6px", fontSize: "10px",
                color: active ? "#BFDBFE" : "#374151" }}>{cnt}</span>
            </button>
          );
        })}
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      <p style={{ textAlign: "center", color: "#1E3050", fontSize: "11px",
        margin: "0 0 16px", letterSpacing: "0.08em" }}>
        ● ドットまたはカードをホバー・クリック → 詳細表示（クリックで固定）
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px",
        justifyContent: "center", alignItems: "flex-start" }}>

        <div style={{ flex: "0 0 auto", width: "min(100%, 520px)" }}>
          <TriangleViz
            trilemmas={filteredTrilemmas}
            activeId={activeId}
            selectedId={selected}
            setHovered={setHovered}
            onSelect={handleSelect}
          />
        </div>

        <div style={{ flex: "1 1 280px", maxWidth: "460px",
          display: "flex", flexDirection: "column", gap: "8px",
          paddingRight: "4px" }}>
          {filteredTrilemmas.map((t) => (
            <Card key={t.id} t={t}
              activeId={activeId}
              selectedId={selected}
              setHovered={setHovered}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
