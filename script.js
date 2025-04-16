const placeholderImage = "https://source.unsplash.com/250x200/?restaurant,food";
const cuisines = ['Japanese', 'Chinese', 'Italian', 'Hamburgers'];

const cuisineKeywords = {
  Japanese: "japanese-food",
  Chinese: "chinese-food",
  Italian: "italian-food",
  Hamburgers: "burger"
};

const names = {
  Japanese: ['Sakura Sushi', 'Tokyo Table', 'Osaka Grill', 'Nobu LA', 'Yamato Bistro'],
  Chinese: ['Golden Dragon', 'Beijing Express', 'Din Tai Fung', 'Szechuan Palace', 'Dim Sum Garden'],
  Italian: ['Pasta Fresca', 'Trattoria Roma', 'Napoli Oven', 'Luigi’s Place', 'Bella Cucina'],
  Hamburgers: ['Burger Haven', 'Grill House', 'Patty Shack', 'LA Buns', 'Big Bite Burgers']
};

const images = {
  'Sakura Sushi': 'https://www.sakurasushi.nl/wp-content/uploads/2018/12/IMG_5623.jpg',
  'Tokyo Table': 'https://www.tokyoweekender.com/wp-content/uploads/2014/05/Kobe511b.jpg',
  'Osaka Grill': 'https://www.lasvegas-sushi.com/wp-content/uploads/2012/11/OSAKA-7155.jpg',
  'Nobu LA': 'https://2.bp.blogspot.com/-rGnkO4Sh_80/VPbrK5763EI/AAAAAAAAB_k/erLsswacFig/s1600/AkiraBack%2B(16%2Bof%2B24).jpg',
  'Yamato Bistro': 'https://static.wixstatic.com/media/b6638f_ed68349d519247baad961dad1ae1ce4c~mv2.jpg/v1/fill/w_449,h_337,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/b6638f_ed68349d519247baad961dad1ae1ce4c~mv2.jpg',

  'Golden Dragon': 'https://toasttab.s3.amazonaws.com/restaurant_service/restaurants/52d5a2d5-7379-4b8a-8810-cdc34a2632c1/Restaurant/e70ddda1-99d2-41ad-b00b-d6f68df34abe.jpg',
  'Beijing Express': 'https://png.pngtree.com/thumb_back/fw800/background/20220318/pngtree-halal-beef-noodles-with-light-taste-image_1034823.jpg',
  'Din Tai Fung': 'https://ialive.bwnet.com.tw/AC_Gallery/2023/03/1b14575b-f264-d98e-a773-07381652829f.jpg',
  'Szechuan Palace': 'https://th.bing.com/th/id/OIP.J3EdDcf6j_ENUx1sBrGnHQHaE6?rs=1&pid=ImgDetMain',
  'Dim Sum Garden': 'https://cdn.asiatatler.com/asiatatler/i/hk/2021/05/25181007-gcc-annex-hotpot_article_1800x1200.jpg',

  'Pasta Fresca': 'https://www.moltofood.it/wp-content/uploads/2022/06/Pasta_fredda_cover.jpg',
  'Trattoria Roma': 'https://media-cdn.tripadvisor.com/media/photo-s/13/26/79/af/photo0jpg.jpg',
  'Napoli Oven': 'https://th.bing.com/th/id/OIP.N8RhUKamcO0XYBXptwC76gHaE8?rs=1&pid=ImgDetMain',
  'Luigi’s Place': 'https://luigissheboygan.com/perch/resources/img0666-w1100h800.jpg',
  'Bella Cucina': 'https://santaclaritamagazine.s3.us-west-1.amazonaws.com/wp-content/uploads/2022/03/28163655/DIN-BellaCucina.jpg',

  'Burger Haven': 'https://burgerhaven.com.au/wp-content/uploads/2020/08/the-bh.jpg',
  'Grill House': 'https://th.bing.com/th/id/OIP.4h0oqYu3IKSm5FEGPfKp5wHaE8?rs=1&pid=ImgDetMain',
  'Patty Shack': 'https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/14/DIFFHigA-1The-Grill-Shack.jpg',
  'LA Buns': 'https://alikhaneats.com/wp-content/uploads/2014/11/IMG_2145-scaled.jpg',
  'Big Bite Burgers': 'https://www.holidaygenie.com/blog/wp-content/uploads/2017/09/burgers-850x459.jpg'
};

let originalRestaurants = Array.from({ length: 20 }, (_, i) => {
  const typeIndex = Math.floor(i / 5);
  const cuisine = cuisines[typeIndex];
  const name = names[cuisine][i % 5];
  return {
    name,
    cuisine,
    rating: (Math.random() * 2 + 3).toFixed(1),
    image: images[name] || placeholderImage,
    features: ['Delivery', 'Outdoor Seating', 'Family Friendly'].slice(0, (i % 3) + 1)
  };
});

let restaurants = [...originalRestaurants];

const container = document.getElementById("restaurantContainer");
const template = document.getElementById("restaurant-template");

function displayRestaurants(list) {
  container.innerHTML = "";
  list.forEach(r => {
    const card = template.content.cloneNode(true);
    const img = card.querySelector("img");
    img.src = r.image || placeholderImage;
    img.onerror = () => img.src = placeholderImage;
    card.querySelector("h3").textContent = r.name || "Unnamed";
    card.querySelector(".cuisine").textContent = `Cuisine: ${r.cuisine || 'Unknown'}`;
    card.querySelector(".rating").textContent = `Rating: ${r.rating ?? 'N/A'}`;
    const ul = card.querySelector(".features");
    (r.features || []).forEach(f => {
      const li = document.createElement("li");
      li.textContent = f;
      ul.appendChild(li);
    });
    container.appendChild(card);
  });
}

function addRestaurant() {
  const name = prompt("Enter restaurant name:");
  const cuisine = prompt("Enter cuisine type:");
  const rating = parseFloat(prompt("Enter rating (0-5):"));
  const image = prompt("Enter image URL:") || placeholderImage;
  const featuresInput = prompt("Enter features (comma separated):");
  const features = featuresInput?.split(',').map(f => f.trim()) || [];
  if (!name || !cuisine) return;
  restaurants.push({ name, cuisine, rating, image, features });
  displayRestaurants(restaurants);
}

function removeRestaurant() {
  const name = prompt("Enter the name of the restaurant to remove:");
  const index = restaurants.findIndex(r => r.name.toLowerCase() === name.toLowerCase());
  if (index !== -1) {
    restaurants.splice(index, 1);
    displayRestaurants(restaurants);
  } else {
    alert("Restaurant not found.");
  }
}

function resetRestaurants() {
  restaurants = [...originalRestaurants];
  displayRestaurants(restaurants);
}

document.getElementById("search").addEventListener("input", function() {
  const query = this.value.toLowerCase();
  const filtered = restaurants.filter(r =>
    r.name?.toLowerCase().includes(query) ||
    r.cuisine?.toLowerCase().includes(query)
  );
  displayRestaurants(filtered);
});

document.getElementById("sort").addEventListener("change", function() {
  const val = this.value;
  const sorted = [...restaurants].sort((a, b) => {
    if (val === "name") return (a.name || "").localeCompare(b.name || "");
    if (val === "cuisine") return (a.cuisine || "").localeCompare(b.cuisine || "");
    if (val === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });
  displayRestaurants(sorted);
});

document.addEventListener("DOMContentLoaded", () => displayRestaurants(restaurants));
