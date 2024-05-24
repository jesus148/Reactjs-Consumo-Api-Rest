



import React from 'react'
//importando hoja de estilos
import './sass/App.scss'

// importando icons de reactjs el modulo
import { TiArrowLeftOutline , TiArrowRightOutline } from "react-icons/ti";

//importando 1 componente por defecto y cambiando el nombre 
import {Button} from './components/Button'
import {Card} from './components/Card'


// hooks
import {useState , useEffect} from "react";

const App = () => {

  // LOGICA DEL COMPONENTE 



  // usestate :recordar q cuando modifiquemos el valor de la variable mediante la funcion setPokemonId re renderizara todo el componente al usar el usestate


  const [pokemonId , setPokemonId] = useState(1);


  // esto sera para setear esto signfica asiganarle valor a las variables en este la constante de useeffects
  // sera un arreglo vacio , osea aca pondremos todas nuestros nombres y imagens de las diferentes especies de 1 pokemon
  // osea para dibujar los pokemones osea poner la data en la vista lo pondremos en el pokemonEvolutions 
  // recordar por cada pokemon habran 3 array (y en cada array habran dos elementos el nombre y img), ademas son 3 array pq hay 3 especies en cada pokemon
  const [pokemonEvolutions , setPokemonEvolutions] =useState([]);



  // soloe es un ejemplo pq usaremos el name de las especies de los pokemones 
  // const [namePokemon , setNamePokemon] = useState();












  // USAREMOS UN API : ver el archivo .txt APIPOKEMON.TXT
    // > APIV2 > en la parte de content el aside del lado izquierdo > evolution >evolution chains
    // esto mostrara las lineas  de tiempo en su evolucion de los pokemones 

  // useefecct : se ejeucta cuando renderizar toda nuestro componente la 1 y cuando hay un cambio  o en todo caso cuando mapeas un componente que lo pusiste como parametro hara un efeecto

// los async await : forma simplifcada de promesas(peticones a un serivodr y conseguimos informacion)
  useEffect( ()=>{
// console.log(pokemonId);
     getEvolution(pokemonId);


     //cuando ejecutas esto saldra dos clg en la consola pq , cambia el valor variable id y tambien el nombre
    //  pr eso debemos mapear con el effecto solo el id
     console.log("use effect");
  } , [pokemonId]);











  // METODO DE API PARA LAS ESPECIES de pokemones , apartir del id me da info de del pokemon y sus name de especies(3 especies)
  // osea con este metodo obtengo el nombre del pokemon ver archvio APIPOKEMON.TXT > explicacion 2

//recordar los async await es un manera mas simple de hacer promesas , solo sin son complejos los metodos
  async function getEvolution(id){
    //await : esperar , el fetch es busqueda , pero el fecth tambien devuelve un promesa osea cuando busque el api va a demorar un poco por lo tanto debes esperar ademas promete darte esa info x eso esta el await
    //una promesa: basicamente son funciones q se llaman desde otras funciones se usa para proceso complejos , tambien son donde obtienen data sensible y la promesa te promete q te dara esa data solo debes esperar a que busque y encuentre.
   const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)


             //en herramientas de desarollador en tu servidor o navegador > console > response flechita abajo>prototype (funciones mostrara , lo q quiero es el json)
          // console.log(response); //esto te dara una promesa pero te da todo completo



      // response.json() : este response dara la data json pero tambien dara en promesa luego q lo encuentra te lo devuelve xeso se usa el await , 
      // ir herrmanientas de desarollador > consola > flecha abajo > chain > species > name (lo q quiero)
      // basicamente es como un objeto de js recordar como se consumia
        //  const data= await response.json();
        //  console.log(data)




         //en esta parte es lo mismo de arriba pero ya consumiendo el json y obteniendo el nombre q es lo que quiero 
         const data= await response.json();
        //  console.log(data.chain.species.name)
        // setNamePokemon(data.chain.species.name);
        
        

  
        // ARRAY DONDE ESTARAN LAS 3 ESPECIES DE POKEMONES(NOMBRE Y IMAGEN)
        // array donde estara el nombre y el img del pokemon
        let pokemonEvoArray = []
        

              //OBTENEMOS EL NOMBRE Y IMAGEN DE LA 1 ESPECIE DEL POKEMON
        // eca estaran las especies pero el nivel 1  , esto para enternderlo mejor esta en el apipokemon.txt > expliacion 2
        //cuando consumes el json debe ser igual nos nombres
        let  pokemon1= data.chain.species.name;  //NOMBRE DEL POKEMON de la 1 especie
        let imgPokemon=  await getPokemonNames(pokemon1); //IMAGEN DEL POKEMON




        // agregando al array el , recordar q push agrega al final del array
        pokemonEvoArray.push([pokemon1 , imgPokemon])




        //OBTENEMOS EL NOMBRE Y IMAGEN DE LA 2 ESPECIE DEL POKEMON
        //nombre del pokemon nivel 2 o especie 2 , explicacion esta en el APIPOKEMON.TXT > explicacion 4 
        //verificamos q las evolciones no esten vacias
        if(data.chain.evolves_to.length !== 0){
          let pokemonLv2= data.chain.evolves_to[0].species.name;   //obtiene el 2 nombre del pokemon su especien la segunda

          let pokemonLv2Img= await getPokemonNames(pokemonLv2); //apartir de ahi sacamos la imagen

          pokemonEvoArray.push([pokemonLv2 , pokemonLv2Img])
          //recordar q cuando imprimes te saldran 2 arreglos , 1 de la primera especiey el de la 2 especie
          // ademas cuando se renderie otra vez se perdera todo
          // console.log(pokemonEvoArray)





          //OBTENEMOS EL NOMBRE Y LA IMAGEN DE LA 3 ESPECIE DEL POKEMON
  //  verificando q no este vacio recordar q si el dato json tiene 1 solo item se pone[0] pq solo hay eso 
          if (data.chain.evolves_to[0].evolves_to.length !== 0) {
            
            // nombre de la 3 especie
            let pokemonLv3 = data.chain.evolves_to[0].evolves_to[0].species.name;
            // img de la 3 especie
            let pokemonLv3Img = await getPokemonNames(pokemonLv3);

            // lo agrega al array
            pokemonEvoArray.push([pokemonLv3 , pokemonLv3Img])

            // esto para iprimir x consola los arrays del pokemon sus especies
            // console.log(pokemonEvoArray)


            
            console.log(pokemonEvoArray)
            
            
          }
          
          
          
          
        }
        
        
        // SETEANDO DATA AL ARRAY DEL USEFFECT
        // pokemonEvoArray : recordar es un array vacio de esta funcion async osea esta funcion cargada con la data
        // le pasamos al array vacio del useeffect
        // setearemos y guardaremos el array en el array vacio del useeffect
        // ademas recordar q se pega igual 1 array con 3 array dentro igual en el PokemonEvolutions
        setPokemonEvolutions(pokemonEvoArray);
        


        // OJO : recordar hay pokemones q no tiene muchas evoluciones , algunos tienen sola 1 evolucion otros solo 2 evolvuciones y asi 
        // // sucesivamente 




  } 
















// METODO API PARA OBTENER INFO DEL POKEMON TANTO SU NAME .ETC  atraves de su name o id como parametro
// con este metodo quiero obtner su imagen , para ver la explicacion del api dirigite al file apipokemon.txt > explicacion 3 (tambien  el 2)  este metodo lo reutlizaremos en 1 solo pokemon pq tienen diferentes especies

  async function getPokemonNames(name){

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);


    const data = await response.json();

    // forma de consumir un api desde react ver en la explicacion , recordar escribir igual y respetando los estandares del json
    // saldra la img grande en la consola
    // console.log(data.sprites.other['official-artwork'].front_default);

    return data.sprites.other['official-artwork'].front_default



  }











  // FUNCIONES PARA LOS BOTONES 
  // funcion normal
function subtraction() {
   (pokemonId === 1)? pokemonId(1): setPokemonId(pokemonId -1 )
  }
  
  // funcion flecha
const add = ()=>{
    setPokemonId(pokemonId + 1)
}








  // REDNERIZADO DEL COMPONENTE 
  return (
    <div className='app'>

    {/* tarjetas */}

    {/* card${pokemonEvolutions} : en el classname tendra card(ira el numero de elementos del array del ussefect) */}
    <div className={ `card-container card${pokemonEvolutions.length}`}>




         {/* falta repasar otra vez 4 o 3 mint antes */}
         {/* pos : posicion */}
         {/* pokemonEvolutions: donde estan los array es el usestate */}
         {/* pokemonEvolutions.map : recordar crea un nuevo arreglo osea 3 array  */}
         {/* ademas en cada hijo se debe poner el key{} pa diferenciarlos */}
         {/* // recordar por cada pokemon habran 3 array (y en cada array habran dos elementos el nombre(pos 0) y img(pos 1)), ademas son 3 array pq hay 3 especies en cada pokemon */}
      {pokemonEvolutions.map(pokemon => <Card key={ pokemon[0]} name={pokemon[0]}  img={pokemon[1]} />)}
     

    </div>





    <div className='buttons-container'>
      {/* enviando icons como argumentos 
      recordar icon= ,  handleClik=  . son las variables q contienen eso*/}
       <Button icon={<TiArrowLeftOutline/>} handleClik={ subtraction}/>


{/* solo es un ejemplo  */}
       {/* {namePokemon} */}



       <Button icon={<TiArrowRightOutline/>} handleClik={add}/>

    </div>
    </div>
  )
}


//exportando nombrada
export {App}
















