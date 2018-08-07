import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import maxBy from 'lodash/maxBy';

import getMetadata from '../../services/questionnaire-metadata/get-metadata';
import saveNewSection from '../../services/questionnaire-metadata/save-new-section';

class SectionList extends Component {
    constructor(props) {
        super(props);
        this.metadata = getMetadata(this.props.match.params.qid);

        this.state = {
            title: '',
            order: this.getNextSectionSortOrder()
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);
        this.handleAddNewSection = this.handleAddNewSection.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            title: '',
            order: this.getNextSectionSortOrder()
        });

        this.metadata = getMetadata(this.props.match.params.qid);
    }

    getNextSectionSortOrder() {
        const section = maxBy(this.metadata.sections, 'order');
        return section ? section.order + 1 : 1;
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    }

    handleOrderChange(e) {
        this.setState({
            order: Number(e.target.value)
        });
    }

    handleAddNewSection(sectionid) {
        const { title, order } = this.state;
        const { qid } = this.props.match.params;

        saveNewSection(qid, sectionid, title, order);

        this.setState({
            title: '',
            order: this.getNextSectionSortOrder(),
            selectedSectionid: sectionid.toString()
        });

        this.props.history.push(`/editquestionnaire/id/${qid}/section/${sectionid}`);
    }

    handleSectionSelection(qid, sectionid) {
        this.setState({
            selectedSectionid: sectionid
        });

        this.props.history.push(`/editquestionnaire/id/${qid}/section/${sectionid}`);
    }

    render() {
        const { title, order, selectedSectionid } = this.state;
        const sectionid = Date.now();
        return (
            <div>
                <div
                    style={{
                        borderStyle: 'solid',
                        borderWidth: '0px 0px 0px 1px',
                        borderColor: '#abb7c3b8',
                        width: '500px',
                        display: 'inline-block',
                        marginLeft: '10px',
                        paddingLeft: '10px',
                        verticalAlign: 'top'
                    }}
                >
                    <h2>{`Questionnaire: ${this.metadata.title}`.trim()}</h2>
                    <div
                        style={{
                            height: '120px',
                            borderStyle: 'solid',
                            borderWidth: '0px 0px 1px 0px',
                            borderColor: '#abb7c3b8',
                            marginTop: '10px',
                            paddingTop: '10px',
                            paddingLeft: '10px',
                            marginBottom: '10px',
                            backgroundColor: 'lightgrey'
                        }}
                    >
                        <label
                            htmlFor={`title${sectionid}`.trim()}
                        >
                            {'Title: '.toString()}
                            <input
                                id={`title${sectionid}`.trim()}
                                value={title}
                                onChange={(e) => { this.handleTitleChange(e); }}
                            />
                        </label><br /><br />
                        <label
                            htmlFor={`order${sectionid}`.trim()}
                        >
                            {'Order: '.toString()}
                            <input
                                id={`order${sectionid}`.trim()}
                                value={order}
                                onChange={(e) => { this.handleOrderChange(e); }}
                            />
                        </label><br /><br />
                        <button type="button" onClick={() => { this.handleAddNewSection(sectionid); }}>
                            {'Add Section'.toString()}
                        </button>
                    </div>

                    {
                        this.metadata.sections.map((section) => {
                            return (
                                <div key={section.sectionid}
                                    style={{
                                        height: '30px',
                                        paddingTop: '5px',
                                        paddingLeft: '0px'
                                    }}
                                >
                                    <button
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderWidth: '0px 0px 0px 0px',
                                            borderStyle: 'none',
                                            backgroundColor: selectedSectionid === section.sectionid ? '#3baf6e' : '#96999c',
                                            textAlign: 'left',
                                            paddingLeft: '10px'
                                        }}

                                        onClick={() => { this.handleSectionSelection(this.metadata.qid, section.sectionid); }}
                                    >
                                        {section.title}
                                    </button>
                                </div>
                            );
                        })
                    }
                </div>
                <div
                    style={{
                        borderStyle: 'solid',
                        borderWidth: '0px 0px 0px 1px',
                        borderColor: '#abb7c3b8',
                        width: '500px',
                        display: 'inline-block',
                        marginLeft: '20px',
                        paddingLeft: '10px',
                        verticalAlign: 'top'
                    }}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

SectionList.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    match: PropTypes.object,
    history: PropTypes.object
};

SectionList.defaultProps = {
    children: null,
    match: null,
    history: null
};

export default withRouter(SectionList);
