import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Param extends Component {
  state = {
    id: '',
    param: '',
  };

  onParamChange = (e) => {
    const param = e.target.value;
    this.setState({ param }, this.props.addParam(this.state));
  };

  onIdChange = (e) => {
    const id = e.target.value;
    this.setState({ id });
  };

  clearInput = () => {
    this.setState({ param: '' });
    this.setState({ id: '' });
  };

  render() {
    return (
      <div className="mb-3">
        <label htmlFor="id" className="form-label">
          ID
        </label>
        <input
          type="number"
          className="form-control"
          placeholder="any number"
          name="id"
          value={this.state.id}
          onChange={this.onIdChange}
        />
        <label htmlFor="param" className="form-label">
          Param
        </label>
        <input
          type="text"
          placeholder="param"
          className="form-control"
          name="param"
          value={this.state.param}
          onChange={this.onParamChange}
        />

        <ParamValue
          id={this.state.id}
          addParamValues={this.props.addParamValues}
          clearInput={this.clearInput}
        />
      </div>
    );
  }
}

class ParamValue extends Component {
  state = {
    paramValue: '',
    id: '',
  };

  onParamValueChange = (e) => {
    const paramValue = e.target.value;
    this.setState({ paramValue });
    this.setState({ id: this.props.id });
  };

  clearInput = () => {
    this.setState({ paramValue: '' });
    this.setState({ id: '' });
    this.props.clearInput();
  };

  handleClick = () => {
    this.props.addParamValues(this.state);
    this.clearInput();
  };

  render() {
    return (
      <div className="mb-3">
        <label htmlFor="paramValue" className="form-label">
          ParamValue
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="paramValue"
          name="paramValue"
          onChange={this.onParamValueChange}
          value={this.state.paramValue}
        />
        <button
          onClick={this.handleClick}
          className="btn btn-outline-success mt-3">
          add Params
        </button>
      </div>
    );
  }
}

class Model extends Component {
  renderParamValue = (arr) => {
    return arr.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.paramValue}</td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div className="container p-3">
        <h5>Model is</h5>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">paramValue</th>
            </tr>
          </thead>
          <tbody>{this.renderParamValue(this.props.paramsValues)}</tbody>
        </table>
      </div>
    );
  }
}

class ParamEditor extends Component {
  state = {
    paramValue: [],
    param: [],
    getModel: false,
  };

  addParam = (val) => {
    this.setState({ param: [...this.state.param, val] }, () => {});
  };

  addParamValues = (val) => {
    this.setState({ paramValue: [...this.state.paramValue, val] }, () => {});
  };

  handleModel = () => {
    this.setState({ getModel: true }, () => {});
  };

  render() {
    return (
      <div className="container">
        <Param addParam={this.addParam} addParamValues={this.addParamValues} />
        <button className="btn btn-outline-warning" onClick={this.handleModel}>
          Get Model
        </button>
        {this.state.getModel ? this.props.render(this.state.paramValue) : null}
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <ParamEditor
        render={(paramsValues) => <Model paramsValues={paramsValues} />}
      />
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
