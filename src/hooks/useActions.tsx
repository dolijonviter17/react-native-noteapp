import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {repositoriesCreators} from '../state';
import {livescoresCreators} from '../state';
export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      ...repositoriesCreators,
      ...livescoresCreators,
    },
    dispatch,
  );
};
