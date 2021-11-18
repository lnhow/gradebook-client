import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'

import ClassroomAPI from '../../../helpers/api/classrooms';

import ClassroomList from './classroomList';
import ClassroomListToolbar from './classroomListToolbar';
import NewClassroomDialog from './dialogs/addNew';

function ClassroomListPage() {
  const [classrooms, setClassrooms] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const [isNewFormOpen, setIsNewFormOpen] = useState(false);

  useEffect(() => {
    loadClassrooms();
  }, []);

  const loadClassrooms = () => {
    setClassrooms([]);
    setIsLoaded(false);
    ClassroomAPI.fetchAll()
    .then(
      (result) => {
        setIsLoaded(true);
        setClassrooms(result.data.data);
      },
    )
    .catch(
      (error) => {
        let res = {};
        if (error.response && error.response.data) {
          if (error.response.data) {
            res = {...error.response.data};
          }
          //Incase cannot request to server
          res.data = error.response.data;
          res.status = error.response.status;
        }
        else {
          res.message = error.message;
        }
        setIsLoaded(true);
        setError(res);
      }
    )
  }

  const onAddNewClassroomSuccess = (data) => {
    toast.success(data.message);
    loadClassrooms();
  }

  const onAddNewClassroomFailed = (err) => {
    let message = err.message; //Incase cannot request to server
    if (err.response && err.response.data) {
      message = err.response.data.message;
    }
    toast.error(message);
  }

  return (
    <div>
      <ClassroomListToolbar
        handleRefresh = {loadClassrooms}
        handleOpenNewDialog = {() => {setIsNewFormOpen(true)}}
      />
      <ClassroomList 
        error = {error}
        isLoaded = {isLoaded}
        classrooms = {classrooms}
        handleRefresh = {() => {loadClassrooms()}}
      />
      <NewClassroomDialog
        open={isNewFormOpen}
        onClose={() => {setIsNewFormOpen(false)}}
        onSuccess={onAddNewClassroomSuccess}
        onFailed={onAddNewClassroomFailed}
      />
    </div>
  );
}

export default ClassroomListPage;
