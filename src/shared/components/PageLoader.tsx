// components/PageLoader.tsx

const PageLoader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="flex gap-2">
        <span className="w-3 h-3 bg-white rounded-full animate-bounce" />
        <span className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
};

export default PageLoader;
