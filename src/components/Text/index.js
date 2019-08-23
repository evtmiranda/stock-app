import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'

export class Text extends Component {
    static propTypes = {
        text: PropTypes.string,
        display: PropTypes.string
    }

    static defaultProps = {
        text: '',
        display: ''
    }

    render() {
        // return ()<p style={{ display: this.props.display }}>{this.props.text}</p>;
        return (
            <Typography paragraph>
                {this.props.text}
            </Typography>
        )
    }
}
