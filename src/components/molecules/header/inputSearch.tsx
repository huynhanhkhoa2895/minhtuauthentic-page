export const InputSearch = () => {
  return (
    <div className={'w-full'}>
      <input
        className={
          'h-[40px] rounded-[10px] border-0 p-[5px_45px_5px_25px] focus-visible:outline-none focus-visible:border-0 w-full'
        }
        type="text"
        placeholder="Tìm kiếm sản phẩm"
      />
    </div>
  );
};
export default InputSearch;
