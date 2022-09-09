import Image from "next/image";

const Loading: React.FC = () => {
  return (
    <div>
      <div className="h-[300px] rotate">
        <Image src="/monkabus.png" height={100} width={137.5} />
        <div className=" h-[100px] w-[137.5px] text-center flex">
          {/* <div className="h-[50px] w-[68.75px]">
            <div className="bg-slate-400 h-[50px] w-[68.75] border-t"></div>
            <div className="bg-slate-400 h-[50px] w-[68.75] border-t"></div>
          </div>
          <div className="h-[50px] w-[68.75px]">
            <div className="bg-slate-400 h-[50px] w-[68.75] border-t"></div>
            <div className="bg-slate-400 h-[50px] w-[68.75] border-t"></div>
          </div> */}
        </div>
        <div className="h-[100px] w-[137.5px] text-center"></div>
      </div>
      <div className="mt-[-154px] text-center z-10 font-black text-[#F7F4F3]">
        Loading...
      </div>
    </div>
  );
};

export default Loading;
