"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer, Area, AreaChart,
} from "recharts";
import { getMarketData } from "@/lib/supabase";

// ── Constants ────────────────────────────────────────────────────────────────

const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_NUM  = Array.from({ length: 12 }, (_, i) => i + 1);
const YEARS       = Array.from({ length: 6  }, (_, i) => new Date().getFullYear() - i);

// ── Helpers ───────────────────────────────────────────────────────────────────

function verdict(type) {
  return {
    sellers:  { label: "Seller's",  color: "#2d6a4f", bg: "rgba(45,106,79,0.12)",  border: "rgba(45,106,79,0.3)"  },
    balanced: { label: "Balanced",  color: "#1d5f8a", bg: "rgba(29,95,138,0.12)",  border: "rgba(29,95,138,0.3)"  },
    buyers:   { label: "Buyer's",   color: "#9b2335", bg: "rgba(155,35,53,0.12)",   border: "rgba(155,35,53,0.3)"  },
    no_sales: { label: "No Sales",  color: "#555",    bg: "rgba(80,80,80,0.08)",    border: "rgba(80,80,80,0.2)"   },
  }[type] ?? { label: "—", color: "#555", bg: "transparent", border: "transparent" };
}

function trend(curr, prev) {
  if (curr == null || prev == null) return null;
  const d = curr - prev;
  if (Math.abs(d) < 0.1) return { label: "Stable",     icon: "→", color: "#666" };
  if (d > 0)             return { label: "Loosening",  icon: "↑", color: "#9b2335" };
  return                        { label: "Tightening", icon: "↓", color: "#2d6a4f" };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Label({ children }) {
  return (
    <div style={{
      fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
      color: "#555", marginBottom: 8,
    }}>{children}</div>
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value;
  const v = verdict(val == null ? "no_sales" : val < 5 ? "sellers" : val <= 6 ? "balanced" : "buyers");
  return (
    <div style={{
      background: "#0f0f0d", border: `1px solid ${v.border}`,
      padding: "10px 14px", fontFamily: "monospace", fontSize: 12,
      boxShadow: `0 4px 24px rgba(0,0,0,0.6)`,
    }}>
      <div style={{ opacity: 0.45, letterSpacing: "0.1em", marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 700 }}>
        {val?.toFixed(1)}
        <span style={{ fontSize: 11, opacity: 0.45, marginLeft: 3 }}>mo</span>
      </div>
      <div style={{ color: v.color, fontSize: 11, marginTop: 3, letterSpacing: "0.1em" }}>
        {v.label} Market
      </div>
    </div>
  );
}

// ── Add Entry Form ────────────────────────────────────────────────────────────

function AddEntryForm({ onAdd, existingCities }) {
  const now = new Date();
  const [form, setForm] = useState({
    city: "", month: now.getMonth() + 1,
    year: now.getFullYear(), active_listings: "", closed_sales: "",
  });
  const [cityInput, setCityInput]   = useState("");
  const [showDrop, setShowDrop]     = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg]               = useState(null); // { type: "ok"|"err", text }

  const filtered = existingCities.filter((c) =>
    c.toLowerCase().includes(cityInput.toLowerCase())
  );

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  async function submit() {
    if (!form.city || !form.active_listings || !form.closed_sales) {
      setMsg({ type: "err", text: "All fields are required." });
      return;
    }
    setSubmitting(true);
    setMsg(null);
    try {
      const res = await fetch("/api/market", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          active_listings: parseInt(form.active_listings),
          closed_sales:    parseInt(form.closed_sales),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setMsg({ type: "ok", text: `Saved — ${form.city} ${MONTH_NAMES[form.month]} ${form.year}` });
      onAdd(form.city);
      setForm((f) => ({ ...f, active_listings: "", closed_sales: "" }));
    } catch (e) {
      setMsg({ type: "err", text: e.message });
    } finally {
      setSubmitting(false);
    }
  }

  const inputStyle = {
    width: "100%", background: "#0f0f0d",
    border: "1px solid #242422", borderBottom: "1.5px solid #c8a44a",
    color: "#f4f0e8", fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "1.1rem", padding: "0.45rem 0.6rem",
  };

  const selectStyle = {
    background: "#0f0f0d", border: "1px solid #242422",
    color: "#f4f0e8", fontFamily: "monospace",
    fontSize: 13, padding: "0.45rem 0.5rem",
  };

  return (
    <div style={{
      background: "#141412", border: "1px solid #242422",
      borderTop: "2px solid #c8a44a", padding: "1.5rem",
      marginBottom: "2rem",
    }}>
      <Label>Add / Update Entry</Label>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>

        {/* City */}
        <div style={{ gridColumn: "1 / -1", position: "relative" }}>
          <Label>City</Label>
          <input
            type="text"
            value={cityInput}
            placeholder="e.g. Toronto, ON"
            onChange={(e) => {
              setCityInput(e.target.value);
              set("city", e.target.value);
              setShowDrop(true);
            }}
            onFocus={() => setShowDrop(true)}
            onBlur={() => setTimeout(() => setShowDrop(false), 150)}
            style={inputStyle}
          />
          {showDrop && filtered.length > 0 && (
            <div style={{
              position: "absolute", top: "100%", left: 0, right: 0,
              background: "#1a1a18", border: "1px solid #242422", zIndex: 50,
              maxHeight: 160, overflowY: "auto",
            }}>
              {filtered.map((c) => (
                <div
                  key={c}
                  onMouseDown={() => {
                    setCityInput(c); set("city", c); setShowDrop(false);
                  }}
                  style={{
                    padding: "0.45rem 0.7rem", cursor: "pointer",
                    fontSize: 13, color: "#aaa", borderBottom: "1px solid #1f1f1d",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#242422"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  {c}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Month + Year */}
        <div>
          <Label>Month</Label>
          <select value={form.month} onChange={(e) => set("month", +e.target.value)} style={{ ...selectStyle, width: "100%" }}>
            {MONTHS_NUM.map((m) => (
              <option key={m} value={m}>{MONTH_NAMES[m]}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>Year</Label>
          <select value={form.year} onChange={(e) => set("year", +e.target.value)} style={{ ...selectStyle, width: "100%" }}>
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        {/* Listings + Sales */}
        <div>
          <Label>Active Listings</Label>
          <input
            type="number" min="0" value={form.active_listings}
            placeholder="e.g. 8000"
            onChange={(e) => set("active_listings", e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <Label>Closed Sales</Label>
          <input
            type="number" min="0" value={form.closed_sales}
            placeholder="e.g. 1000"
            onChange={(e) => set("closed_sales", e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Preview */}
      {form.active_listings && form.closed_sales && +form.closed_sales > 0 && (() => {
        const mo = +form.active_listings / +form.closed_sales;
        const v  = verdict(mo < 5 ? "sellers" : mo <= 6 ? "balanced" : "buyers");
        return (
          <div style={{
            display: "flex", alignItems: "center", gap: "0.8rem",
            padding: "0.6rem 0.8rem", background: v.bg,
            border: `1px solid ${v.border}`, marginBottom: "1rem",
          }}>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: v.color }}>
              {mo.toFixed(1)} mo
            </span>
            <span style={{ fontSize: 11, color: v.color, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {v.label} Market
            </span>
          </div>
        );
      })()}

      <button
        onClick={submit}
        disabled={submitting}
        style={{
          background: submitting ? "#2a2a28" : "#c8a44a",
          border: "none", color: submitting ? "#555" : "#0f0f0d",
          fontFamily: "monospace", fontSize: 12,
          letterSpacing: "0.15em", textTransform: "uppercase",
          padding: "0.65rem 1.5rem", cursor: submitting ? "not-allowed" : "pointer",
          transition: "all 0.15s",
        }}
      >
        {submitting ? "Saving..." : "Save Entry"}
      </button>

      {msg && (
        <div style={{
          marginTop: "0.8rem", fontSize: 12,
          color: msg.type === "ok" ? "#2d6a4f" : "#9b2335",
          letterSpacing: "0.05em",
        }}>
          {msg.type === "ok" ? "✓" : "✗"} {msg.text}
        </div>
      )}
    </div>
  );
}

// ── Main Calculator ───────────────────────────────────────────────────────────

export default function AbsorptionCalculator({ initialCities = [] }) {
  const [cities, setCities]         = useState(initialCities);
  const [cityInput, setCityInput]   = useState("");
  const [selectedCity, setSelected] = useState("");
  const [showDrop, setShowDrop]     = useState(false);
  const [monthsLimit, setMonths]    = useState(12);
  const [rows, setRows]             = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);
  const [showAdd, setShowAdd]       = useState(false);

  const filteredCities = cities.filter((c) =>
    c.toLowerCase().includes(cityInput.toLowerCase())
  );

  const loadData = useCallback(async (city, limit) => {
    if (!city) return;
    setLoading(true); setError(null);
    try {
      const data = await getMarketData(city, limit);
      setRows(data);
    } catch {
      setError("Could not load data. Check your Supabase connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(selectedCity, monthsLimit); }, [selectedCity, monthsLimit, loadData]);

  function selectCity(c) {
    setSelected(c); setCityInput(c); setShowDrop(false);
  }

  function handleAdd(city) {
    // Add city to list if new, reload data
    if (!cities.includes(city)) setCities((prev) => [...prev, city].sort());
    if (selectedCity === city) loadData(city, monthsLimit);
    else selectCity(city);
  }

  const computed = useMemo(() => rows.map((row, i) => ({
    ...row,
    verdict: verdict(row.market_type),
    trend:   trend(row.months_of_inventory, i > 0 ? rows[i - 1].months_of_inventory : null),
    label:   `${MONTH_NAMES[row.month]} ${row.year}`,
  })), [rows]);

  const chartData = computed.map((c) => ({ name: c.label, months: c.months_of_inventory }));

  const vals   = computed.map((c) => c.months_of_inventory).filter((v) => v != null);
  const avg    = vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : null;
  const peak   = vals.length ? Math.max(...vals).toFixed(1) : null;
  const low    = vals.length ? Math.min(...vals).toFixed(1) : null;
  const latest = [...computed].reverse().find((c) => c.months_of_inventory != null);

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0d", color: "#f4f0e8", padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "#c8a44a", textTransform: "uppercase", marginBottom: 8 }}>
              Real Estate · Market Intelligence
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
              fontWeight: 700, lineHeight: 1.1, margin: 0,
            }}>
              Absorption Rate
              <br /><span style={{ color: "#c8a44a" }}>& Inventory Analysis</span>
            </h1>
          </div>
          <button
            onClick={() => setShowAdd((v) => !v)}
            style={{
              background: showAdd ? "#1a1a18" : "transparent",
              border: `1px solid ${showAdd ? "#c8a44a" : "#2a2a28"}`,
              color: showAdd ? "#c8a44a" : "#555",
              fontFamily: "monospace", fontSize: 11,
              letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "0.55rem 1.2rem", cursor: "pointer",
              transition: "all 0.15s", whiteSpace: "nowrap",
            }}
          >
            {showAdd ? "↑ Hide Form" : "+ Add Data"}
          </button>
        </div>

        {/* ── Add Entry Form ── */}
        {showAdd && (
          <AddEntryForm onAdd={handleAdd} existingCities={cities} />
        )}

        {/* ── Controls ── */}
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "flex-end", marginBottom: "2rem" }}>

          {/* City selector */}
          <div style={{ flex: "1 1 260px", position: "relative" }}>
            <Label>Market / City</Label>
            <input
              type="text"
              value={cityInput}
              placeholder={cities.length ? "Select or type a city..." : "Add a city above first..."}
              onChange={(e) => { setCityInput(e.target.value); setShowDrop(true); }}
              onFocus={() => setShowDrop(true)}
              onBlur={() => setTimeout(() => setShowDrop(false), 150)}
              style={{
                width: "100%", background: "#141412",
                border: "1px solid #242422", borderBottom: "2px solid #c8a44a",
                color: "#f4f0e8", fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.2rem", padding: "0.5rem 0.8rem",
                outline: "none",
              }}
            />
            {showDrop && filteredCities.length > 0 && (
              <div style={{
                position: "absolute", top: "100%", left: 0, right: 0,
                background: "#1a1a18", border: "1px solid #242422",
                zIndex: 50, maxHeight: 200, overflowY: "auto",
              }}>
                {filteredCities.map((c) => (
                  <div
                    key={c}
                    onMouseDown={() => selectCity(c)}
                    style={{
                      padding: "0.5rem 0.8rem", cursor: "pointer",
                      fontSize: 13, color: "#aaa", borderBottom: "1px solid #1f1f1d",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#242422"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Months range */}
          <div>
            <Label>Period</Label>
            <div style={{ display: "flex", gap: "0.3rem" }}>
              {[3, 6, 12, 24].map((n) => (
                <button
                  key={n}
                  onClick={() => setMonths(n)}
                  style={{
                    width: 48, padding: "0.5rem 0",
                    background: monthsLimit === n ? "#c8a44a" : "#141412",
                    border: `1px solid ${monthsLimit === n ? "#c8a44a" : "#242422"}`,
                    color: monthsLimit === n ? "#0f0f0d" : "#555",
                    fontFamily: "monospace", fontSize: 12,
                    cursor: "pointer", transition: "all 0.12s",
                  }}
                >
                  {n}mo
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div style={{
            background: "rgba(155,35,53,0.1)", border: "1px solid rgba(155,35,53,0.4)",
            color: "#e07070", padding: "0.8rem 1.2rem",
            fontSize: 12, marginBottom: "1.5rem", letterSpacing: "0.04em",
          }}>
            ✗ {error}
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div style={{ color: "#2a2a28", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Loading...
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && !selectedCity && !error && (
          <div style={{
            border: "1px dashed #1f1f1d", padding: "5rem 2rem",
            textAlign: "center", color: "#2a2a28",
            fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
          }}>
            Select a city above to view market data
          </div>
        )}

        {!loading && selectedCity && !error && computed.length === 0 && (
          <div style={{
            border: "1px dashed #1f1f1d", padding: "4rem 2rem",
            textAlign: "center", color: "#2a2a28",
            fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
          }}>
            No data for {selectedCity} — add entries using the form above
          </div>
        )}

        {/* ── Results ── */}
        {!loading && computed.length > 0 && (
          <>
            {/* Summary strip */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1px", background: "#1a1a18",
              border: "1px solid #1a1a18", marginBottom: "1.5rem",
            }}>
              {[
                { label: "Latest",  value: latest ? `${latest.months_of_inventory?.toFixed(1)}` : "—", unit: "mo", color: latest?.verdict?.color ?? "#555" },
                { label: "Average", value: avg  ?? "—", unit: avg  ? "mo" : "", color: "#c8a44a" },
                { label: "Peak",    value: peak ?? "—", unit: peak ? "mo" : "", color: "#9b2335" },
                { label: "Low",     value: low  ?? "—", unit: low  ? "mo" : "", color: "#2d6a4f" },
              ].map(({ label, value, unit, color }) => (
                <div key={label} style={{ background: "#141412", padding: "1.2rem 1.4rem" }}>
                  <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#444", marginBottom: 6 }}>{label}</div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.8rem", fontWeight: 700, color, lineHeight: 1 }}>
                    {value}
                    {unit && <span style={{ fontSize: 11, color: "#444", marginLeft: 3 }}>{unit}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div style={{
              background: "#141412", border: "1px solid #1f1f1d",
              padding: "1.5rem", marginBottom: "1.5rem",
            }}>
              <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#444", marginBottom: "1.2rem" }}>
                Months of Inventory · {selectedCity}
              </div>
              <ResponsiveContainer width="100%" height={230}>
                <AreaChart data={chartData} margin={{ top: 8, right: 12, bottom: 0, left: -16 }}>
                  <defs>
                    <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#c8a44a" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#c8a44a" stopOpacity={0}    />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 6" stroke="#1a1a18" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#3a3a38", fontSize: 11, fontFamily: "monospace" }}
                    axisLine={{ stroke: "#1f1f1d" }} tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#3a3a38", fontSize: 11, fontFamily: "monospace" }}
                    axisLine={false} tickLine={false} domain={[0, "auto"]}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <ReferenceLine y={5} stroke="#2d6a4f" strokeDasharray="4 4" strokeOpacity={0.35}
                    label={{ value: "5mo", fill: "#2d6a4f", fontSize: 9, fontFamily: "monospace", position: "right" }} />
                  <ReferenceLine y={6} stroke="#9b2335" strokeDasharray="4 4" strokeOpacity={0.35}
                    label={{ value: "6mo", fill: "#9b2335", fontSize: 9, fontFamily: "monospace", position: "right" }} />
                  <Area
                    type="monotone" dataKey="months"
                    stroke="#c8a44a" strokeWidth={2}
                    fill="url(#goldGrad)"
                    dot={{ fill: "#c8a44a", r: 3.5, strokeWidth: 0 }}
                    activeDot={{ r: 5.5, fill: "#c8a44a", strokeWidth: 0 }}
                    connectNulls
                  />
                </AreaChart>
              </ResponsiveContainer>

              {/* Zone legend */}
              <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.8rem", flexWrap: "wrap" }}>
                {[
                  { color: "#2d6a4f", label: "< 5 mo — Seller's Zone" },
                  { color: "#c8a44a", label: "5–6 mo — Balanced Zone" },
                  { color: "#9b2335", label: "> 6 mo — Buyer's Zone"  },
                ].map(({ color, label }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "#3a3a38" }}>
                    <div style={{ width: 20, height: 1.5, background: color, opacity: 0.5 }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Table */}
            <div style={{ background: "#141412", border: "1px solid #1f1f1d", overflow: "auto", marginBottom: "1.5rem" }}>
              <div style={{
                padding: "0.8rem 1.4rem", fontSize: 9,
                letterSpacing: "0.2em", textTransform: "uppercase", color: "#444",
                borderBottom: "1px solid #1a1a18",
              }}>
                Month-by-Month Breakdown
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
                <thead>
                  <tr>
                    {["Period", "Active Listings", "Closed Sales", "Months Inv.", "Market Type", "Trend"].map((h) => (
                      <th key={h} style={{
                        padding: "0.55rem 1.4rem", textAlign: "left",
                        fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase",
                        color: "#333", fontWeight: 400, borderBottom: "1px solid #1a1a18",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...computed].reverse().map((c) => (
                    <tr
                      key={c.id}
                      className="fade-up"
                      style={{ borderBottom: "1px solid #1a1a18", transition: "background 0.1s" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#1a1a18"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "0.7rem 1.4rem", fontSize: 12, color: "#555", fontFamily: "monospace" }}>
                        {c.label}
                      </td>
                      <td style={{ padding: "0.7rem 1.4rem", fontFamily: "Georgia, serif", fontSize: 15, color: "#ccc" }}>
                        {c.active_listings?.toLocaleString()}
                      </td>
                      <td style={{ padding: "0.7rem 1.4rem", fontFamily: "Georgia, serif", fontSize: 15, color: "#ccc" }}>
                        {c.closed_sales?.toLocaleString()}
                      </td>
                      <td style={{ padding: "0.7rem 1.4rem" }}>
                        {c.months_of_inventory != null ? (
                          <span style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: 20, fontWeight: 700, color: c.verdict.color,
                          }}>
                            {c.months_of_inventory.toFixed(1)}
                            <span style={{ fontSize: 10, color: "#444", marginLeft: 3 }}>mo</span>
                          </span>
                        ) : <span style={{ color: "#2a2a28" }}>—</span>}
                      </td>
                      <td style={{ padding: "0.7rem 1.4rem" }}>
                        <span style={{
                          display: "inline-block",
                          background: c.verdict.bg,
                          color: c.verdict.color,
                          border: `1px solid ${c.verdict.border}`,
                          padding: "0.2rem 0.6rem",
                          fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
                        }}>
                          {c.verdict.label}
                        </span>
                      </td>
                      <td style={{ padding: "0.7rem 1.4rem" }}>
                        {c.trend ? (
                          <span style={{ fontSize: 11, color: c.trend.color, letterSpacing: "0.05em" }}>
                            {c.trend.icon} {c.trend.label}
                          </span>
                        ) : <span style={{ color: "#1f1f1d" }}>—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Footer */}
        <div style={{
          borderTop: "1px solid #1a1a18", paddingTop: "1rem", marginTop: "0.5rem",
          fontSize: 10, color: "#2a2a28", letterSpacing: "0.04em", lineHeight: 1.9,
        }}>
          Formula: Active Listings ÷ Closed Sales = Months of Inventory ·
          &lt;5mo = Seller's · 5–6mo = Balanced · &gt;6mo = Buyer's ·
          Guidelines vary by market.
        </div>

      </div>
    </div>
  );
}
