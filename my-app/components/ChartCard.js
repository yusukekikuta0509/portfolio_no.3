// components/ChartCard.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartCard = ({ data, options }) => {
  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-6 mx-4 w-full max-w-[400px] sm:max-w-[600px]">
        <div className="relative mx-auto h-[250px] sm:h-[350px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
