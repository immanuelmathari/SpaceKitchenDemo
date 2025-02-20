class Meal {
    constructor(id,categoryIds,title,affordability,complexity,duration,ingredients,steps,isGlutenFree,isVegan,isVegetarian,isLactoseFree,imageUrl) {
        this.id = id;
        this.categoryIds = categoryIds;
        this.title = title;
        this.affordability = affordability;
        this.complexity = complexity;
        this.duration = duration;
        this.ingredients = ingredients;
        this.steps = steps;
        this.isGlutenFree = isGlutenFree;
        this.isVegan = isVegan;
        this.isVegetarian = isVegetarian;
        this.isLactoseFree = isLactoseFree;
        this.imageUrl = imageUrl;
    }
}

export default Meal;