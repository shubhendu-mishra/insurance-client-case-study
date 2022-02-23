/* eslint-disable jsx-a11y/anchor-is-valid */
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { ChartItem, ChartData } from "chart.js";
import colorLib from "@kurkle/color";
import { getPolicyStatsByYear } from "../../../app/services/PolicyCRUD";
import { getCountByRegion } from "../../../app/utils/Helpers";
import { IChartData } from "../../../app/models/InsuranceModel";

type Props = {
  chartData: IChartData | any;
};

const ChartWidget: React.FC<Props> = (props) => {
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const ctx = document.getElementById("myChart") as ChartItem;
    const data = {
      labels: MONTHS,
      datasets: props.chartData,
    };
    console.log(props.chartData);
    const myChart = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          title: {
            display: true,
            text: "Insurance Policies by Month and Region - Year 2018",
          },
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [props.chartData]);

  return (
    <div className="row">
      <div className="col-8 px-10 m-auto">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
};

export { ChartWidget };
