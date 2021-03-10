import React, { useEffect } from 'react'
const echarts = require("echarts");
const $ = window.$;

const surveyEcharts = () => {
    if ($("#surveyEcharts").length) {
      var myChart = echarts.init(document.getElementById("surveyEcharts"));

      var options = {
        color: ["#ed5564", "#336cfb"],
        tooltip: {
          trigger: "none",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {
          data: ["Patients 2018", "Patients 2019"],
        },
        grid: {
          left: 30,
          right: 0,
          top: 50,
          bottom: 50,
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "#336cfb",
              },
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    "Patients " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                },
              },
            },
            data: [
              "2019-1",
              "2019-2",
              "2019-3",
              "2019-4",
              "2019-5",
              "2019-6",
              "2019-7",
              "2019-8",
              "2019-9",
              "2019-10",
              "2019-11",
              "2019-12",
            ],
          },
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "#ed5564",
              },
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    "Patients " +
                    params.value +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                },
              },
            },
            data: [
              "2018-1",
              "2018-2",
              "2018-3",
              "2018-4",
              "2018-5",
              "2018-6",
              "2018-7",
              "2018-8",
              "2018-9",
              "2018-10",
              "2018-11",
              "2018-12",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Patients 2018",
            type: "line",
            xAxisIndex: 1,
            smooth: true,
            data: [159, 149, 174, 182, 219, 201, 175, 182, 119, 118, 112, 96],
          },
          {
            name: "Patients 2019",
            type: "line",
            smooth: true,
            data: [95, 124, 132, 143, 138, 178, 194, 211, 234, 257, 241, 226],
          },
        ],
      };

      myChart.setOption(options);

      // Resize chart
      $(function () {
        $(window).on("resize", resize);

        function resize() {
          setTimeout(function () {
            myChart.resize();
          }, 200);
        }
      });
    }
  }

export default function SurveyEcharts() {
    useEffect(() => {
        surveyEcharts()
    }, [])

    return (
        <div className="card">
        <div className="card-header">Income Chat</div>
        <div className="card-body">
          <div
            id="surveyEcharts"
            className="chat-container container-h-400"
          />
        </div>
      </div>

    )
}
