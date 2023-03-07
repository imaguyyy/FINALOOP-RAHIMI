const meals = ["Breakfast Potatoes", "Canadian Butter Tarts", "Montreal Smoked Meat", "Nanaimo Bars", "Pate Chinoi","Split Pea Soup"];

const mealContainer = document.querySelector("#meals");

meals.forEach(meal => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const mealData = data.meals[0];

      const name = mealData.strMeal;
      const image = mealData.strMealThumb;

      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = mealData[`strIngredient${i}`];
        if (ingredient) {
          ingredients.push(`${ingredient}`);
        }
      }

      const mealHTML = `
        <div class="meal-container">
          <h3><b>${name}</b></h3><br>
          <img src="${image}" alt="${name}">
          <p><u>Ingredients</u></p>  
          <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
          </ul>
        </div>
      `;

      mealContainer.insertAdjacentHTML("beforeend", mealHTML);
    })
    .catch(error => console.error(error));
});
