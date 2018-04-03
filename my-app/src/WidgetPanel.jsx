import React from 'react';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.css';
import { Segment, Header, Container } from 'semantic-ui-react';

/** Provides a standard Panel in which to embed an visualization with its title. */
class WidgetPanel extends React.Component {
  render() { // eslint-disable-line class-methods-use-this
    const divStyle = { paddingTop: '10px' };
    return (
        <Container style={divStyle}>
          <Segment.Group raised>
            <Segment inverted tertiary color="blue">
              <Header as='h5'>
                {this.props.title}
              </Header>
            </Segment>
            <Segment vertical attached>
              {this.props.children}
            </Segment>
          </Segment.Group>
        </Container>
    );
  }
}

/** Require a title and interior component to be passed in. */
WidgetPanel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default WidgetPanel;
