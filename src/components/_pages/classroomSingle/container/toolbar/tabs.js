import { Tabs, Tab } from '@mui/material';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import { useContext } from 'react';

import { CurrentClassContext } from '../../context/currentClassContext';

export default function ToolbarLinkTabs() {
  const { class_id } = useParams();
  const { isTeacher } = useContext(CurrentClassContext);

  // Fix MUI invalid value error warning by dynamically adding it
  const commonRoutes = ['/class/:class_id/participants', '/class/:class_id'];
  const teacherRoutes = ['/class/:class_id/grade-structure'];

  const displayRoutes = [...teacherRoutes, ...commonRoutes].sort((routeA, routeB) => {
    // Sort by route longer first, Routes need to be in deeper nested to less nested
    return routeA.length > routeB.length
  });

  const routeMatch = useRouteMatch(
    displayRoutes
  );
  const currentTab = routeMatch?.path;

  return (
    <Tabs 
      value={currentTab}
      variant='scrollable'
      scrollButtons='auto'
    >
      <Tab 
        label='Chi tiết' value='/class/:class_id'
        component={Link} to={`/class/${class_id}`}/>
      <Tab 
        label='Thành viên' value='/class/:class_id/participants'
        component={Link} to={`/class/${class_id}/participants`}/>
      {isTeacher && (
        <Tab 
          label='Cấu trúc điểm' value='/class/:class_id/grade-structure'
          component={Link} to={`/class/${class_id}/grade-structure`}
        />
      )}
    </Tabs>
  );
}
