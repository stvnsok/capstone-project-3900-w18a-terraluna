import React, { useEffect, useState } from 'react'
import { HiFire, HiPlus } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { getNoRecipeMatchRecipes, getRecipesRecipeContributors } from '../../services/recipeContributor.service';
import Button from '../global/Button';
import NavBar from '../NavBar';
import RecipeCard from './RecipeCard';
import SlideOutRecipe from './SlideOutRecipe';
import NoMatchRecipeMenuItem from './NoMatchRecipeMenuItem';
import CreateRecipeForm from '../NewRecipe/CreateRecipeForm';

const MyRecipes = () => {
    const [slideOutRecipe, setSlideOutRecipe] = useState<Recipe>();
    const [isCreateRecipeOpen, setIsCreateRecipeOpen] = useState<boolean>(false);
    const [openNoMatchContextMenu, setOpenNoMatchContextMenu] = useState<boolean>(false);
    const [noMatchIngredientSets, setNoMatchIngredientSets] = useState<NoMatchIngredients[]>([])
    const [recipes, setRecipes] = useState<Recipe[]>([{
        imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxLY0tYQVBsb3FBb3x8ZW58MHx8fHw%3D&w=1000&q=80',
        name: 'Vegetarian Pizza',
        id: 1,
        cookTime: 300,
        mealType: ['Dinner', 'Lunch'],
        dietType: ['Vegetarian'],
        status: "Draft"
    },{
        imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxLY0tYQVBsb3FBb3x8ZW58MHx8fHw%3D&w=1000&q=80',
        name: 'Vegetarian Pizza',
        id: 1,
        cookTime: 300,
        mealType: ['Dinner', 'Lunch', 'Breakfast'],
        dietType: ['Vegetarian'],
        status: "Published"
    },{
        imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxLY0tYQVBsb3FBb3x8ZW58MHx8fHw%3D&w=1000&q=80',
        name: 'Vegetarian Pizza',
        id: 1,
        cookTime: 300,
        mealType: ['Dinner'],
        dietType: ['Vegetarian'],
        status: "Template"
    },{
        imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxLY0tYQVBsb3FBb3x8ZW58MHx8fHw%3D&w=1000&q=80',
        name: 'Vegetarian Pizza',
        id: 1,
        cookTime: 300,
        mealType: ['Dinner'],
        dietType: ['Vegetarian'],
        status: "Draft"
    },{
        imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxLY0tYQVBsb3FBb3x8ZW58MHx8fHw%3D&w=1000&q=80',
        name: 'Vegetarian Pizza',
        id: 1,
        cookTime: 300,
        mealType: ['Dinner'],
        dietType: ['Vegetarian'],
        status: "Draft"
    },{
        imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxLY0tYQVBsb3FBb3x8ZW58MHx8fHw%3D&w=1000&q=80',
        name: 'Vegetarian Pizza',
        id: 1,
        cookTime: 300,
        mealType: ['Dinner'],
        dietType: ['Vegetarian'],
        status: "Draft"
    }]);

    useEffect(() => {
        getRecipesRecipeContributors()
            .then(res => {
                setRecipes(res.recipes);
            })
            .catch(err => {
                toast.error(err);
            })
    }, [])

    useEffect(() => {
        getNoRecipeMatchRecipes()
            .then(res => {
                console.log("TODO" + res.ingredientSets)
                setNoMatchIngredientSets([{
                    ingredients: [{
                        id: 0,
                        name: 'Apple'
                    }, {
                        id: 1,
                        name: 'Bannana'
                    }, {
                        id: 2,
                        name: 'Chicken'
                    }]
                }, {
                    ingredients: [{
                        id: 0,
                        name: 'Date'
                    }, {
                        id: 1,
                        name: 'Egg'
                    }, {
                        id: 2,
                        name: 'Fig'
                    }]
                }])
            }).catch(err => console.log(err))
            setNoMatchIngredientSets([{
                ingredients: [{
                    id: 0,
                    name: 'Apple'
                }, {
                    id: 1,
                    name: 'Bannana'
                }, {
                    id: 2,
                    name: 'Chicken'
                }]
            }, {
                ingredients: [{
                    id: 0,
                    name: 'Date'
                }, {
                    id: 1,
                    name: 'Egg'
                }, {
                    id: 2,
                    name: 'Fig'
                }, {
                    id: 3,
                    name: 'Sugar'
                }, {
                    id: 4,
                    name: 'ChickenBreast'
                }]
            }])
    }, [])

    return (
    <React.Fragment>
        <NavBar/>
        <div className='flex justify-between p-10' id="main-page">
            <div className='flex'>
                <Button
                    onClick={() => {
                        setIsCreateRecipeOpen(true);
                        setSlideOutRecipe(undefined);
                    }}
                    className="w-10 h-10 border border-solid border-tl-inactive-black bg-tl-inactive-white rounded-md"
                    text={<HiPlus size={22} className="m-auto"/>}
                />
                <div className='relative'>
                    <Button
                        onClick={() => {
                            setOpenNoMatchContextMenu(!openNoMatchContextMenu);
                        }}
                        className="w-60 h-10 border border-solid border-tl-active-red bg-tl-inactive-white rounded-md ml-4"
                        text={<React.Fragment><HiFire size={22} className="m-auto text-tl-active-red inline"/>Hottest Recipes Needed</React.Fragment>}
                    />
                    {openNoMatchContextMenu && 
                    <div 
                        className='absolute'
                    >
                        {noMatchIngredientSets.map(noMatchIngredients => {
                            return <NoMatchRecipeMenuItem
                                noMatchIngredients={noMatchIngredients}
                            />
                        })}
                    </div>}
                </div>
            </div>
            <div>

            </div>
        </div>
        <div className={`grid grid-flow-col gap-6 pl-10`}>
            {recipes && recipes.map(recipe => { return (
                <div>
                    <div >
                        <RecipeCard 
                            recipe={recipe}
                            onClick={() => {
                                setSlideOutRecipe(recipe)
                                setIsCreateRecipeOpen(false)
                            }}
                        />
                        
                    </div>
                </div>
            )})}
        </div>
        
        <SlideOutRecipe
            recipe={slideOutRecipe}
            onClose={() => {
                setSlideOutRecipe(undefined)
            }}
        />

        <CreateRecipeForm
            isOpen={isCreateRecipeOpen}
            onClose={() => {
                setIsCreateRecipeOpen(false)
            }}
        />
    </React.Fragment> 
)}

export default MyRecipes;