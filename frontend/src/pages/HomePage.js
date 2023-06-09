import React, { useState, useEffect } from 'react';
import { searchHeroByname, searchHeroById, editHero, saveHero } from './../graphql/queries';

function removeUndefinedValues(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v !== undefined)
  );
}

function App() {
  const [search, setSearch] = useState('');
  const [powerstats, setPowerstats] = useState({})
  const [heroes, setHeroes] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    if (search.length >= 3) {
      fetchHeroByName(search).then(data => {
        console.log(data)
        console.log(process.env.REACT_APP_AWS_ENDPOINT)
         console.log(process.env.REACT_APP_AWS_KEY)
        setHeroes(data)});
    }
  }, [search]);
  
  useEffect(() => {
    if(selectedHero){
      console.log(selectedHero)
      editHero(removeUndefinedValues(selectedHero));
    }
  }, [editing]);

  const fetchHeroByName = async (name) => {
    const results = await searchHeroByname(name); 
    console.log(results)
    return results;
  }

  const fetchHeroById = async (id) => {
    const result = await searchHeroById(id);
    const newPowerstats = {
      intelligence: result.intelligence,
      strength: result.strength,
      speed:  result.speed,
      durability:  result.durability,
      power: result.power,
      combat:  result.combat
    }
    setPowerstats(newPowerstats);
    const { __typename, ...heroWithoutTypename } = result;
    setSelectedHero({ ...heroWithoutTypename, ...newPowerstats });
  }

  const selectHero = (hero) => {
    fetchHeroById(hero.id);
  }

  const handleEditHero = () => {
    setEditing(true);
  }
  const saveEdit = () => {
    const { __typename, ...heroWithoutTypename } = selectedHero;
    const updatedHero = {
      ...heroWithoutTypename,
      ...editValues,
    };
    setSelectedHero(updatedHero);
    setPowerstats(editValues);
    setEditing(false);
  };
  

  const handleSaveHero = () => {
    if(selectedHero){
   console.log(selectedHero)
    saveHero(removeUndefinedValues(selectedHero));
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z]*$/g.test(value)) {
      setSearch(value);
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#a1e0e9]">
      <div className="p-6 space-y-8 text-center">
        <h1 className="text-2xl font-bold">Superhero Search</h1>
        <input
          className="border p-2"
          placeholder="Search for a superhero..."
          value={search}
          onChange={handleSearchChange}
        />
        {heroes!==undefined && heroes.length > 0? (
          <ul className="border p-2">
            {heroes.map(hero => (
              <li
                key={hero.id}
                onClick={() => selectHero(hero)}
                className="cursor-pointer"
              >
                {hero.name}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-red-500"></div>
        )}
        {selectedHero && (
          <div className="p-4 border">
            <h2 className="font-bold">{selectedHero.name}</h2>
            {editing ? (
              <>
                {Object.keys(powerstats).map(key => (
                  <div key={key}>
                    <label>{key}: </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={editValues[key]}
                      onChange={e => setEditValues({ ...editValues, [key]: e.target.value })}
                    />
                  </div>
                ))}
                <button onClick={saveEdit}>submit</button>
              </>
            ) : (
              <>
                {Object.entries(powerstats).map(([key, value]) => (
                  <p key={key}>
                    {key}: 
                    {typeof value === 'object' && value !== null 
                      ? Object.entries(value).map(([k, v]) => <span key={k}>{k}: {v}</span>) 
                      : value
                    }
                  </p>
                ))}

                <button onClick={handleEditHero}>edit</button>
              </>
            )}
            <img src={selectedHero.image} alt={selectedHero.name} />
            <button onClick={handleSaveHero}>save</button>
          </div>
        )}
      </div>
    </div>
  );
                  }

export default App;

