import { useState, useMemo } from 'react'
import './App.css'

// Import all people images (1-10)
import img1 from './assets/people-images/1.jpg'
import img2 from './assets/people-images/2.jpg'
import img3 from './assets/people-images/3.jpg'
import img4 from './assets/people-images/4.jpg'
import img5 from './assets/people-images/5.jpg'
import img6 from './assets/people-images/6.jpg'
import img7 from './assets/people-images/7.jpg'
import img8 from './assets/people-images/8.jpg'
import img9 from './assets/people-images/9.jpg'
import img10 from './assets/people-images/10.jpg'

const allImages = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
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
    <div className="w-full max-w-full mx-auto px-2 flex flex-col items-center mb-25">
      <h1 className="text-4xl font-bold text-center mb-2">
        Enterprise Dedup Interactive Selection
      </h1>
      <p className="text-sm text-gray-300 text-center mb-6">
        <span className='text-red-500'>*</span>Images are AI-generated for demonstration purposes only.
      </p>
      <div className="grid grid-cols-5 gap-2 w-full">
        {images.map((src, index) => (
          <div key={index}>
            <img
              className="w-full aspect-square object-cover rounded-base cursor-pointer"
              src={src}
              alt=""
              onClick={() => handleImageClick(index)}
              style={{
                border: isSelected(index)
                  ? "10px solid green"
                  : "10px solid transparent",
                boxSizing: "border-box",
              }}
            />
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex justify-center py-6">
        <a
          href="https://dualstack.edp-de-front-pn338w2nrwtk-324045311.eu-west-1.elb.amazonaws.com/country/India"
          target="_blank"
          rel="noopener noreferrer"
          className="px-12 py-6 text-2xl font-bold rounded-lg hover:opacity-90 transition-opacity"
          style={{
            backgroundColor: "#0076CB",
            color: "#FFFFFF",
            border: "15px solid white",
          }}
        >
          Can you spot duplicate faces?
        </a>
      </div>
    </div>
  );
}

export default App
