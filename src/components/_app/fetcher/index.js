import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getLoggedInUserInfo } from '../../../helpers/api/user';
import { signIn, signOut } from '../../../redux/slices/user';

export default function FetchSignedInUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    const isSignedIn = localStorage.getItem('isSignedIn') || false;
    if (isSignedIn) {
      getLoggedInUserInfo()
      .then((res) => {
        dispatch(signIn(res.data.user));
      })
      .catch((err) => {
        // Token expired
        dispatch(signOut());
      })
    }
  }, [dispatch]);
  return <div/>
}
