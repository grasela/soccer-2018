import React, { Component } from 'react';

import './App.css';
import Match from './Components/Match'



class App extends Component {

  state = {
    message: "Hello World",
    matches: null,
    group: {
      name: null
    },
    teams: null,
    stadium: null,
    filterStr: ''
    

  }
  
  componentDidMount() {
    this.fetchGroupMatches()
    .catch(err => console.error(err))
  }

  async fetchGroupMatches() {
    const url = 'https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json'
    const response = await fetch(url)
    const data = await response.json()
  

    let matches = []
    
    for (const group of Object.keys(data.groups)) {
      const groupField = data.groups[group]
      const allMatches = data.groups[group].matches
      allMatches.map(match => {
        match.group = groupField
        matches.push(match)
      })
  }
  
    
    const teams = data.teams
    const stadiums = data.stadiums

    matches.forEach(match => {
      const homeTeam = match.home_team
      const awayTeam = match.away_team
      const matchStadium = match.stadium

      match.home_team = teams.find(team => homeTeam === team.id)
      match.away_team = teams.find(team => awayTeam === team.id)
      match.stadium = stadiums.find(stadium => matchStadium === stadium.id )
      return match
    })


    this.setState({
      matches: matches,
      group: {
        name: data.groups.a.name,
      },
      teams: teams
    })
  }

  
  render() {
    const {group, matches} = this.state
    const { filterStr } = this.state


    
    if(!group.name) {
      return <div className="App">Loading...</div>
    }
    
    const games = matches
    .filter( match =>  
      match.home_team.name.toLowerCase().includes(filterStr) || 
      match.away_team.name.toLowerCase().includes(filterStr) ||
      match.group.name.toLowerCase().includes(filterStr)
    )
    .map(match => {
      return <Match key="match.id" {...match} />
        
      
    })

    return (
      <div className="App">
      
      <div className="input">
      <h1> World Cup 2018 Games </h1>
      <input type="text" placeholder="search country or type 'group x'" defaultValue='' onChange={e => { this.setState({filterStr: e.target.value.toLowerCase()})} } />
      </div>
      <div className="games">
      {games}
      </div>
      </div>
    );
  }
}

export default App