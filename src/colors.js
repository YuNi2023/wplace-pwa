// src/colors.js
// Wplace のカラーパレット対応表（id => 見やすい名前）
// - 判明しているIDのみ名称を収録
// - 未判明はコメントのまま残しています（分かり次第、名前に差し替え）

export const COLOR_TABLE = {
  0:  "Transparent",
  1:  "Black",
  2:  "Dark Gray",
  3:  "Gray",
  4:  "Light Gray",
  5:  "White",           // ← 追加

  6:  "Deep Red",
  7:  "Red",
  8:  "Orange",
  9:  "Gold",
  10: "Yellow",
  11: "Light Yellow",

  12: "Dark Green",
  13: "Green",
  14: "Light Green",
  15: "Dark Teal",
  16: "Teal",
  17: "Light Teal",

  18: "Dark Blue",
  19: "Blue",
  20: "Cyan",
  21: "Indigo",
  22: "Light Indigo",

  23: "Dark Purple",
  24: "Purple",
  25: "Light Purple",

  26: "Dark Pink",
  27: "Pink",
  28: "Light Pink",

  29: "Dark Brown",
  30: "Brown",
  31: "Beige",           // ← 追加

  32: "Medium Gray",
  33: "Dark Red",
  34: "Light Red",
  35: "Dark Orange",
  36: "Light Tan",       // ← 追加

  37: "Dark Goldenrod",
  38: "Goldenrod",
  39: "Light Goldenrod",

  40: "Dark Olive",
  41: "Olive",
  42: "Light Olive",

  43: "Dark Cyan",
  44: "Light Cyan",
  45: "Light Blue",

  46: "Dark Indigo",
  47: "Dark Slate Blue",
  48: "Slate Blue",
  49: "Light Slate Blue",

  50: "Light Brown",
  51: "Dark Beige",      // ← 追加
  52: "Light Beige",     // ← 追加

  53: "Dark Peach",
  54: "Peach",
  55: "Light Peach",
  56: "Dark Tan",
  57: "Tan",

  58: "Dark Slate",
  59: "Slate",
  60: "Light Slate",

  61: "Dark Stone",
  62: "Stone",
  63: "Light Stone",

  // 以降、見つかり次第追記
};

// --- ユーティリティ ---

/** IDから表示名を取得（未定義は "color-<id>" を返す） */
export function colorNameById(id) {
  return COLOR_TABLE[id] || `color-${id}`;
}

/** ID配列 -> { id, name } 配列 へ変換 */
export function mapColorIds(ids = []) {
  return ids.map((id) => ({ id, name: colorNameById(id) }));
}

/** ID配列 -> 名前配列 へ変換（UIでの簡易表示用） */
export function colorNamesFromIds(ids = []) {
  return ids.map(colorNameById);
}
