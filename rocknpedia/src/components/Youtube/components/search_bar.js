import React, { Component } from 'react';


class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };
    }
    
    render() {
        

        // return <input onChange={this.onInputChange} />;
        // return <input onChange={(event) => console.log(event.target.value)} />;
        return (
            <div className="search-bar">
                <input 
                value={this.state.term} 
                onChange={ event => this.onInputChange(event.target.value)} />
                {/* Value of input is: {this.state.term} */}
            </div>
        );
    }

    
    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermCHange(term);
    }
    
}



export default SearchBar;