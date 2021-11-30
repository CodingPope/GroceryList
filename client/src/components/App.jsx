import React, { Component } from 'react';
import AddGrocery from './AddGrocery.jsx';
import GroceryList from './GroceryList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groceries: [],
    };

    this.addGrocery = this.addGrocery.bind(this);
    this.getGroceries = this.getGroceries.bind(this);
    this.deleteGrocery = this.deleteGrocery.bind(this);
    this.updateGrocery = this.updateGrocery.bind(this);
  }

  componentDidMount() {
    this.getGroceries();
  }

  getGroceries() {
    fetch('/api/groceries')
      .then((res) => res.json())
      .then((groceries) => {
        this.setState({
          groceries,
        });
      })
      .catch(console.log);
  }

  addGrocery(grocery) {
    // if an ID exists on the passed-in grocery item, re-direct to updateGrocery function
    if (grocery.id) {
      updateGrocery(grocery);
    }
    // if an ID doesn't exist in the passed-in grocery item, continue with add
    else {
      fetch('/api/groceries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // the server needs to know its a JSON object, otherwise the server's parser won't parse it!
        },
        body: JSON.stringify(grocery), // have to strigify objects before you send them over the internet
      })
        .then(() => {
          this.getGroceries();
        })
        .catch(console.log);
    }
  }

  deleteGrocery(grocery) {
    console.log('deleteGrocery handler triggered with grocery=', grocery);
    fetch('/api/groceries', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(grocery),
    })
      .then(() => {
        this.getGroceries();
      })
      .catch(console.log);
  }

  updateGrocery(grocery) {
    console.log('updateGrocery handler triggered with grocery=', grocery);
    fetch('/api/groceries', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(grocery),
    })
      .then(() => {
        this.getGroceries();
      })
      .catch(console.log);
  }

  render() {
    const { groceries } = this.state;

    return (
      <div>
        <img src="grocery-bags.png" />
        <h1>Grocery List</h1>
        <div className="grocery-list-container">
          <AddGrocery addGrocery={this.addGrocery} />
          <GroceryList
            groceries={groceries}
            deleteGrocery={this.deleteGrocery}
            updateGrocery={this.updateGrocery}
          />
        </div>
      </div>
    );
  }
}

export default App;
