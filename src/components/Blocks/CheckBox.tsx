import { useEffect, useState } from "react";
import { Card, Radio, Input, Button } from "antd";
import {
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";

interface RadioProps {
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

const RadioCard = ({
  onDelete,
  onChange,
  onSave,
  content,
}: RadioProps) => {

  // =========================
  // State
  // =========================

  const [options, setOptions] = useState<string[]>(
    content?.options || []
  );

  const [inputValue, setInputValue] =
    useState("");

  const [selectedOption, setSelectedOption] =
    useState(
      content?.selectedOption || ""
    );

  const [selected, setSelected] =
    useState(false);


  // =========================
  // Add Radio Option
  // =========================

  const addRadio = () => {

    if (!inputValue.trim()) {
      return;
    }

    const newOptions = [
      ...options,
      inputValue.trim(),
    ];

    setOptions(newOptions);

    setInputValue("");

  };


  // =========================
  // Select Radio
  // =========================

  const handleSelect = (
    value: string
  ) => {

    setSelectedOption(value);

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
          ".radio-block"
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
      className="radio-block relative flex w-full gap-8"
      onClick={() =>
        setSelected(true)
      }
    >

      {/* ========================= */}
      {/* Radio Card */}
      {/* ========================= */}

      <div className="w-1/2">

        <Card
          className={`rounded-2xl shadow-2xl ${
            selected
              ? "border-2 border-blue-500"
              : "border border-gray-300"
          }`}
        >

          <div className="flex flex-col gap-4">

            <div className="border-b pb-2">

              <h2 className="font-serif text-lg">
                Radio Options
              </h2>

            </div>


            {/* Radio Options */}

            <Radio.Group
              value={selectedOption}
              onChange={(e) =>
                handleSelect(
                  e.target.value
                )
              }
            >

              <div className="flex flex-col gap-3">

                {options.map(
                  (option) => (

                    <Radio
                      key={option}
                      value={option}
                    >
                      {option}
                    </Radio>

                  )
                )}

              </div>

            </Radio.Group>


            {/* Add Option */}

            <div
              className="flex gap-2"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <Input
                placeholder="Enter radio name"
                value={inputValue}
                onChange={(e) =>
                  setInputValue(
                    e.target.value
                  )
                }
                onPressEnter={
                  addRadio
                }
              />

              <Button
                type="primary"
                onClick={addRadio}
              >
                Add
              </Button>

            </div>

          </div>

        </Card>

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
            Radio Properties
          </h2>


          {/* Number of Options */}

          <div className="mb-4 rounded bg-gray-100 p-3">

            <p className="text-sm text-gray-500">
              Options
            </p>

            <p className="text-lg font-semibold">
              {options.length}
            </p>

          </div>


          {/* Add Option */}

          <div className="mb-4">

            <label className="mb-2 block text-sm font-medium">
              Add Option
            </label>

            <Input
              placeholder="Option name"
              value={inputValue}
              onChange={(e) =>
                setInputValue(
                  e.target.value
                )
              }
              onPressEnter={
                addRadio
              }
            />

            <Button
              type="primary"
              className="mt-2 w-full"
              onClick={addRadio}
            >
              Add Option
            </Button>

          </div>


          {/* ========================= */}
          {/* Save */}
          {/* ========================= */}

          <button
            type="button"
            onClick={() => {
              onChange({ options, selectedOption });
              onSave();
            }}
            className="mb-2 flex w-full items-center justify-center gap-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
          >

            <SaveOutlined />

            Save Radio

          </button>


          {/* ========================= */}
          {/* Delete */}
          {/* ========================= */}

          <button
            type="button"
            onClick={onDelete}
            className="flex w-full items-center gap-2 rounded border border-red-300 p-2 text-red-500 hover:bg-red-50"
          >

            <DeleteOutlined />

            Delete Radio

          </button>

        </div>

      )}

    </div>

  );

};

export default RadioCard;