const Toggle = (props) => {
  const clickHander = () => {
    props.onClick();
  };
  return (
    <label className="inline-flex items-center cursor-pointer mt-8">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onClick={clickHander}
      />
      <div className="relative w-10 h-6 peer-focus:ring-blue-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ms-3 text-sm font-medium text-gray-900">See {props.value === false ? "Tomorrow" : "Today"}</span>
    </label>
  );
};

export default Toggle;