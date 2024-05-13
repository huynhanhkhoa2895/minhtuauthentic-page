import { throwFetchError, validateStatusCode } from '@/modules/admin/utils/route';
import { toast } from 'react-toastify';
import { ProductConfigurationsDto } from '@/dtos/productConfigurations.dto';
export const getProductConfigurations = () : Promise<{list : ProductConfigurationsDto[]}> => fetch(
  `/api/product-configurations?model=product-configurations`,
)
  .then(async (res) => await throwFetchError(res))
  .then((data) => {
    validateStatusCode(data);
    if (!data?.data) {
      throw new Error('Có lỗi ở data này');
    }
    return data.data;
  })
  .catch((e) => {
    toast.error('Có lỗi ở data này');
  })

