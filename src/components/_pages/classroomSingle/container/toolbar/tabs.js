import { Tabs, Tab } from '@mui/material';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import { useContext } from 'react';

import { CurrentClassContext } from '../../context/currentClassContext';


const commonRoutes = [
  { order: 1, path: '/class/:class_id/participants', 
    endpoint: '/participants', name: 'Thành viên' 
  }, 
  { order: 2, path: '/class/:class_id/grade', 
    endpoint: '/grade', name: 'Điểm'
  },
  { order: 0, path: '/class/:class_id', 
    endpoint: '', name: 'Chi tiết'
  }
];

const teacherRoutes = [
  { order: 3, path: '/class/:class_id/grade-structure', 
    endpoint: '/grade-structure', name: 'Cấu trúc điểm'
  },
];

export default function ToolbarLinkTabs() {
  const { class_id } = useParams();
  const { isTeacher } = useContext(CurrentClassContext);  

  // Fix MUI invalid value error warning by dynamically adding it
  const totalRoutes = [
    ...(isTeacher ? (teacherRoutes) : []), 
    ...commonRoutes
  ]
  const totalRoutePaths = totalRoutes.map((route) => {
    return route.path;
  }).sort((pathA, pathB) => {
    // Sort by route longer first, Routes need to be in deeper nested to less nested
    return pathA.length > pathB.length
  });

  const displayRoutes = totalRoutes.sort((routeA, routeB) => {
    if (routeA.order >= routeB.order) {
      return 1;
    }
    return -1;
  })

  const routeMatch = useRouteMatch(
    totalRoutePaths
  );
  const currentTab = routeMatch?.path;

  return (
    <Tabs 
      value={currentTab}
      variant='scrollable'
      scrollButtons='auto'
    >
      {displayRoutes.map((route) => {
        return (
          <Tab 
            key = {route.order}
            label={route.name} 
            value={route.path}
            component={Link} 
            to={`/class/${class_id}${route.endpoint}`}
          />)
      })}
    </Tabs>
  );
}
