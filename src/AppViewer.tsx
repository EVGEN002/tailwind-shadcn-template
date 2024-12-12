import App from '@/app/App';

import './AppViewer.css';

const AppViewer = () => {
  return <div>
    <div className='px-8 h-[5vh] bg-[#494949]'></div>
    <App type='view' id='c9bcf574-9bc0-4223-a07b-a3cb35a239fd' />
    {/* <div className='bg-white border-t border-[#dbdbdb] h-[calc(6vh-1px)] fixed bottom-0 w-full'></div> */}
  </div>;
};

export default AppViewer;
