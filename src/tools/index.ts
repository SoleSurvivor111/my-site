export const generateRandomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);

export const getInitials = (nameString: string = "") => {
  if(!nameString) return null;

  const fullName = nameString.split(' ') || [];
  const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
  return initials.toUpperCase();
}
