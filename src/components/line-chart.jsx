import React, { Component } from 'react';
import PropTypes from 'prop-types';

const colorPool = [
    '#e6194b',
    '#3cb44b',
    '#ffe119',
    '#4363d8',
    '#f58231',
    '#911eb4',
    '#46f0f0',
    '#f032e6',
    '#bcf60c',
    '#fabebe',
    '#008080',
    '#e6beff',
    '#9a6324',
    '#fffac8',
    '#800000',
    '#aaffc3',
    '#808000',
    '#ffd8b1',
    '#000075',
    '#808080',
];
const colorCache = {};
const generateColor = (name) => {
    if (colorCache[name]) return colorCache[name];
    const index = Math.floor(Math.random() * colorPool.length);
    colorCache[name] = colorPool[index];
    colorPool.splice(index, 1);
    return colorCache[name];
};

const attachMarkerListeners = (superSeries, layer, options) => {
    console.log('series, layer, options', superSeries, layer, options);
    superSeries.forEach((series) => {
        const markers = d3.selectAll(`${options.el} .line-chart-markers.markers.${series.name} .dot`)
            .on('mouseover', (d, i) => options.line.marker.setCurrent(d))
            .on('mouseout', (d, i) => options.line.marker.setCurrent({ ...d, old: true }));
        markers.each(function (d) {
            d3.select(this).attr({
                fill: generateColor(d.name),
                stroke: generateColor(d.name),
            });
        });
    });
};

Contour.export('attachMarkerListeners', attachMarkerListeners);

const parse = (data) => data.map((datum, idx) => ({ ...datum, x: idx, y: datum.score }));
class LineChart extends Component {
    componentDidMount = () => {
        const { xTitle, yTitle, data, name, setCurrent } = this.props;
        this.chart = new Contour({
            el: `#${name}`,
            line: {
                animationDirection: 'bottom-to-top',
                marker: {
                    size: 10,
                    setCurrent,
                },
            },
            xAxis: {
                type: 'linear',
                ticks: 0,
                title: xTitle,
            },
            yAxis: {
                tickValues: [-1, 0, 1],
                title: yTitle,
            },
        })
            .cartesian()
            .line([{
                name: 'series-name',
                data: parse(data),
            }])
            .attachMarkerListeners()
            .render();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data.length !== this.props.data.length) {
            this.chart.setData([{
                name: 'series-name',
                data: parse(this.props.data),
            }]).render();
        }
    }

    render() {
        const { name } = this.props;
        return <div id={name} className="line-chart"></div>;
    }
}

LineChart.propTypes = {

};

export default LineChart;
