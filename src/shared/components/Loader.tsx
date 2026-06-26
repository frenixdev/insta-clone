const Loader = ({height="100%", width="100%"}) => {
  return (
    <div
      style={{ height, width }}
      className="flex items-center justify-center"
    >
      <div className="loader h-8/10 aspect-square border border-b-0 border-l-0 rounded-full animate-spin "></div>
    </div>
  );
};

export default Loader;
