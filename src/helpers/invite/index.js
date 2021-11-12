export const getPublicInviteLink = (
  classId='', classCode='', host=window.location.origin
) => {
  return `${host}/join?invitation=${classCode}&class_id=${classId}`;
}
