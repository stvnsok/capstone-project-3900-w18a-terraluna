import React, { useState, useEffect } from 'react';
import { BsCloudUpload } from 'react-icons/bs';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { useForm } from 'react-hook-form'
import Button from '../global/Button';

interface recipeForm {
    name?: string,
    cookTime?:number
    description?:string
    recipeInstructions?:string[];
    mealType?:string
    dietType?:string
    timerDuration?:number[];
    timerUnits?:string;
    requiredIngredients?:string[];
    recipePhoto_url?: string;
    recipeVideo_url?: string;
}

export default function CreateRecipe () {

    const { register, handleSubmit } = useForm<recipeForm>();
    const [image, setImage] = useState<File>();
    const [preview, setPreview] = useState<string>();
    
    // const inputFileRef = useRef<HTMLInputElement | null>(null);

    const onSubmit = async (data: recipeForm) => {
        console.log(data);
        //TODO: API REQUEST TO BACKEND
    }

    useEffect(() => {
        if (image) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(image);
        } else {
          setPreview('');
        }
      }, [image]);

    return <React.Fragment>
        <div className = 'w-full max-w-xs content-center'>

            <form>
                <div>
                    <label htmlFor='name'> Recipe Name</label>
                    <input 
                        {...register('name', { required: true})} 
                        placeholder = "Recipe Name..."
                        className = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-lg border-opacity-0'
                    />
                </div>
                <div>
                    <label htmlFor = 'cookTime'> Expected Duration</label>
                    <input
                        {...register('cookTime', { required: true})} 
                        placeholder = "Expected Duration..."
                        className = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-lg border-opacity-0'
                    />
                </div>
                <div>
                    <label htmlFor = 'mealType'> Meal Type</label>
                    <select
                        {...register('mealType', { required: true})} 
                        placeholder = 'Meal Type...'
                        className = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-lg border-opacity-0'
                    >
                        <option value = 'breakfast'>Breakfast</option>
                        <option value = 'lunch'>Lunch</option>
                        <option value = 'dinner'>Dinner</option>
                        <option value = 'snack'>Snack</option>
                    </select>
                </div>
                <div>
                    <label htmlFor = 'description'> Description</label>
                    <input 
                        {...register('description', { required: true})} 
                        placeholder = 'Description...'
                        className = 'shadow appearance-none border rounded w-full py-8 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-lg border-opacity-0'
                        
                    />
                    
                </div>
                <div>
                    <label htmlFor = 'dietType'> Diet Type</label>
                    <select
                        {...register('dietType')}
                        className = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-lg border-opacity-0'
                    >
                        <option value = 'vegan'>Vegan</option>
                        <option value = 'vegetarian'>Vegetarian</option>
                        <option value = 'gluten-free'>Gluten-Free</option>
                        <option value = 'dairy-free'>Dairy-Free</option>
                        <option value = 'nut-free'>Nut-Free</option>
                        <option value = 'Halal'>Halal</option>

                    </select>
                </div>
                <div className = 'mborder border-dashed border-tl-active-green '>
                    {preview ? <img src = {preview} alt = 'recipe'/> 
                    : (
                    <div className = 'flex justify-center items-center'>
                        <BsCloudUpload 
                            className = 'icon-large'
                        />
                    </div>
                    )}
                    <input 
                        type = 'file'
                        accept = "image/*"
                        {...register('recipePhoto_url')}
                        onChange = {(e) => {
                            e.preventDefault();
                            setImage(e.target.files?.[0]);
                        }}
                    />
                    {/* <Button
                            onClick = {() => {
                                inputFileRef.current.click();
                            }}
                        text={('Upload Photo')}
                    /> */}
                </div>
                <div>
                    <label htmlFor = 'Instruction'> Recipe Instructions</label>
                    <textarea 
                        {...register('recipeInstructions')}
                        placeholder = 'Step Description...'
                        className='shadow appearance-none py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-lg border-opacity-0'
                        
                    />

                    <input
                        {...register('timerDuration')}
                        placeholder = 'Timer Duration'
                    />
                    <select
                        placeholder='Timer Units'
                        {...register('timerUnits')}
                    >
                        <option value = 'minutes'>Minutes</option>
                        <option value = 'hours'>Hours</option>
                    </select>
                    <div className = 'grid 3 grid-cols-1 gap-4'>

                        <HiOutlinePlusCircle
                            onClick = {() => {
                                console.log('Todo:add step'); 
                            }}
                            color = '#A8F59B'
                        />
                        <HiOutlinePlusCircle
                            onClick = {() => {
                                console.log('Todo:add timer'); 
                            }}
                            color = '#A8F59B'               
                        />
                        <HiOutlinePlusCircle
                            onClick = {() => {
                                console.log('Todo:add video'); 
                            }}
                            color = '#A8F59B'
                        />
                    </div>
                </div>
                
                <div>
                    <Button
                        onClick = {handleSubmit(onSubmit)}
                    />
                        
                </div>

                
            </form>
        </div>
    </React.Fragment>
}