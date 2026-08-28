import { useEffect, useState } from "react";
import { Select, Input, Button } from "antd";
import {
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";

interface DropdownProps {
  onDelete: () => void;

  onChange: (content: {
    options: string[];
    selectedOption: string;
  }) => void;

  onSave: () => void;

  content?: {
    options?: string[];
    selectedOption?: string;
  };
}

const DropdownBlock = ({
  onDelete,
  onChange,
  onSave,
  content,
}: DropdownProps) => {

  // =========================
  // State
  // =========================

  const [options, setOptions] = useState<string[]>(
    content?.options || []
  );

  const [inputValue, setInputValue] =
    useState("");

  const [selectedOption, setSelectedOption] =
    useState<string>(
      content?.selectedOption || ""
    );

  const [selected, setSelected] =
    useState(false);


  // =========================
  // Add Option
  // =========================

  const addOption = () => {

    const option =
      inputValue.trim();

    if (!option) {
      return;
    }

    if (options.includes(option)) {
      setInputValue("");
      return;
    }

    const newOptions = [
      ...options,
      option,
    ];

    setOptions(newOptions);

    setInputValue("");

    onChange({
      options: newOptions,
      selectedOption,
    });

  };


  // =========================
  // Remove Option
  // =========================

  const removeOption = (
    optionToRemove: string
  ) => {

    const newOptions =
      options.filter(
        (option) =>
          option !== optionToRemove
      );

    let newSelectedOption =
      selectedOption;

    if (
      selectedOption ===
      optionToRemove
    ) {
      newSelectedOption = "";
      setSelectedOption("");
    }

    setOptions(newOptions);

    onChange({
      options: newOptions,
      selectedOption: newSelectedOption,
    });

  };


  // =========================
  // Select Option
  // =========================

  const handleSelect = (
    value: string
  ) => {

    setSelectedOption(value);

    onChange({
      options,
      selectedOption: value,
    });

  };


  // =========================
  // Click Outside
  // =========================

  useEffect(() => {

    const handleClickOutside = (
      event: MouseEvent
    ) => {

      const target =
        event.target as HTMLElement;

      if (
        !target.closest(
          ".dropdown-block"
        )
      ) {

        setSelected(false);

      }

    };


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


  // =========================
  // UI
  // =========================

  return (

    <div
      className="dropdown-block relative flex w-full"
      onClick={() =>
        setSelected(true)
      }
    >

      {/* ========================= */}
      {/* Dropdown */}
      {/* ========================= */}

      <div className="w-1/2">

        <div
          className={`rounded-2xl bg-white p-4 shadow-2xl ${
            selected
              ? "border-2 border-blue-500"
              : "border border-gray-300"
          }`}
        >

          <div className="mb-4 border-b pb-2 font-serif">
            Dropdown
          </div>


          <Select
            className="w-full"
            placeholder="Select an option"

            value={
              selectedOption || undefined
            }

            options={options.map(
              (option) => ({
                label: option,
                value: option,
              })
            )}

            onChange={handleSelect}

            onClick={(e) =>
              e.stopPropagation()
            }

          />

        </div>

      </div>


      {/* ========================= */}
      {/* Properties */}
      {/* ========================= */}

      {selected && (

        <div
          className="absolute left-full top-0 ml-4 w-64 rounded-lg bg-white p-5 shadow-lg"
          onClick={(e) =>
            e.stopPropagation()
          }
        >

          <h2 className="mb-4 text-lg font-semibold">
            Dropdown Properties
          </h2>


          {/* ========================= */}
          {/* Add Option */}
          {/* ========================= */}

          <div className="mb-4 flex gap-2">

            <Input
              placeholder="Enter option"
              value={inputValue}
              onChange={(e) =>
                setInputValue(
                  e.target.value
                )
              }
              onPressEnter={
                addOption
              }
            />

            <Button
              type="primary"
              onClick={addOption}
            >
              Add
            </Button>

          </div>


          {/* ========================= */}
          {/* Options */}
          {/* ========================= */}

          <div className="mb-4">

            <p className="mb-2 text-sm font-medium">
              Options
            </p>


            <div className="flex flex-col gap-2">

              {options.map(
                (option) => (

                  <div
                    key={option}
                    className="flex items-center justify-between rounded border p-2"
                  >

                    <span>
                      {option}
                    </span>


                    <button
                      type="button"
                      onClick={() =>
                        removeOption(
                          option
                        )
                      }
                      className="text-red-500"
                    >
                      ×
                    </button>

                  </div>

                )
              )}

            </div>

          </div>


          {/* ========================= */}
          {/* Save */}
          {/* ========================= */}

          <button
            type="button"
            onClick={onSave}
            className="mb-2 flex w-full items-center justify-center gap-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
          >

            <SaveOutlined />

            Save Dropdown

          </button>


          {/* ========================= */}
          {/* Delete */}
          {/* ========================= */}

          <Button
            danger
            className="w-full"
            onClick={onDelete}
          >

            <DeleteOutlined />

            Delete Dropdown

          </Button>

        </div>

      )}

    </div>

  );

};

export default DropdownBlock;