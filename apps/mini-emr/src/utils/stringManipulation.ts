export const formatDateString = (someString: string) => {
  try {
    let date: Date;
    if (someString.includes('T')) {
      date = new Date(someString);
    } else {
      date = new Date(`${someString}T00:00:00`);
    }

    const formatted = new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }).format(date);

    return formatted;
  } catch {
    return someString;
  }
}
