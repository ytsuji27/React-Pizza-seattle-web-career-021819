import React, { Component, Fragment } from 'react';
import Header from './components/Header';
import PizzaForm from './components/PizzaForm';
import PizzaList from './containers/PizzaList';

class App extends Component {

  constructor() {
    super()
    this.state = {
      pizzas: [],
      currPizza: ""
    }
  }

  handleEditClick = (pizza) => {
    console.log(pizza)
    this.setState({ currPizza: pizza })
  }

  updatePizza = (pizza) => {
    console.log('updatePizza function')
  }

  fetchPizzas() {
    fetch('http://localhost:3000/pizzas')
    .then(resp => resp.json())
    .then(data => this.setState({
      pizzas: data
    }))
  }

  componentDidMount() {
    this.fetchPizzas();
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm
          pizza={this.state.currPizza}
          updatePizza={this.updatePizza}
        />
        <PizzaList
          pizzas={this.state.pizzas}
          handleEditClick={this.handleEditClick}
        />
      </Fragment>
    );
  }
}

export default App;
