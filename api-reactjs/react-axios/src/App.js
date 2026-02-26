import React, {useEffect, useState} from "react";
import api from "./services/api";
import './App.css';

export default function App() {
    const[username, setUsername] = useState('JVICTOR2-front');
    const[user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    //carrega dados da API
    useEffect(() =>{
      async function loadData(userToSearch= username){
        try{
          setLoading(true);
          setError(null);
           //Carrega usuario
          const userResponse = await api.get(`/users/${userToSearch}`);
          setUser(userResponse.data);

            const reposResponse = await api.get(`/users/${userToSearch}/repos?per_page=6`);
          setUser(userResponse.data); 

          } catch(error){
            console.error(' Erro ', error)
            setError(`Usuparui ${userToSearch} nao encontrado`);


          } finally{
            setLoading(false);
          }
           loadData();
          }
      }, []);
    
    if(loading){
      return (
        <div className="loading-container">
          <div className="spinner"></div>
            <p>Carregando perfil...</p>
        </div>
      );
    }
   

    if (error || !user) {
      return (
        <div className="error-container">
          <h2> ❌ {error}</h2>
          <button onClick={ () => window.location.reload()}>Tentar novamente</button>

        </div>
      )
    }

    return(
      <div className="app-container">
        <div className="profile-card"></div>
        
      </div>
    );

  }