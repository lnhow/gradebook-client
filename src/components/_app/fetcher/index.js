import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Loader from '../../_common/loader';

import { signIn } from '../../../redux/slices/user';
import { USER_INFO } from '../../../helpers/constants';

export default function FetchSignedInUser({ children }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const userInfoString = localStorage.getItem(USER_INFO) || null;
    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        dispatch(signIn(userInfo));
      } catch (parseError) { /* ignored */}
    }
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return <Loader label='Tải thông tin đăng nhập'/>
  }
  return children;
}
