import { InfoIcon } from 'lucide-react';
import React from 'react';

export default function InfoSec() {
  return (
    <div className="flex bg-gray-100 rounded-lg p-4 mb-4 mt-10">
      {/* <svg
        className="w-5 h-5 text-blue-700"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg> */}
      <InfoIcon />
      <p className="ml-3 text-sm text-gray-700">
        <span className="font-medium">Algorithmic gatekeeping</span> AI refers
        to the use of algorithms to control access to information, resources, or
        opportunities, influencing decision-making processes and potentially
        perpetuating biases.
      </p>
    </div>
  );
}
