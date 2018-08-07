import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TopNav from './top-nav';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'something'
        };
    }

    render() {
        return (
            <div className={this.state.name}>
                <TopNav />
                {this.props.children}
            </div>
        );
    }
}

Main.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

Main.defaultProps = {
    children: null
};
