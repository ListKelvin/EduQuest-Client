import React, { ReactNode, useRef } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
	ChartData,
	TooltipPositionerFunction,
	ChartType,
	ChartDataset,
	LineController,
	LineElement,
	PointElement,
	BarController,
} from "chart.js";
import { Bar, Chart, getElementAtEvent } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	Legend,
	LineController,
	BarController
);

declare module "chart.js" {
	interface TooltipPositionerMap {
		center: TooltipPositionerFunction<ChartType>;
	}
}

Tooltip.positioners.center = function (items, eventPosition) {
	//@ts-ignore
	const pos = Tooltip.positioners.average(items, eventPosition);
	if (pos === false) {
		return false;
	}
	const chart = this.chart;

	const { bottom, top } = chart.chartArea;

	return {
		x: pos.x,
		y: (bottom + top) / 2,
	};
};

type IData = {
	x: string;
	y: number;
	id?: string;
	tooltipTitle?: string;
	yAxisID?: string;
};

type Props = {
	className?: React.ComponentProps<"div">["className"];
	data?: {
		label: string;
		data: IData[];
		borderColor?: string;
		backgroundColor?: string;
		sort?: "asc" | "desc";
		yAxisID?: string;
		type?: "bar" | "line";
	}[];
	noDataText: ReactNode;
	valueFormatter?: ((d: number) => string | number)[];
	onClick?: (d: IClickData) => any;
};

export function BarChart({
	className,
	data,
	noDataText,
	valueFormatter = [(d: number) => d],
	onClick,
}: Props) {
	const ref = useRef<any>();

	const options: ChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		interaction: {
			mode: "index" as const,
			intersect: false,
		},
		scales: {
			x: {
				border: {
					display: false,
				},
				grid: {
					display: false,
				},
				beginAtZero: false,
				ticks: {
					color: "black",
					font: { size: 15, weight: "bold" },
				},
			},
			y: {
				border: {
					display: true,
				},
				grid: {
					display: true,
				},
				beginAtZero: false,
				ticks: {
					color: "black",
					font: { size: 15 },
					autoSkip: true,
					stepSize: 0.2,
				},
			},
			y1: {
				border: {
					display: false,
				},
				beginAtZero: true,
				display: true,
				position: "right" as const,
				min: 0,
				grid: {
					drawOnChartArea: false,
				},
				ticks: {
					color: "black",
					font: { size: 15 },
					stepSize: 1,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
				position: "top" as const,
			},
			title: {
				display: false,
				text: "Chart.js Bar Chart",
			},
			tooltip: {
				position: "center",
				caretSize: 0,
				titleFont: {
					size: 15,
					family: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
				},
				bodyFont: {
					size: 14,
					family: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
					weight: "normal",
				},
				callbacks: {
					label: function (context) {
						let label = context.dataset.label || "";

						if (label) {
							label += ": ";
						}
						if (context.parsed.y !== null) {
							label += valueFormatter[context.datasetIndex](
								context.parsed.y
							);
						}
						return label;
					},
					title(tooltipItems) {
						return (
							//@ts-ignore
							tooltipItems.at(0)?.raw?.tooltipTitle ||
							//@ts-ignore
							tooltipItems.at(0)?.raw.x
						);
					},
				},
			},
		},
	};

	const chartData: any = {
		// labels,
		datasets: (data || []).map(
			({
				label,
				data,
				backgroundColor,
				borderColor,
				sort,
				yAxisID,
				type,
			}) => ({
				label: label || "No label",
				data: sort
					? data.sort((a, b) => (sort === "asc" ? a.y - b.y : b.y - a.y))
					: data,
				backgroundColor: backgroundColor || "#0ea5e9dd",
				borderColor: borderColor || "#0ea5e9dd",
				yAxisID: yAxisID || "y",
				//@ts-ignore
				type,
			})
		) as any,
	};

	return (
		<div className={`pl-5 w-full h-full flex items-center ${className || ""}`}>
			{data ? (
				<Chart
					ref={ref}
					//@ts-ignore
					options={options}
					data={chartData}
					type={"bar"}
					onClick={(event) => {
						const eventList = getElementAtEvent(ref.current, event);
						if (eventList.length > 0) {
							const index = eventList[0].index;
							const clickData = chartData.datasets.map((d: any) =>
								d.data.at(index)
							);
							onClick?.({
								index,
								data: clickData,
							});
						}
					}}
				/>
			) : (
				noDataText
			)}
		</div>
	);
}

interface IClickData {
	index: number;
	data: (IData | undefined)[];
}
