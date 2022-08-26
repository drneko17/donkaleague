const Backdrop: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed left-0 top-0 w-full h-[100vh] z-10 bg-[rgba(0,0,0,0.75)]"
    ></div>
  );
};

export default Backdrop;
