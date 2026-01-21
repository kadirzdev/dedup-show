import { useState, useMemo } from 'react'
import './App.css'

// Import all people images
import p1 from './assets/people-images/p1.jpg'
import p1_d from './assets/people-images/p1_d.jpg'
import p2 from './assets/people-images/p2.jpg'
import p2_d from './assets/people-images/p2_d.jpg'
import p3 from './assets/people-images/p3.jpg'
import p4 from './assets/people-images/p4.jpg'
import p4_d from './assets/people-images/p4_d.jpg'
import p5 from './assets/people-images/p5.jpg'
import p5_d from './assets/people-images/p5_d.jpg'
import p6 from './assets/people-images/p6.jpg'
import p6_d from './assets/people-images/p6_d.jpg'
import p7 from './assets/people-images/p7.jpg'
import p7_d from './assets/people-images/p7_d.jpg'
import p8 from './assets/people-images/p8.jpg'
import p8_d from './assets/people-images/p8_d.jpg'
import p10 from './assets/people-images/p10.jpg'
import p10_d from './assets/people-images/p10_d.jpg'

// Import case images
import case_p10 from './assets/people-images/case/p10.jpg'
import case_p11 from './assets/people-images/case/p11.jpg'
import case_p12 from './assets/people-images/case/p12.jpg'
import case_p13 from './assets/people-images/case/p13.png'
import case_p14 from './assets/people-images/case/p14.jpg'
import case_p15 from './assets/people-images/case/p15.jpg'
import case_p16 from './assets/people-images/case/p16.jpg'
import case_p17 from './assets/people-images/case/p17.jpg'

const allImages = [
  p1,
  p1_d,
  p2,
  p2_d,
  p3,
  p4,
  p4_d,
  p5,
  p5_d,
  p6,
  p6_d,
  p7,
  p7_d,
  p8,
  p8_d,
  p10,
  p10_d,
  case_p10,
  case_p11,
  case_p12,
  case_p13,
  case_p14,
  case_p15,
  case_p16,
  case_p17,
];

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const MAX_SELECTIONS = 2;

function App() {
  // Shuffle images once on mount
  const images = useMemo(() => shuffleArray(allImages), []);

  // Array of selected image indices, ordered by selection time (FIFO)
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  const handleImageClick = (index: number) => {
    setSelectedImages((prev) => {
      const isSelected = prev.includes(index);

      if (isSelected) {
        // Deselect: remove the image from selection
        return prev.filter((i) => i !== index);
      } else {
        // Select: add the image, applying FIFO if at max limit
        if (prev.length >= MAX_SELECTIONS) {
          // Remove the first (oldest) selection, add new one at the end
          return [...prev.slice(1), index];
        }
        return [...prev, index];
      }
    });
  };

  const isSelected = (index: number) => selectedImages.includes(index);

  return (
    <div className="w-full max-w-[1800px] mx-auto px-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Enterprise Dedup Interactive Selection
      </h1>
      <div className="grid grid-cols-3 gap-8">
        {images.map((src, index) => (
          <div key={index}>
            <img
              className="w-full h-96 object-cover rounded-base cursor-pointer"
              src={src}
              alt=""
              onClick={() => handleImageClick(index)}
              style={{
                border: isSelected(index) ? '10px solid green' : '10px solid transparent',
                boxSizing: 'border-box',
              }}
            />
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex justify-center py-6">
        <a
          href="https://dualstack.edp-de-front-pn338w2nrwtk-324045311.eu-west-1.elb.amazonaws.com/login"
          target="_blank"
          rel="noopener noreferrer"
          className="px-12 py-6 text-2xl font-bold rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#0076CB', color: '#FFFFFF', border: '15px solid white' }}
        >
          Enter the Enterprise DeDup
        </a>
      </div>
    </div>
  );
}

export default App
