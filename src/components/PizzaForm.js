import React from "react"

class PizzaForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topping: props.pizza.topping,
      size: props.pizza.size,
      vegetarian: props.pizza.vegetarian,
      id: this.props.pizza.id
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      topping: nextProps.pizza.topping,
      size: nextProps.pizza.size,
      vegetarian: nextProps.pizza.vegetarian,
      id: nextProps.pizza.id
    })
  }

  onRadioChange = ev => {
    if (ev.target.value === "Vegetarian") {
      this.setState({ vegetarian: true })
    } else {
      this.setState({ vegetarian: false })
    }
  }

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  onSubmit = ev => {
    ev.preventDefault()
    if(this.state.topping && this.state.size && this.state.id) {
      const config={
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state)
      }
      fetch('http://localhost:3000/pizzas/'+this.state.id, config)
    }
  }

  render() {
    return(
        // Topping
        <div className="form-row">
          <div className="col-5">
              <input
                type="text"
                className="form-control"
                placeholder="Pizza Topping"
                name="topping"
                value={this.state.topping !== null ? this.state.topping : ""}
                onChange={this.handleChange}
              />
          </div>
          {/* Size */}
          <div className="col">
            <select
              value={this.state.size}
              className="form-control"
              onChange={this.handleChange}
              name="size"
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          {/* Vegetarian (radio) */}
          <div className="col">
            <div className="radio">
              <div
                className="form-check"
                name="vegetarian"
                onChange={this.onRadioChange}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  value="Vegetarian"
                  checked={this.state.vegetarian}
                />
                <label className="form-check-label">
                  Vegetarian
                </label>
              </div>
              {/* Not Vegetarian (radio) */}
              <div
                className="form-check"
                name="non-vegetarian"
                onChange={this.onRadioChange}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  value="Not Vegetarian"
                  checked={!this.state.vegetarian}
                />
                <label className="form-check-label">
                  Not Vegetarian
                </label>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className="col">
            <button
              type="submit"
              className="btn btn-success"
              onClick={this.onSubmit}
            >
              Submit
            </button>
          </div>
        </div>

    )
  }

}

export default PizzaForm
