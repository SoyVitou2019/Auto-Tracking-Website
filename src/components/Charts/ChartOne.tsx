import React, { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';

const ChartOne: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [selectBtn, setSelectBtn] = useState("Day");

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartProperties = {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      }
    };
    const chart = createChart(chartContainerRef.current, chartProperties);
    chartRef.current = chart;

    const candleSeries = chart.addCandlestickSeries();

    fetch("https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1d&limit=1000")
      .then(res => res.json())
      .then(data => {
        const cdata = data.map((d: any) => ({
          time: d[0] / 1000,
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
        }));
        candleSeries.setData(cdata);
      })
      .catch(err => console.error(err));

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  const handleSelectBtn = (value: string) => {
    setSelectBtn(value);
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-green-400"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-green-400">Studying</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-red-400"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-red-400">Enjoying</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-center">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Auto
            </button>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button onClick={() => handleSelectBtn("Day")} className={`${selectBtn === "Day" ? "dark:bg-boxdark" : ""} rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`}>
              Day
            </button>
            <button onClick={() => handleSelectBtn("Week")} className={`${selectBtn === "Week" ? "dark:bg-boxdark" : ""} rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`}>
              Week
            </button>
            <button onClick={() => handleSelectBtn("Month")} className={`${selectBtn === "Month" ? "dark:bg-boxdark" : ""} rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`}>
              Month
            </button>
            <button onClick={() => handleSelectBtn("Year")} className={`${selectBtn === "Year" ? "dark:bg-boxdark" : ""} rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`}>
              Year
            </button>
          </div>
        </div>
      </div>
      <div>
        <div id="chartOne" className="-ml-5">
          <div id="tvchart" ref={chartContainerRef}></div>
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
