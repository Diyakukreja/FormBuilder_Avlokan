const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-gray-700">{label}</label>
    <select className="border p-2 w-full rounded" {...props}>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);
export default Select;