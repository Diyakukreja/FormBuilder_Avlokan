const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-gray-700">{label}</label>
    <input className="border p-2 w-full rounded" {...props} />
  </div>
);
export default Input;