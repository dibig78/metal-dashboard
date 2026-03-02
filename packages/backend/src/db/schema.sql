CREATE TABLE IF NOT EXISTS monthly_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  period TEXT NOT NULL UNIQUE,
  sn REAL, ag REAL, pb REAL, ni REAL, cu REAL, al REAL,
  ttm_usd REAL, ttm_jpy REAL,
  sac305 REAL, hse16 REAL, hse39 REAL, hse11 REAL, s63 REAL, hse100 REAL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS quarterly_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  period TEXT NOT NULL UNIQUE,
  sn REAL, ag REAL, pb REAL, ni REAL, cu REAL, al REAL,
  ttm_usd REAL, ttm_jpy REAL,
  sac305 REAL, hse16 REAL, hse39 REAL, hse11 REAL, s63 REAL, hse100 REAL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS annual_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  period TEXT NOT NULL UNIQUE,
  sn REAL, ag REAL, pb REAL, ni REAL, cu REAL, al REAL,
  ttm_usd REAL, ttm_jpy REAL,
  sac305 REAL, hse16 REAL, hse39 REAL, hse11 REAL, s63 REAL, hse100 REAL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS latest_prices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  symbol TEXT NOT NULL UNIQUE,
  name_ko TEXT NOT NULL,
  name_en TEXT NOT NULL,
  current_value REAL,
  previous_value REAL,
  change_amount REAL,
  change_percent REAL,
  unit TEXT,
  category TEXT NOT NULL,
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  summary TEXT,
  source TEXT,
  url TEXT,
  published_at TEXT,
  category TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS market_issues (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  symbol TEXT NOT NULL,
  issue_text TEXT NOT NULL,
  severity TEXT DEFAULT 'info',
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);
