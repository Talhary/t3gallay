import ClipLoader from 'react-spinners/CircleLoader';

const Spinner = () => (
  <div className="flex h-screen items-center justify-center">
    <ClipLoader size={150} aria-label="Loading Spinner" />
  </div>
);

export default Spinner;
