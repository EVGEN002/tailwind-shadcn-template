import { useEffect, useState } from 'react';

import api from '@/api';

import image from '@/assets/code.webp';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.getData();
      setData(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-dvh">
      <div className="fixed -z-10 h-full w-full">
        <div className="relative h-full w-full bg-slate-950">
          <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
          <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        </div>
      </div>
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 text-center text-white font-mono container mx-auto">
        <div className="text-5xl">👾</div>
        <h1>Webpack Microfrontend</h1>
        <div>
          <img className="w-40" src={image} alt="" />
        </div>
        <div>{JSON.stringify(data, null, 2)}</div>
        <div>Приятного кодирования ☕</div>
      </div>
    </div>
  );
};

export default App;
