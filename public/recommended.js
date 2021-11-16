document.addEventListener('DOMContentLoaded', function(){

    let container = document.createElement("div");

    recipes.forEach(recipe => {
        let meal = document.createElement("div");
        let title = document.createElement("h3");
        title.textContent = recipe.name;

        meal.appendChild(title);
        container.appendChild(meal);

    })
    document.body.appendChild(container);
});