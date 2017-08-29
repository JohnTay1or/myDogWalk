import { Dog } from "../data/dog.interface";

export class DogsService {
    private favoriteDogs: Dog[] = [];
    
    addDogToFavorites(dog: Dog) {
        //console.log(dog);
        this.favoriteDogs.push(dog);
        //console.log(this.favoriteDogs);
    }
    
    removeDogFromFavorites(dog: Dog) {
        const position = this.favoriteDogs.findIndex((dogEl: Dog) => {
            return dogEl.id == dog.id;
        });
        this.favoriteDogs.splice(position, 1);
    }
    
    getFavoriteDogs() {
        return this.favoriteDogs.slice();
    }
    
    isDogFavorite(dog: Dog) {
        return this.favoriteDogs.find((dogEl: Dog) => {
            return dogEl.id == dog.id
        })
    } 
}