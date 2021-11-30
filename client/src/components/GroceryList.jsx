import React, { Component } from 'react';

class GroceryListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };
    // bind 'this' to any click handlers here
    this.onEditClick = this.onEditClick.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState({
      editing: false,
    });
  }

  onEditClick() {
    console.log(
      `Handling edit click for item with id ${this.props.grocery.id}`
    );
    this.setState({
      editing: !this.state.editing,
    });
  }

  onInputBlur({ target }) {
    console.log(`Handling blur event!`);

    let { name, value } = target;

    let updatedGrocery = Object.assign({}, this.props.grocery); // get copy of current grocery from props
    updatedGrocery[name] = value; // set the property of the copied grocery

    this.props.updateGrocery(updatedGrocery); // call updateGrocery with new grocery info

    this.resetState(); // reset the editing state back to false.
  }

  render() {
    let groceryName, groceryQty;

    // conditionally insert either span or editable text boxes, based on editing property in props
    if (!this.state.editing) {
      groceryName = (
        <span className="grocery-name"> {this.props.grocery.item} </span>
      );
      groceryQty = (
        <span className="grocery-qty"> {this.props.grocery.quantity} </span>
      );
    } else {
      groceryName = (
        <input
          name="item"
          defaultValue={this.props.grocery.item}
          onBlur={this.onInputBlur}
        />
      );
      groceryQty = (
        <input
          name="quantity"
          defaultValue={this.props.grocery.quantity}
          onBlur={this.onInputBlur}
        />
      );
    }

    return (
      <div className="grocery" data-key={this.props.grocery.id}>
        <div className="grocery-name">{groceryName}</div>
        <div className="grocery-qty">{groceryQty}</div>
        <div>
          <a
            href="#"
            className="material-icons md-18"
            onClick={() => this.onEditClick()}
          >
            edit{' '}
          </a>
          <a
            href="#"
            className="material-icons md-18"
            onClick={() => this.props.deleteGrocery(this.props.grocery)}
          >
            delete
          </a>
        </div>
      </div>
    );
  }
}

export default GroceryListItem;
