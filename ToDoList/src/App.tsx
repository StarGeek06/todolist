import { useState , useEffect} from 'react'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  
import 'primereact/resources/primereact.min.css';                  
import 'primeicons/primeicons.css';                                 
import './App.css';

function App() {
  
  const [taches, setTaches] = useState([])
  const [tache, setTache] = useState('')
  const [search, setSearch] = useState('')
  const [checkedTasks, setCheckedTasks] = useState([]);

  useEffect(() => {
    const savedTaches = JSON.parse(localStorage.getItem('taches') || '[]');
    const savedCheckedTasks = JSON.parse(localStorage.getItem('checkedTasks') || '[]');
    setTaches(savedTaches);
    setCheckedTasks(savedCheckedTasks);
  }, []);

  // Sauvegarder les tâches et les tâches cochées dans le localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('taches', JSON.stringify(taches));
  }, [taches]);

  useEffect(() => {
    localStorage.setItem('checkedTasks', JSON.stringify(checkedTasks));
  }, [checkedTasks]);

  const addtache = () => {
       
    if (tache.trim() !== '')
    {
      setTaches([...taches, tache]);
      setTache('');
    }
    
  }

  const removetache = (index) => {
     /*Créer une variable qui va prendre en compte
     toute la liste sauf l'élément indexé */

     const newTaches = taches.filter((_,i) => i !== index)
     setTaches(newTaches)
  }

  const clean = () => {
    setTaches([])
  }

  const rm = () => {
    setTache('')
  }

  const showform = () => {
      const form = document.getElementById('af');
      if (form?.style.display == 'none')
      {
        form.style.display = 'block';
      }
      else 
      {
        form.style.display = 'none';
      }
  }

  const toggleCheck = (index) => {
    setCheckedTasks((prevState) => {
      const newChecked = [...prevState];
      if (newChecked.includes(index)) {
        return newChecked.filter(i => i !== index);  // Uncheck
      } else {
        return [...newChecked, index];  // Check
      }
    });
  };

  const filteredTaches = taches.filter((tache) => 
    tache.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>

    <div className="btns">

      <div className="add" onClick={showform}>
           <Button 
                label='Ajouter une tâche'
                icon='pi pi-plus'
                iconPos='right'
                severity='help'
                raised
            />

      </div>

        <div className="remove">
            <Button 
                label='Supprimer'
                icon='pi pi-times'
                iconPos='right'
                severity='warning'
                raised
            />
        </div>

        <div className="clean">
            <Button 
                label='Remise à zéro'
                severity='danger'
                icon='pi pi-refresh'
                iconPos='right'
                onClick={clean}
              />
        </div>

        <div className="search">
            <div className="p-inputgroup flex-1">
                <InputText 
                    placeholder="Keyword"
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                  />
                <Button icon="pi pi-search" className="p-button-warning" />
            </div>
        </div>


     </div>


     <div className="af" id='af'>

     <div className="addform" id='addform'>

      <div className="content">
          <input 
              type="text" 
              value={tache}
              onChange={(e) => setTache(e.target.value)}
              placeholder='Add a work'
              
          />
          
          <div className="p-inputgroup flex-1">
              <Button 
                  icon="pi pi-check" 
                  className="p-button-success" 
                  onClick={addtache}
                />
              <InputText placeholder="" disabled/>
              <Button 
                  icon="pi pi-times" 
                  className="p-button-danger" 
                  onClick={rm}
              />
              
          </div>
        </div>
      </div>

      </div>

     
     <div className="container">

      <div className="header">
        <div className="nt">
            
        </div>
        <div className="ns">
             
        </div>
      </div>

      <ul>
          {filteredTaches.map((tache,index) => (
             <li key={index}>

              <input 
                type="checkbox" 
                checked={checkedTasks.includes(index)}
                onChange={() => toggleCheck(index)}
              />
                <div className="t" style={{
                textDecoration: checkedTasks.includes(index) ? 'line-through' : 'none'
                }}>
                  <p>{tache}</p> 
                </div>
                
                <div className="b">
                <Button 
                  icon='pi pi-times'
                  iconPos='right'
                  severity='warning'
                  onClick={() => removetache(index)}
                  raised
                />
                </div>
                 
             </li>
          ))}
      </ul>
            
     </div>

    </>
  )
}

export default App
