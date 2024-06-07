import { ReactNode, useContext } from 'react';
import CategoryFilterContext from '@/contexts/categoryFilterContext';
import { ProductFilterOptionDto } from '@/dtos/ProductFilterSettingOption/ProductFilterOption.dto';
import CloseCircle from '@/components/icons/closeCircle';

export default function FilterBy(){
  const ctx = useContext(CategoryFilterContext);
  const _settings = ctx?.objFilterByValue;
  const handleClose = (key: string,id: string| number) => {
    let _filter = { ...ctx?.filters };
    const value = _filter[key] || [];
    const indexValue = value.findIndex((item) => item.toString() === id.toString());
    if(indexValue > -1){
      value.splice(indexValue, 1);
    }
    _filter[key] = value;
    ctx?.setFilters && ctx.setFilters(_filter);
  }
  const renderItem = () => {
    let xhtml : ReactNode[]= [];
    if (_settings) {
      for (const filter in ctx?.filters) {
        const value = ctx?.filters[filter];
        value.map((item) => {
          xhtml.push(
            <div
              key={filter+'_'+item}
              className={'border border-gray-300 p-2 rounded-[5px] flex gap-1 bg-primary text-white items-center'}
            >
              <button type={'button'} onClick={()=>handleClose(filter,item)}>
                <CloseCircle className={'text-white w-5 h-5'} />
              </button>
              <span>{_settings[filter] && _settings[filter][item as any]}</span>
            </div>
          );
        })

      }
    }

    return xhtml;
  }
  return(
    <div className={'flex gap-3 items-center flex-wrap mt-3'}>
      {
        renderItem()
      }
    </div>
  )
}