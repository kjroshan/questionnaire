import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'something'
        };
    }

    render() {
        return (
            <NavBar name={this.state.name}>
                <PageTitle title="Questionnaire Application" />
            </NavBar>
        );
    }
}

TopNav.propTypes = {
    // children: PropTypes.shapeOf(PropTypes.element)
};

TopNav.defaultProps = {
    // children: null
};

const NavBar = props => (
    <div style={{
        backgroundColor: 'burlywood',
        height: '50px'
    }}
    >
        {props.children}
    </div>
);

NavBar.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

NavBar.defaultProps = {
    children: null
};

const PageTitle = props => (
    <div style={{
        position: 'relative',
        top: '5px',
        marginLeft: '10px'
    }}
    >
        <h1>{props.title}</h1>
    </div>
);

PageTitle.propTypes = {
    title: PropTypes.string
};

PageTitle.defaultProps = {
    title: null
};
