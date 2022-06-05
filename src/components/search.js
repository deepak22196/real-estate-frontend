import React from 'react'
import '../CSS-files/search.css'
import {Link} from 'react-router-dom'

function search() {
  return (
    <div className='Search'>
        <form class="search-form">
            <input type="text" id="search" placeholder="search PPD ID" />
            <Link to='/basicinfo'>
              <button className=" add-user" type="submit" >+  Add Property</button>
            </Link>
            
        </form>
    </div>
  )
}

export default search