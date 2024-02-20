const ClockWidget = (props) => {
  const currentDate = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <section
      className="flex w-auto justify-center items-center p-8 font-bold text-white whitespace-nowrap rounded-[30px]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="flex flex-col items-center p-2">
        <h2 className="text-4xl">{props.city}</h2>
        <time className="self-stretch text-2xl p-4">
          {currentDate.getHours()} :{" "}
          {String(currentDate.getMinutes()).padStart(2, "0")}
        </time>
        <p className="text-xl p-2">
          {daysOfWeek[currentDate.getDay()]}, {currentDate.getDate()}{" "}
          {months[currentDate.getMonth()]}
        </p>
      </div>
    </section>
  );
};

export default ClockWidget;
