import { Dropdown,DropdownButton, Button} from 'react-bootstrap';
import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.css'

const App = () => {
  return ( 
    <div class="flex-container">
  <div >
  <DropdownButton id="dropdown-basic-button" title="Select Project">
  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
</DropdownButton>

  </div>
  <div>2</div>
  
</div>


  )
}

export default App
