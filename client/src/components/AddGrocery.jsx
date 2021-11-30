import React, { Component } from 'react';

class AddGrocery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      item: '',
      quantity: '',
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmithandler = this.onSubmithandler.bind(this);
  }

  onChangeHandler({ target }) {
    let { name, value } = target;

    // check if value is a vaild number
    if (name === 'quantity' && isNaN(value)) {
      value = '';
    }

    this.setState({
      [name]: value,
    });
  }

  onSubmithandler(event) {
    event.preventDefault();

    // if user entered a valid name, continue with setState
    if (this.state.item.length > 0) {
      const { addGrocery } = this.props;
      addGrocery(this.state);
      this.initializeState();
    }
  }

  initializeState() {
    this.setState({
      item: '',
      quantity: '',
    });
  }

  render() {
    const { item, quantity } = this.state;
    return (
      <form onSubmit={this.onSubmithandler}>
        <label>
          {' '}
          Item
          <input name="item" value={item} onChange={this.onChangeHandler} />
        </label>
        <label>
          {' '}
          Quantity
          <input
            name="quantity"
            value={quantity}
            onChange={this.onChangeHandler}
          />
        </label>
        <button>Add Grocery</button>
      </form>
    );
  }
}

export default AddGrocery;
