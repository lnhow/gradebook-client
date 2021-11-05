import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'

import ClassroomAPI from '../../../helpers/api/classrooms';

import ClassroomList from './classroomList';
import ClassroomListToolbar from './classroomListToolbar';
import NewClassroomDialog from './dialogs/addNew';
import SubmitMessage from '../../_common/submitMessage';

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
        setClassrooms(result.data);
      },
    )
    .catch(
      (error) => {
        let res = {};
        if (error.response) {
          res = [...error.response.data];
          //Incase cannot request to server
          res.data = error.response.data;
          res.status = error.response.status;
        }
        res.message = error.message;
        setIsLoaded(true);
        setError(res);
      }
    )
  }

  const onAddNewClassroomSuccess = (res) => {
    toast.success(<SubmitMessage title={res.title}/>)
    loadClassrooms();
  }

  const onAddNewClassroomFailed = (err) => {
    let res = {};
    res = [...err.response.data];
    //Incase cannot request to server
    res.data = err.response.data;
    res.status = err.response.status;
    res.message = err.message;
    toast.error(
      <SubmitMessage 
        code={res.status}
        title={res.title}
        details={res.details}
        message={res.message}
      />
    );
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
