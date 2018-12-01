import React, { Component } from 'react';
import PropTypes from 'prop-types';


const parse = (data) => {
    return data.map(({ score }) => score);
};

class LineChart extends Component {
    componentDidMount = () => {
        const { xTitle, yTitle, data, name } = this.props;
        this.chart = new Contour({
            el: `#${name}`,
            line: {
                animationDirection: 'bottom-to-top',
            },
            xAxis: {
                type: 'time',
                title: xTitle,
            },
            yAxis: {
                tickValues: [-1, 0, 1],
                labels: {
                    formatter: (datum) => {
                        return 'eck';
                    },
                },
                title: yTitle,
            },
        })
            .cartesian()
            .line(parse(data))
            .render();
    }

    render() {
        const { name } = this.props;
        return <div id={name}></div>;
    }
}

LineChart.propTypes = {

};

export default LineChart;
