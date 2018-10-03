import React, { Component } from 'react';
import {ListContacts} from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'
import { Route } from 'react-router-dom'

// const contacts = [
//   {
//     "id": "ryan",
//     "name": "Ryan Florence",
//     "email": "ryan@reacttraining.com",
//     "avatarURL": "http://localhost:5001/ryan.jpg"
//   },
//   {
//     "id": "michael",
//     "name": "Michael Jackson",
//     "email": "michael@reacttraining.com",
//     "avatarURL": "http://localhost:5001/michael.jpg"
//   },
//   {
//     "id": "tyler",
//     "name": "Tyler McGinnis",
//     "email": "tyler@reacttraining.com",
//     "avatarURL": "http://localhost:5001/tyler.jpg"
//   }
// ]

class App extends Component {
  state = {
    contacts: [ ],
    screen: 'list'
  }

  componentDidMount(){
    ContactsAPI.getAll().then((contacts)=>{
      this.setState({ contacts})
    })
  }

  removeContact = contact => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id)
    }));

    ContactsAPI.remove(contact)
  };

  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(preState => ({
        contacts: preState.contacts.concat([ contact ])
      }))
    })
  }

  render() {
    return (
      <div>
      <Route exact path= '/' render= {()=> 
        (<ListContacts contacts = {this.state.contacts} 
        onDeleteCotact = {this.removeContact}
        />
      )} />
      
    <Route path= '/create' render  = {({history})=>
      <CreateContact onCreateContact = {(contact)=> {
        this.createContact(contact)
      history.push('/')
       } }/>} />

      </div>
    )
  }
}

export default App;

// import React, { Component } from react;
// import {ListContacts} from './ListContacts';

// const contacts = [
//   {
//     "id": "ryan",
//     "name": "Ryan Florence",
//     "email": "ryan@reacttraining.com",
//     "avatarURL": "http://localhost:5001/ryan.jpg"
//   },
//   {
//     "id": "michael",
//     "name": "Michael Jackson",
//     "email": "michael@reacttraining.com",
//     "avatarURL": "http://localhost:5001/michael.jpg"
//   },
//   {
//     "id": "tyler",
//     "name": "Tyler McGinnis",
//     "email": "tyler@reacttraining.com",
//     "avatarURL": "http://localhost:5001/tyler.jpg"
//   }
// ]

// class App extends Component{

//   render(){
//     return (
//       <ListContacts contacts = {contacts}/>
//     )
//   }
// }

// export default App;