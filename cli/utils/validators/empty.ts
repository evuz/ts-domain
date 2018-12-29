export function emptyValidator(value) {
  if (!value) {
    return 'Please enter a path.';
  }
  return true;
}
