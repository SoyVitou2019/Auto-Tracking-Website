import React from 'react';
import ChartOne from '../components/Charts/ChartOne';
// import CardDataStats from '../components/CardDataStats';
// import ChartThree from '../components/Charts/ChartThree';
import ChartTwo from '../components/Charts/ChartTwo';
import DefaultLayout from '../layout/DefaultLayout';

const Dashbaord: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
      </div>
    </DefaultLayout>
  );
};

export default Dashbaord;
