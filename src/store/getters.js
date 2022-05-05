const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,

  userId: state => state.user.userId,
  userName: state => state.user.userName,
  phone: state => state.user.phone,
  role: state => state.user.role,
  department: state => state.user.department,
  major: state => state.user.major,
  className: state => state.user.className,
  grade: state => state.user.grade,

  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  permission_routes: state => state.permission.addRoutes

}
export default getters
