import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";
import { Button ,Card } from "antd";
function Signature() {
  const signatureRef = useRef<SignatureCanvas | null>(null);

  const clearSignature = () => {
    signatureRef.current?.clear();
  };

  const saveSignature = () => {
    if (!signatureRef.current) return;

    const signature = signatureRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    console.log(signature);
  };

  return (
    <Card>
      <h2 className="font-bold ">Draw Your Signature</h2>

      <div className="w-1/5 h-auto rounded-2xl border">
        <SignatureCanvas
        ref={signatureRef}
        penColor="black"
        canvasProps={{
          width: 250,
          height: 200,
          className: "signature-canvas",
        }}
      />
      </div>

      <br />

      <Button onClick={saveSignature} type="primary"> Save Signature</Button>

      <button onClick={clearSignature}>
        Clear
      </button>
    </Card>
  );
}

export default Signature;