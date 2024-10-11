import { useState } from 'react'
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

  return (
    <>

    <div className="btns">

      <div className="add">
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
                <InputText placeholder="Keyword" />
                <Button icon="pi pi-search" className="p-button-warning" />
            </div>
        </div>


     </div>

     <div className="addform">

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
              <Button icon="pi pi-times" className="p-button-danger" />
              
          </div>
        </div>
      </div>

     
     <div className="container">

      <ul>
          {taches.map((tache,index) => (
             <li key={index}>
                <p>{tache}</p> 
                 <Button 
                  icon='pi pi-times'
                  iconPos='right'
                  severity='warning'
                  onClick={() => removetache(index)}
                  raised
                />
             </li>
          ))}
      </ul>
            
     </div>

    </>
  )
}

export default App
