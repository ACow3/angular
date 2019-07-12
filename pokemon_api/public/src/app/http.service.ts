import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getPokemon();
    this.getAbilities();
    this.getSharedAbilities();
  }
  getPokemon(){
    let pokemon = this._http.get('https://pokeapi.co/api/v2/pokemon/25/');
    pokemon.subscribe(data => console.log("Got the pokemon", data));
  }
  getAbilities(){
    let abilities = this._http.get('https://pokeapi.co/api/v2/pokemon/25/');
    abilities.subscribe(data => console.log(`${data.abilities[0].ability.name} & ${data.abilities[1].ability.name}`));
  }
  getSharedAbilities(){
    let shared_abilities = this._http.get('https://pokeapi.co/api/v2/ability/31');
    shared_abilities.subscribe(data => console.log(data.pokemon.length));
    let shared_abilities2 = this._http.get('https://pokeapi.co/api/v2/ability/9');
    shared_abilities2.subscribe(data => console.log(data.pokemon.length));
  }
}