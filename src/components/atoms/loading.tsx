type Props = {
  className?: string;
};

const Loading = ({ className = '' }: Props) => {
  return (
    <div
      className={`h-[40px] w-[40px] animate-spin-circle rounded-[50%] border-[4px] border-[#d9d9d9] border-t-primary ${className}`}
    ></div>
  );
};

export default Loading;
