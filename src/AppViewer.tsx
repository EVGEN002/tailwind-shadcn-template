import App from '@/app/App';

import './AppViewer.css';

const AppViewer = () => {
  return (
    <div>
      <div className="h-[5vh] bg-[#494949] px-8"></div>
      {/* <App type="edit" id="c9bcf574-9bc0-4223-a07b-a3cb35a239fd" /> */}
      <App type="edit" id="5e1da25f-d9dd-40e0-9043-27cd90c4c660" />
      {/* <App type="view" id="f2ea834a-b233-446b-a338-4103c76177da" /> */}
    </div>
  );
};

export default AppViewer;
