export class CharacterFactory{
    constructor(id, charData){
        return {
            id: id,
            name: charData.name,
            height: charData.height,
            colors: {
              hair: charData.hair_color,
              skin: charData.skin_color
            },
            gender: charData.gender,
            movieCount: charData.films.length
          }
    }
}