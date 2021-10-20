import React from "react";
import GroceryItem from "./GroceryItem.js";
import axios from "axios";

export default class GroceryList extends React.Component {
  static emptyGrocery = {
    item: "",
    quantity: 0,
  };
  constructor() {
    super();
    this.state = {
      groceries: [],
      newGrocery: GroceryList.emptyGrocery,
    };

    this.resetGrocery = this.resetGrocery.bind(this);
    this.fetchGroceries = this.fetchGroceries.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  resetGrocery() {
    this.setState({ newGrocery: GroceryList.emptyGrocery });
  }

  fetchGroceries() {
    axios.get("/groceries").then((response) => {
      this.setState({ groceries: response.data });
    });
  }

  handleFormChange(event) {
    const newGrocery = { ...this.state.newGrocery };
    newGrocery[event.target.name] = event.target.value;
    this.setState({ newGrocery });
  }

  componentDidMount() {
    this.fetchGroceries();
  }

  render() {
    return (
      <div>
        <img src="grocery-bags.png" />
        <h1>Grocery List</h1>

        {/* FORM */}
        <form>
          <input
            name="item"
            value={this.state.newGrocery.item}
            placeholder="Please enter a grocery"
            onChange={this.handleFormChange}
          />

          <input
            type="number"
            value={this.state.newGrocery.quantity}
            placeholder="How many?"
            name="quantity"
            onChange={this.handleFormChange}
          />

          <button
            onClick={(event) => {
              event.preventDefault();

              axios
                .post("/groceries", this.state.newGrocery)
                .then(this.resetGrocery)
                .then(this.fetchGroceries);
            }}
          >
            Add Grocery
          </button>
        </form>

        {/* HEADERS */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label>Delete?</label>
          <label>Items</label>
          <label>Quantity</label>
        </div>
        <hr />
        {/* Groceries*/}
        {this.state.groceries.map((grocery) => (
          <GroceryList groceries={grocery} fetchGrocery={this.fetchGrocery} />
        ))}
      </div>
    );
  }
}
