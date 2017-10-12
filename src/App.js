import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class AddName extends Component {
  constructor(props) {
    super(props);
    this.state = {textOfName: ""};
    this.textChanged = this.textChanged.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  textChanged(e) {
    this.setState({
      textOfName: e.target.value
    });
  }

  handleAdd() {
    // get text
    const text = this.state.textOfName;
    // update list
    if(text.trim() != "") {
      var list = this.props.list;
      list.push(text); 
      this.props.addAction(list);
    }
    else {
      alert("can not add empty name");
    }
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="input name" onChange={this.textChanged} id="inputName"/>
        <button onClick={this.handleAdd}> Add </button>
      </div>
    );
  }
}

class NameList extends Component {
  handleDelete(e) {
    // update list
    let index = e.target.getAttribute('data-key');
    var list = this.props.list;
    list.splice(index, 1);
    this.props.deleteAction(list);
  }

  render() {
    const style2 = {
      color: 'red',
    };
    let _self = this;
    const array = this.props.list.map(function(item) {
      return(
        <li>{item} <button onClick={_self.handleDelete.bind(_self)}>delete</button></li>
      );
    });

    return (
      <ul style={style2}>
        {array}
      </ul>
    );
  } 
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {nameList: ["Alex"]};
    this.handleListChange = this.handleListChange.bind(this);
  }
  // add
  handleListChange(newList) {
    this.setState({
      nameList: newList
    });
  }

  render() {
    // style
    const style1 = {
      fontSize: '12px',
    }
    const listStyle = {
      backgroundColor: 'yellow',
      textAlign: 'left',
    }
    // return element
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h1 style={style1}> Hello World </h1>

        <div style={listStyle}>
          <AddName list={this.state.nameList} addAction={this.handleListChange} />
          <NameList list={this.state.nameList} deleteAction={this.handleListChange}/>
        </div>
        

      </div>
    );
  }
}

export default App;
