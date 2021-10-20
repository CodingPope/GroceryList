import React from "react";
import axios from "axios";

export default class GroceryItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editingItem: false,
      editingQuantity: false,
      modifiedGrocery: this.props.grocery,
    };

    this.updateGrocery = this.updateGrocery.bind(this);
    this.deleteGrocery = this.deleteGrocery.bind(this);
    this.handleEditGrocery = this.handleEditGrocery.bind(this);
  }

  handleEditGrocery(event) {
    const modifiedGrocery = { ...this.state.modifiedGrocery };
    modifiedGrocery[event.target.name] =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState({ modifiedGrocery });
  }

  updateGrocery() {
    // Cleaning up date for mysql update
    const modifiedGrocery = { ...this.state.modifiedGrocery };
    modifiedGrocery.best_before = modifiedGrocery.best_before?.slice(0, 10);
    modifiedGrocery.purchased = Number(modifiedGrocery.purchased);

    axios
      .put("/groceries", modifiedGrocery)
      .then(() => this.setState({ editingItem: false, editingQuantity: false }))
      .then(this.props.fetchGroceries);
  }

  deleteGrocery() {
    axios
      .delete(`/groceries/${this.props.grocery.id}`)
      .then(this.props.fetchGroceries);
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button onClick={this.deleteGrocery} style={{ color: "red" }}>
          X
        </button>

        {this.state.editingItem ? (
          <input
            type="text"
            name="item"
            value={this.state.modifiedGrocery.item}
            onChange={this.handleEditGrocery}
            onBlur={this.updateGrocery}
          />
        ) : (
          <span
            onClick={() =>
              this.setState({ editingItem: !this.state.editingItem })
            }
          >
            {this.props.grocery.item}
          </span>
        )}

        {this.state.editingQuantity ? (
          <input
            type="number"
            name="quantity"
            value={this.state.modifiedGrocery.quantity}
            onChange={this.handleEditGrocery}
            onBlur={this.updateGrocery}
          />
        ) : (
          <span
            onClick={() =>
              this.setState({ editingQuantity: !this.state.editingQuantity })
            }
          >
            {this.props.grocery.quantity}
          </span>
        )}
      </div>
    );
  }
}
