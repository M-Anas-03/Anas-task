// Local Mock Data
const AVAILABLE_INGREDIENTS = ["Eggs", "Cheese", "Bread", "Tomatoes", "Milk", "Butter"];

const RECIPES = [
    {
        title: "Classic Cheese Omelette",
        ingredients: ["Eggs", "Cheese", "Butter"],
        instructions: "Whisk eggs, pour into a hot pan with melted butter, add cheese, fold, and serve."
    },
    {
        title: "Quick Margherita Pizza",
        ingredients: ["Bread", "Tomatoes", "Cheese"],
        instructions: "Place sliced tomatoes and cheese over bread. Toast until cheese melts completely."
    },
    {
        title: "Classic French Toast",
        ingredients: ["Bread", "Eggs", "Milk", "Butter"],
        instructions: "Whisk eggs and milk. Dip bread slices into mixture, then fry in butter until golden brown."
    },
    {
        title: "Creamy Scrambled Eggs",
        ingredients: ["Eggs", "Milk", "Butter"],
        instructions: "Melt butter, cook whisked eggs and a splash of milk over low heat, stirring constantly."
    }
];

// Render Checkboxes dynamically when page loads
document.addEventListener("DOMContentLoaded", function() {
    const ingredientsContainer = document.getElementById('ingredients-container');
    if (ingredientsContainer) {
        AVAILABLE_INGREDIENTS.forEach((ingredient, index) => {
            ingredientsContainer.innerHTML += `
                <div class="form-check mb-2 fs-5">
                    <input class="form-check-input ingredient-checkbox" type="checkbox" value="${ingredient}" id="check-${index}">
                    <label class="form-check-label" for="check-${index}">${ingredient}</label>
                </div>
            `;
        });
    }
});

// Search Logic
function findRecipes() {
    // Get all checked ingredients
    const checkboxes = document.querySelectorAll('.ingredient-checkbox:checked');
    const selectedIngredients = Array.from(checkboxes).map(cb => cb.value);
    
    const outputContainer = document.getElementById('recipes-output');
    if (!outputContainer) return;
    
    outputContainer.innerHTML = ""; // Clear old results

    // Filter recipes
    const matchedRecipes = RECIPES.filter(recipe => 
        recipe.ingredients.every(item => selectedIngredients.includes(item))
    );

    // Display results
    if (matchedRecipes.length > 0) {
        matchedRecipes.forEach(recipe => {
            outputContainer.innerHTML += `
                <div class="card p-3 mb-3 recipe-card shadow-sm">
                    <h5 class="text-primary fw-bold mb-1">${recipe.title}</h5>
                    <p class="text-muted small mb-2"><strong>Required:</strong> ${recipe.ingredients.join(', ')}</p>
                    <p class="mb-0 text-dark">${recipe.instructions}</p>
                </div>
            `;
        });
    } else {
        outputContainer.innerHTML = `
            <div class="text-center py-5 text-muted">
                <p class="fs-5 text-danger">No recipes match your current selection.</p>
                <p class="small">Try selecting more items from your fridge panel!</p>
            </div>
        `;
    }
}
