// components/ChartCard.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartCard = ({ data, options }) => {
  return (
    <div className="flex justify-center">
      <div
        className="bg-white rounded-lg shadow-2xl p-10 mx-4"
        style={{ maxWidth: '600px', width: '100%' }}
      >
        <div className="relative h-[350px] mx-auto">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
