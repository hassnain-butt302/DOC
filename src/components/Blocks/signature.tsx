import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button, Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface SignatureProps {
  onDelete: () => void;
  onChange: (content: string) => void;
  onSave: () => void;
  content?: string;
}

function Signature({ onDelete, onChange, onSave, content }: SignatureProps) {
  const signatureRef = useRef<SignatureCanvas | null>(null);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest(".signature-block")) {
        setSelected(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const clearSignature = () => {
    signatureRef.current?.clear();
  };
  const saveSignature = () => {
    if (!signatureRef.current || signatureRef.current.isEmpty()) {
      alert("Please draw a signature first.");
      return;
    }

    const signature = signatureRef.current.toDataURL("image/png");

    onChange(signature);
  };
  const deleteSignature = () => {
    onDelete();
  };

  return (
    <div
      className="signature-block flex w-full gap-8"
      onClick={() => setSelected(true)}
    >
      <div className="w-1/2">
        <Card
          className={`rounded-2xl shadow-2xl ${selected
              ? "border-2 border-blue-500"
              : "border border-gray-300"
            }`}
        >
          <h2 className="mb-4 border-b pb-2 font-bold">
            Draw Your Signature
          </h2>

          <div className="w-fit rounded-2xl border bg-white">
            <SignatureCanvas
              ref={signatureRef}
              penColor="black"
              canvasProps={{
                width: 350,
                height: 200,
                className: "signature-canvas",
              }}
            />
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                saveSignature();
              }}
            >
              Save Signature
            </Button>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                clearSignature();
              }}
            >
              Clear
            </Button>
          </div>
        </Card>
      </div>
      {selected && (
        <div
          className="absolute left-full top-0 ml-4 w-64 rounded-lg bg-white p-5 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="mb-4 text-lg font-semibold">
            Signature Properties
          </h2>
          <Button
            className="mb-3 w-full"
            onClick={clearSignature}
          >
            Clear Signature
          </Button>
          <Button
            type="primary"
            className="mb-3 w-full"
            onClick={saveSignature}
          >
            Save Signature
          </Button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteSignature();
            }}
            className="flex w-full items-center gap-2 rounded border border-red-300 p-2 text-red-500 hover:bg-red-50"
          >
            <DeleteOutlined />
            Delete Signature
          </button>
        </div>
      )}
    </div>
  );
}

export default Signature;