const formatTime = (seconds: number, nanoseconds: number) => {
  const milliseconds = seconds * 1000 + nanoseconds / 1000000;
  const resultDate = new Date(milliseconds);
  return {
    year: resultDate.getFullYear(),
    month: resultDate.getMonth() + 1,
    day: resultDate.getDate(),
    hour:
      resultDate.getHours() > 9
        ? resultDate.getHours()
        : `0${resultDate.getHours()}`,
    minute:
      resultDate.getMinutes() > 9
        ? resultDate.getMinutes()
        : `0${resultDate.getMinutes()}`,
  };
};

export { formatTime };
