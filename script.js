// 地図初期表示（高知駅）
const map = L.map('map').setView([33.5597, 133.5311], 14);

// 地図タイル
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// ===== 実在する高知市内のカフェ（例）=====
const cafes = [
  {
    name: "ココチコーヒー（Cocochi Coffee）",
    lat: 33.5599,
    lng: 133.5324,
    rating: 3.8,
    open: true,
    minutes: 2
  },
  {
    name: "メフィストフェレス",
    lat: 33.5595,
    lng: 133.5356,
    rating: 4.4,
    open: true,
    minutes: 8
  },
  {
    name: "Kissaco",
    lat: 33.5587,
    lng: 133.5297,
    rating: 4.4,
    open: true,
    minutes: 10
  },
  {
    name: "グレイジコーヒーロースター",
    lat: 33.5637,
    lng: 133.5301,
    rating: 4.4,
    open: true,
    minutes: 13
  },
  {
    name: "ひだまり小路 土佐茶カフェ",
    lat: 33.5602,
    lng: 133.5372,
    rating: 4.0,
    open: true,
    minutes: 7
  }
];

let markers = [];

// ===== 絞り込み表示 =====
function updateMap() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  const openOnly = document.getElementById("openOnly").checked;
  const rating = Number(document.getElementById("rating").value);
  const minutes = Number(document.getElementById("minutes").value);

  cafes.forEach(cafe => {
    if (openOnly && !cafe.open) return;
    if (cafe.rating < rating) return;
    if (cafe.minutes > minutes) return;

    const marker = L.marker([cafe.lat, cafe.lng])
      .addTo(map)
      .bindPopup(
        `<b>${cafe.name}</b><br>
         評価：★${cafe.rating}<br>
         高知駅から徒歩${cafe.minutes}分<br>
         ${cafe.open ? "🟢 営業中" : "🔴 営業終了"}`
      );

    markers.push(marker);
  });
}

// UI操作
document.querySelectorAll("input, select").forEach(el => {
  el.addEventListener("change", updateMap);
});

// 初期表示
updateMap();

