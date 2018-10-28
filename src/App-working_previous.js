import React, { Component } from 'react';
import './App.css';
import {data} from './the_object';
import loader from './loader.gif';

console.log(data);
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],
      loading:true,
      // items:data,
      input: '',
      sort:''
    }
  }
  componentDidMount(){
    this.setState.loading = true;
    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=2000')
    .then((response) => {
      return response.json();
    })
      .then((res) => {
        this.setState({
          loading: false,
          items: res
        });
      })
		.catch(error => console.error(error));
  }
  onChangeHandler(e){
  this.setState({
    input: e.target.value
  })
  }
  sortByName (){
    this.setState({
      sort: 'name'
    })
  }
  sortByPrice (){
    this.setState({
      sort: 'price'
    })
  }
  sortByRank (){
    this.setState({
      sort: 'rank'
    })
  }
  render() {
    let gallery = this.state.items.filter(item => this.state.input === '' || item.name.includes(this.state.input));

    if(this.state.sort === 'name'){gallery.sort(function(a, b) {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    })};

    if(this.state.sort === 'price'){gallery.sort(function(a, b) {
      return a.price_btc - b.price_btc;
    })};

    if(this.state.sort === 'rank'){gallery.sort(function(a, b) {
      return a.rank - b.rank;
    })};
    return (
      <div className="App">
      
      { this.state.loading && <div id="loader"><img src={loader} /></div> }
        <h1>Cryptocurrency Coins Visualizing Application</h1>
        <div id = "my-filter">
        <input value={this.state.input.toLowerCase()} placeholder = "Search for your coins" id="my-input" type="text" onChange={this.onChangeHandler.bind(this)}/>
        <div id = "coin-counter"> {gallery.length} Coins</div>
        <div id="sort-box">
        <button id="sort-by-name" onClick ={this.sortByName.bind(this)} >Sort By Name</button>
        <button id="sort-by-price" onClick ={this.sortByPrice.bind(this)} >Sort By Price</button>
        <button id="sort-by-rank" onClick ={this.sortByRank.bind(this)} >Sort By Rank</button>
        </div>
        </div>
        <div id="my-gallery">
       {gallery.map(item => 
          <div className="my-coin-card" key={item.id}>
          <h4>Name: {item.name}</h4>
          <p>Price: {item.price_usd}</p>
          <p>Rank: {item.rank}</p>
          <p>Change: {item.percent_change_24h}</p>
          </div>
          )}        
        </div>
    
      </div>
    );
  }
}

export default App;
