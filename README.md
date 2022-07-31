# COMP3900 w18a-terraluna Project
## Interface Specifications
### Data Types
| Variable name | Type |
|---|---|
| named exactly **name** | string |
| named exactly **description** | string |
| named exactly **mealType** | [ string ] |
| named exactly **dietType** | [ string ] |
| named exactly **recipeInstructions** | string |
| named exactly **expectedDuration** | integer |
| named exactly **quantity** | integer |
| named exactly **units** | string |
| named exactly **published** | enum |
| named exactly **query** | string |
| named exactly **message** | string |
| (output only) named exactly **time** | integer (unix timestamp) |
| has suffix **_id** | integer |
| has suffix **_url** | string |
| (input only) named exactly **ingredients** | List of dictionaries, where each dictionary contains types { ingredient_id, quantity, units } |
| named exactly **filters** | Dictionary containing { ...different booleans vegetarian, lactose, vegan } |
| (outputs only) named exactly **ingredients** | List of dictionaries, where each dictionary contains types { ingredient_id, name } |
| (outputs only) named exactly **ingredientCategories** | List of dictionaries, where each dictionary contains types { name, ingredients } |
| (outputs only) named exactly **recipes** | List of dictionaries, where each dictionary contains types { recipe_id, name, recipePhoto_url, published, description } |
| (outputs only) named exactly **comments** | List of dictionaries, where each dictionary contains types { comment_id, name, message, time } |

### Interface
| HTTP Route | HTTP Method | Parameters | Return type | Exceptions | Description |
|---|---|---|---|---|---|
| /ingredients | GET | { query } | { ingredients } |  |  |
| /recipe | POST | { name, recipePhoto_url, recipeVideo_url, description, mealType, dietType, recipeInstructions, expectedDuration, requiredIngredients } | { recipe_id, name, recipePhoto_url, published, description } |  |  |
| /my_recipes | GET | {} | { recipes } |  |  |
| /my_recipes/{id} | GET | {} | { name, recipePhoto_url, recipeVideo_url, description, mealType, dietType, recipeInstructions, expectedDuration, requiredIngredients } |  |  |
| /my_recipes/{id} | PUT | { name, recipePhoto_url, recipeVideo_url, description, mealType, dietType, recipeInstructions, expectedDuration, requiredIngredients } | { recipe_id, name, recipePhoto_url, published, description } |  |  |
| /my_recipes/{id} | DELETE | {} | { recipe_id } |  |  |
| /my_recipe/{id}/copy | POST | {} | { recipe_id, name, recipePhoto_url, published, description } |  |  |
| /my_recipe/{id}/publish | PUT | { recipe_id } | { recipe_id, name, recipePhoto_url, published, description } |  |  |
| recipe_explorers/ingredient_categories | GET | {} | { ingredientCategories } |  |  |
| recipe_explorers/search | GET | { ...smth... } | { recipes } |  |  |
| recipe_explorers/recipe/view | GET | { recipe_id } | { view_recipe_format including comments } |  |  |
| recipe_explorers/recipe/comment | POST | { recipe_id, message } | { comment_id } |  |  |
