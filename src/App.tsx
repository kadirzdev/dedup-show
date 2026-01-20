import { useState } from 'react'
import './App.css'

const images = [
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg",
];

const MAX_SELECTIONS = 2;

function App() {
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
    <>
      <h1 className="text-4xl font-bold text-center mb-8">
        Enterprise Dedup Interactive Selection
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <div key={index}>
            <img
              className="h-auto max-w-full rounded-base cursor-pointer"
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
    </>
  );
}

export default App
