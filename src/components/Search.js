import React, {Component} from 'react';

class Control extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }

    onChange = (event) => {
        var target = event;
        var name = target.name;
        var value = target.defaultValue;
        this.setState({
            [name] : value
        });
    }

    onSearch = () => {
        console.log(this.state)
    }
    
    render(){
        var { keyword } = this.state;
        return (
                 <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="input-group">
                    <input
                     type="text"
                     className="form-control"
                     placeholder="Nhập từ khóa..." 
                     name = 'keyword'
                     defaultValue = { keyword }
                     onChange = { this.onchange }
                    />
                    <span className="input-group-btn">
                        <button 
                        className="btn btn-primary" 
                        type="button"
                        onClick = {this.onSearch}
                        >
                            <span className="fa fa-search mr-5" />Tìm
                        </button>
                    </span>
                 </div>
        </div>
    );
    }
    }

export default Control;
