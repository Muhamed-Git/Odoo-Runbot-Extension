// Library
import React from 'react';

// Less
require('./less/search.less');

class Search extends React.Component {

  constructor(props) {
      super(props);

      this.searchData = props.searchData;
  }

  componentWillReceiveProps(nextProps) {

  }

   render() {
      return (
        <div className="searchComponent">
          <div className="col s3"></div>
          <div className="col s6 searchInputDiv">
            <i className="fa fa-search seachIcon"></i>
            <input id="searchInput" type="text" placeholder="Search..."/>
          </div>
          <div className="col s12">

          </div>
        </div>
      );
   }
}


export default Search
