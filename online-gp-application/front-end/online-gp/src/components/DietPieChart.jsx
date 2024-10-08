import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../css/DietPieChart.css';
// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

const DietPieChart = ({onTipsDietInfoUpdate}) => {
  const [symptom, setSymptom] = useState('');
  const [chartData, setChartData] = useState({});
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to fill the container
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          boxWidth: 15,
          fontStyle: 'bold'
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0,0,0,0.7)',
        bodyFont: {
          size: 14
        },
        padding: 10
      }
    },
    cutout: '30%' // Adjust as needed
  };

  const wellnessTips = {
    KidneyFunction: {
    tips: 'Focus on low potassium foods, and avoid salt and high protein intake.',
    diet: 'Increased water intake, cranberries, apples, cabbage, and bell peppers.',
  },
  SkinInfection: {
    tips: 'Keep the skin clean and dry. Use mild soaps and avoid irritating the skin with tight clothing.',
    diet: 'Eat foods rich in antioxidants and vitamins A and E, such as nuts, seeds, carrots, and spinach.',
  },
  Headache: {
    tips: 'Stay hydrated, avoid loud noises, and get plenty of sleep.',
    diet: 'Include magnesium-rich foods like almonds, spinach, and bananas in your diet.',
  },
  Cancer: {
    tips: 'Consult with a nutritionist to support immune function and maintain healthy body weight.',
    diet: 'Focus on plant-based foods, minimize sugar and processed meats.',
  },
  Arthritis: {
    tips: 'Engage in regular physical activity to maintain joint function and reduce stiffness.',
    diet: 'Consume anti-inflammatory foods like fatty fish, nuts, and green leafy vegetables.',
  },
  Diabetes: {
    tips: 'Monitor blood sugar levels regularly and maintain physical activity.',
    diet: 'Focus on a balanced diet with low glycemic index foods like whole grains and pulses.',
  },
  AllergicReactions: {
    tips: 'Avoid triggers and carry antihistamines or epinephrine as prescribed.',
    diet: 'Eat a well-balanced diet excluding allergen-specific foods.'
  },
  Fever: {
    tips: 'Stay hydrated and rest as much as possible.',
    diet: 'Eat light meals and drink plenty of fluids, especially water and herbal teas.',
  },
  DepressionAndAnxiety: {
    tips: 'Engage in stress-relief activities such as yoga, meditation, or therapy.',
    diet: 'Incorporate omega-3 fatty acids, magnesium, and vitamins B and D into your diet.'
  },
  Nausea: {
    tips: 'Eat small, frequent meals instead of three large meals.',
    diet: 'Focus on bland foods like toast, crackers, and rice; avoid greasy or spicy foods.',
  },
  StomachInfection: {
    tips: 'Maintain good hygiene, wash hands frequently, and avoid contaminated food and water.',
    diet: 'Stick to bland, easy-to-digest foods such as bananas, rice, applesauce, and toast (BRAT diet).',
  },
  SkinMelasma: {
    tips: 'Protect your skin from the sun using a high-SPF sunscreen and wear protective clothing.',
    diet: 'Include foods rich in antioxidants and Vitamin C, like citrus fruits and berries.'
  }
    };
    const [tipsDietInfo, setTipsDietInfo] = useState({ tips: '', diet: '' });

  const symptomsToDiet = {
    Arthritis: {
      labels: ['Fruits', 'Vegetables', 'Whole grains', 'Lean proteins', 'Fats'],
      datasets: [{
        data: [20, 30, 25, 15, 10],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A'],
        hoverBorderColor: 'white',
        hoverBorderWidth: 2,
      }]
    },
    Diabetes: {
      labels: ['Fruits', 'Vegetables', 'Whole grains', 'Lean proteins', 'Low-fat dairy'],
      datasets: [{
        data: [15, 35, 25, 20, 5],
        backgroundColor: ['#4BC0C0', '#36A2EB', '#FFCE56', '#FF6384', '#F7464A'],
        hoverBackgroundColor: ['#4BC0C0', '#36A2EB', '#FFCE56', '#FF6384', '#F7464A'],
        hoverBorderColor: 'white',
        hoverBorderWidth: 2,
      }]
    },
    AllergicReactions: {
      labels: ['Fruits', 'Vegetables', 'Grains', 'Dairy', 'Proteins'],
      datasets: [{
        data: [20, 30, 20, 15, 15],
        backgroundColor: ['#A284BE', '#81C3D7', '#FFE156', '#FF968A', '#F48FB1'],
        hoverBackgroundColor: ['#A284BE', '#81C3D7', '#FFE156', '#FF968A', '#F48FB1'],
        hoverBorderColor: 'white',
        hoverBorderWidth: 2,
      }]
    },
    Cancer: {
      labels: ['Leafy Greens', 'Berries', 'Nuts', 'Whole grains', 'Fish'],
      datasets: [{
        data: [15, 25, 20, 20, 20],
        backgroundColor: ['#FF9999', '#99CCFF', '#99FF99', '#FFCC99', '#CCCCFF'],
        hoverBackgroundColor: ['#FF7777', '#77BBFF', '#77FF77', '#FFBB77', '#BBAAFF'],
        hoverBorderColor: 'white',
        hoverBorderWidth: 2,
      }]
    },
    Fever: {
      labels: ['Fluids', 'Electrolytes', 'Light foods', 'Fruits', 'Vegetables'],
      datasets: [{
        data: [30, 25, 15, 15, 15],
        backgroundColor: ['#FFD700', '#00CED1', '#E9967A', '#3CB371', '#BDB76B'],
        hoverBackgroundColor: ['#FFD700', '#00CED1', '#E9967A', '#3CB371', '#BDB76B'],
        hoverBorderColor: 'white',
        hoverBorderWidth: 2,
      }]
    },
    DepressionAndAnxiety: {
      labels: ['Complex carbs', 'Leafy greens', 'Berries', 'Fatty fish', 'Nuts'],
      datasets: [{
        data: [20, 20, 20, 20, 20],
        backgroundColor: ['#6495ED', '#006400', '#8A2BE2', '#DC143C', '#FF8C00'],
        hoverBackgroundColor: ['#4682B4', '#228B22', '#9932CC', '#B22222', '#FFA500'],
        hoverBorderColor: 'white',
        hoverBorderWidth: 2,
      }]
    } ,
    Nausea: {
      labels: ['Ginger', 'Peppermint', 'Crackers', 'Toast', 'Bananas'],
      datasets: [{
        data: [20, 20, 20, 20, 20],
        backgroundColor: ['#FFD700', '#00CED1', '#E9967A', '#3CB371', '#BDB76B'],
        hoverBackgroundColor: ['#FFD700', '#00CED1', '#E9967A', '#3CB371', '#BDB76B'],
        hoverBorderColor: 'white',
        hoverBorderWidth: 2,
      }]
    },
    StomachInfection: {
      labels: ['Bananas', 'Rice', 'Applesauce', 'Toast', 'Tea'],
      datasets: [{
        data: [20, 20, 20, 20, 20],
        backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB', '#4BC0C0', '#F7464A'],
        hoverBackgroundColor: ['#FF6384', '#FFCE56', '#36A2EB', '#4BC0C0', '#F7464A'],
        hoverBorderColor: 'white',
        hoverBorderWidth: 2,
      }]
    },
    SkinMelasma: {
      labels: ['Leafy Greens', 'Berries', 'Nuts', 'Seeds', 'Fatty fish'],
      datasets: [{
        data: [25, 20, 20, 20, 15],
        backgroundColor: ['#A284BE', '#81C3D7', '#FFE156', '#FF968A', '#F48FB1'],
        hoverBackgroundColor: ['#A284BE', '#81C3D7', '#FFE156', '#FF968A', '#F48FB1'],
        hoverBorderColor: 'white',
        hoverBorderWidth: 2,
      }]
    }
  };
const [tipDetails , setTipdetails] = useState('');

const handleSymptomChange = (event) => {
  const selectedSymptom = event.target.value;
  setSymptom(selectedSymptom);

  const newChartData = symptomsToDiet[selectedSymptom] || {};
  setChartData(newChartData);

  const newTipDetails = wellnessTips[selectedSymptom] || { tips: '', diet: '' };
  setTipsDietInfo(newTipDetails);

  // Call the function only if it exists
  if(typeof onTipsDietInfoUpdate === 'function') {
      onTipsDietInfoUpdate(newTipDetails);
  } else {
      console.error('onTipsDietInfoUpdate is not a function');
  }
};

// Move logging or other operations inside useEffect if dependent on updated states
useEffect(() => {
  console.log("Symptom: ", symptom);
  console.log("Tips Details: ", tipsDietInfo);
}, [symptom, tipsDietInfo]); 
  

  return (
    <div className="chart-container">
    <div className="wellness-info">
        <label><b>Symptoms</b></label>
        <select value={symptom} onChange={handleSymptomChange} className="symptom-dropdown">
            <option>Select symptom</option>
            {Object.keys(symptomsToDiet).map(symptom => (
                <option key={symptom} value={symptom}>{symptom.replace(/([A-Z])/g, ' $1').trim()}</option>
            ))}
        </select>

      
    <div className="charts">  
    {chartData.labels ? (
      <Pie data={chartData} options={{
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              boxWidth: 15,
              fontStyle: 'bold'
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0,0,0,0.7)',
            bodyFont: {
              size: 14
            },
            padding: 10
          }
        }
      }} />
    ) : (
      <p>Select a symptom to see the diet chart.</p>
    )}
    </div>
    <div className="health-info">
   
            <div className="health-tips">
                <h2>Tips:</h2>
                <p>{tipsDietInfo.tips || "No wellness tips available for the selected symptom."}</p>
            </div>
            <div className="health-diet">
                <h2>Diet:</h2>
                <p>{tipsDietInfo.diet || "No wellness diet is  available for the selected symptom."}</p>
            </div>
     
        </div>
    </div>
    </div>
//   <div className='wellness-info'>
//         {tipsDietInfo && (
//          <div className="health-info">
//             <div className="health-tips">
//                 <h2>Tips:</h2>
//                 <p>{tipsDietInfo.tips}</p>
//             </div>
//             <div className="health-diet">
//                 <h2>Diet:</h2>
//                 <p>{tipsDietInfo.diet}</p>
//             </div>
//             </div>
//     )}
 
//  </div>
//  </div>
 

  
);
        }

export default DietPieChart;
