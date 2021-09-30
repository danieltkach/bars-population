import React from 'react';
import { scaleBand, scaleLinear, max, format } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const csvUrl =
	'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 100, left: 200 };

export const BarChart = () => {
	const data = useData(csvUrl);

	if (!data) {
		return <pre>Loading...</pre>;
	}

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const xValue = d => d.Population;
	const yValue = d => d.Country;

	const yScale = scaleBand()
		.domain(data.map(yValue))
		.range([0, innerHeight])
		.padding(0.1);

	const xScale = scaleLinear()
		.domain([0, max(data, xValue)])
		.range([0, innerWidth]);

	const labelOffset = 60;

	function xAxisTickFormat(n) {
		return format(".2s")(n).replace('G', 'B')
	}

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left},${margin.top})`}>
				<AxisBottom xScale={xScale} innerHeight={innerHeight}
					tickFormat={xAxisTickFormat} />
				<AxisLeft yScale={yScale} />
				<Marks
					data={data}
					xScale={xScale}
					yScale={yScale}
					xValue={xValue}
					yValue={yValue}
					tooltipFormat={xAxisTickFormat}
				/>
				<text className="axis-label"
					x={innerWidth / 2} y={innerHeight + labelOffset} textAnchor="middle"
				>
					Population
				</text>
			</g>
		</svg>
	);
};