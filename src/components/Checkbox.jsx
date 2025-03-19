const Checkbox = ({ label, ...props }) => (
  <div>
    <label className="flex items-center space-x-2">
      <input type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  </div>
);
export default Checkbox;