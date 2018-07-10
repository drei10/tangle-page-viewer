import React, { Component } from 'react';
import { Page } from './components/Page.jsx';
import './App.css';

import { get } from './api/api';

const mockContent = {
  title: 'Eins',
  sections: [
    {
      id: 1,
      rows: [
        {
          id: 1,
          columns: [
            {
              id: 1,
              text: '<h1>ich bin h1</h1>'
            },
            {
              id: 2,
              text: '<h2>ich bin h2</h2>'
            }
          ]
        },
        {
          id: 2,
          columns: [
            {
              id: 3,
              text: '<h3>ich bin h3</h3>'
            },
            {
              id: 4,
              text: '<h4>ich bin h4</h4>'
            }
          ]
        }
      ]
    }
  ]
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      content: null
    }

    get('pages/VVTGETEISOKXRGZ9T9N9JHJBLNQTQQFKDLJGNYDHZUJOUQKTHEYYFISZYQJVKBDQZK9ZVZNYQLLQHDKGX')
    .then(content => {if (content) this.setState({content})})
  }

  render() {
    const { loading, content } = this.state;
    if (loading) {
      return <div>loading...</div>
    }
    if (!loading && content !== null) {
      return <Page content={content} />
    }

    return <div>page not found!</div>
  }
}

export default App;
