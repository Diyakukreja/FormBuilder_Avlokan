import React, { createContext, useContext, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Button from "./components/Button";
import Input from "./components/Input";
import Select from "./components/Select";
import Checkbox from "./components/Checkbox";


const FormContext = createContext();
const fieldtypes = [
  { type: "text", label: "Text Input" },
  { type: "number", label: "Number Input" },
  { type: "date", label: "Date Picker" },
  { type: "checkbox", label: "Checkbox" },
];

const Field = ({ field, index, moveField, removeField }) => {
  const [, ref] = useDrag({
    type: "FIELD",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "FIELD",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveField(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="border p-2 mb-2 bg-gray-100">
      {field.type === "text" && <Input label="Text" />}
      {field.type === "number" && <Input label="Number" type="number" />}
      {field.type === "date" && <Input label="Date" type="date" />}
      {field.type === "checkbox" && <Checkbox label="Check me" />}
      <button onClick={() => removeField(index)} className="text-red-500">Remove</button>
    </div>
  );
};

const FormBuilder = () => {
  const { fields, setFields } = useContext(FormContext);

  const addField = (type) => {
    setFields([...fields, { type }]);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const moveField = (from, to) => {
    const updatedFields = [...fields];
    const [movedField] = updatedFields.splice(from, 1);
    updatedFields.splice(to, 0, movedField);
    setFields(updatedFields);
  };

  

  const saveForm = () => {
    localStorage.setItem("savedForm", JSON.stringify(fields));
    alert("Form Saved!");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <h1 className="text-xl mb-2">Dynamic Form Builder</h1>
        <div className="flex space-x-2 mb-4">
          {fieldtypes.map(({ type, label }) => (
            <Button key={type} onClick={() => addField(type)}>{label}</Button>
          ))}
        </div>
        <div className="border p-4">
          {fields.map((field, index) => (
            <Field key={index} field={field} index={index} moveField={moveField} removeField={removeField} />
          ))}
        </div>
        <Button onClick={saveForm} className="mt-4">Save</Button>
      </div>
    </DndProvider>
  );
};

const App = () => {
  const [fields, setFields] = useState([]);

  return (
    <FormContext.Provider value={{ fields, setFields }}>
      <FormBuilder />
    </FormContext.Provider>
  );
};

export default App;


