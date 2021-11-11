import { Tabs, Tab } from '@mui/material';
import { Link, useRouteMatch, useParams } from 'react-router-dom';

export default function ToolbarLinkTabs() {
  const { class_id } = useParams();
  // Routes need to be in deeper nested -> less nested
  const routeMatch = useRouteMatch(
    ['/class/:class_id/participants', '/class/:class_id']
  );
  const currentTab = routeMatch?.path;

  return (
    <Tabs value={currentTab}>
      <Tab 
        label='Chi tiết' value='/class/:class_id'
        component={Link} to={`/class/${class_id}`}/>
      <Tab 
        label='Thành viên' value='/class/:class_id/participants'
        component={Link} to={`/class/${class_id}/participants`}/>
    </Tabs>
  );
}
