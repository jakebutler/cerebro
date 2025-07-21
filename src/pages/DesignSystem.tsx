import React, { useState, useEffect } from 'react';

const DesignSystem = () => {
  const [primaryColor, setPrimaryColor] = useState('#4f46e5');
  const [secondaryColor, setSecondaryColor] = useState('#ec4899');
  const [accentColor, setAccentColor] = useState('#f59e0b');
  const [font, setFont] = useState('Inter');

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', primaryColor);
    document.documentElement.style.setProperty('--color-secondary', secondaryColor);
    document.documentElement.style.setProperty('--color-accent', accentColor);
    document.documentElement.style.setProperty('--font-sans', font);
  }, [primaryColor, secondaryColor, accentColor, font]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Design System</h1>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Colors</h2>
          <div className="flex space-x-4">
            <div>
              <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">Primary</label>
              <input type="color" id="primaryColor" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
            </div>
            <div>
              <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700">Secondary</label>
              <input type="color" id="secondaryColor" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
            </div>
            <div>
              <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700">Accent</label>
              <input type="color" id="accentColor" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Fonts</h2>
          <div>
            <label htmlFor="font" className="block text-sm font-medium text-gray-700">Font</label>
            <select id="font" value={font} onChange={(e) => setFont(e.target.value)}>
              <option>Inter</option>
              <option>Roboto</option>
              <option>Lato</option>
              <option>Montserrat</option>
            </select>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Components</h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button className="bg-primary text-white font-bold py-2 px-4 rounded">
                Primary
              </button>
              <button className="bg-secondary text-white font-bold py-2 px-4 rounded">
                Secondary
              </button>
              <button className="bg-accent text-white font-bold py-2 px-4 rounded">
                Accent
              </button>
            </div>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Input" />
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">Card Title</h3>
              <p className="text-gray-700">This is a card component. It has a shadow, rounded corners, and some padding.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystem;
