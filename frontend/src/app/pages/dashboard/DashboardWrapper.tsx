/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useState } from "react";
import {
  faAddressCard,
  faUsers,
  faMapLocationDot,
  faMoneyCheckDollar,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StatsDisplayWidget } from "../../../theme/partials";
import { ChartWidget } from "../../../theme/partials/widgets/ChartWidget";
import { IChartData } from "../../models/InsuranceModel";
import { getPolicyStatsByYear } from "../../services/PolicyCRUD";
import { getCountByRegion } from "../../utils/Helpers";

import colorLib from "@kurkle/color";
const DashboardPage: FC = () => {
  const [chartData, setChartData] = useState<Array<IChartData>>([]);

  useEffect(() => {
    getPolicyStatsByYear("2018")
      .then(({ data }) => {
        const currentChartData: Array<IChartData> = [];
        const northRegionData: IChartData = {
          label: "North",
          data: getCountByRegion(data, "North"),
          borderColor: "#D14343",
          backgroundColor: colorLib("#D14343").alpha(0.5).rgbString(),
          yAxisID: "y",
        };
        currentChartData.push(northRegionData);
        const eastRegionData: IChartData = {
          label: "East",
          data: getCountByRegion(data, "East"),
          borderColor: "#14B8A6",
          backgroundColor: colorLib("#14B8A6").alpha(0.5).rgbString(),
          yAxisID: "y",
        };
        currentChartData.push(eastRegionData);
        const westRegionData: IChartData = {
          label: "West",
          data: getCountByRegion(data, "West"),
          borderColor: "#FFB020",
          backgroundColor: colorLib("#FFB020").alpha(0.5).rgbString(),
          yAxisID: "y",
        };
        currentChartData.push(westRegionData);
        const southRegionData: IChartData = {
          label: "South",
          data: getCountByRegion(data, "South"),
          borderColor: "#5048E5",
          backgroundColor: colorLib("#5048E5").alpha(0.5).rgbString(),
          yAxisID: "y",
        };
        currentChartData.push(southRegionData);
        setChartData(currentChartData);
      })
      .catch((error) => {
        console.error("Error while fetching stats by year");
      });
  }, []);

  return (
    <>
      {/* begin::Row */}
      <div className="row m-auto mb-m-0">
        <StatsDisplayWidget
          title="Total Policies"
          icon={faAddressCard}
          number="34,172"
          subtitle="1574 issued in the last month"
          iconColor="#D14343"
        />

        <StatsDisplayWidget
          title="Total Customers"
          icon={faUsers}
          number="3,021"
          subtitle="132 joined in the last month"
          iconColor="#14B8A6"
        />

        <StatsDisplayWidget
          title="Top Performing Region"
          icon={faMapLocationDot}
          number="West"
          subtitle="7800 policies in the last month"
          iconColor="#FFB020"
        />

        <StatsDisplayWidget
          title="Average Premium Amount"
          icon={faMoneyCheckDollar}
          number="6832"
          subtitle=""
          iconColor="#5048E5"
        />

        <StatsDisplayWidget
          title="Total Comprehensive Policies"
          icon={faCoins}
          number="3568"
          subtitle=""
          iconColor="#D14343"
        />
        <div className="container">
          <ChartWidget chartData={chartData} />
        </div>
      </div>
      {/* end::Row */}
    </>
  );
};

const DashboardWrapper: FC = () => {
  return (
    <>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
