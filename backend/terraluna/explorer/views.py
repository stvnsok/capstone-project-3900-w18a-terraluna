import json

from flask import Blueprint, jsonify, request
from flask.wrappers import Response
from flask_jwt_extended.utils import get_jwt_identity
from flask_jwt_extended.view_decorators import jwt_required

from terraluna.recipe.models import *
from terraluna.recipe.utils import *
from utils import *

from .error import *
from .models import *
from .utils import *

explorer_bp = Blueprint("explorer_bp", __name__)
"""Blueprint: A Blueprint for all recipe explorer routes."""


@explorer_bp.route("/recipes", methods=["GET"])
@jwt_required()
def get_ready_recipes():
    """Get list of published recipes that can be made based on the given list on ingredients."""
    data = request.args
    (pantry_ingredients,) = get_data(data, "ingredients")
    pantry_ingredients = json.loads(pantry_ingredients)["ingredients"]
    pantry_ingredients = [int(id) for id in pantry_ingredients]

    ready_recipes = []
    for recipe in Recipe.query.all():
        if recipe.status != "Published":
            continue

        necessary_ingredients = [
            ingredient.ingredient_id for ingredient in recipe.ingredients
        ]

        absent_necessary_ingredients = [
            ingredient
            for ingredient in necessary_ingredients
            if ingredient not in pantry_ingredients
        ]

        if not absent_necessary_ingredients:
            ready_recipes.append(recipe)

    return jsonify(recipes=[recipe.jsonify() for recipe in ready_recipes])


###############################################################################


@explorer_bp.route("/ingredient_categories", methods=["GET"])
def ingredient_categories():
    """Return a list of all ingredients in categories"""

    result = []
    category_names = db.session.query(IngredientCategory.name).distinct()
    for category_name in category_names:
        ingredients = []
        query = (
            db.session.query(IngredientCategory, Ingredient)
            .filter(IngredientCategory.ingredient_id == Ingredient.id)
            .filter(IngredientCategory.name == category_name)
        )
        for row in query:
            ingredients.append(
                {"ingredient_id": row.Ingredient.id, "name": row.Ingredient.name}
            )
        result.append({"name": category_name, "ingredients": ingredients})

    return jsonify(ingredientCategories=result)


@explorer_bp.route("/pantry", methods=["GET", "PUT"])
@jwt_required(fresh=True)
def pantry():
    """
    GET: return ingredients from the user's saved pantry
    PUT: given a list of ingredients, updates ingredients in user's pantry
    """

    # Retrieve current user from token
    user_id = username_to_user_id(get_jwt_identity())

    # GET: Return list of all ingredients in the user's pantry
    if request.method == "GET":
        pantry = []
        query = (
            db.session.query(UserPantry, Ingredient)
            .filter_by(UserPantry.ingredient_id == Ingredient.id)
            .filter_by(UserPantry.user_id == user_id)
        )
        for row in query:
            pantry.append({"id": row.Ingredient.id, "name": row.Ingredient.name})
        return jsonify(pantry=pantry)

    # PUT: Given a list of ingredient_id, updates the UserPantry Table
    elif request.method == "PUT":

        data = request.get_json()
        (ingredients,) = get_data(data, "ingredients")

        # Clear pantry
        UserPantry.query.filter_by(user_id=user_id).delete()

        # Add new ingredients
        for ingredient_id in ingredients:
            db.session.add(UserPantry(user_id, ingredient_id))
        db.commit()


@explorer_bp.route("/search", methods=["GET"])
def search():
    ##################################################
    ##################################################
    ##################################################
    # TODO:
    pass


@explorer_bp.route("/recipe/<int:id>", methods=["GET"])
def recipe_view(id):
    """Return details of the recipe"""

    # Check that recipe_id exists and is published and get the Recipe object
    recipe = recipe_id_to_published_recipe(id)

    ########################
    # TODO: Change this to fit new recipe model
    # You can copy directly from "/my_recipes/{id}" GET route and add 'comments' key
    ########################
    response = {
        "name": recipe.name,
        "recipePhoto_url": recipe.photo_url,
        "recipeVideo_url": recipe.video_url,
        "description": recipe.description,
        "mealType": recipe.meal_type,
        "dietType": recipe.diet_type,
        "recipeInstructions": recipe.instructions,
        "expectedDuration": recipe.expectedDuration,
        "required_ingredients": {},  # dict_required_ingredients(id),
        "comments": dict_recipe_comments(id),
    }

    logger.debug("Recipe details returned: %s", recipe)  # type: ignore
    return Response(json.dumps(response), mimetype="application/json")


@explorer_bp.route("/recipes/<int:id>/review", methods=["POST"])
@jwt_required()
def add_recipe_review(id):
    """Add a comment/review to a recipe."""
    data = request.get_json()
    message, stars = get_data(data, "review", "stars")

    user_id = username_to_user_id(get_jwt_identity())
    comment = Comment.create(
        recipe_id=id, user_id=user_id, stars=stars, message=message
    )
    return jsonify(comment_id=comment.id)


@explorer_bp.route("/recipes/favourite", methods=["GET"])
@jwt_required()
def get_recipe_favourites():
    """Return a list of all recipes saved by the user."""
    user_id = username_to_user_id(get_jwt_identity())

    saved_recipes = [
        saved_recipe.recipe_id
        for saved_recipe in UserSavedRecipes.query.filter_by(user_id=user_id).all()
    ]
    return jsonify(recipes=[recipe.jsonify() for recipe in saved_recipes])


@explorer_bp.route("/recipes/<int:id>/favourite", methods=["PUT", "DELETE"])
@jwt_required()
def update_recipe_favourites(id):
    """Update a user's favourited recipes.

    PUT: Add recipe to user's favourited recipes.
    DELETE: Remove recipe from user's favourited recipes.
    """
    user_id = username_to_user_id(get_jwt_identity())

    # PUT: Add recipe to user's favourited recipes.
    if request.method == "PUT":
        if (
            UserSavedRecipes.query.filter_by(user_id=user_id, recipe_id=id).first()
            is not None
        ):
            db.session.add(UserSavedRecipes(user_id=user_id, recipe_id=id))
            db.session.commit()
        return "", 204

    # DELETE: Remove recipe from user's favourited recipes.
    elif request.method == "DELETE":
        UserSavedRecipes.query.filter_by(user_id=user_id, recipe_id=id).delete()
        db.session.commit()
        return "", 204
