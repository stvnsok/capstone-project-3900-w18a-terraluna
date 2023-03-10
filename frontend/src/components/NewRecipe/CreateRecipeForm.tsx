import React from 'react'
import CreateRecipeCard from './CreateRecipeCard';
//import { HiX } from 'react-icons/hi';

const RecipeForm = ({
    isOpen,
    onClose,
    fullRecipe,
}: {
    isOpen: boolean;
    fullRecipe?: Partial<RecipeDetails>;
    onClose: () => void
}) => {

    return <div
        className=" bg-tl-inactive-brown overflow-y-auto min-h-screen fixed top-0 right-0 border-l border-solid border-tl-inactive-grey" 
        style={{
            transition: '0.7s',
            width: '90%',
            marginRight: isOpen ? '0' : '-90vw',
            maxHeight: '100vh'
        }}>
        <div className='w-full content-center max-h-screen overflow-y-auto'
        >
            <CreateRecipeCard
                closeFunction={onClose}
                fullRecipe={fullRecipe}
            />
        </div>
    </div>
}

export default RecipeForm;